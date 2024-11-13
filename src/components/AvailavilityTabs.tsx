import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SchedulesTabsProps } from "../utils/types";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";
import { ToastConfig, toastProperties } from "../constants/toast";

interface AvailabilityTabsProps {
  onSelectTime: (selectedTime: string) => void;
  schedules?: SchedulesTabsProps[];
  selectedDate?: string;
  dayFilter: string;
}

const AvailabilityTabs: React.FC<AvailabilityTabsProps> = ({
  onSelectTime,
  schedules = [],
  selectedDate,
  dayFilter,
}) => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();

  const convertTo12Hour = (time: string) => {
    return time;
  };

  interface TimeDetails {
    id: any;
    startTime: any;
    endTime: any;
    day: any;
  }

  const generateTimeSlots = () => {
    const slots: any[] = [];
    const isBooked: boolean[] = [];
    schedules?.forEach((schedule, scheduleIndex) => {
      schedule.shifts.forEach((shift, shiftIndex) => {
        const formattedSlot = `${convertTo12Hour(
          shift.startTime
        )} - ${convertTo12Hour(shift.endTime)}`;
        slots.push({
          time: formattedSlot,
          id: `slot-${scheduleIndex}-${shiftIndex}`,
        });
        isBooked.push(shift.isBooked);
      });
    });
    return { slots, isBooked };
  };

  let filteredSchedules = schedules.filter((slot) =>
    slot.shifts.some((shift) => shift.day === dayFilter)
  );

  const initialTimeSlots = generateTimeSlots();
  const [selectedTime, setSelectedTime] = useState<any[]>([]);

  const [bookedSlots, setBookedSlots] = useState<boolean[]>(
    initialTimeSlots.isBooked
  );

  useEffect(() => {
    const { isBooked } = initialTimeSlots;
    setBookedSlots(isBooked);
    filteredSchedules;
  }, [schedules]);

  const [selectedTimeDetails, setSelectedTimeDetails] = useState<TimeDetails[]>(
    []
  );

  const handleTabClick = (
    slotId: any,
    startTime: any,
    endTime: any,
    day: any
  ) => {
    const isSelected = selectedTime.some((item) => item.id === slotId);
    const updatedDetails = selectedTimeDetails.filter(
      (item) => item.id !== slotId
    );
    setSelectedTimeDetails(updatedDetails);

    if (isSelected) {
      setSelectedTime(selectedTime.filter((item) => item.id !== slotId));
    } else {
      setSelectedTimeDetails((prevDetails) => [
        ...prevDetails,
        {
          id: slotId,
          startTime,
          endTime,
          day,
        },
      ]);
      setSelectedTime([...selectedTime, { startTime, id: slotId }]);
    }

    onSelectTime(startTime);
  };

  const navigate = useNavigate();

  // const handleBookAppointmentClick = () => {
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     navigate("/login-page");
  //     return;
  //   }

  //   selectedTimeDetails.forEach((time) => {
  //     bookAppointment(time.id, time.day, time.startTime, time.endTime, false);
  //   });
  // };

  // const bookAppointment = async (
  //   scheduleId: any,
  //   day: any,
  //   startTime: any,
  //   endTime: any,
  //   isBooked: boolean
  // ) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const id = Number(localStorage.getItem("id"));
  //     const response = await axios.post(
  //       API_ENDPOINTS.BOOKAPPOINTMENT,
  //       {
  //         scheduleId,
  //         day,
  //         startTime,
  //         endTime,
  //         isBooked: false,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         params: {
  //           userId: id,
  //         },
  //       }
  //     );
  //     toast.success(
  //       "Appointment booked successfully",
  //       toastProperties as ToastConfig
  //     );
  //   } catch (error) {
  //     toast.error("Error booking appointment", toastProperties as ToastConfig);
  //   }
  // };
  const [state, setState] = useState<any[]>([]);
  useEffect(() => {
    setState(dayFilter === "All" ? initialTimeSlots.slots : filteredSchedules);
  }, [dayFilter, initialTimeSlots.slots]);

  const scheduleComponents = state.map((slot: any, index: any) => {
    const isSelected = selectedTime.some(
      (item) => slot.shifts[0].scheduleId === item.id
    );
    const isBooked = state === bookedSlots ? slot : bookedSlots[index];

    if (!slot.shifts || (slot.shifts.length === 0 && dayFilter !== "All")) {
      return (
          <button
            className={`text-sm text-center p-4 rounded-lg shadow-sm ${
              isSelected
                ? 'bg-[#17b3a6] text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() =>
              handleTabClick(
                slot.shifts[0].scheduleId,
                slot.shifts[0].startTime,
                slot.shifts[0].endTime,
                slot.shifts[0].day
              )
            }
            disabled={isBooked}
          >
            {slot.time}
          </button>
      );
    }
    return (
        <button
          className={`text-sm text-center p-4 rounded-lg shadow-sm ${
            isSelected
              ? "bg-[#17b3a6] text-white"
              : "bg-gray-100 text-gray-600"
          } ${isBooked ? "bg-[#e8e8e8] text-white" : ""}`}
          onClick={() =>
            handleTabClick(
              slot.shifts[0].scheduleId,
              slot.shifts[0].startTime,
              slot.shifts[0].endTime,
              slot.shifts[0].day
            )
          }
          disabled={isBooked}
        >
          {slot.shifts[0].startTime + " " + slot.shifts[0].endTime}
        </button>
    );
  });

  return (
    <div>
      <div className="border-solid border-[2px] border-[#52FF86] rounded-md px-2 py-4">
        <div className="flex flex-wrap justify-between gap-4 mt-4">
          {scheduleComponents}
        </div>
        {/* <div className="mt-8 ml-2">
          <button
            onClick={handleBookAppointmentClick}
            className="bg-[#1b1c21] hover:bg-gray-400 text-white font-bold py-4 px-4 rounded-full inline-flex items-center md:py-4 sm:py-2 animate__animated animate__lightSpeedInRight cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 12 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.39763 0.66217C0.999351 0.66217 0.678711 1.00306 0.678711 1.4265V9.92529C0.678711 10.3487 0.999351 10.6896 1.39763 10.6896H6.85498C6.73186 10.307 6.68301 9.90176 6.71139 9.49847H1.5654C1.54055 9.49883 1.51589 9.49394 1.49284 9.48408C1.46979 9.47422 1.44881 9.45959 1.43112 9.44104C1.41343 9.42249 1.39939 9.40038 1.3898 9.37601C1.38022 9.35164 1.37528 9.32549 1.37528 9.29908C1.37528 9.27266 1.38022 9.24651 1.3898 9.22214C1.39939 9.19777 1.41343 9.17567 1.43112 9.15712C1.44881 9.13857 1.46979 9.12393 1.49284 9.11408C1.51589 9.10422 1.54055 9.09932 1.5654 9.09968H6.76806C6.87021 8.58874 7.09643 8.11515 7.42423 7.72605H1.56543C1.54059 7.72641 1.51592 7.72152 1.49287 7.71166C1.46982 7.7018 1.44884 7.68717 1.43116 7.66862C1.41347 7.65007 1.39942 7.62797 1.38984 7.6036C1.38025 7.57923 1.37532 7.55307 1.37532 7.52666C1.37532 7.50024 1.38025 7.47409 1.38984 7.44972C1.39942 7.42535 1.41347 7.40325 1.43116 7.3847C1.44884 7.36615 1.46982 7.35152 1.49287 7.34166C1.51592 7.3318 1.54059 7.32691 1.56543 7.32727H7.83597C8.15797 7.07256 8.5275 6.89405 8.91975 6.80373C9.31201 6.7134 9.7179 6.71336 10.1102 6.8036V1.4265C10.1102 1.00306 9.78953 0.66217 9.39124 0.66217H1.39763ZM3.0032 1.88838H7.78557C7.81041 1.88802 7.83507 1.89291 7.85813 1.90277C7.88118 1.91263 7.90215 1.92726 7.91984 1.94581C7.93753 1.96436 7.95157 1.98647 7.96116 2.01084C7.97075 2.03521 7.97568 2.06136 7.97568 2.08777C7.97568 2.11419 7.97075 2.14034 7.96116 2.16471C7.95157 2.18908 7.93753 2.21118 7.91984 2.22973C7.90215 2.24828 7.88118 2.26291 7.85813 2.27277C7.83507 2.28263 7.81041 2.28752 7.78557 2.28717H3.0032C2.97836 2.28752 2.9537 2.28263 2.93065 2.27277C2.9076 2.26291 2.88662 2.24828 2.86893 2.22973C2.85124 2.21118 2.8372 2.18908 2.82761 2.16471C2.81803 2.14034 2.81309 2.11419 2.81309 2.08777C2.81309 2.06136 2.81803 2.03521 2.82761 2.01084C2.8372 1.98647 2.85124 1.96436 2.86893 1.94581C2.88662 1.92726 2.9076 1.91263 2.93065 1.90277C2.9537 1.89291 2.97836 1.88802 3.0032 1.88838ZM1.56534 3.78264H9.22343C9.24828 3.78228 9.27294 3.78718 9.29599 3.79703C9.31904 3.80689 9.34002 3.82152 9.35771 3.84007C9.3754 3.85863 9.38944 3.88073 9.39903 3.9051C9.40861 3.92947 9.41355 3.95562 9.41355 3.98203C9.41355 4.00845 9.40861 4.0346 9.39903 4.05897C9.38944 4.08334 9.3754 4.10544 9.35771 4.124C9.34002 4.14255 9.31904 4.15718 9.29599 4.16704C9.27294 4.17689 9.24828 4.18179 9.22343 4.18143H1.56534C1.54049 4.18179 1.51583 4.17689 1.49278 4.16704C1.46973 4.15718 1.44875 4.14255 1.43106 4.124C1.41338 4.10544 1.39933 4.08334 1.38975 4.05897C1.38016 4.0346 1.37522 4.00845 1.37522 3.98203C1.37522 3.95562 1.38016 3.92947 1.38975 3.9051C1.39933 3.88073 1.41338 3.85863 1.43106 3.84007C1.44875 3.82152 1.46973 3.80689 1.49278 3.79703C1.51583 3.78718 1.54049 3.78228 1.56534 3.78264ZM1.56534 5.55505H9.22343C9.24828 5.55469 9.27294 5.55958 9.29599 5.56944C9.31904 5.5793 9.34002 5.59393 9.35771 5.61248C9.3754 5.63103 9.38944 5.65313 9.39903 5.6775C9.40861 5.70187 9.41355 5.72802 9.41355 5.75444C9.41355 5.78086 9.40861 5.80701 9.39903 5.83138C9.38944 5.85575 9.3754 5.87785 9.35771 5.8964C9.34002 5.91495 9.31904 5.92958 9.29599 5.93944C9.27294 5.9493 9.24828 5.95419 9.22343 5.95383H1.56534C1.54049 5.95419 1.51583 5.9493 1.49278 5.93944C1.46973 5.92958 1.44875 5.91495 1.43106 5.8964C1.41338 5.87785 1.39933 5.85575 1.38975 5.83138C1.38016 5.80701 1.37522 5.78086 1.37522 5.75444C1.37522 5.72802 1.38016 5.70187 1.38975 5.6775C1.39933 5.65313 1.41338 5.63103 1.43106 5.61248C1.44875 5.59393 1.46973 5.5793 1.49278 5.56944C1.51583 5.55958 1.54049 5.55469 1.56534 5.55505ZM9.4625 7.16243C9.14027 7.17006 8.82275 7.24635 8.52875 7.38679C8.23475 7.52722 7.97023 7.72893 7.75087 7.98C7.53551 8.22645 7.36792 8.51558 7.25767 8.83089C7.14741 9.1462 7.09665 9.48151 7.10828 9.81767C7.11992 10.1538 7.19371 10.4843 7.32546 10.7901C7.45721 11.096 7.64433 11.3712 7.87614 11.6002C8.10796 11.8291 8.37993 12.0073 8.67652 12.1245C8.9731 12.2417 9.2885 12.2956 9.60469 12.2832C9.92088 12.2708 10.2317 12.1923 10.5193 12.0523C10.807 11.9122 11.0659 11.7132 11.2812 11.4667C11.4966 11.2203 11.6642 10.9311 11.7744 10.6158C11.8847 10.3005 11.9355 9.96522 11.9238 9.62906C11.9122 9.29289 11.8384 8.96245 11.7066 8.65661C11.5749 8.35076 11.3878 8.0755 11.156 7.84654C10.6967 7.39298 10.0892 7.14758 9.4625 7.16243ZM9.51403 7.49345C9.53911 7.49307 9.56401 7.49804 9.58725 7.50807C9.61049 7.5181 9.63161 7.53298 9.64935 7.55184C9.66708 7.5707 9.68108 7.59314 9.69051 7.61786C9.69995 7.64257 9.70462 7.66904 9.70426 7.6957V9.39777C9.75923 9.43163 9.80488 9.48024 9.83664 9.53874C9.86839 9.59724 9.88514 9.66358 9.88521 9.73113C9.88522 9.7818 9.87584 9.83197 9.85761 9.87878C9.83937 9.92559 9.81264 9.96813 9.77894 10.004C9.74525 10.0398 9.70524 10.0682 9.66121 10.0876C9.61718 10.107 9.56999 10.1169 9.52233 10.1169C9.49921 10.1168 9.47615 10.1144 9.45347 10.1097L8.97801 10.698C8.96208 10.7183 8.94252 10.735 8.92046 10.7472C8.8984 10.7593 8.87428 10.7667 8.84951 10.7689C8.82474 10.7711 8.7998 10.768 8.77616 10.7599C8.75252 10.7517 8.73063 10.7387 8.71178 10.7214C8.69292 10.7042 8.67748 10.6832 8.66634 10.6596C8.6552 10.6359 8.64859 10.6102 8.64689 10.5838C8.64519 10.5575 8.64843 10.531 8.65644 10.506C8.66444 10.481 8.67704 10.4579 8.69351 10.4381L9.17508 9.84199C9.16482 9.80605 9.15955 9.7687 9.15945 9.73113C9.15948 9.66592 9.17507 9.60178 9.20475 9.54471C9.23443 9.48763 9.27723 9.43949 9.32916 9.40479V7.69571C9.32881 7.66952 9.33331 7.64352 9.34241 7.61919C9.35151 7.59485 9.36503 7.57266 9.38219 7.55388C9.39936 7.5351 9.41984 7.5201 9.44246 7.50973C9.46507 7.49936 9.4894 7.49383 9.51403 7.49345Z"
                fill="white"
              />
            </svg>
            <span className="text-xl font-bold text-white sm:font-semi-bold md:px-2">
              {t("BOOK_APPOINTMENT")}
            </span>
          </button>
        </div> */}
      </div>
{/* 
      <div>
        <div className="flex items-center justify-end ">
          <p className="my-1">{t("NOT_AVAILABLE")}-</p>
          <div className="h-4 w-8 md:w-10 lg:w-16 bg-[#E8E8E8]"></div>
        </div>
        <div className="flex items-center justify-end ">
          <p className="my-1">{t("APPROVAL_WAITING")}-</p>
          <div className=" h-4 w-8 md:w-10 lg:w-16 bg-[#CFEEFF]"></div>
        </div>
        <div className="flex items-center justify-end ">
          <p className="my-1">{t("BOOKED_BY_YOU")}-</p>
          <div className="h-4 w-8 md:w-10 lg:w-16  bg-[#00A4FE]"></div>
        </div>
        <div className="flex items-center justify-end ">
          <p className="my-1">{t("AVAILABLE")}-</p>
          <div className="h-4 w-8  md:w-10 lg:w-16  bg-[#b9fbb9]"></div>
        </div>
      </div> */}
    </div>
  );
};

export default AvailabilityTabs;
