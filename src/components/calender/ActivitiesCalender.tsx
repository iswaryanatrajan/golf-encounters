import { useEffect, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isWithinInterval,
  parseISO,
} from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import i18n from "../../locale";
import { Link, useLocation } from "react-router-dom";
;
import { useTranslation } from "react-i18next";
import { fetchTeachersAppointments } from "../../utils/fetchTeacher";
function classNames(...classes:any) {
  return classes.filter(Boolean).join(" ");
}

export const ActivitiesCalender = ({ onWeekSelected }:any) => {
  const location = useLocation();
  const isStudentPage = location.pathname.includes('/student-activties-page');
  const { t, i18n } = useTranslation();
  console.log(isStudentPage,"helloooo")
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const teacherId  = localStorage.getItem("teacher_id");
  const startDay = startOfWeek(startOfMonth(currentMonth));
  const endDay = endOfWeek(endOfMonth(currentMonth));
  const days = eachDayOfInterval({ start: startDay, end: endDay });
  const [teacherAppointments, setTeacherAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<any>(false);

  useEffect(() => {
    fetchTeachersAppointments(setTeacherAppointments, setIsLoading);
  }, []);

  /* --------- First date appts. of current month --------- */
  /*useEffect(() => {
    const startOfCurrentMonth = startOfMonth(currentMonth);
    const endOfCurrentMonth = endOfMonth(currentMonth);

    const firstAppointment = teacherAppointments
    ?.filter((appointment: any) => {
      
      const appointmentDate = new Date(appointment.date);
      if(appointmentDate){

      return (
        appointmentDate >= startOfCurrentMonth &&
        appointmentDate <= endOfCurrentMonth
      );
    }
    })
    ?.sort((a: any, b: any) => {
      const dateA = new Date(a.date).toISOString().split("T")[0]; // Extract date-only
      const dateB = new Date(b.date).toISOString().split("T")[0];
      return dateA.localeCompare(dateB); // Compare as strings
    })[0];

  if (firstAppointment) {
    setSelectedDate(new Date(firstAppointment.date));
  }
}, [currentMonth]); */



useEffect(() => {
    if (selectedDate !== null) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      onWeekSelected(formattedDate); // Ensure this function filters based on the provided date
    }
  }, [selectedDate, onWeekSelected]);

 /* const appointmentDates = teacherAppointments
  ?.map((appointment: any) => {
    const appointmentDate = new Date(appointment.date);
    if (!isNaN(appointmentDate.getTime())) {
      return appointmentDate.toISOString().split("T")[0]; // Format: "YYYY-MM-DD"
    }
    console.warn("Invalid appointment date:", appointment.date);
    return null;
  })
  ?.filter((date) => date !== null); // Remove invalid dates

console.log("Appointment Dates:", appointmentDates); */

const isHighlighted = (day: any) => {
  return teacherAppointments.some((appointment) => 
    isSameDay(new Date(appointment.date), new Date(day))
  );
};

 const handleDateClick = (date: any) => {
  console.log(date, 'Date clicked'); // This should show the correct clicked date
  setSelectedDate(date);
};
  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const formatDate = (date:any) => {
    const formatter = new Intl.DateTimeFormat(i18n.language, {
      year: 'numeric',
      month: 'long',
    });
    return formatter.format(date);
  };
 
  return (
    <>
      <div className=" w-full bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] py-6">
        <div className="lg:grid lg:grid-cols-4 justify-center">
          <div className="lg:col-span-8 xl:col-span-9 px-4">
            <div className="flex items-center justify-between mx-2 my-2 text-gray-900 ">
              <div className="font-inter font-semibold text-[#009C2F]">
                {formatDate(currentMonth)}
              </div>
              <div className="flex gap-2 py-2">
                <button onClick={handlePrevMonth} className="cursor-pointer rounded-full bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)]  hover:bg-[#2dd4bf] hover:text-white p-2 flex justify-center items-center" >
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button onClick={handleNextMonth} className="cursor-pointer rounded-full bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] hover:bg-[#2dd4bf] hover:text-white p-2 flex justify-center items-center">
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-7 gap-px rounded-lg  text-sm shadow ring-1 ring-gray-200">
              {days.map((day) => (
                 <button
                 key={day.toString()}
                 onClick={() => handleDateClick(day)}
                 className={classNames(
                   "py-1.5   focus:z-10",
                   isSameMonth(day, currentMonth)
                     ? "text-gray-900"
                     : "text-gray-300",
                                        
                   selectedDate !== null && isSameDay(day, selectedDate)
                     ? "border" // Red background and white text for selected date
                     : "",
                     isHighlighted(day) || (selectedDate !== null && isSameDay(day, selectedDate))? "hover:bg-[#2dd4bf] bg-[#2cd4bf99]" : "bg-gray-200 hover:bg-gray-300"
                 )}
               >
                 <time dateTime={format(day, "yyyy-MM-dd")}>
                   {format(day, "d")}
                 </time>
               </button>
              ))}
            </div>
          </div>
        </div>
        
      </div>
      {!isStudentPage && 
       <div className="xl:flex gap-4 justify-center my-8">
       <Link to={`/update-schedules/${teacherId}`}  >
       <button className="p-2 bg-[#17b3a6] rounded-md text-white cursor-pointer my-2 xl:my-0 mx-2 xl:mx-0" >{t("UPDATE_SCHEDULES")}</button>
       </Link>
       <Link to={`teacher-page/${teacherId}`} >
       <button className="p-2 bg-[#17b3a6] rounded-md text-white cursor-pointer my-2 xl:my-0 mx-2 xl:mx-0" >{t("UPDATE_PROFILE")}</button>
       </Link>
       <Link to={`/create-catalogs/${teacherId}`} >
       <button className="p-2 bg-[#17b3a6] rounded-md text-white cursor-pointer my-2 xl:my-0" >{t("CREATE_GIG")}</button>
       </Link>
       <Link to={`/profile-page`} >
       <button className="p-2 bg-[#17b3a6] rounded-md text-white cursor-pointer mx-2 xl:mx-0" >{t("UPDATE_GIG")}</button>
       </Link>

    </div>
      }
     
    </>
  );
};
