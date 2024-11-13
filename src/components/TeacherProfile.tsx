// UserProfile.tsx
import {
  HandThumbUpIcon,
  MapPinIcon,
  PhoneArrowUpRightIcon,
  EnvelopeIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
interface UserProfileProps {
  firstName?: string;
  location?: string;
  email?: string;
  userId?: any;
  phoneNumber?: string;
  hourlyRate?: number;
  rating?: number;
  ratingCount?: number;
  about?: string;
  lastName?: string;
  profileImage?: any;
  imageUrl?: any;
  level?: any;
}

const UserProfile: React.FC<UserProfileProps> = ({
  firstName,
  location,
  email,
  phoneNumber,
  hourlyRate,
  rating,
  ratingCount,
  about,
  lastName,
  profileImage,
  imageUrl,
  level,
  userId
}) => {
  const { t, i18n } = useTranslation();
  const router = useNavigate();
  return (
    <div className="p-6  rounded  text-white ">
      <div className="flex items-center lg:justify-around">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start ">
          <div className="text-center">
            <img
              className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full"
              src={profileImage || imageUrl}
              alt="Profile"
            />
            <div className="mt-4">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {firstName} {lastName}
                </h2>
                <h2 className="text-lg font-semibold text-white">
                  {hourlyRate}{" "}
                  <span className="text-sm font-normal">  {t("Per/Hr")}</span>
                </h2>
                <button className="bg-green-500 text-[#17b3a6] px-6 py-1 rounded hover:bg-green-600 text-sm md:text-base">
                  {t("AVAILABLE")}
                </button>
              </div>
            </div>
          </div>

          <div className="ml-0 xl:ml-4 grid xl:grid-cols-2 gap-6  justify-center ">

            <div className="ml-0 col-span-2 xl:ml-4 grid grid-cols-2 xl:grid-cols-2 gap-6  justify-center ">
              <div className="">
                <div className="flex flex-col gap-1">
                  <div className="flex gap-2 items-center">
                    <MapPinIcon
                      className="w-4 h-4 text-white border-[1px] border-white border-solid rounded-full p-1"
                      aria-hidden="true"
                    />
                    <p className="m-0 font-bold">{t("Prefectures")}</p>
                  </div>
                  <p className="text-sm text-white m-0 pl-[calc(1rem+1.2rem)] w-full">
                    {location}
                  </p>
                </div>
              </div>

              <div className="">
                <div className="flex gap-2 items-center">
                  <EnvelopeIcon
                    className="w-4 h-4 text-white border-[1px] border-white border-solid rounded-full p-1"
                    aria-hidden="true"
                  />
                  <p className="m-0">{t("EMAIL")}</p>
                </div>
                <p className="text-sm text-white m-0 pl-[calc(1rem+1.5rem)]">
                  {email}
                </p>
              </div>
              <div className="">
                <div className="flex gap-2 items-center">
                  <PhoneArrowUpRightIcon
                    className="w-4 h-4 text-white border-[1px] border-white border-solid rounded-full p-1"
                    aria-hidden="true"
                  />
                  <p className="m-0">{t("TEl_NUM")}</p>
                </div>
                <p className="text-sm text-white m-0 pl-[calc(1rem+1.5rem)]">
                  {phoneNumber}
                </p>
              </div>
              <div className="">
                <div className="flex gap-2 items-center">
                  <StarIcon
                    className="w-4 h-4 text-white border-[1px] border-white border-solid rounded-full p-1"
                    aria-hidden="true"
                  />
                  <p className="m-0">{t("RATING")}</p>
                </div>
                <p className="text-sm text-white m-0 pl-[calc(1rem+1.5rem)]">
                  {rating}/{ratingCount} {t("RATING")}
                </p>
              </div>
              <div className="">
                <div className="flex gap-2 items-center">
                  <StarIcon
                    className="w-4 h-4 text-white border-[1px] border-white border-solid rounded-full p-1"
                    aria-hidden="true"
                  />
                  <p className="m-0">{t("LEVEL")}</p>
                </div>
                <p className="text-sm text-white m-0 pl-[calc(1rem+1.5rem)]">
                  {level}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end " >

        <button className="bg-green-500 text-[#17b3a6] px-4 py-2 rounded hover:bg-green-600 cursor-pointer" onClick={(e) => {
          e.preventDefault();
          router('/message-page/' + userId)
        }}>
          {t("CHAT")}
        </button>


      </div>
    </div>
  );
};

export default UserProfile;
