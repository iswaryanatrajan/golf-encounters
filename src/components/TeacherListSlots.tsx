// TeacherSlots.tsx
import React, { useState } from 'react';

interface TeacherSlots {
  startTime: string;
  endTime: string;
}

interface TeacherSlotsProps {
  slots: TeacherSlots[];
}

const TeacherListSlots: React.FC<TeacherSlotsProps> = ({ slots }:any) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="mt-4">
      
      <div className="grid  lg:grid-cols-8  sm:grid-cols-3 gap-4 ">
        {slots.map((slot:any, index:any) => (
          <button
            key={index}
            className={`text-[12px] text-center px-1 py-4 rounded-lg shadow-sm   ${
              activeIndex === index
                ? 'bg-teal-400 text-white'
                : 'bg-gray-100 text-gray-600 '
            }`}
            onClick={() => setActiveIndex(index)}
          >
            {slot.startTime} - {slot.endTime}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TeacherListSlots;
