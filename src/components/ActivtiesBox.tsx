import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ReviewsModal from './comments/ReviewsModal';
import { useTranslation } from "react-i18next";
import { userAuthContext } from '../contexts/authContext';

interface ActivtiesBoxProps {
  activity?: any;
}

const ActivtiesBox: React.FC<ActivtiesBoxProps> = ({ activity }) => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const isStudentPage = location.pathname?.includes('/student-activties-page');
  const router = useNavigate();
  let bgClr;
  let borderClr;
  let textColor;

  if (activity?.status === "PENDING") {
    bgClr = "#F2FAFF";
    borderClr = "#00A4FE";
  } else if (activity?.status === "CANCELLED") {
    bgClr = "#FFE6E6";
    borderClr = "#00A4FE";
  } else if (activity?.status === "COMPLETED") {
    bgClr = "#0ad5c4";
    borderClr = "none";
    textColor = "white";
  } else if (activity?.status === "BOOKED") {
    bgClr = "#cffffb";
    borderClr = "none";
    textColor = "#ffff";
  }

  const handleComplete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the event from bubbling up to the parent div
    setShowModal(true);
  };

  const handleSeeDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    router('/appointment-notification-page', { state: { activity } });
  };

  const {
    handleChatId,
    handleReceiver,
    handleLoading
   
  } = userAuthContext();

  return (
    <div
      className={`px-2 bg-${bgClr} border border-${borderClr} shadow-lg rounded-lg border-solid mt-3`}
      style={{ backgroundColor: bgClr, border: borderClr }}
      // onClick={() => {
      //   activity?.schedule?.Teacher?.id
      //     ? router("/teacher-details/" + activity?.schedule?.Teacher?.id)
      //     : router("/appointments/");
      // }}
    >
      <div className="xl:grid grid-cols-12 items-center">
        <div className='xl:flex justify-start items-center gap-2 col-span-9'>
          <img
            src={activity?.schedule?.Teacher?.teacher?.imageUrl || activity?.bookedShifts?.imageUrl}
            alt="Profile"
            className="h-10 w-10 rounded-full mr-4"
          />
          <p className="text-gray-600 font-product-sans font-normal text-xl">
            {activity.schedule?.Teacher?.firstName || activity?.bookedShifts?.nickName} {t("APPOINTMENT_WITH")}
          </p>
          <p className="text-[blue] font-product-sans font-normal text-xl ">
          {t("TIME")}: <span className='font-bold text-green'>{activity?.startTime}</span>
          </p>
          <p className="text-[blue] font-product-sans font-normal text-xl ">
          {t("DAY")}: <span className='font-bold text-green'>{activity?.day}</span>

          </p>
          <p className="text-[blue] font-product-sans font-normal text-xl "> {t("DATE")}: <span className='font-bold text-green'>{activity?.date}</span></p>
        </div>
        <div className='flex justify-end col-span-3'>
          <p
            className='bg-[#03bb3a] p-2 rounded text-white ml-2 cursor-pointer flex items-center'
            onClick={handleSeeDetails} // Updated to use the new function
          >
            {t("SEE_DETAILS")}
          </p>
          <div onClick={(e)=>{
            e.preventDefault();
            router('/message-page/' + activity.bookedBy);
          }}>
            <p className='bg-[#3b82f6] p-2 rounded text-white ml-2 cursor-pointer' >{t("CHAT")}</p>
          </div>
          {isStudentPage && activity?.status === "BOOKED" && (
            <p
              className='bg-[#ff9800] p-2 rounded text-white ml-2 cursor-pointer flex items-center'
              onClick={handleComplete}
            >
              {t("COMPLETE")}
            </p>
          )}
        </div>
      </div>
      <div>
        {showModal && <ReviewsModal closeModal={() => setShowModal(false)} teacherId={activity.schedule?.Teacher?.id} allinfo={activity} />}
      </div>
    </div>
  );
};

export default ActivtiesBox;
