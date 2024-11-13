import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import StudentHistory from "../components/StudentHistory";

interface StudentInfo {
  location: string;
  mobileNo: string;
  email: string;
  history: any[];
  // Add other properties like name, hourly rate, etc.
  name: string;
  hourlyRate: number;
  // ...
}

interface StudentConDetailProps {
  studentInfo: StudentInfo | null;
}

const StudentConDetail: React.FC<StudentConDetailProps> = ({ studentInfo }) => {
  const boxData = [
    {
      imageUrl: "/img/BG-GOLF.jpg",
      description: "You have a 30-minute appointment with Jaine at 2:00 PM.",
      bgColor: "#F2FAFF",
      borderColor: "#00A4FE",
    },
    {
      imageUrl: "/img/BG-GOLF.jpg",
      description: "Your appointment with Jaine at 3:00 PM got cancelled.",
      bgColor: "#FFE6E6",
      borderColor: "#00A4FE",
    },
    {
      imageUrl: "/img/BG-GOLF.jpg",
      description: "Your appointment with Jaine will start in 5 minutes.",
      bgColor: "#F2FAFF",
      borderColor: "#00A4FE",
    },
    {
      imageUrl: "/img/BG-GOLF.jpg",
      description: "You have a 30-minute appointment with Jaine at 2:00 PM.",
      bgColor: "#F2FAFF",
      borderColor: "#00A4FE",
    },
  ];

  return (
    <div className="box">
      {studentInfo ? (
        <div>
          <div className="grid my-6">
            <div className="flex items-center gap-2 ">
              <div className="w-4 h-4 rounded-full border-solid border-2 p-2 border-[#51ff85] flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-[#51ff85] animate-bounce"
                />
              </div>
              <h3 className="text-black font-bold text-xs font-sans">Location</h3>
            </div>
            <div className="div">
              <p className="text-gray-500 font-normal text-xs font-sans my-0 ml-[43px]">
                {studentInfo.location}
              </p>
            </div>
          </div>

          <div className="grid my-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border-solid border-2 p-2 border-[#51ff85] flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faPhoneAlt}
                  className="text-[#51ff85] animate-bounce"
                />
              </div>
              <h3 className="text-black font-bold text-xs font-sans">Mobile No</h3>
            </div>
            <div className="div">
              <p className="text-gray-500 font-normal text-xs font-sans my-0 ml-[43px]">
                {studentInfo.mobileNo}
              </p>
            </div>
          </div>

          <div className="grid my-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border-solid border-2 p-2 border-[#51ff85] flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-[#51ff85] animate-bounce"
                />
              </div>
              <h3 className="text-black font-bold text-xs font-sans">Email</h3>
            </div>
            <div className="div">
              <p className="text-gray-500 font-normal text-xs font-sans my-0 ml-[43px]">
                {studentInfo.email}
              </p>
            </div>
          </div>

          <div className="">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border-solid border-2 p-2 border-[#51ff85] flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faWifi}
                  className="text-[#51ff85] animate-bounce"
                />
              </div>
              <h3 className="text-black font-bold text-xs font-sans">History</h3>
            </div>
          </div>

          <StudentHistory data={boxData} />
        </div>
      ) : (
        <p>No student selected</p>
      )}
    </div>
  );
};

export default StudentConDetail;
