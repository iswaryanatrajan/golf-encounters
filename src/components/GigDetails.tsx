import { useEffect, useState } from "react";
import { addPostComment, fetchSinglePosts } from "../utils/fetchPosts";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../appConfig";
import axios from "axios";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { hasImageExtension } from "../utils/imgExtension";
import { Slide } from "react-slideshow-image";
import { postContext } from "../contexts/postsContext";
import { handleDeleteComment } from "../utils/fetchCommunication";
import { useTeacherContext } from "../contexts/teachersContext";
import { gigsContextStore } from "../contexts/gigsContext";
import { userAuthContext } from "../contexts/authContext";
import { reserveGig } from "../utils/fetchGigs";
export const settings = {
  dots: true,
  speed: 500,
  slidesToShow: 1,

  initialSlide: 1,
  arrows: false,
};

export interface SinglePostProps {
  posts: any;
  category: string;
  tags: string;
  mediaFile?: any;
  text: string;
  PostComments: any;
  PostLikes: any;
  createdAt: any;
  id: any;
}
export const getTimeAgo = (pastTime: any, t: any) => {
  const currentTime: any = new Date();

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = currentTime - pastTime;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " " + t("SEC_AGO");
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " " + t("MIN_AGO");
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " " + t("HOUR_AGO");
  } else if (elapsed < msPerMonth) {
    return "" + Math.round(elapsed / msPerDay) + " " + t("DAYS_AGO")
  } else if (elapsed < msPerYear) {
    return "" + Math.round(elapsed / msPerMonth) + " " + t("MONTH_AGO");
  } else {
    return "" + Math.round(elapsed / msPerYear) + " " + t("YEAR_AGO");
  }
};
const GigDetails: React.FC = () => {
  const { gig, reserveGigs, setIsLoading } = gigsContextStore();
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const params = useParams<{ id?: string }>();
  const { teacher, handTeacherId } = useTeacherContext();
  const teacherId = localStorage.getItem("teacher_id");
  handTeacherId(gig?.teacherId);
  const postId = params.id;
  const [localEvents, setLocalEvents] = useState<any>([]);
  const [isOpenMap, setIsOpenMap] = useState<{ [key: string]: boolean }>({});

  const toggleDropdown = (commentId: string) => {
    setIsOpenMap((prevState) => ({
      [commentId]: !prevState[commentId],
    }));
  };

  //   const postTime = new Date(singlePost?.createdAt);
  const postTime = new Date(gig?.createdAt);

  const timeAgo = getTimeAgo(postTime, t);

  const checkAlreadyPurchased = (gId: any) => {
    return reserveGigs?.some((item: any) => item.gigId == gId);
  };


  const arrayImages = gig?.imageUrl?.split(',');
  return (
    <div
      className="mx-6 md:mx-auto max-w-5xl px-6  my-4 py-4"
      style={{
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
      }}
    >
      <div className="flex gap-2 items-center py-4 justify-between">
        <div
          className="flex gap-2 items-start cursor-pointer  py-4"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <img
            className="w-16 h-16 rounded-full border-2 border-solid border-green "
            src={teacher?.profileImage || "/img/profile-page.png"}
            alt="Post"
          />
          <div>
            <h4 className="m-0 font-medium text-lg hover:text-[#17b3a6]  captalize py-1 text-[black]">
              {teacher?.firstName || "Golf Teacher"}
            </h4>
            <p className="m-0 p-0 text-sm">{timeAgo}</p>
            {
              gig.teacherId != localStorage.getItem("teacher_id") && !checkAlreadyPurchased(gig.id) &&
              <div className="flex justify-end mt-4">
                <Link to="/message-page" className="">
                  <button
                    type="button"
                    className="bg-transparent border-2 border-solid border-black font-bold p-2 rounded text-black md:px-20 hover:bg-black hover:text-white cursor-pointer"
                  >
                    {t("CONTACT_ME")}
                  </button>
                </Link>
              </div>
            }
          </div>

        </div>

        <div className="flex  gap-2">
          <Link to="/profile-page" className="">
            <button
              type="button"
              className="bg-[#17b3a6] hover:bg-blue-700 text-white font-bold py-2 px-2 rounded cursor-pointer"
            >
              {t("BACK")}
            </button>
          </Link>

        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
        <div className="col-span-12  ">
          <div
            className="mb-4"
          />
          <div className="md:flex justify-between items-center">



            <h2
              dangerouslySetInnerHTML={{ __html: gig?.title ?? "" }}
            ></h2>
            <div className="flex gap-4 mb-4 md:mb-0">
              <span className="bg-transparent border-2 border-solid  border-black font-bold p-1 rounded text-black xl:px-10 w-full hover:bg-black hover:text-white cursor-pointer">  {t("PRICE")}: ¥

                {
                  gig?.price
                }
              </span>
              {
                gig.teacherId == localStorage.getItem("teacher_id") || !checkAlreadyPurchased(gig.id) && (
                  <button
                    onClick={() => {
                      reserveGig(gig.id, setIsLoading);
                    }}
                    className="p-1 w-full rounded cursor-pointer bg-[#2dd4bf] text-white hover:bg-black hover:text-white"
                  >
                    {t("BUY_NOW")}
                  </button>
                )
              }



            </div>

          </div>
          {arrayImages?.map((img: string, index: number) => {
            if (arrayImages.length === 1) {
              return (
                hasImageExtension(img) ?
                  <img
                    className="w-full h-[300px] xl:h-[450px] object-fit bg-white rounded-lg bg-cover"
                    src={img}
                    alt="画像がありません。"
                  /> : <video
                    controls
                    className="w-full h-[300px] xl:h-[600px] rounded-lg"
                    src={img}
                  />
              );
            }
          })}
          <Slider {...settings}>
            {arrayImages?.map((img: string, index: number) => {
              if (arrayImages?.length === 1) {
                return;
              } else {
                return (
                  <div key={`multiple-${index}`}>
                    {" "}
                    {/* Ensure key is unique and at the top element */}
                    {hasImageExtension(img) ? (
                      <img
                        className="w-full bg-cover object-fit h-[300px] xl:h-[600px] rounded-lg"
                        src={img}
                        alt="画像がありません。"
                      />
                    ) : (
                      <video
                        controls
                        className="w-full h-[300px] xl:h-[600px] rounded-lg"
                        src={img}
                      />
                    )}
                  </div>
                );
              }
            })}
          </Slider>
          {/* <div className="flex items-center justify-end mt-2">
            <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <p className="ml-1 text-[#949494]">4.5(20 reviews)</p>
          </div> */}
        </div>
        <div className="w-full">
          <h3>{t("ABOUT_GIG")}</h3>
          <div
            dangerouslySetInnerHTML={{ __html: gig?.description ?? "" }}
          ></div>
        </div>




      </div>
      {
        gig.teacherId != localStorage.getItem("teacher_id") && !checkAlreadyPurchased(gig.id) &&
        <div className="flex justify-end mt-4">
          <Link to="/message-page" className="">
            <button
              type="button"
              className="bg-transparent border-2 border-solid border-black font-bold p-2 rounded text-black md:px-20 hover:bg-black hover:text-white cursor-pointer"
            >
              {t("CONTACT_ME")}
            </button>
          </Link>
        </div>
      }
    </div>
  );
};

export default GigDetails;
