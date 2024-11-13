import { useState, Fragment, useEffect } from "react";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";
import { useLocation } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { addMonths, subMonths, format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { ActivitiesCalender } from "./calender/ActivitiesCalender";
const meetings = [
  {
    id: 1,
    date: "January 10th, 2022",
    datetime: "2022-01-10T17:00",
    name: "9:00AM - 10:00 AM",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Appointment - Leslie",
  },
 
  
];
const days = [
  { date: "2021-12-27" },
  { date: "2021-12-28" },
  { date: "2021-12-29" },
  { date: "2021-12-30" },
  { date: "2021-12-31" },
  { date: "2022-01-01", isCurrentMonth: true },
  { date: "2022-01-02", isCurrentMonth: true },
  { date: "2022-01-03", isCurrentMonth: true },
  { date: "2022-01-04", isCurrentMonth: true },
  { date: "2022-01-05", isCurrentMonth: true },
  { date: "2022-01-06", isCurrentMonth: true },
  { date: "2022-01-07", isCurrentMonth: true },
  { date: "2022-01-08", isCurrentMonth: true },
  { date: "2022-01-09", isCurrentMonth: true },
  { date: "2022-01-10", isCurrentMonth: true },
  { date: "2022-01-11", isCurrentMonth: true },
  { date: "2022-01-12", isCurrentMonth: true, isToday: true },
  { date: "2022-01-13", isCurrentMonth: true },
  { date: "2022-01-14", isCurrentMonth: true },
  { date: "2022-01-15", isCurrentMonth: true },
  { date: "2022-01-16", isCurrentMonth: true },
  { date: "2022-01-17", isCurrentMonth: true },
  { date: "2022-01-18", isCurrentMonth: true },
  { date: "2022-01-19", isCurrentMonth: true },
  { date: "2022-01-20", isCurrentMonth: true },
  { date: "2022-01-21", isCurrentMonth: true },
  { date: "2022-01-22", isCurrentMonth: true, isSelected: true },
  { date: "2022-01-23", isCurrentMonth: true },
  { date: "2022-01-24", isCurrentMonth: true },
  { date: "2022-01-25", isCurrentMonth: true },
  { date: "2022-01-26", isCurrentMonth: true },
  { date: "2022-01-27", isCurrentMonth: true },
  { date: "2022-01-28", isCurrentMonth: true },
  { date: "2022-01-29", isCurrentMonth: true },
  { date: "2022-01-30", isCurrentMonth: true },
  { date: "2022-01-31", isCurrentMonth: true },
  { date: "2022-02-01" },
  { date: "2022-02-02" },
  { date: "2022-02-03" },
  { date: "2022-02-04" },
  { date: "2022-02-05" },
  { date: "2022-02-06" },
];

function classNames(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(" ");
}

export default function Example({selectedDatee}: any) {
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());


  useEffect(() => {
    selectedDatee(selectedDate);
  }, [selectedDate])
  
  const handleWeekSelected = (date: Date) => {
    setSelectedDate(date);
  };
  


 
  
  return (
    <div className="bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent xl:h-screen">
       <Link to="/all-teachers" >
            <button className="m-2 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 mb-4 rounded-full inline-flex items-center hover:animate-bounce">
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              <span>Back</span>
            </button>
          </Link>
      <div className=" lg:grid lg:grid-cols-4 justify-center ">
     
        <div className="lg:col-span-8 xl:col-span-9 px-4 ">
         

          <ActivitiesCalender onWeekSelected={handleWeekSelected} />
        </div>
    
      </div>
    </div>
  );
}
