import React, { useState, useRef } from "react";
import { t } from "i18next";

const TimeSlotss: React.FC = () => {
  const [selectedWeekStart, setSelectedWeekStart] = useState<Date | null>(null);
  const [selectedTab, setSelectedTab] = useState<Date | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleWeekSelected = (startDate: Date) => {
    setSelectedWeekStart(startDate);
  };

  const handleTabClick = (date: Date) => {
    setSelectedTab(date);
  };

  const handleTimeSlotChange = (dateKey: string, selectedTime: string) => {
    // Handle the time slot change logic here
    console.log(`Selected time for ${dateKey}: ${selectedTime}`);
  };

  const hoursOfDay = Array.from({ length: 24 }, (_, i) =>
    `${String(i).padStart(2, "0")}:00`
  );

  const getDayName = (date: Date): string => {
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  const getFormattedDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="my-4 mx-10 xl:mx-0">
      <div className="grid grid-cols-1 gap-4 py-2 text-center">
        <div className="flex xl:justify-center gap-4 xl:gap-20 xl:ml-[200px] overflow-x-scroll xl:overflow-auto bg-[#e4e4e4] p-2 rounded-md">
          {selectedWeekStart &&
            Array.from({ length: 7 }, (_, i) => {
              const date = new Date(
                selectedWeekStart.getTime() + i * 24 * 60 * 60 * 1000
              );
              return (
                <div
                  key={date.toLocaleDateString()}
                  className={`xl:font-bold ${
                    date.getTime() === selectedTab?.getTime() ? "selected-tab" : ""
                  }`}
                  onClick={() => handleTabClick(date)}
                >
                  {t(getDayName(date).toLocaleUpperCase())} {getFormattedDate(date)}
                </div>
              );
            })}
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="grid grid-cols-8 gap-4 overflow-auto text-center"
        style={{ maxHeight: "50vh" }}
      >
        <div className="col-span-1 time-slot hidden xl:block">
          <p className="text-[#17b3a6]">TIME</p>
        </div>
        {selectedWeekStart &&
          Array.from({ length: 7 }, (_, dayIndex) => {
            const date = new Date(
              selectedWeekStart.getTime() + dayIndex * 24 * 60 * 60 * 1000
            );
            const dateKey = date.toISOString().split("T")[0];
            return (
              <div key={dateKey} className="col-span-1 rounded-md py-2 time-slot">
                <select
                  className="w-full bg-[#F1F1F1]"
                  onChange={(e) => handleTimeSlotChange(dateKey, e.target.value)}
                >
                  <option value="">{t("SELECT TIME")}</option>
                  {hoursOfDay.map((timeSlot) => (
                    <option key={timeSlot} value={timeSlot}>
                      {timeSlot}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TimeSlotss;
