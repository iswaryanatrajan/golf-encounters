import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
interface StudentTabsProps {
  selectedTab: "student" | "teacher";
  onSelectTab: (tab: "student" | "teacher") => void;
  showTabs?: boolean;
  profilePic: string;
  name: string; 
  description: string; 
}
const teacher_id = localStorage.getItem("teacher_id");

const StudentTabs: React.FC<StudentTabsProps> = ({
  selectedTab,
  onSelectTab,
  showTabs =false,
  profilePic,
  name,
  description,
}) => {
  const {t, i18n} = useTranslation();
document.body.dir = i18n.dir();
  return (
    <div>
    
      <div className="lg:flex lg:flex-1 lg:justify-center">
        <div className="flex-shrink-0 block ">
          <div className="text-center">
            <div  className="animate__heartBeat">
              <img
                className="inline-block h-24 w-24 rounded-full border-solid border-[4px] border-[#51ff85] hover:animate-bounce"
                src={profilePic}
                alt=""
              />
            </div>
            <div className="py-3">
              <p className="m-0 font-sans text-base font-bold text-black group-hover:text-gray-900">
                {name}
              </p>
              <p className="font-sans text-xs font-normal text-gray-700">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
     
      <div className="flex justify-center">
  {showTabs && (
    <>
      <Link to="/teacher-page" className="no-underline list-none">
        <button
          className={`px-4 py-1 rounded-l-md cursor-pointer hover:animate-bounce  ${
            selectedTab === "teacher"
              ? "bg-[#52FF86] text-white"
              : "border-solid border-2 border-[#51ff85] hover:animate-bounce"
          }`}
          onClick={() => onSelectTab("teacher")}
        >
          {t('TEACHER')}
        </button>
      </Link>
      <Link to="/student-page" className="no-underline list-none">
        <button
          className={`px-4 py-1 rounded-r-md cursor-pointer hover:animate-bounce ${
            selectedTab === "student"
              ? "bg-[#52FF86] text-white"
              : "border-solid border-2 border-[#51ff85] hover:animate-bounce"
          }`}
          onClick={() => onSelectTab("student")}
        >
          {t('STUDENT')}
        </button>
      </Link>
    </>
  )}
</div>

           
    </div>
  );
};

export default StudentTabs;
