import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { singleUserContext } from "../contexts/authContext";

import { postContext } from "../contexts/postsContext";
import { createdEventsStore, eventContextStore } from "../contexts/eventContext";
import { useTranslation } from "react-i18next";
import UpdateTeacher from "./UpdateTeacher";
import PostPage from "./PostPage";
const UserProfile = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const router = useNavigate();

  const { singleUser, postCount, eventCount} = singleUserContext();
  const {  setUserId } = eventContextStore();
  const [showPosts, setShowPosts] = useState(false);
  const { createdEvents } = createdEventsStore();

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const tId = localStorage.getItem("teacher_id");
  const [isTeacher, setIsTeacher] = useState(false);
  const [openEditTeacher, setEditTeacher] = useState(false);

  useEffect(() => {
    const tch = localStorage.getItem("teacher_id");
    const checkTeacher = tch && tch !== "null" ? true : false;
    setIsTeacher(checkTeacher);
  });
  const handleClick = () => {
    setEditTeacher(!openEditTeacher);
  };
  const handlePostsClick = () => {
    router('/user-posts/' + singleUser.id) 

  };
  return (
    <>
      <div className="max-w-6xl mx-auto h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative  h-35 md:h-65">

          <img
            src="/img/cover-01.png"
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />


        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur  sm:max-w-44 sm:p-3">
            <div className="absolute top-[-100px] left-[37%] right-[40%] drop-shadow-2  ">
              <img
                src={singleUser?.imageUrl}
                alt="profile"
                className="w-40 h-40 rounded-full"
              />

            </div>
          </div>
          <div className="mt-16">
            <h3 className="mb-1.5 text-2xl font-semibold text-black ">
              {singleUser?.nickName}
            </h3>
            <p className="font-medium">{singleUser?.email}</p>
            <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-4 rounded-md border border-stroke py-4 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
              <div
                className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row cursor-pointer" 
                onClick={handlePostsClick} 
              >
                <span className="font-semibold text-black dark:text-white">
                  {postCount?.length} 
                </span>
                <span className="text-sm">{t("POSTS")}</span>
              </div>
              <div
              onClick={()=>{
                router('/event-main-page/'+singleUser.id)
              }}
              className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row cursor-pointer" >
                <span className="font-semibold text-black dark:text-white">
                  {eventCount || 0}
                </span>
                <span className="text-sm">Total Events</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row cursor-pointer" >
                <span className="font-semibold text-black dark:text-white">
                  259
                </span>
                <span className="text-sm">Joined Events</span>
              </div>

              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  2K
                </span>
                <span className="text-sm">Created Events</span>
              </div>
            </div>
            <div className="text-center md:mt-20 sm:mt-0">
              <p className="font-bold">
                Member Since : {formatDate(singleUser?.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
