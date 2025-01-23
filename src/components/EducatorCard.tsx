import React, { useEffect, useState } from "react";
import { MapPinIcon, StarIcon } from "@heroicons/react/24/outline";
import TeacherListSlots from "./TeacherListSlots";
import { Link, useNavigate } from "react-router-dom";
import { teacherContext } from "../contexts/teachersContext";
import { TeacherCalender } from "./TeacherCalender";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";
import GigsModal from "../components/catalogs/GigsModel";
import { fetchGigsById } from "../utils/fetchGigs";

export const EducatorCard = ({
  firstName,
  lastName,
  imgUrl,
  location,
  rating,
  aboutMyself,
  schedules,
  userId,
  hourlyRate,
  teacherId,
  level
}: any) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [shiftsData, setShiftsData] = useState([]);
  const [tap, setTaped] = useState<boolean>(false);
  const [bookingsData, setBookingsData] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gigs, setGigs] = useState<any>(null);
  const tId = localStorage.getItem("teacher_id");

  const handleMatchedShift = (matchedShifts: any) => {
    setShiftsData(matchedShifts);
  };

  const handleMatchedShifts = (matchedShifts: any) => {
    console.log("tap",tap);
    console.log("matchedShifts",matchedShifts);
    /*if (!tap) {
      const s = schedules.flatMap(({ shifts }: any) => shifts);
      matchedShifts = s.slice(0, 5);
    }
    setShiftsData(matchedShifts);*/
    if (tap) {
      setShiftsData(matchedShifts);
    } else {
      // Clear shiftsData if `tap` is false
      setShiftsData([]);
    }
  };

  const handleOnClicked = (click: boolean) => {
    console.log("Calendar clicked, tap set to:", click); // Debug log
    setTaped(click); // Update the `tap` state
    if (!click) {
      setShiftsData([]);
    }
  };

 /* useEffect(() => {
    handleMatchedShift;
  }, [tap]);*/

  const handleSelectedShifts = async (shift: any) => {
    if (shift.isBooked) {
      return; // Prevent action if shift is booked
    }
    if (bookingsData == shift) {
      setBookingsData(null);
    } else {
      setBookingsData(shift);
    }
  };

  console.log(bookingsData, "bd");

  const handleBookAppointment = () => {
    if (bookingsData) {
      bookAppointment(
        bookingsData.scheduleId,
        bookingsData.day,
        bookingsData.date,
        bookingsData.startTime,
        bookingsData.endTime,
        bookingsData.isBooked
      );
    } else {
      toast.error(t("SELECT_SCHEDULE"));
    }
  };

  const bookAppointment = async (
    scheduleId: any,
    day: any,
    date: any,
    startTime: any,
    endTime: any,
    isBooked: boolean
  ) => {
    try {
      const token = localStorage.getItem("token");
      const id = Number(localStorage.getItem("id"));
      const response = await axios.post(
        API_ENDPOINTS.BOOKAPPOINTMENT,
        {
          scheduleId,
          day,
          date,
          startTime,
          endTime,
          isBooked: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            userId: id,
          },
        }
      );
      toast.success(t("BOOKED_SUCCESS"));
    } catch (error) {
      toast.error(t("ERROR_BOOKED"));
    }
  };

  const handleGigsClick = async (e: any, teacherId: any) => {
    e.stopPropagation();
    await fetchGigsById(setGigs, teacherId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] p-6 my-4">
      <div className="grid grid-cols-1 xl:grid-cols-9 gap-4">
        <div className="lg:col-span-6">
          <div
            className="flex flex-col lg:flex-row"
          // onClick={(e) => {
          //   e.preventDefault();
          //   navigate(`/teacher-details/${teacherId}`)
          // }}
          >
            <div className="text-center " onClick={(e) => {
              e.preventDefault();
              navigate(`/teacher-details/${teacherId}`)
            }}>
              <img
                src={imgUrl}
                width="100px"
                height="100px"
                className="rounded-full"
                alt=""
              />
              <h4>
                ¥ {hourlyRate} {t("Per/Hr")}{" "}
              </h4>
            </div>
            <div className="mt-4 md:mt-0 md:mx-4 flex-1">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <h3 onClick={(e) => {
              e.preventDefault();
              navigate(`/teacher-details/${teacherId}`)
            }}>
                  {firstName} {lastName}
                </h3>
                <div className="grid grid-cols-2 xl:flex items-center gap-4 mt-2 md:mt-0 z-[]">
                  {tId != teacherId && (
                    <div onClick={(e) => {
                      e.preventDefault();
                      navigate('/message-page/' + userId)
                    }}>
                      <button className="cursor-pointer bg-transparent w-full xl:w-auto border-2 border-solid border-[#d5d5d5] hover:bg-[#61cbc2] hover:text-white hover:border-none text-[#5d5d5d] font-bold py-2 px-4 rounded">
                        {t("CHAT")}
                      </button>
                    </div>
                  )}
                  <Link to={"/teacher-details/" + teacherId}>
                    <button className="w-full xl:w-auto bg-transparent border-2 border-solid border-[#d5d5d5] hover:bg-[#61cbc2] hover:text-white hover:border-none text-[#5d5d5d] font-bold py-2 px-4 rounded cursor-pointer">
                      {t("VIEW_DETAILS")}
                    </button>
                  </Link>
                  {/* <button className="w-full xl:w-auto bg-transparent border-2 border-solid border-[#d5d5d5] hover:bg-[#61cbc2] hover:text-white hover:border-none text-[#5d5d5d] font-bold py-2 px-4 rounded cursor-pointer" onClick={(e: any) => {
                    handleGigsClick(e, teacherId)
                  }}>
                    {t("GIGS")}
                  </button> */}
                </div>
              </div>
              <div className="flex flex-col columns-3 md:flex-row gap-10 mt-4 md:mt-0" onClick={(e) => {
                e.preventDefault();
                navigate(`/teacher-details/${teacherId}`)
              }}>
                <div className="flex col-3 items-center gap-2">
                  <MapPinIcon
                    className="w-4 h-4 text-white bg-[#61cbc2] rounded-full p-1"
                    aria-hidden="true"
                  />
                  <div>
                    <h4 className="m-0 my-1 p-0">{t("LOCATION")}</h4>
                    <p className="m-0 p-0 text-sm">{location}</p>
                  </div>
                </div>
                <div className="flex col-3 items-center gap-2">
                  <StarIcon
                    className="w-4 h-4 text-white bg-[#61cbc2] rounded-full p-1"
                    aria-hidden="true"
                  />
                  <div>
                    <h4 className="m-0 my-1 p-0"> {t("RATING")} </h4>
                    <p className="m-0 p-0 text-sm">
                      {rating
                        ? t("RATING_WITH_COUNT", {
                          count: rating,
                          numRatings: 130,
                        })
                        : t("NO_RATINGS_YET")}
                    </p>
                  </div>
                </div>
                <div className="flex col-3 items-center gap-2" onClick={(e) => {
                  e.preventDefault();
                  navigate(`/teacher-details/${teacherId}`)
                }}>
                  <StarIcon
                    className="w-4 h-4 text-white bg-[#61cbc2] rounded-full p-1"
                    aria-hidden="true"
                  />
                  <div>
                    <h4 className="m-0 my-1 p-0"> {t("LEVEL")} </h4>
                    <p className="m-0 p-0 text-sm">
                      {level ? level : t("NO_LEVEL_ADDED")}
                    </p>
                  </div>
                </div>
              </div>
              <p className="leading-6 text-[#5b5b5b] mt-4">{aboutMyself}</p>
            </div>
          </div>
          {tap && (
            <div className="mt-4">
              <div className="grid grid-cols-2 lg:grid-cols-8 sm:grid-cols-3 gap-4">
                {shiftsData.map((shift: any, index: any) => (
                  <button
                    key={index}
                    className={`text-[12px] w-full xl:w-auto text-center px-1 py-4 rounded-lg shadow-sm ${bookingsData === shift && "!bg-black"
                      } ${!shift.isBooked
                        ? "bg-teal-400 text-white"
                        : "bg-gray-100 text-gray-600 cursor-not-allowed"
                      } `}
                    onClick={() => handleSelectedShifts(shift)}
                  >
                    {shift.startTime} - {shift.endTime}
                  </button>
                ))}
                <div className="w-full xl:w-[170px]">
                  <button
                    className="cursor-pointer hover:bg-black hover:text-white w-full py-4 xl:w-full text-sm bg-[#2dd4bf] text-white border-2 border-solid border-[#d5d5d5] hover:bg-[#61cbc2] hover:text-white hover:border-none text-[#5d5d5d] font-bold py-2 rounded"
                    onClick={handleBookAppointment}
                  >
                    {t("BOOK_APPOINTMENT")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="md:col-span-3">
          
          <TeacherCalender
            startEndDates={schedules}
            shifts={schedules?.shifts}
            onClicked={handleOnClicked}
            onMatchedShifts={handleMatchedShifts}
          />
        </div>

        {/* {isModalOpen && <GigsModal isOpen={isModalOpen} onClose={handleCloseModal} gigs={gigs?.gigs} />} */}
      </div>
    </div>
  );
};
