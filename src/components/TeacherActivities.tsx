
import React, { useState } from "react";
import StudentCalSec from "./StudentCalSec";
import ActivtiesTabs from "./ActivtiesTabs"
const TeacherActivities = () => {
  const [selectedDate, setSelectedDate] = useState()

  return (
    <div className="grid grid-cols-12 ">
      <div className="col-span-12 lg:col-span-4 mx-16 animate__animated animate__fadeInLeft">
        <StudentCalSec selectedDatee={setSelectedDate}/>
      </div> 

      <div className="col-span-12 lg:col-span-8 py-4 px-12 box-border  animate__animated animate__fadeInRight">
        <ActivtiesTabs selectedDate={selectedDate}/>
      </div>
    </div>
  );
};

export default TeacherActivities;
