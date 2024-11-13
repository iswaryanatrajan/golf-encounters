import React, { useEffect, useState } from "react";
import StudentTabs from "./StudentTabs";
import StudentList from "./StudentList";
import SearchAndFiltersStudent from "./SearchStudent";
import StudentConDetail from "./StudentConDetail";
import ReschedulePop from "./ReschedulePop";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";
import RightTab from "./RightTabs";

const PendingLessonsPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"teacher" | "student">(
    "teacher"
  );
  const [showModal, setShowModal] = useState(false);
  const [pendingLessons, setPendingLessons] = useState([]);
  const [selectedStudentDetails, setSelectedStudentDetails] = useState<
    any | null
  >(null);
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
              status: "PENDING",
            },
          }
        );

        setPendingLessons(response.data.bookedAppointments);
        if (response.data.bookedAppointments.length > 0) {
          setSelectedStudentDetails(response.data.bookedAppointments[0]);
        }
      } catch (error: any) {
        toast.error("ログインされていません");
      }
    };

    fetchTeachers();
  }, []);
  const handleStudentSelect = (studentInfo: any) => {
    console.log("Selected student:", studentInfo);
    setSelectedStudentDetails(studentInfo);
  };
  const handleSelectTab = (tab: "teacher" | "student") => {
    setSelectedTab(tab);
  };
  const openModal = () => {
    setShowModal(true);
  };
  const handleSelectTime = (selectedTime: string) => {
    console.log(`Selected Time: ${selectedTime}`);
  };
  const handleBookAppointment = () => {
    console.log("Booking appointment logic");
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className="grid grid-cols-11 gap-0 mx-0 md:px-16 lg:px-16 xl:px-8 ">
      <RightTab />
      <div className="col-span-12 px-4 md:col-span-12 lg:col-span-12 xl:col-span-3 py-0- lg:overflow-y-auto scrollbar lg:max-h-screen animate__animated animate__fadeInLeft">
        <SearchAndFiltersStudent />
        {pendingLessons.map((item: any, index: any) => {
          return (
            <StudentList
              key={item.index}
              scheduleId={item.scheduleId}
              day={item.day}
              studentId={item.bookedBy}
              startTime={item.startTime}
              endTime={item.endTime}
              lessons="PENDING"
              newStatus="BOOKED"
              email={item.bookedShifts.email}
              nickName={item.bookedShifts.nickName}
              openModal={openModal}
              handleBookAppointment={handleBookAppointment}
              onSelectStudent={handleStudentSelect}
            />
          );
        })}
        <style>{`
          @media screen and (min-width: 768px) {
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
      <div className="col-span-12 xl:col-span-4 p-4  bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-[107.61px] mt-2 mx-4 animate__animated animate__fadeInRight ">
        <StudentTabs
          selectedTab={selectedTab}
          onSelectTab={setSelectedTab}
          showTabs={false}
          description='" ning processes to achieve superior results"'
          profilePic="/img/student.png"
          name="Vivek Kumar"
        />
        <StudentConDetail studentInfo={selectedStudentDetails} />
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 ">
          <div className="max-w-md p-8 mx-auto bg-white rounded-lg animate__animated animate__lightSpeedInRight">
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
export default PendingLessonsPage;
