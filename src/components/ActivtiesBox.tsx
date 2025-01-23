import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ReviewsModal from './comments/ReviewsModal';
import { useTranslation } from "react-i18next";
import { userAuthContext } from '../contexts/authContext';
import { EllipsisHorizontalIcon, ChatBubbleOvalLeftIcon, CheckIcon } from "@heroicons/react/20/solid";

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
    //bgClr = "#F2FAFF";
    borderClr = "#00A4FE";
  } else if (activity?.status === "CANCELLED") {
    //bgClr = "#FFE6E6";
    borderClr = "#00A4FE";
  } else if (activity?.status === "COMPLETED") {
    //bgClr = "#0ad5c4";
    borderClr = "none";
    textColor = "white";
  } else if (activity?.status === "BOOKED") {
    //bgClr = "#cffffb";
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
      className={`px-2 bg-${bgClr} border border-${borderClr} shadow-light-all rounded-lg border-solid mt-3`}
      style={{ backgroundColor: bgClr, border: borderClr }}
      // onClick={() => {
      //   activity?.schedule?.Teacher?.id
      //     ? router("/teacher-details/" + activity?.schedule?.Teacher?.id)
      //     : router("/appointments/");
      // }}
    > 

      <div className="flex flex-column justify-between items-center">

        <div className='xl:flex space-x-4 col-span-10 items-end gap-1 '>
        <div className="xl:grid grid-cols-12 items-center">
          <div className='flex w-full justify-start items-center col-span-5'>
          <img
            src={activity?.schedule?.Teacher?.teacher?.imageUrl || activity?.bookedShifts?.imageUrl}
            alt="Profile"
            className="h-10 w-10 rounded-full mr-4"
          />
          <p className="text-gray-600 font-product-sans font-normal pe-3">
            {activity.schedule?.Teacher?.firstName || activity?.bookedShifts?.nickName} {t("APPOINTMENT_WITH")}
          </p>
          </div>

          <p className="text-[blue] font-product-sans  text-[12px] col-span-2">
          {t("TIME")}: <span className='font-bold text-[13px] text-gray-600'>{activity?.startTime}</span>
          </p>
          <p className="text-[blue] font-product-sans  text-[12px] col-span-2 ml-4">
          {t("DAY")}: <span className='font-bold text-[13px] text-gray-600 '>{activity?.day}</span>
          </p>
          <p className="text-[blue] font-product-sans  text-[12px] col-span-3 ml-4"> 
          {t("DATE")}: <span className='font-bold text-[13px] text-gray-600'>{activity?.date}</span></p>
          </div>
        </div>
        <div className='flex justify-end content-end col-span-2'>

             <EllipsisHorizontalIcon
                    className="w-4 h-4 text-white bg-blue-500 hover:bg-blue-700 rounded-full p-2"
                    onClick={handleSeeDetails} // Updated to use the new function
                    aria-hidden="true"
                  />
           
           
          <div className='flex justify-end col-span-3 px-3' onClick={(e)=>{
            e.preventDefault();
            router('/message-page/' + activity.bookedBy);
          }}>
              <ChatBubbleOvalLeftIcon
                    className="w-4 h-4 text-white bg-blue-500 hover:bg-blue-700 rounded-full p-2"
                    aria-hidden="true"
                  />
          </div>
          {isStudentPage && activity?.status === "BOOKED" && (
      <CheckIcon
      className="w-4 h-4 text-white bg-blue-500 hover:bg-blue-700 rounded-full p-2"
      onClick={handleComplete}
      aria-hidden="true"
      />

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
