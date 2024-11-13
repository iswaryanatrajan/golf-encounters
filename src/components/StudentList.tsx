import React, { useEffect, useState } from "react";
import { faPhoneAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReschedulePop from "../components/ReschedulePop";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { useTranslation } from "react-i18next";
interface StudentListProps {
  openModal: () => void;
  handleBookAppointment?: () => void;
  nickName?: string;
  email?: string;
  scheduleId?: number;
  day?: string;
  startTime?: string;
  endTime?: string;
  lessons?: string;
  onSelectStudent: (studentInfo: any) => void;
  studentId: number;
  newStatus: string;
}

const StudentList: React.FC<StudentListProps> = ({
  openModal,
  nickName,
  email,
  scheduleId,
  day,
  startTime,
  endTime,
  lessons,
  studentId,
  newStatus

}) => {
  const { t, i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [lessontype, setLessonType] =   useState<string | undefined>(undefined);
  
  useEffect(()=>{
    setLessonType(lessons);
  })

  const handleSelectTime = (selectedTime: string) => {
    console.log(`Selected Time: ${selectedTime}`);
  };

  const handleBookAppointment = () => {
    setShowModal(false);
    handleSelectTime("Default Appointment Time");
  };

  const handleRejectClick = () => {
    openModal();
    if (handleBookAppointment) {
      handleBookAppointment();
    }
  };

  const status = newStatus;
  const handleAcceptClick = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await axios.post(
        API_ENDPOINTS.ACCEPTAPPOINTMENT,
        { studentId, scheduleId, day, startTime, endTime, status },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },

          
        }
      );
      if (response.status === 200) {
        alert(t("SELECT_SLOT"));
      }
    } catch (error) {
      alert(
        (error as any)?.response?.data?.message || "We are not able to Accept"
      );
    } finally {
      console.log("okays");
    }
  };

  console.log(lessontype, 'LT')
  return (
    <>
      <div className="mt-6 cursor-pointer animate__animated animate__fadeInLeft">
        <div className="flex justify-between items-center shadow-[0px_0px_7.47179651260376px_0px_#00000029] rounded-[30px] p-4 relative    ">
          <div>
            <div className="flex items-center animate__animated animate__bounce">
              <img
                className="h-[55.25px] w-[55.25px] rounded-full border-solid border-4 border-[#51ff85] "
                src="/img/student.png"
                alt=""
              />
              <div className="ml-3">
                <p className="text-xs font-bold tracking-wide text-[#626262] m-0 ">
                  {nickName}
                </p>
                <p className="text-[9.13px] font-normal text-[#626262] m-0">
                  Bogotá,Colombia
                </p>
              </div>
            </div>
            <div className="p-2 mt-4 ml-3">
              <ul className="p-0 m-0 list-none ">
                <li className="flex items-center mb-2 ">
                  <FontAwesomeIcon
                    icon={faPhoneAlt}
                    className="w-4 h-4 rotate-90 animate__animated animate__heartBeat animate__repeat-3 "
                  />
                  <span className="ml-6 font-normal text-[9.96px] leading-3 ">
                    85985-95415
                  </span>
                </li>
                <li className="flex items-center mb-2">
                  <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 " />
                  <span className="ml-6 font-normal text-[9.96px] leading-3 text-[#626262] ">
                    {email}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {lessontype === "PENDING" ? (
        <div className="grid gap-2 animate__heartBeat">
          <p className="bg-[#52FF86] rounded-full p-1 text-sm text-[#626262]">
            {startTime}-{endTime}
          </p>
   
          <button
            className={`bg-[#0038FF] text-[#ffffff] font-bold text-[8.72px] leading-[10.57px] h-[24.49px] py-2 px-2 rounded-xl cursor-pointer flex justify-center items-center`}
            onClick={handleAcceptClick}
          >
            <span>Accept</span>
          </button>

          <button
            className={`bg-[#FF0000] font-bold text-[8.72px] leading-[10.57px] h-[24.49px] py-2 px-2 rounded-xl cursor-pointer flex justify-center items-center`}
            onClick={handleRejectClick}
          >
            <span>Reject</span>
          </button>
        </div>
      ) : lessontype === "BOOKED" ? (
        <div className="grid gap-2 animate__heartBeat">
          <p className="bg-[#52FF86] rounded-full p-1 text-sm">
            {startTime}-{endTime}
          </p>
   
          <button
            className={`bg-[#0038FF] text-[#ffffff] font-bold text-[8.72px] leading-[10.57px] h-[24.49px] py-2 px-2 rounded-xl cursor-pointer flex justify-center items-center`}
            onClick={handleAcceptClick}
          >
            <span>Completed</span>
          </button>

          <button
            className={`bg-[#FF0000] font-bold text-[8.72px] leading-[10.57px] h-[24.49px] py-2 px-2 rounded-xl cursor-pointer flex justify-center items-center`}
            onClick={handleRejectClick}
          >
            <span>Not Taken</span>
          </button>
        </div>
      ) :  <div className="grid gap-2 animate__heartBeat">
      <p className="bg-[#52FF86] rounded-full p-1 text-sm">
        {startTime}-{endTime}
      </p>

      <button
        className={`bg-[#0038FF] text-[#ffffff] font-bold text-[8.72px] leading-[10.57px] h-[24.49px] py-2 px-2 rounded-xl cursor-pointer flex justify-center items-center`}
        onClick={handleAcceptClick}
      >
        <span>view</span>
      </button>

     
    </div>}
        </div>
 
  
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
          <div className="max-w-md p-8 mx-auto bg-white rounded-lg">
            <ReschedulePop
              onSelectTime={handleSelectTime}
              onClose={handleBookAppointment}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default StudentList;
