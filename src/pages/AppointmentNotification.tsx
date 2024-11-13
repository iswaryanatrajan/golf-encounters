import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../appConfig';
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";
import { useTeacherContext } from '../contexts/teachersContext';

const AppointmentNotificationPage = () => {
    const location = useLocation();
    const navigate = useNavigate(); 
    const { t } = useTranslation();
    const { activity } = location.state || {}; 
    const [loading, setLoading] = useState(false);
    const { isLoading } = useTeacherContext();
    const [isModalOpen, setModalOpen] = useState(false); // Modal state

    const studentNickName = activity?.bookedShifts?.nickName || localStorage.getItem('nickname');

    const handleAcceptClick = async (e: any, item: any) => {
        const {
          scheduleId,
          day,
          date,
          startTime,
          endTime,
          notificationId = "",
          bookedBy,
        } = item;
        let studentId = bookedBy;
        let status = "BOOKED";
        try {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          const response = await axios.post(
            API_ENDPOINTS.ACCEPTAPPOINTMENT,
            {
              studentId,
              scheduleId,
              day,
              date,
              startTime,
              endTime,
              status,
              notificationId,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (response.status === 200) {
            toast.success(t("ACCEPT_SUCCESS"));
            
        
          }
        } catch (error) {
          toast.error(
            (error as any)?.response?.data?.message || "We are not able to Accept"
          );
        }
      };

    const handleDeclineClick = async (item: any) => {
        const { scheduleId, day, startTime, date, endTime, bookedBy, notificationId = "" } = item;
        let studentId = bookedBy;
        let status = "DECLINED";
        try {
            setLoading(true);
            const response = await axios.post(
                API_ENDPOINTS.DECLINEAPPOINTMENT,
                { studentId, scheduleId, day, date, startTime, endTime, status, notificationId },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            if (response.status === 200) {
                toast.success(t("DECLINED_SUCCESS"));
            }
        } catch (error) {
            toast.error(
                (error as any)?.response?.data?.message || "We are not able to Decline"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleTeacherProfileRedirect = () => {
        const teacherId = activity?.schedule?.teacherId;
        console.log("Teacher ID:", teacherId); 
        if (teacherId) {
            navigate(`/teacher-details/${teacherId}`);
        } else {
            toast.error("Teacher information is unavailable");
        }
    };

    return (
        <div className='max-w-7xl mx-10 xl:mx-auto'>
            <h2>Appointment Details</h2>
            {activity ? (
                <div className='bg-white px-4 py-4' style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px" }}>
                    <div className='flex gap-6'>
                        {activity?.bookedShifts?.nickName && (
                            <p>Student Name: {activity.bookedShifts.nickName}</p>
                        )}
                        <p>Appointment Time: {activity.startTime}</p>
                        <p>Appointment Date: {activity.date}</p>
                        <p>Appointment Day: {activity.day}</p>
                        {/* Conditionally render Start Date and End Date */}
                        {activity.schedule?.startDate && <p>Start Date: {activity?.date}</p>}
                        {activity.schedule?.endDate && <p>End Date: {activity.schedule.endDate}</p>}
                    </div>

                   {activity?.bookedShifts?.nickName && activity?.status === "PENDING" ? (
    <div className="mt-4 flex gap-2">
        <button
            type="button"
            className="cursor-pointer inline-flex items-center rounded-md bg-[#17b3a6] px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            onClick={(e) => handleAcceptClick(e, activity)}
            disabled={loading || isLoading}
        >
            {loading ? "Processing..." : "Approve"}
        </button>
    </div>
) : activity?.status === "BOOKED" ? (
    <button
        type="button"
        className="cursor-not-allowed inline-flex items-center rounded-md bg-gray-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm"
        disabled
    >
        Already Approved
    </button>
) : (
    activity?.bookedShifts?.nickName && (
        <div>
            <h3>
                {activity.status === "BOOKED"
                    ? "You have accepted the appointment"
                    : "You have declined the appointment"}
            </h3>
            <p>Teacher Name: {activity.bookedShifts.teacherNickName}</p>
        </div>
    )
)}


                    {!activity?.bookedShifts?.nickName && (
                        <button
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={() => setModalOpen(true)}
                        >
                            {t("VIEW_GIGS")}
                        </button>
                    )}

                    {/* Modal */}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                            <div className="bg-white p-6 rounded shadow-lg">
                                <p>{t("TEACHER_PROFILE")}</p>
                                <p>{t("NO_GIGS")} <span className='text-green'>{t("COLORFUL")}</span></p>
                                <button
                                    className="text-white underline bg-[green] p-2 mx-2"
                                    onClick={handleTeacherProfileRedirect}
                                >
                                    {t("CLICK_HERE")}
                                </button>
                                <button
                                    className="mt-4 bg-[red] text-white px-4 py-2 rounded"
                                    onClick={handleModalClose}
                                >
                                    {t("CLOSE")}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <p>No appointment details available.</p>
            )}
        </div>
    );
};

export default AppointmentNotificationPage;
