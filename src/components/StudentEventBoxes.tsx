import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchTeacherCounts } from "../utils/fetchTeacher";
import { useNavigate } from "react-router-dom";
interface TeacherCountProps {
  completedAppointments: number;
  upcomingAppointments: number;
  pendingAppointments: number;
}


const StudentEventBoxes: React.FC = () => {
  const router = useNavigate();

  const {t, i18n} = useTranslation();
document.body.dir = i18n.dir();
const [teachercount, setTeacherCount] = useState<TeacherCountProps>({
  completedAppointments: 0,
  upcomingAppointments: 0,
  pendingAppointments: 0,
});

useEffect(() => {
  const teacherIdString = localStorage.getItem('teacher_id');
  if (teacherIdString) {
    try {
      const isTeacher = JSON.parse(teacherIdString);
      if (isTeacher !== null ) {
        fetchTeacherCounts(setTeacherCount);
      }
    } catch (e) {
      console.error("Error parsing teacher_id from localStorage", e);
    }
  }
}, []);

const showTeacherDetails = (status: string) => {
  if(status === "completed"){
    router("/completed-lesson");
  }else if(status === "upcomming"){
    router("/upcomming-lesson");
  }else{
    router("/pending-lesson");
  }
}
  return (
    
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 mx-auto my-4 gap-1 md:gap-2 lg:gap-2 z-[9999]">
        <div 
        
        onClick={() => showTeacherDetails("completed")}
        className=" cursor-pointer text-center  border-solid border-2 border-[#51ff85] rounded-md py-1 px-1 md:px-2 lg:px-0 hover:animate-bounce">
          
          <h3 className="m-0 font-sans text-lg font-semibold text-black ">
            {teachercount.completedAppointments}
          </h3>
          <h4 className="m-0 font-sans text-xs font-semibold text-center">
          {t('COMPLETED')} 
          </h4>
          <h4 className="m-0 font-sans text-xs font-semibold text-center">{t('LESSON')}</h4>
        </div>
        <div onClick={() => showTeacherDetails("upcomming")} className="cursor-pointer text-center  border-solid border-2 border-[#51ff85] rounded-md py-1 px-2 hover:animate-bounce">
          <h3 className="m-0 font-sans text-lg font-semibold text-black ">
          {teachercount.upcomingAppointments}

          </h3>
          <h4 className="my-0 font-sans text-xs font-semibold text-center ">
          {t('UPCOMING')} 
          </h4>
          <h4 className="my-0 font-sans text-xs font-semibold text-center">{t('LESSON')}</h4>
        </div>
        <div onClick={() => showTeacherDetails("pending")} className="cursor-pointer text-center  border-solid  border-2 border-[#51ff85] rounded-md py-1 px-2 hover:animate-bounce">
          <h3 className="my-0 font-sans text-lg font-semibold text-black ">
          {teachercount.pendingAppointments}

          </h3>
          <h4 className="my-0 font-sans text-xs font-semibold text-center">
          {t('PENDING')} 
          </h4>
          <h4 className="my-0 font-sans text-xs font-semibold text-center">{t('LESSON')}</h4>
        </div>
      </div>
  
  );
};

export default StudentEventBoxes;
