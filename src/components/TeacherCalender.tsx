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
import { teacherContext } from "../contexts/teachersContext";
import i18n from "../locale";

function classNames(...classes:any) {
  return classes.filter(Boolean).join(" ");
}

const isDayDisabled = (day:any, startEndDates:any) => {
  const inRange = startEndDates?.some(({ startDate, endDate }:any) =>
    isWithinInterval(day, {
      start: parseISO(startDate),
      end: parseISO(startDate)
    })
  );

  if (!inRange) return true;

  const dayOfWeek = format(day, "EEEE");

  return !startEndDates.some(({ shifts }:any) =>
    shifts.some((shift:any) => shift.day === dayOfWeek)
  );
};



export const TeacherCalender = ({ startEndDates, onMatchedShifts, onClicked, dayFilter }:any) => {
  const findFirstActiveMonth = () => {
    if (!Array.isArray(startEndDates) || startEndDates.length === 0) {
      return new Date();
    }

    for (let period of startEndDates) {
      const { startDate, endDate } = period;
      if (startDate && endDate) {
        const start = parseISO(startDate);
        const end = parseISO(endDate);
        const daysInRange = eachDayOfInterval({ start, end });
        const now = new Date();
        const firstDayOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        for (let day of daysInRange) {
          if (!isDayDisabled(day, startEndDates)) {
            console.log(day + "day");
            if (day < firstDayOfCurrentMonth) {
              console.log('The date is past the first day of the current month.');
              return startOfMonth(now);
            }
            else
            return startOfMonth(day);
          }
        }
      }
    }

    return new Date();
  };


  const { handleShift, shift } = teacherContext();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(findFirstActiveMonth());
  const [matchedShifts, setMatchedShifts] = useState([]);
  const [click, setClick] = useState<boolean>(false);

  useEffect(() => {
    const firstActiveMonth = findFirstActiveMonth();
    setCurrentMonth(firstActiveMonth);
  }, [startEndDates]);

  const startDay = startOfWeek(startOfMonth(currentMonth));
  const endDay = endOfWeek(endOfMonth(currentMonth));
  const days = eachDayOfInterval({ start: startDay, end: endDay });

  useEffect(() => {
    const firstDayWithShifts = findFirstActiveDayWithShifts();
    if (firstDayWithShifts) {
      setSelectedDate(firstDayWithShifts); // Automatically set the first valid date
      setClick(true); // Indicate the calendar has been clicked
    } else {
      console.log("No future shifts available for this month.");
    }
  }, [startEndDates, currentMonth]);
  
  const findFirstActiveDayWithShifts = () => {
    if (!Array.isArray(startEndDates) || startEndDates.length === 0) {
      return null;
    }
  
    const startOfCurrentMonth = startOfMonth(new Date());
    const endOfCurrentMonth = endOfMonth(new Date());
    const today = new Date();
  
    const daysWithShifts = startEndDates.flatMap(({ shifts }: any) =>
      shifts.filter((shift: any) => {
        const shiftDate = parseISO(shift.date);
        return (
          isWithinInterval(shiftDate, { start: startOfCurrentMonth, end: endOfCurrentMonth }) &&
          shiftDate >= today
        );
      })
    );
  
    if (daysWithShifts.length > 0) {
      const firstShift = daysWithShifts.sort((a: any, b: any) => {
        const dateA = parseISO(a.date);
        const dateB = parseISO(b.date);
        return dateA.getTime() - dateB.getTime();
      })[0];
      return parseISO(firstShift.date);
    }
  
    return null;
  };

  useEffect(() => {
    console.log("selectedDate:",selectedDate, "&startEndDates",startEndDates);

    
    // Convert selectedDate to YYYY-MM-DD in local time
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const formattedSelectedDate = `${year}-${month}-${day}`;

    const formattedMonth = format(selectedDate, "EEEE");
    console.log(selectedDate,formattedSelectedDate);
    const matchedShifts = startEndDates?.flatMap(({ shifts }:any) =>
      shifts.filter((shift:any) => shift.date === formattedSelectedDate && shift.day.toLowerCase() === formattedMonth.toLowerCase())
    );
    console.log('Matched Shifts:',matchedShifts);
    setMatchedShifts(matchedShifts);
    onClicked(click)
    onMatchedShifts(matchedShifts);
    if (dayFilter) {
    dayFilter(formattedMonth)

    }
  }, [selectedDate, startEndDates]);

  const handleDateClick = (date:any) => {
    console.log(date,'sdsd')
    if (isDayDisabled(date, startEndDates) === false) {
      setSelectedDate(date);
      setClick(true)
    }
  };

  const isPastDay = (day:any, today : any) => {
    if (day < today) {
      return true;
    }
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
      <div className=" w-full bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] py-2 ">
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
            <div className="mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
              {days.map((day) => (
                <button
                  key={day.toString()}
                  onClick={() => handleDateClick(day)}
                  disabled={isDayDisabled(day, startEndDates)}
                  className={classNames(
                    "py-1.5  text-white hover:bg-gray focus:z-10 ",
                    isSameMonth(day, currentMonth) ? "text-gray-900" : "text-gray-300 ",
                    !isDayDisabled(day, startEndDates) ? "hover:bg-[#2dd4bf] bg-[#2cd4bf99] cursor-pointer" : "cursor-not-allowed",
                    isSameDay(day, selectedDate) ? "bg-primary border text-black" : "",
                    isSameDay(day, new Date()) && !isSameDay(day, selectedDate) ? "text-red-600" : "",
                  )}
                >
                  <time dateTime={format(day, "yyyy-MM-dd")}>{format(day, "d")}</time>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
};
