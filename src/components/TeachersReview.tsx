import React, { useEffect, useState } from "react";
import TeacherProfile from "../components/TeacherProfile";
import AboutTeacher from "../components/AboutTeacher";
import IntroVideo from "../components/TeacherIntro";
import TeacherPortfolio from "../components/TeacherPortfolio";
import TeacherSlotss from "../components/TeacherSlots";
import { useTeacherContext } from "../contexts/teachersContext";
import VideoPortfolio from "../components/TeacherPortfolio";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { gigsContextStore } from "../contexts/gigsContext";
import { notificationsContextStore } from "../contexts/notificationContext";

const TeacherReviews: React.FC = () => {
  const router = useNavigate();
  const tId = localStorage.getItem("teacher_id");
  const { teacher } = useTeacherContext();
  const { gigs } = gigsContextStore();
  const { t } = useTranslation();
  const [videoVisible, setVideoVisible] = useState<boolean>(false);

  const posterSrc = "/img/user-06.png";

  const availableSlots = teacher?.schedules?.map((schedule: any) => schedule);
  const shifts = availableSlots?.map((item: any) => item.shifts);
  const slots = shifts?.flatMap((item: any) => item);

  const [averageRating, setAverageRating] = useState<number | null>(null);

  useEffect(() => {
    if (teacher?.teacherRatings && teacher.teacherRatings.length > 0) {
      const totalRating = teacher.teacherRatings.reduce(
        (sum: number, rating: any) => sum + parseFloat(rating.rating),
        0
      );
      const avgRating = totalRating / teacher.teacherRatings.length;
      setAverageRating(avgRating);
    }
  }, [teacher]);

  return (
    <div className=" ">
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-4">
      

        {/* Main content */}
        <div className="col-span-4 md:col-span-12">
        
      
          <div className="w-full">
            <h2 className="text-xl font-semibold mb-4">{t("RATING")}:</h2>
            {teacher?.teacherRatings?.length === 0 ? (
              <h2 className="text-center">{t("NO_RATINGS_YET")}</h2>
            ) : (
              <div className="  w-full">
                <div className="flex  items-center justify-start w-full">
                  <div className="w-full px-4 py-4 space-y-4 border border-yellow-400 rounded-lg bg-[#17b3a6] ">
                    {/* <div>
                      <p className="text-lg font-bold text-gray-700 uppercase tracking-wide lg:text-xl">
                        {averageRating?.toFixed(1)}
                      </p>
                      <div className="flex mt-2">
                        {[1, 2, 3, 4, 5].map((star, index) => (
                          <svg
                            key={index}
                            className={`w-6 h-6 ${
                              star <= Math.round(averageRating ?? 0)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                        ))}
                      </div>
                    </div> */}
                    <div className="flex flex-col w-full">
                      {teacher?.teacherRatings?.map((rating: any, index: number) => (
                        <div key={index} className="bg-white shadow-lg my-2 p-4  ">
                          <div >
                            <div className="flex items-center gap-4">
                              <img src="/img/zozo.png" width="60px" height="60px" alt="" />
                              <div>
                                <p className="m-1">SIRAJ UDDIN</p>
                                <div className="flex items-center gap-4">
                                  <div>
                                    {[1, 2, 3, 4, 5].map((star, index) => (
                                      <svg
                                        key={index}
                                        className={`w-4 h-4 ${star <= Math.round(parseFloat(rating.rating))
                                          ? "text-yellow-300"
                                          : "text-gray-300"
                                          }`}
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 20"
                                      >
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                      </svg>
                                    ))}
                                  </div>

                                  <p className="text-lg font-medium text-gray-700 uppercase tracking-wide lg:text-lg m-1">
                                   {Math.round(parseFloat(rating.rating))}
                                  </p>
                                </div>
                              </div>

                            </div>

                          </div>

                          <p className="font-bold">{rating.feedback}</p>
                     
                          <p>{rating.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherReviews;
