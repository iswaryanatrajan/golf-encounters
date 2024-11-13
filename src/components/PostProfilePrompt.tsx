import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaceSmileIcon,
  PhotoIcon,
  VideoCameraIcon
} from "@heroicons/react/24/solid";
import PostModal from "../components/PostModel"
import { useTranslation } from "react-i18next";
import { userAuthContext } from "../contexts/authContext";
const ProfilePrompt: React.FC = () => {
  const { user } = userAuthContext();
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    const token = localStorage.getItem("token");
    if (token && token !== "undefined") {
      setIsModalOpen(true); 
    } else {
      navigate('/login-page');
    }
  };

  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <div className="bg-white mx-4 md:mx-0 p-4 mb-4 rounded-lg border-2 border-solid border-[#43bcb0]">
        <div className="flex flex-wrap items-center md:flex p-4 space-x-4">
          <img
            className="w-12 h-12 rounded-full"
            src={user.imageUrl ? user.imageUrl : "./img/short.png"}
            alt="User"
          />
          <input
            type="text"
            placeholder={t('YOUR_MIND')}
            className="flex-1 border-2 border-solid border-[#43bcb0] rounded-full py-2 px-4 focus:outline-none focus:border-green-300"
            onFocus={openModal}
          />
        </div>
        <div className="flex items-center justify-around">
          <div className="flex gap-4 items-center cursor-pointer">
            <VideoCameraIcon className="w-6 h-6 border-2 border-solid border-[#43bcb0] rounded-full p-1 text-red" />
            <p>{t('LIVE_VIDEO')}</p>
          </div>
          <div className="flex gap-4 items-center cursor-pointer">
            <PhotoIcon className="w-6 h-6 border-2 border-solid border-[#43bcb0] rounded-full p-1 text-[#43bcb0]" />
            <p>{t('PHOTO')}</p>
          </div>

        </div>

      </div>
      {isModalOpen && (
        <PostModal closeModal={closeModal} />
      )}
    </>

  );
};

export default ProfilePrompt;
