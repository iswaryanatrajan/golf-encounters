import { useEffect, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isWithinInterval,
  isSameDay,
  addMonths,
  subMonths,
  parseISO,
} from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import i18n from "../../locale";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export const SlotsCalendar = ({
  startEndDates,
  onMatchedShifts,
  onClicked,
  dayFilter,
  onWeekSelected,
  handleState,
  resetSchedules,
  handleTimeSlotClick
}: any) => {
  const [selectedDate, setSelectedDate] = useState(new Date("12-12-2222"));
  const [click, setClick] = useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const startDay = startOfWeek(startOfMonth(currentMonth));
  const endDay = endOfWeek(endOfMonth(currentMonth));
  const days = eachDayOfInterval({ start: startDay, end: endDay });

  useEffect(() => {
    const formattedMonth = format(selectedDate, "EEEE");
    const matchedShifts = startEndDates?.flatMap(({ shifts }: any) =>
      shifts.filter(
        (shift: any) =>
          shift.day.toLowerCase() === formattedMonth.toLowerCase()
      )
    );
    onWeekSelected(selectedDate);
  }, [selectedDate, startEndDates]);

  const handleDateClick = (date: any) => {
    setSelectedDate(date);
    handleState();
    setClick(true);
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const formatDate = (date: any) => {
    const formatter = new Intl.DateTimeFormat(i18n.language, {
      year: "numeric",
      month: "long",
    });
    return formatter.format(date);
  };

  const isDayDisabled = (day: any, startEndDates: any) => {
    const inRange = startEndDates?.some(({ startDate, endDate }: any) =>
      isWithinInterval(day, {
        start: parseISO(startDate),
        end: parseISO(startDate),
      })
    );

    if (!inRange) return true;

    const dayOfWeek = format(day, "EEEE");

    return !startEndDates.some(({ shifts }: any) =>
      shifts.some((shift: any) => shift.day === dayOfWeek)
    );
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function formatDatee(inputDateString: any) {
    const date = new Date(inputDateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  function getDateForDayInRange(startDateString: any, endDateString: any, dayOfWeek: any) {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', '土曜日'];

    if (!daysOfWeek.includes(dayOfWeek)) {
      throw new Error("Invalid day of the week");
    }

    const dayIndex = daysOfWeek.indexOf(dayOfWeek);

    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      if (date.getDay() === dayIndex) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
      }
    }

    return null;
  }
  const hoursOfDay: string[] = Array.from({ length: 24 }, (_, i) => {
    const startHour = i.toString().padStart(2, "0");
    const endHour = ((i + 1) % 24).toString().padStart(2, "0");

    return `${startHour}:00 to ${endHour}:00`;
  });
  
  const initialActiveStates = Array.from({ length: hoursOfDay.length }, () =>
    Array(1).fill(false)
  );
 const [activeStates, setActiveStates] =
    useState<boolean[][]>(initialActiveStates);

  const renderTimeSlots = (date: Date) => {
    return Array.from({ length: 24 }, (i, hourIndex) => {
      const startHour = hourIndex.toString().padStart(2, "0");
      const endHour = ((hourIndex + 1) % 24).toString().padStart(2, "0");

      const hour = `${startHour}:00 to ${endHour}:00`;
      const formattedDate = formatDatee(date);

      const isActive = startEndDates?.some(({ shifts, startDate, endDate }: any) => {
        const dateInRange = isWithinInterval(date, {
          
          start: parseISO(startDate),
          end: parseISO(startDate),
        });

        return dateInRange && shifts.some(
          (shift: any) =>
            shift.day.toLowerCase() === format(date, "EEEE").toLowerCase() &&
            shift.startTime.includes(hour)
        );
      });
      const isBooked = startEndDates?.some(({ shifts, startDate }: any) => {
        const dateInRange = isWithinInterval(date, {
          start: parseISO(startDate),
          end: parseISO(startDate),
        });

        return dateInRange && shifts.some(
          (shift: any) =>
            shift.day.toLowerCase() === format(date, "EEEE").toLowerCase() &&
            shift.startTime.includes(hour) && shift.status == "BOOKED"
        );
      });

      const isActived = activeStates[hourIndex][0];

      return (
        <button
          key={`${formattedDate}-${hour}`}
          type="button"
          className={`col-span-1 rounded-md py-2 time-slot 
            ${isActive && isBooked ? "bg-red shadow-lg" : ""
            }
            ${isActive && !isBooked ? "bg-[#1e40af] text-white shadow-lg" : ""
            }
            ${isActived ? "bg-[#61ff0e] text-white shadow-lg" : ""
            }
            `}
          onClick={() => handleTimeSlotClicks(date, hour, hourIndex)}
        >
         {hour}
        </button>
      );
    });
  };
  const handleTimeSlotClicks = (date: Date, hour: string, hourIndex: number) => {
    handleTimeSlotClick(date, hour, hourIndex)
    setActiveStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[hourIndex][0] = !newStates[hourIndex][0];
      return newStates;
    });
    console.log("Time slot clicked:", date, hour);
  };
  // const handleTimeSlotClick = (date: Date, hour: string, hourIndex:any) => {
  //   console.log("Time slot clicked:", date, hour);
  // };

  return (
    <>
      <div className="w-full bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] py-8">
        <div className="lg:grid lg:grid-cols-4 justify-center">
          <div className="lg:col-span-8 xl:col-span-9 px-4">
            <div className="flex items-center justify-between mx-2 my-2 text-gray-900">
              <div className="font-inter font-semibold text-[#009C2F]">
                {formatDate(currentMonth)}
              </div>
              <div className="flex gap-2 py-2">
                <button
                  onClick={handlePrevMonth}
                  className="cursor-pointer rounded-full bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] hover:bg-[#2dd4bf] hover:text-white p-2 flex justify-center items-center"
                >
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="cursor-pointer rounded-full bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] hover:bg-[#2dd4bf] hover:text-white p-2 flex justify-center items-center"
                >
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="py-2 bg-gray-200 text-center font-semibold"
                >
                  {day}
                </div>
              ))}
              {days.map((day) => (
                <button
                  key={day.toISOString()}
                  onClick={() => handleDateClick(day)}
                  className={classNames(
                    "py-4 px-1 text-black hover:bg-gray focus:z-10 border-2 border-solid border-white",
                    !isDayDisabled(day, startEndDates)
                      ? "bg-[#1e40af] text-white"
                      : "cursor-pointer",
                    isSameMonth(day, currentMonth)
                      ? "text-gray-900"
                      : "text-gray-300 ",
                    isSameDay(day, selectedDate)
                      ? "bg-[#61ff0e] text-white"
                      : "",
                    isSameDay(day, new Date()) && !isSameDay(day, selectedDate)
                      ? "text-red-600"
                      : ""
                  )}
                >
                  <time dateTime={format(day, "yyyy-MM-dd")}>
                    {format(day, "d MMM")}
                  </time>
                </button>
              ))}
            </div>
            {click && (
              <div className="mt-6 p-5 grid grid-cols-8 gap-4 overflow-auto text-center">
                {renderTimeSlots(selectedDate)}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
