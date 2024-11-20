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
import TeacherReviews from "../components/TeachersReview";

const TeacherDetails: React.FC = () => {
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
    <div className="mx-4 md:mx-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
        <div className="col-span-1 md:col-span-4 order-last md:order-first">
          <TeacherSlotss
            slots={slots}
            schedules={availableSlots}
            teacherId={teacher?.id}
          />
        </div>

        {/* Main content */}
        <div className="col-span-4 md:col-span-8">
          <div className="bg-[#17b3a6] p-4 rounded">
            <TeacherProfile {...teacher} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-8 gap-4 mt-4">
            <div className="col-span-1 md:col-span-5">
              <AboutTeacher />
            </div>
            <div className="col-span-1 md:col-span-3 my-4">
              <h3 className="text-lg font-semibold mb-2 text-[#565656]">
                {t("MAIN_VIDEO")}
              </h3>
              <div className="relative flex justify-center items-center rounded-lg shadow-md overflow-hidden">
                <video
                  className="rounded-lg w-[480px] h-[270px]"
                  src={teacher.introductionVideo}
                  title="Introduction Video"
                  controls
                ></video>
              </div>
            </div>
          </div>
          <div className="text-[#565656] text-lg font-semibold">
            <VideoPortfolio />
          </div>
          <div className="my-8">  
          <h3 className="text-lg font-semibold mb-4 text-[#565656]">Gigs:</h3>
            {tId !== teacher?.id ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {gigs.gigs?.length != 0 ? (
                  gigs.gigs?.map((item: any) => (
                    <div
                      className="xl:w-auto mb-4 xl:mb-0 px-2 py-4 space-y-4 text-white hover:bg-[#f1f1f1] cursor-pointer border border-yellow-400 rounded-lg bg-white lg:py-3 md:px-3 md:w-auto md:flex-row md:items-center md:space-x-4 lg:space-x-12"
                      style={{
                        boxShadow:
                          "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                      }}
                      key={item.id}
                      onClick={() => router(`/gig/` + item.id)}
                    >
                      <div className="gap-4 items-center text-black">
                        <div className="w-full h-full xl:w-[100%] xl:h-[260px]">
                          <img
                            className="w-full h-full rounded border-2 border-solid border-[#2dd4bf]"
                            src={item?.imageUrl || teacher?.profileImage || "../../img/profile-page.png"}
                            alt="No image"
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star, index) => (
                              <svg
                                key={index}
                                className={`w-4 h-4 ${star <= item.rating
                                  ? "text-yellow-300"
                                  : "text-gray-300"
                                  } ms-1`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                              >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                              </svg>
                            ))}
                            <p className="ml-1 text-[#949494]">
                              4.5(20 reviews)
                            </p>
                          </div>
                          <h3 className="my-1">{item.title}</h3>
                          <p>
                          {t("PRICE")}{" "}
                            <span className="text-green font-bold text-2xl">
                              {item.price} ¥
                            </span>
                          </p>
                          <button
                            onClick={() => router(`/gig/` + item.id)}
                            className="p-2 rounded-lg cursor-pointer bg-[#2dd4bf] text-white hover:bg-black hover:text-white"
                          >
                           {t("SEE_MORE")}
                          </button>
                          <Link
                            to="/message-page"
                            className="text-center bg-[#2dd4bf] text-white p-2 mt-2 rounded-lg cursor-pointer hover:bg-black hover:text-white"
                          >
                            {t("CHAT")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center">
                    <p>{t("OPPS")}</p>
                  </div>
                )}
              </div>
            ) : (
              <>
                <p>
                  {t("OPPS")}
                  <span className="text-[#17b3a6]">GIGS!SS</span>
                </p>
                <button
                  className="text-white bg-[#17b3a6] px-6 py-2 cursor-pointer rounded hover:bg-green-600 text-sm md:text-base"
                  onClick={() => router(`/create-catalogs/${teacher?.id}`)}
                >
                  Create GIG
                </button>
              </>
            )}
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;
