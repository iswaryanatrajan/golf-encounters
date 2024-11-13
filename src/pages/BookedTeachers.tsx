import React, { useState, useEffect } from "react";
import StudentTabs from "../components/StudentTabs";
import StudentEventBoxes from "../components/StudentEventBoxes";
import StudentCalendar from "../components/StudentCalender";
import FavTeachers from "../components/FavTeacher";
import SearchAndFiltersEducator from "../components/SearchAndFilter";
import TeacherConDetail from "../components/TeacherConDetail";
import ReschedulePop from "../components/ReschedulePop";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import SingleTeacherBooked from "./SingleTeacherBooked";
import { toast } from "react-toastify";
import { ToastConfig, toastProperties } from "../constants/toast";
interface Teacher {
  count?: number;
  teachers?: [];
  aboutMyself?: string;
  createdAt?: string | string[];
  firstName?: string;
  id?: string;
  lastName?: string;
  location?: string;
  phoneNumber?: string;
  schedules?: [];
  updatedAt: string;
  userId: string;
  timeSlots?: string[];
}

const BookedTeachers: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"student" | "teacher">(
    "student"
  );
  const [showModal, setShowModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const handleSelectTab = (tab: "student" | "teacher") => {
    setSelectedTab(tab);
  };
  const openModal = () => {
    if (selectedTeacher && selectedTeacher.schedules) {
      setShowModal(true);
    }
  };

  const handleSelectTime = (selectedTime: string) => {
    console.log(`Selected Time: ${selectedTime}`);
  };
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          API_ENDPOINTS.GETTEACHERBOOKEDAPPOINTMENTS,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            params: {
              page: 1,
              pageSize: 20,
              userId: 2,
            },
          }
        );
        if (
          response.data &&
          response.data.bookedAppointments &&
          response.data.bookedAppointments.length > 0
        ) {
          const timeSlots = ["29-10-2023", "30-10-2023"]; 
          setSelectedTeacher({ ...response.data.bookedAppointments[0], timeSlots });
         
        }
      } catch (error: any) {
        toast.error(
          `Error fetching teachers: ${error.message}`,
          toastProperties as ToastConfig
        );
      }
    };

    fetchTeachers();
  }, []);

  const handleBookAppointment = () => {
    console.log("Booking appointment logic");
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const showTeacherDetails = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
  };
  return (
    <div className="grid grid-cols-11 gap-0 mx-0 md:mx-16 lg:mx-16 xl:mx-8 ">
      <div className="col-span-12 md:col-span-12 xl:col-span-4 p-4 h-auto bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-[107.61px] mt-2 mx-4 animate__animated animate__fadeInLeft ">
        <StudentTabs
          selectedTab={selectedTab}
          onSelectTab={handleSelectTab}
          showTabs={true}
          description=""
          profilePic="/img/profile1.png"
          name="John Miler"
        />
        <StudentEventBoxes />
        <StudentCalendar />
        <FavTeachers />
      </div>

      {/* Middle Column */}
      <div className="col-span-12 p-4 md:col-span-12 lg:col-span-3 xl:col-span-3 lg:overflow-y-auto scrollbar lg:max-h-screen ">
        <SearchAndFiltersEducator />

        <SingleTeacherBooked
          openModal={openModal}
          handleBookAppointment={handleBookAppointment}
          showTeacherDetails={showTeacherDetails}
        />

        <style>{`
        
        @media screen and (min-width: 1300px) {
          .scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #52FF86 transparent;
          }
                .scrollbar::-webkit-scrollbar {
                    width: 4px;
                    height:10px;
                }

                .scrollbar::-webkit-scrollbar-thumb {
                    background-color: #52FF86;
                    border-radius: 6px;
                }

                .scrollbar::-webkit-scrollbar-track {
                    background-color: transparent;
                }
            `}</style>
      </div>

      <div className="col-span-12 xl:col-span-4 p-4 bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-[107.61px] mt-2 mx-4 animate__animated animate__fadeInRight">
        {selectedTeacher !== null && (
          <TeacherConDetail teacherDetails={selectedTeacher} />
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 ">
          <div className="max-w-md p-8 mx-auto bg-white rounded-lg animate__animated animate__fadeInLeft">
            <ReschedulePop
              onSelectTime={handleSelectTime}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookedTeachers;
