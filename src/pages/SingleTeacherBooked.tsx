import React, { useState, useEffect } from "react";
import { faPhoneAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReschedulePop from "../components/ReschedulePop";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import TeacherListButton from "../components/TeacherListButton";
import { toast } from "react-toastify";
import { ToastConfig, toastProperties } from "../constants/toast";

interface SingleTeacherBookedProps {
  openModal: () => void;
  handleBookAppointment?: () => void;
  showTeacherDetails: (teacher: Teacher) => void;
}

interface Teacher {
    bookedShifts?: any;
  createdAt?: string;
  firstName?: string;
  id?: string;
  lastName?: string;
  location?: string;
  phoneNumber?: string;
  schedules?: [];
  updatedAt: string;
  userId: string;
}

const SingleTeacherBooked: React.FC<SingleTeacherBookedProps> = ({
  openModal,
  showTeacherDetails,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(API_ENDPOINTS.GETTEACHERBOOKEDAPPOINTMENTS, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            page: 1,
            pageSize: 20,
          },
        });
        setTeachers(response.data.bookedAppointments);
        setLoading(false);
      } catch (error: any) {
        toast.error(`ログインされていません`)        ;
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleSelectTime = (selectedTime: string) => {
    console.log(`Selected Time: ${selectedTime}`);
  };

  const handleBookAppointment = () => {
    setShowModal(false);
    handleSelectTime("Default Appointment Time");
  };


  const buttons = [
    {
      color: "bg-[#0038FF]",
      title: "Book an Appointment",
      icon: "/img/appointment.svg",
      onClick: () => {
        openModal();
        if (handleBookAppointment) {
          handleBookAppointment();
        }
      },
    },
    {
      color: "bg-[#FF0000]",
      title: "Like",
      icon: "/img/like.svg",
    },
    {
      color: "bg-[#52FF86]",
      title: "View Details",
      icon: "/img/details.svg",
      textColor: "#FF0000",
    },
  ];

  return (
    <>

      {teachers?.length === 0 ? (
        <div>Loading...</div>
      ) : (
        teachers?.map((teacher: Teacher) => (
          <div
            key={teacher.id}
            className="mt-2 cursor-pointer animate__animated animate__fadeInLeft"
            onClick={() => showTeacherDetails(teacher)}
          >
            <div className="flex justify-between items-end shadow-[0px_0px_7.47179651260376px_0px_#00000029] rounded-[30px] p-2 relative   ">
              <div>
                <div className="flex items-center animate__animated animate__shakeX">
                  <img
                    className="h-[55.25px] w-[55.25px] rounded-full border-solid border-4 border-[#51ff85] "
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <div className="ml-3">
                    <p className="text-xs font-bold tracking-wide text-[#52FF86]  m-0">
                    {teacher.bookedShifts.nickName}
                    </p>
                  </div>
                </div>
                <div className="p-2 mt-2 ml-3">
                  <ul className="p-0 m-0 list-none">
                    <li className="flex items-center mb-2">
                      <img
                        className="w-[22.39px] h-[12.45px]  "
                        src="/img/stars.png"
                        alt=""
                      />
                      <span className="ml-6 font-normal text-[9.96px] leading-3">
                        4.5(1300 ratings)
                      </span>
                    </li>
                    <li className="flex items-center mb-2 animate__animated animate__fadeInRight">
                      <FontAwesomeIcon
                        icon={faPhoneAlt}
                        className="w-4 h-4 rotate-90 animate__animated animate__heartBeat animate__repeat-3"
                      />
                      <span className="ml-6 font-normal text-[9.96px] leading-3 ">
                        {teacher.phoneNumber}
                      </span>
                    </li>
                    <li className="flex items-center mb-2">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="w-4 h-4 animate__animated animate__heartBeat animate__repeat-3 "
                      />
                      <span className="ml-6 font-normal text-[9.96px] leading-3">
                        {teacher.bookedShifts.email}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="absolute top-[-2px] right-[-2px] flex  animate-pulse ">
                <img className="w-16 " src="/img/teacher_rate.png" alt="" />
                <span className="absolute flex items-center justify-center w-full h-full text-base font-bold tracking-wide ">
                  ¥30
                  <sub className="font-normal text-[5px] tracking-wide ">
                    Per/Hr
                  </sub>
                </span>
              </div>
              <div className="gap-2">
                {buttons.map((btn, index) => (
                  <TeacherListButton
                    key={index}
                    color={btn.color}
                    title={btn.title}
                    icon={btn.icon}
                    onClick={btn.onClick}
                    textColor={btn.textColor}
                  />
                ))}
              </div>
            </div>
          </div>
        ))

      )}

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

export default SingleTeacherBooked;
