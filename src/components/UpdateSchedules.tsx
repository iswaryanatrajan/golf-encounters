import React, { useEffect, useRef, useState } from "react";
import {
  EnvelopeOpenIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  VideoCameraIcon,
  ArrowDownIcon,
  ArrowTrendingUpIcon,
  TrashIcon
} from "@heroicons/react/24/solid";
import { Tooltip } from "react-tooltip";
import InputWithIcon from "../components/FormComponents";
import ProfileAvatar from "../components/ProfileAvatar";
import { ShareIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { UploaderInput } from "../components/uploaderInput/UploaderInput";
import { SlotsCalendar } from "../components/calender/SlotsCalender";
import { useTeacherContext } from "../contexts/teachersContext";
import { scheduler } from "timers/promises";
import { BeatLoader } from "react-spinners";
import { gigsContextStore } from "../contexts/gigsContext";
import { Link } from "react-router-dom";
const hoursOfDay: string[] = Array.from({ length: 24 }, (_, i) => {
  const startHour = i.toString().padStart(2, "0");
  const endHour = ((i + 1) % 24).toString().padStart(2, "0");

  return `${startHour}:00 to ${endHour}:00`;
});

const findHourIndex = (time: string): number => {
  return hoursOfDay.findIndex((hour) => hour.startsWith(time));
};

const initialActiveStates = Array.from({ length: hoursOfDay.length }, () =>
  Array(1).fill(false)
);

interface UpdatePostType {
  firstName: string;
  profileImage: File | null;
  portfolioVideo: FileList[];
  introductionVideo: File | null;
  movieUrl: any;
  portfolioUrl: any;
}
const updateSchedules: React.FC = () => {
  const { t } = useTranslation();
  const { teacher, handleScheduleDelete, handleShiftDelete, isLoading, setIsLoading, handleUpdate } = useTeacherContext();
  const [videoVisible, setVideoVisible] = useState<boolean>(false);
  const teacherId = localStorage.getItem("teacher_id");
  const { gigs, handleTeacherId } = gigsContextStore();
  const [portfolioVideoUrls, setPortfolioVideoUrls] = useState<string[]>(
    Array(5).fill("")
  );
  const [videoPortfolioVisible, setVideoPortfolioVisible] =
    useState<boolean>(false);
  const [showMediaUrl, setShowMediaUrl] = useState<boolean>(false);
  const [showPortfolioUrl, setShowPortfolioUrl] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    aboutMyself: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    location: "",
    hourlyRate: "",
    level: "",
    schedules: [
      {
        startDate: "",
        endDate: "",
        shifts: [
          {
            date: "",
            day: "",
            startTime: "",
            endTime: "",
          },
        ],
      },
    ],
  });
  const [nextformData, setNextFormData] = useState<UpdatePostType>({
    firstName: "adsfasdf",
    profileImage: null,
    portfolioVideo: [],
    introductionVideo: null,
    movieUrl: "",
    portfolioUrl: "",
  });
  const [urls, setUrls] = useState<any>("");
  const [portfolioVideos, setPortfolioVideo] = useState<any>("");
  const handlePortfolioUploadChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type?: any,
    index?: any
  ) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const objectURL = URL.createObjectURL(files[0]);

      // Update the specific video URL for this uploader
      setPortfolioVideoUrls((prev) => {
        const newUrls = [...prev];
        newUrls[index] = objectURL;
        return newUrls;
      });
    }
    const { name } = event.target;

    if (files && files.length > 0 && type === "introductionVideo") {
      const file = files[0]; // Get the first file from the files array
      setNextFormData((prevFormData) => ({
        ...prevFormData, // Spread the previous form data
        [type]: file, // Update the introductionVideo field to be a single file
      }));
    }
    if (files && files.length > 0 && type === "portfolioVideo") {
      const fileList = Array.from(files);
      setNextFormData((prevFormData: any) => ({
        ...prevFormData,
        [type]: [...prevFormData[type], ...fileList],
      }));
    }
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const { files, name } = event.target;

    if (files && files.length > 0) {
      const file = files[0];
      setNextFormData((prevFormData: any) => ({
        ...prevFormData,
        [type]: file,
      }));

      if (type === "introductionVideo") {
        setVideoVisible(true);
        const objectURL = URL.createObjectURL(file);
        setUrls(objectURL);
      }
    }
  };

  const profileImageInputRef = useRef<HTMLInputElement>(null);
  const portfolioVideoInputRef = useRef<HTMLInputElement>(null);
  const introductionVideoInputRef = useRef<HTMLInputElement>(null);

  const [selectedTab, setSelectedTab] = useState<Date | null>(null);
  const [teachAvailData, setTeachAvailData] = useState({}); // Step 1
  const [selectedWeekStart, setSelectedWeekStart] = useState<Date | null>(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [showInputIndexes, setShowInputIndexes] = useState<any>([]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeStates, setActiveStates] =
    useState<boolean[][]>(initialActiveStates);
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer && selectedWeekStart) {
      const hourIndex = findHourIndex("08:00");
      const hourElement = scrollContainer.querySelector(
        `.time-slot:nth-child(${hourIndex + 1})`
      ) as HTMLElement;
      if (hourElement) {
        scrollContainer.scrollTop = hourElement.offsetTop;
      }
    }
  }, [selectedWeekStart]);

  useEffect(() => {
    const filteredActiveStates = activeStates
      .map((dayStates, hourIndex) =>
        dayStates
          .map((isActive, dayIndex) =>
            isActive ? `${hoursOfDay[hourIndex]} on Day ${dayIndex}` : null
          )
          .filter(Boolean)
      )
      .filter((dayStates) => dayStates.length > 0);

    const teachAvailFormData = {
      selectedWeekStart: selectedWeekStart
        ? selectedWeekStart.toISOString()
        : null,
      selectedTimeSlots: selectedTimeSlots,
      activeStates: filteredActiveStates,
    };
    setTeachAvailData(teachAvailFormData);
  }, [activeStates, selectedWeekStart, selectedTimeSlots]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleUpdateChange = (event: any, index: any) => {
    const { name, value } = event.target;

    if (name === "portfolioUrl" + index) {
      setNextFormData((prevFormData) => {
        const updatedFormData = { ...prevFormData };
        const currentValue = updatedFormData.portfolioUrl
          ? updatedFormData.portfolioUrl.split(",")
          : [""];

        if (value.trim() !== "") {
          currentValue[index] = value.trim(",");
        } else {
          currentValue.splice(index, 1);
        }


        updatedFormData.portfolioUrl = currentValue.filter(Boolean).join(",");

        return updatedFormData;
      });
    } else {
      setNextFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleLocationChange = (location: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      location: location.value,
    }));
  };

  const handleLevelChange = (level: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      level: level.value,
    }));
  };

  const handleImageChanges = (event: any) => {
    setNextFormData((prevFormData) => ({
      ...prevFormData,
      profileImage: event,
    }));
  };

  useEffect(() => {
    const portfolioVideoUrls = teacher?.portfolioVideo
      ? teacher.portfolioVideo.split(",")
      : [];

    setFormData((prevState) => ({
      ...prevState,
      aboutMyself: teacher?.aboutMyself,
      firstName: teacher?.firstName,
      lastName: teacher?.lastName,
      phoneNumber: teacher?.phoneNumber,
      location: teacher?.location,
      hourlyRate: teacher?.hourlyRate,
      level: teacher?.level,
      schedules: teacher?.schedules?.map((item: any) => ({
        ...item,
        startDate: item.startDate,
        endDate: item.endDate,
        shifts: item?.shifts?.map((i: any) => ({
          ...i,
          day: i.day,
          date:  item.startDate,
          startTime: i.startTime,
          endTime: i.endTime,
        })),
      })),
    }));
    setNextFormData((prevState) => ({
      ...prevState,
      firstName: teacher.firstName,
      profileImage: teacher?.profileImage,
      portfolioVideo: portfolioVideoUrls,
      introductionVideo: teacher?.introductionVideo,
      movieUrl: teacher?.movieUrl,
      portfolioUrl: teacher?.portfolioUrl,
    }));
  }, [teacher]);
  useEffect(() => {
    // Assume teacher data is fetched and contains a schedules array
    if (teacher) {
      setFormData((prevState) => ({
        ...prevState,
        schedules: teacher?.schedules?.map((schedule: any) => ({
          ...schedule,
          shifts: schedule?.shifts?.map((shift: any) => ({ ...shift }))
        }))
      }));
    }
  }, [teacher]);

  // console.log(formData, "message");
  function formatDate(dateString: any, addDays = 1) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + addDays); // Add days to the date
    console.log(date.toISOString().split('T')[0]);
    return date.toISOString().split('T')[0];
  }
  useEffect(() => {
    // console.log("Teacher:", teacher);
    // console.log("Gigs:", gigs);

    if (teacher) {
      handleTeacherId(teacher?.id);
    }

    if (teacher?.teacherShift && gigs?.length !== teacher?.teacherShift?.length) {
      const teacherShiftWithGigs = teacher.teacherShift.map((shift: any) => {
        const gig = gigs.find((gig: any) => gig.shiftId === shift.id);
        return {
          ...shift,
          gig,
        };
      });

      setFormData((prevFormData) => ({
        ...prevFormData,
        schedules: teacherShiftWithGigs,
      }));
    }
  }, [gigs, teacher]);
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (gigs?.gigs?.length === 0) {
      toast.error(t("MUST_CREATE_GIG"));
      return;
    }
    setIsLoading(true);


    const payload = {
      ...formData,
      // ...nextformData,
      schedules: formData?.schedules,
    };

    console.log(formData,"payyy")
   // alert('hello')
    try {
      const response = await axios.put(API_ENDPOINTS.UPDATEUSER, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status == 200) {
        // handleUpdate(response.data.teacher);

        try {
          const response = await axios.put(
            API_ENDPOINTS.UPDATETEACHERPROFILE,
            nextformData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );

          toast.success(t("UPDATED_SUCCESS"));
          // handleTeacher(response.data.teacher)
          // location.reload();
        } catch (error) {
          console.error("Error updating event media:");
          toast.error(t("FAILED_EVENT_UPDATE"));
        }
      }
    } catch (error) {
      toast.error(t("ALREADY_CREATED"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleWeekSelected = (date: Date) => {

    setSelectedWeekStart(date);
  };

  const handleTabClick = (date: Date) => {
    setSelectedWeekStart(date);
  };

  const handleState = () => {
    setActiveStates(initialActiveStates);
  };
  const resetSchedules = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      schedules: [],
    }));
  };
  const getDayName = (date: Date | null): string => {
    if (date) {
      return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
    }
    return "";
  };
  const getFormattedDate = (date: Date | null): string => {
    if (date) {
      return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
    }
    return "";
  };
  const toggleAvailability = (date: Date, time: string, dayIndex: number): void => {
    const hourIndex = findHourIndex(time);

    setActiveStates((prev) => {
      const newActiveStates = prev.map((dayStates, index) =>
        index === hourIndex
          ? dayStates.map((isActive, i) =>
            i === dayIndex ? !isActive : isActive
          )
          : [...dayStates]
      );
      return newActiveStates;
    });

    const timeSlot = `${hoursOfDay[hourIndex]} on ${date.toLocaleDateString()}`;

    setSelectedTimeSlots((prev) => {
      const index = prev.indexOf(timeSlot);
      if (index !== -1) {
        return prev.filter((slot) => slot !== timeSlot);
      } else {
        return [...prev, timeSlot];
      }
    });
  };


  const handleTimeSlotClick = (date: Date, hour: string, dayIndex: number) => { // Accept Date object
    const dateFormatter = new Intl.DateTimeFormat("en-US", { weekday: "long" });
    const dateParts = dateFormatter.formatToParts(date);
    const dayName = dateParts.find((part) => part.type === "weekday")?.value || "";
    // console.log(formData, date)
    if (!dayName) {
      console.error("Invalid date:", date);
      return; // Exit the function or handle it as required
    }

    toggleAvailability(date, hour, dayIndex);

    console.log( formatDate(date),"jhhk"
    );
    const newShift = {
      date:  formatDate(date),
      day: dayName,
      startTime: hour,
      endTime: "",
    };

    const newSchedule = {
      startDate: formatDate(selectedWeekStart) || "",
      endDate: formatDate(selectedWeekStart, 7) || "",
      shifts: [newShift],
    };

    setFormData((prevFormData:any) => {
      const newSchedules = [...prevFormData.schedules, newSchedule];
      return {
        ...prevFormData,
        schedules: newSchedules,
      };
    });
  };


  const handleButtonClick = (index: any) => {
    if (showInputIndexes.includes(index)) {
      setShowInputIndexes(showInputIndexes.filter((i: any) => i !== index));
    } else {
      setShowInputIndexes([...showInputIndexes, index]);
    }
  };
  const groupByDateRange = (schedules: any) => {
    const grouped: any = {};

    schedules.forEach((schedule: any) => {
      const dateRange: any = `${schedule.startDate}-${schedule.endDate}`;
      if (!grouped[dateRange]) {
        grouped[dateRange] = {
          id: schedule.id,
          startDate: schedule.startDate,
          endDate: schedule.endDate,
          shifts: []
        };
      }
      grouped[dateRange].shifts.push(...schedule.shifts);
    });

    return Object.values(grouped);
  };
  const groupedSchedules = groupByDateRange(teacher?.schedules || []);

  const comparisonDate = new Date("12-12-2222");
  // test
  const isWithinShiftTime = (hour: any, shift: any) => {
    const [startHour] = shift.startTime.split(" to ")[0].split(":");
    const [endHour] = shift.startTime.split(" to ")[1].split(":");
    return hour >= startHour && hour < endHour;
  };
  // test
  return (
    isLoading ? <div className="flex items-center justify-center h-[100vh] ">
      <BeatLoader color="#51ff85" size={15} />
    </div> : <div className="py-8 mx-4 xl:mx-0 ">
      <div className="max-w-7xl mx-auto">
        <div className="text-center bg-[#1e40af] p-1">
          <h3 className="text-white">{t("EDIT_SCHEDULES")}</h3>
        </div>

        <div className="my-4 mx-10   xl:mx-0">
          <SlotsCalendar  handleTimeSlotClick={handleTimeSlotClick} startEndDates={teacher.schedules} resetSchedules={resetSchedules} handleState={handleState} onWeekSelected={handleWeekSelected} />
          {/* <div className="grid grid-cols-1 gap-4 py-2 text-center mt-10">

            <div className=" flex xl:justify-start gap-4    overflow-x-scroll xl:overflow-auto  p-2 rounded-md">
              {selectedWeekStart &&
                Array.from({ length: 1 }, (_, i) => {
                  const date = new Date(selectedWeekStart.getTime() + i * 24 * 60 * 60 * 1000);
                  return (date.getTime() !== comparisonDate.getTime()) &&
                    <div
                      key={date.toLocaleDateString()}
                      className={` xl:font-bold text-red ${date.getTime() === selectedTab?.getTime() ? "selected-tab" : ""}`}
                      onClick={() => handleTabClick(date)}
                    >
                      {t(getDayName(date).toLocaleUpperCase())} {getFormattedDate(date)}
                    </div>

                })}
            </div>
          </div>
          <div
            ref={scrollContainerRef}
            className="grid grid-cols-8 gap-4 overflow-auto text-center"
            style={{ maxHeight: "50vh" }}
          >
            {hoursOfDay.map((hour, hourIndex) => (
              <React.Fragment key={hour}>


                {selectedWeekStart &&
                  Array.from({ length: 1 }, (_, dayIndex) => {
                    const date = new Date(
                      selectedWeekStart.getTime() +
                      dayIndex * 24 * 60 * 60 * 1000
                    );
                    const dateKey = date.toISOString().split("T");
                    const isActive = activeStates[hourIndex][dayIndex];
                    return (date.getTime() !== comparisonDate.getTime()) &&

                      <button
                        key={dateKey + hour}
                        type="button"
                        className={`col-span-1 rounded-md py-2 time-slot ${isActive ? "bg-[#B2C3FD] shadow-lg" : "bg-[#F1F1F1]"
                          }`}
                        onClick={() =>
                          handleTimeSlotClick(date, hour, dayIndex)
                        }
                      >
                        { hour}
                      </button>


                      ;
                  })}
              </React.Fragment>
            ))}
          </div> */}
        </div>
      </div>

      <div className="flex gap-4 justify-center my-8">
        <div className="flex justify-center">
          <button
            className="p-3 bg-[#1e40af] text-white rounded-md"
            onClick={handleFormSubmit}
          >
            {t("UPDATE_SCHEDULES")}
          </button>
        </div>
        <Link to={`/profile-page`} >
          <button className="p-3 bg-[#17b3a6] rounded-md text-white cursor-pointer" >{t("UPDATE_PROFILE")}</button>
        </Link>
        <Link to={`/create-catalogs/${teacherId}`} >
          <button className="p-3 bg-[#17b3a6] rounded-md text-white cursor-pointer" >{t("CREATE_GIG")}</button>
        </Link>
        <Link to={`/profile-page`} >
          <button className="p-3 bg-[#17b3a6] rounded-md text-white cursor-pointer" >{t("UPDATE_GIG")}</button>
        </Link>

      </div>
      <div className="max-w-7xl mx-auto">
      <div className="mx-10 xl:mx-0">
          <h3>{t("Your Previous Schedules")}</h3>
          <div className="grid grid-flow-col auto-cols-max gap-4 px-4 overflow-x-auto snap-x py-4">

            {groupedSchedules
            ?.filter((schedule: any) => {
              // Convert schedule.startDate and today's date to Date objects for comparison
              const scheduleDate = new Date(schedule.startDate);
              const today = new Date();
              // Ensure only schedules after today are shown
              return scheduleDate > today;
            })
            
            .map((schedule: any, index: any) => (
              <>
                <div key={index} className="snap-start bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] p-5 md:p-[23px] rounded-lg p-4 w-[200px] ">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-sm font-bold">{schedule.startDate} {t(`${schedule.shifts[0].day.toUpperCase()}`)} </h2>
                    {!schedule.shifts.length && <button
                      onClick={() => handleScheduleDelete(schedule?.id)}
                      className="bg-transparent hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      <TrashIcon
                        className="h-[16px] text-red  p-[2px] border-2 border-solid rounded-full cursor-pointer ml-2 "
                        onClick={() => setShowMediaUrl(!showMediaUrl)}

                      />
                    </button>}
                  </div>
                  <div className="h-[240px] overflow-y-auto">
                    {schedule.shifts?.map((shift: any, shiftIndex: any) => {
                      // console.log(shift?.isBooked, "hello imran")

                      return <div key={shiftIndex} className="bg-[#1e40af] text-white p-3 rounded-lg flex justify-between items-center mb-2 ">
                        <span className="font-medium text-sm">
                          {shift.startTime}
                        </span>

                        {
                          shift?.status == "BOOKED" ? <button


                            className="bg-[#17b3a6]  hover:bg-red-700 text-white font-bold py-1  rounded cursor-pointer w-[80px] cursor-not-allowed"
                          >
                            {t("BOOKED")}

                          </button> : <button


                            className="bg-red hover:bg-red-700 text-white font-bold py-1 cursor-pointer rounded "
                            onClick={() => handleShiftDelete(shift.id)}

                          >
                            {t("REMOVE")}
                          </button>
                        }
                      </div>
                    })}
                  </div>

                </div>


              </>
            ))}
          </div>
        </div>
        </div>
    </div>
  );
};

export default updateSchedules;
