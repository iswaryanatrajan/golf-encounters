  import React, { useState, useEffect } from "react";
  import StudentTabs from "../components/StudentTabs";
  import TeacherList from "../components/TeacherList";
  import StudentEventBoxes from "../components/StudentEventBoxes";
  import StudentCalendar from "../components/StudentCalender";
  import FavTeachers from "../components/FavTeacher";
  import SearchAndFiltersEducator from "../components/SearchAndFilter";
  import TeacherConDetail from "../components/TeacherConDetail";
  import ReschedulePop from "../components/ReschedulePop";
  import axios from "axios";
  import { API_ENDPOINTS } from "../appConfig";
  import { toast } from "react-toastify";
  import { ToastConfig, toastProperties } from "../constants/toast";
  import { isAuthenticated } from "../utils/auth"; // Import your isAuthenticated function
  import { TeacherDetailsProp } from "../utils/types";
import socket from "../socket";



  const StudentProfile: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<"student" | "teacher">(
      "student"
    );
    const [showModal, setShowModal] = useState(false);
    const [teachers, setTeachers] = useState<any[]>([]);
    const [selectedTeacher, setSelectedTeacher] = useState<TeacherDetailsProp | null>(null);
    const isUserAuthenticated = isAuthenticated();
    const handleSelectTab = (tab: "student" | "teacher") => {
      setSelectedTab(tab);
    };
    const openModal = () => {
      if (selectedTeacher && selectedTeacher.schedules) {
        setShowModal(true);
      } else {
        console.log("No schedules available for selected teacher");
      }
    };

    const handleSelectTime = (selectedTime: string) => {
      console.log(`Selected Time: ${selectedTime}`);
    };
    useEffect(() => {
      const fetchTeachers = async () => {
        try {
          const token = localStorage.getItem("token");
        let endpoint = API_ENDPOINTS.GETALLTEACHERSPUBLIC;
        if (token && token !== "undefined") {
          endpoint = API_ENDPOINTS.GETALLTEACHERS;
        }
        const response = await axios.get(endpoint, {
          headers: {
              Authorization: token ? `Bearer ${token}` : '',
              "ngrok-skip-browser-warning": "69420"

            },
            params: {
              page: 1,
              pageSize: 20,
            },
          });

          if (response.data && response.data.teachers) {
            setTeachers(response.data.teachers);
            if (response.data.teachers.length > 0) {
              setSelectedTeacher(response.data.teachers[0]);
            }
          }
        } catch (error) {
          if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
            localStorage.removeItem('token');
                localStorage.removeItem('tokenTimestamp');
                localStorage.removeItem('nickName');
                localStorage.removeItem('teacher_id');
                localStorage.removeItem('user');
                localStorage.removeItem('id');
                localStorage.removeItem('score');
                localStorage.removeItem('par');
            toast.error("Session expired. Please log in again.");
          } else {
            toast.error("An error occurred. Please try again.");
          }
        }
      };

      fetchTeachers();
    }, []);
   
    const handleCloseModal = () => {
      setShowModal(false);
    };
    
    const showTeacherDetails = (teacher: TeacherDetailsProp) => {
      setSelectedTeacher(teacher);
    };

    return (
      <div className="grid grid-cols-11 gap-0 mx-0 md:mx-16 lg:mx-16 xl:mx-8 ">
        {isUserAuthenticated && (
          <div className="col-span-12 md:col-span-12 xl:col-span-4 p-4 h-auto bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-[107.61px] mt-2 mx-4 animate__animated animate__fadeInLeft">
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
        )}

        {!isUserAuthenticated ? (
          <div className="col-span-12 p-4 mx-auto">
            <TeacherList
              openModal={openModal}
              showTeacherDetails={showTeacherDetails}
              isUserAuthenticated={isUserAuthenticated}
            />
          </div>
        ) : (
          <div className="col-span-12 p-4 md:col-span-12 lg:col-span-3 xl:col-span-3 lg:overflow-y-auto scrollbar lg:max-h-screen">
            <TeacherList
              openModal={openModal}
              showTeacherDetails={showTeacherDetails}
              isUserAuthenticated={isUserAuthenticated}
            />
            <style>
              {`
              @media screen and (min-width: 1300px) {
                .scrollbar {
                  scrollbar-width: thin;
                  scrollbar-color: #52FF86 transparent;
                }
                .scrollbar::-webkit-scrollbar {
                  width: 4px;
                  height: 10px;
                }
                .scrollbar::-webkit-scrollbar-thumb {
                  background-color: #52FF86;
                  border-radius: 6px;
                }
                .scrollbar::-webkit-scrollbar-track {
                  background-color: transparent;
                }
              }
              `}
            </style>
          </div>
        )}

        {isUserAuthenticated && (
          <div className="col-span-12 xl:col-span-4 p-4 bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-[107.61px] mt-2 mx-4 animate__animated animate__fadeInRight">
            {selectedTeacher ? (
              <TeacherConDetail teacherDetails={selectedTeacher} />
            ) : (
              <div>Select Teacher To See Details</div>
            )}
          </div>
        )}

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

  export default StudentProfile;
