import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
  MapPinIcon,
  ShareIcon,
  HeartIcon
} from "@heroicons/react/24/solid";



import CommentModel from "./CommentModel";
import { API_ENDPOINTS } from "../appConfig";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { ToastConfig, toastProperties } from "../constants/toast";
import {
  eventContextStore,
  singleEventContextStore,
  SingleEventsContext,
} from "../contexts/eventContext";
import { useTranslation } from "react-i18next";
import { deleteEvent } from "../utils/fetchEvents";
import socket from "../socket";
interface TableProps {
  events?: Array<{
    id: string;
    creator: {
      nickName: any;
    };
    comments: [];
    accountHolderName: string;
    eventStartTime: string;
    eventStartDate: string;
    eventName: string;
    eventDetails: string;
    type: string;
    place: string;
    imageUrl: string;
    isFavorite: Boolean;
    likes?: any[];
    Favorite?: any[];
  }>;
  handleLike?: (event: any) => void;
  handleFavorite?: (eventId: string) => void;
}

const Table: React.FunctionComponent<TableProps> = ({ events }) => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const { eventss, handleEvents, eventStatus, search } = eventContextStore();
  const router = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const { isCreated, singleEvent } = singleEventContextStore();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const handleComment = (eventId: string) => {
    setSelectedEvent(eventId);
    setShowModal(!showModal);
  };
  const [checkedJoined, setCheckedJoined] = useState(false);

  useEffect(() => {
    if (eventStatus === "joined") {
      setCheckedJoined(true);
    } else {
      setCheckedJoined(false);
    }

    console.log(eventStatus);
  }, [checkedJoined, eventStatus]);

  const filteredEvents = eventss?.filter((event: any) =>
    event.eventName.toLowerCase().includes(search.toLowerCase())
  );

  const handleFavoriteClick = async (eventId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${API_ENDPOINTS.MARKASFAVORITE}${eventId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        handleEvents((prevs: any) =>
          prevs.map((e: any) =>
            e.id === eventId
              ? {
                ...e,
                isFavorite: !e.isFavorite,
              }
              : e
          )
        );
      }
    } catch (error) {
      console.error("Error marking as favorite:", error);
    }
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setShowModal(false);
  };

  const handleLike = async (event: any) => {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem("id") || "");
      const likes = event?.likes || [];
      const userEvent = likes.find((like: any) => like.userId === loggedInUser);
      const newCounter = userEvent?.counter === 1 ? 0 : 1;
      const response = await axios.post(
        API_ENDPOINTS.ADDLIKE,
        { eventId: event.id, Count: newCounter, userId: loggedInUser },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        handleEvents((prev: any) =>
          prev.map((e: any) =>
            e.id === event.id
              ? {
                ...e,
                likes: userEvent
                  ? likes.map((like: any) =>
                    like.userId === loggedInUser
                      ? { ...like, counter: newCounter }
                      : like
                  )
                  : [
                    ...likes,
                    {
                      counter: newCounter,
                      userId: loggedInUser,
                      id: Math.floor(Math.random() * 10),
                    },
                  ],
              }
              : e
          )
        );
      }
    } catch (error) {
      toast.error(`Please Login`, toastProperties as ToastConfig);
    }
  };

  const userId = localStorage.getItem("id");
  console.log("userId:",userId)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="animate__animated animate__fadeInLeft">
      {(eventss || []).length === 0 ? (
        <div className="p-5 text-center">
          <span className="text-lg font-medium">No events yet</span>
        </div>
      ) : (
        <div className="flow-root  ">
          <div className="-my-2  ">
            <div className="inline-block min-w-full py-0 align-middle ">
              <div className="sm:rounded-lg">
                {!isMobile ? (
                  <table
                    className="relative min-w-full  divide-y divide-gray-300 z-9 text-[#626262]"
                    style={{
                      borderCollapse: "separate",
                      borderSpacing: "0 20px",
                    }}
                  >
                    <thead className="  flex-col">
                      <tr>
                        <th
                          scope="col"
                          className="py-2 pl-4 pr-3 text-sm font-semibold text-left sm:pl-6"
                        >
                          {t("ORGANIZER")}
                        </th>

                        <th
                          scope="col"
                          className="px-3 py-2 text-sm font-semibold text-left"
                        >
                          {t("EVENTS_NAME")} / {t("EVENT_DETAILS")}
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 text-sm font-semibold text-left"
                        >
                          {t("TIME")}
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 text-sm font-semibold text-left"
                        >
                          {t("JOINED_MEMBER")}
                        </th>

                        <th
                          scope="col"
                          className="px-3 py-2 text-sm text-left font-semibol"
                        >
                          {t("ACTIONS")}
                        </th>
                      </tr>
                    </thead>

                    {filteredEvents?.map((event: any, index: number) => {
                      console.log("events",filteredEvents)
                      const likes = event.likes || [];
                      const isFavorite = event.isFavorite || false;

                      if (!event) {
                        console.error(`Event at index ${index} is undefined`);
                      }
                    
                      if (!event.teams) {
                        console.log(`event.teams is undefined for event`, event);
                      }
                    
                      event.teams?.forEach((team: any, teamIndex: number) => {
                        if (!team.members) {
                          console.error(`team.members is undefined for team at index ${teamIndex} in event`, event);
                        }
                      });

                      const liked = likes.find(
                        (like: any) =>
                          like?.userId && parseInt(`${like.userId}`) === parseInt(`${userId}`)
                      )?.counter;
                      const isUserIdMatched = event.teams 
                      ?event?.teams?.some((team: any) =>
                        team?.members?.some(
                          (member: any) => member?.userId == userId
                        )
                      ) : false;
                      console.log("isUserIdMatched:",isUserIdMatched)
                      const currentDate = new Date();
                      const endDate = new Date(event?.eventEndDate);
                      const deadlineData = new Date(event?.eventDeadlineDate);
                      const isEventOver = currentDate > endDate;
                      const isDeadlineOver = currentDate > deadlineData;
                      // const isJoined = 
                      const n = parseInt(userId || "");

                      const isUserIdInData = event?.teams?.some((team: any) =>
                        team?.members?.some((member: any) => member?.userId === n)
                      );


                      return (
                        <React.Fragment key={index}>
                          <tr
                            className="mt-4 p-1 rounded-lg cursor-pointer  hover:rounded-lg hover:bg-[#f0faf9] hover:text-black shadow-md"
                            style={{
                              width: "100%",
                              borderRadius: "10px",
                              border: "none"
                            }}
                          >
                            <td
                              className="py-2"
                              onClick={() => router(`/edit-team/${event.id}`)}
                            >
                              <div className="flex-wrap text-start items-center justify-start mx-4">
                                <img
                                  src={
                                    event?.creator?.imageUrl
                                      ? event?.creator?.imageUrl
                                      : "img/BG-GOLF.jpg"
                                  }
                                  alt=""
                                  className="w-14 h-14 border border-blue-600 border-solid rounded-full "
                                />

                                <div
                                  className="text-sm font-medium leading-6 truncate tableText"
                                  title={
                                    event.creator && event.creator.nickName
                                      ? event.creator.nickName
                                      : "N/A"
                                  }
                                >
                                  {event.creator && event.creator.nickName
                                    ? event.creator.nickName.length > 10
                                      ? `${event.creator.nickName.substring(
                                        0,
                                        10
                                      )}...`
                                      : event.creator.nickName
                                    : "N/A"}
                                </div>
                              </div>
                            </td>
                            <td
                              className="flex py-2 items-center justify-between ml-2 text-sm  text-center whitespace-pre-wrap xl:text-left"
                              onClick={() => router(`/edit-team/${event.id}`)}
                            >
                              <div className="flex flex-col ">
                                <p className="font-bold text-2xl  capitalize text-start">
                                  {event.eventName}
                                </p>

                                <span className="flex items-center gap-1 font-normal ">
                                  <MapPinIcon
                                    className={`-mr-0.5 h-4 w-4 ${event.type !== "full" && "text-[#33333]"
                                      }`}
                                    aria-hidden="true"
                                  />
                                  {event.place}
                                </span>
                                <p className="text-start m-0 my-1 text-sm ">
                                  {event.eventDetails.length > 100
                                    ? `${event.eventDetails.substring(
                                      0,
                                      100
                                    )}...`
                                    : event.eventDetails}
                                </p>
                              </div>
                            </td>
                            <td
                              className="px-3 py-2 text-sm whitespace-nowrap"
                              onClick={() => router(`/edit-team/${event.id}`)}
                            >
                              <p>{event.eventStartDate}</p>

                              {event.eventStartTime}
                            </td>

                            <td className="px-3 py-2 text-sm flex-wrap">
                              <p className="my-1 p-0">
                                <span className="font-medium m-0 p-0">
                                  {" "}
                                  {t("CONFIRMED")}:
                                </span>{" "}
                                {new Set(event.teams?.flatMap((team: any) => team?.members.map((member: any) => member?.userId))).size
                                }                  /              {event?.capacity * event?.teamSize}
                              </p>
                              <p className="m-0 p-0">
                                <span className="font-medium ">
                                  {t("WAITING")}:
                                </span>{" "}
                                {event.teamMemberCount} /{" "}
                                {event.capacity * event.teamSize}
                              </p>

                               {/* {checkedJoined &&
                                event.eventType !== "normal" &&
                                !isEventOver ? (
                                <span
                                  className=" w-[30%]  text-[#17B3A6] font-bold py-0 text-sm mx-0  sm:mx-2 cursor-pointer  "
                                  onClick={(e) => {
                                    e.preventDefault();
                                    router("/add-score-page/" + event.id);
                                  }}
                                >
                                  <p
                                    className="bg-[#DDF4F2] py-2 text-center rounded-lg m-0 hover:bg-black"
                                    style={{
                                      boxShadow:
                                        "rgb(253 253 255 / 0%) 0px 0px 0px 0px, rgba(0, 0, 0, 0.3) 0px 1px 11px 1px",
                                    }}
                                  >
                                    {t("ADD_SCORE")}
                                  </p>
                                </span>
                              ) : !isDeadlineOver || !isEventOver ? (
                                <span
                                  className={` ${isUserIdMatched
                                      ? "text-[#fff]"
                                      : "text-[#17B3A6]"
                                    } px-2  font-bold py-0 text-sm mx-0  sm:mx-2 cursor-pointer `}
                                  onClick={() => {
                                    isUserIdMatched &&
                                      event.scoringType != "Normal"
                                      ? router(`/add-score-page/${event.id}`)
                                      : isUserIdMatched &&
                                        event.scoringType == "Normal"
                                        ? router(`/edit-team/${event.id}`)
                                        : !isDeadlineOver && isUserIdMatched
                                          ? router("/pay-now/" + event.id)
                                          : router("/score-board/" + event.id);
                                  }}
                                >
                                  <p
                                    className={` ${isUserIdMatched
                                        ? "bg-[#ff373a]"
                                        : "bg-[#DDF4F2]"
                                      }   w-[70%] px-0 py-2 text-center rounded-lg m-0 hover:bg-black`}
                                    style={{
                                      boxShadow:
                                        "rgb(253 253 255 / 0%) 0px 0px 0px 0px, rgba(0, 0, 0, 0.3) 0px 1px 11px 1px",
                                    }}
                                  >
                                    {isUserIdMatched &&
                                      event.scoringType != "Normal"
                                      ? t("EDITSCORE")
                                      : isUserIdMatched &&
                                        event.scoringType == "Normal"
                                        ? t("hjgj")
                                        : !isDeadlineOver && isUserIdMatched
                                          ? t("JOIN")
                                          : t("VIEW_SCORE")}
                                  </p>
                                </span>
                              ) : (
                                <div
                                  className={` ${isUserIdMatched
                                      ? "text-[#fff]"
                                      : "text-[#17B3A6]"
                                    } px-2  font-bold py-0 text-sm mx-0  sm:mx-2 cursor-pointer `}
                                >
                                  <p
                                    className={` ${isUserIdMatched
                                        ? "bg-[#ff373a]"
                                        : "bg-[#DDF4F2]"
                                      }   w-[70%] px-0 py-2 mt-2 text-center rounded-lg m-0 hover:bg-black`}
                                    style={{
                                      boxShadow:
                                        "rgb(253 253 255 / 0%) 0px 0px 0px 0px, rgba(0, 0, 0, 0.3) 0px 1px 11px 1px",
                                    }}
                                  >
                                    {t("EVENT_END")}
                                  </p>
                                </div>
                              )} */}


                              {/* new one */}
                              {
                                isUserIdInData ?
                                  <>
                                    {event.eventType !== "normal" && isEventOver ?
                                      <div className="bg-red-600 text-white p-2 my-2 text-center rounded-lg m-0 hover:bg-red-600 hover:text-white w-max shadow-light-all" style={{
                                      }} >{t("EVENT_END")}</div>
                                      : event.eventType !== "normal" && !isEventOver ? <div onClick={(e) => {
                                        e.preventDefault();
                                        router("/edit-team/" + event.id);
                                      }} className="bg-red-600 text-white p-2 my-2 text-center rounded-lg m-0 hover:bg-red-700 hover:text-white w-max shadow-light-all">{t("ADD_SCORE")}</div>
                                        : event.eventType === "normal" && !isEventOver ? <div>{t("JOINED")}</div>
                                          : <div onClick={(e) => {
                                            e.preventDefault();
                                            router("/edit-team/" + event.id);
                                          }}>{t("EVENT_END")}</div>}
                                  </> :
                                  <>
                                    {
                                      isDeadlineOver ? <div onClick={(e) => {
                                        e.preventDefault();
                                        router("/edit-team/" + event.id);
                                      }} className="bg-[#fff] border-solid border-blue-500 border p-2 text-center my-2 shadow-light-all text-blue-500 rounded-lg m-0 hover:bg-blue-500 hover:text-white   w-max" style={{
                                      }}> {t("JOINING_OVER")} </div> : <div onClick={(e) => {
                                        e.preventDefault();
                                        router("/pay-now/" + event.id);
                                      }} className="bg-blue-500 text-white  p-2 text-center my-2 rounded-lg m-0 hover:bg-blue-600 hover:text-white w-max shadow-light-all" style={{
                                      }}>{t("JOIN_NOW")}</div>
                                    }


                                  </>
                              }
                            </td>
                            <td className="px-3 py-2 text-sm flex-wrap">
                            <div className="flex  flex-col">
                                <div className="flex flex-row gap-2 justify-center items-center py-0 text-sm whitespace-nowrap ">
                                  <div className="flex items-center gap-1 ">
                                    <div
                                      className={`flex shadow-light-all border border-solid  border-blue-500 hover:bg-blue-100 bg-${liked ? "white" : "[white]"
                                        } cursor-pointer p-1 rounded-md`}
                                      onClick={() => handleLike(event)}
                                    >{
                                      liked ?<HandThumbUpIcon
                                      className="w-4 h-4  text-blue-500"
                                    /> :  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 w-4 h-4 text-blue-700">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                  </svg>
                                    }
                                      
                                     
                                    </div>
                                    <div className="flex    text-center justify-center items-center ">
                                      <div className="text-[12px]  text-[#666]  ">
                                        {
                                          (event?.likes || []).filter(
                                            (like: any) => like.counter
                                          ).length
                                        }
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <div
                                      onClick={() => handleComment(event.id)}
                                      className="flex shadow-light-all border border-solid bg-white border-blue-500 hover:bg-blue-100 p-1 rounded-md"
                                    >
                                      {/*<ChatBubbleBottomCenterIcon className="w-4 h-4 text-blue-500 " />*/}
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 w-4 h-4 text-blue-700">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
</svg>

                                    </div>
                                    <div className="flex  rounded-md   text-center justify-center items-center  rounded-md ">
                                      <div className="text-[12px] text-[#666]">
                                        {event.comments?.length}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex  items-center gap-1">
                                    <div
                                      className={`flex shadow-light-all border border-solid border-blue-500 p-1 hover:bg-blue-100 bg-${isFavorite ? "[white]" : "[white]"
                                        }  cursor-pointer p-1 rounded-md`}
                                      onClick={() =>
                                        handleFavoriteClick(event.id)
                                      }
                                    >
                                      {
                                      isFavorite ? <HeartIcon
                                      className="w-4 h-4  text-blue-500"
                                    /> :  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 w-4 h-4 text-blue-700">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                  </svg>
                                  
                                    }
                                    </div>
                                    <div className="flex shadow-light-all border border-solid bg-white border-blue-500 p-1 rounded-md">
                                      <ShareIcon className="w-4 h-4 text-blue-500" />
                                    </div>
                                  </div>
                                </div>
                               <div className="flex w-100  gap-2 justify-center py-2 pt-4">
                                  <button
                                    className="border border-solid bg-white border-blue-500 shadow-light-all hover:bg-blue-500 hover:text-white text-blue-500 w-full font-bold py-2 px-2 rounded-md cursor-pointer"
                                    onClick={() =>
                                      router(`/score-board/${event.id}`)
                                    }
                                  >
                                    {t("VIEW")}
                                  </button>
                                   {event.creatorId == userId || ( 
                                    <button
                                      className="border border-solid bg-white border-blue-500 shadow-light-all hover:bg-blue-500 hover:text-white text-blue-500 w-full font-bold py-2 px-2 rounded-md cursor-pointer whitespace-nowrap"
                                      onClick={() => router(`/message-page/` + event.creatorId  )}
                                    >
                                      
                                      {t("CHAT")}
                                    </button>
                                    )}  

                                </div>
                            </div>
                            </td>
                          </tr>

                          {selectedEvent === event.id && (
                            <tr>
                              <SingleEventsContext>
                                <CommentModel
                                  closeModal={closeModal}
                                  eventIsd={event.id}
                                />
                              </SingleEventsContext>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </table>
                ) : (
                  eventss?.map((item: any) => {
                    const likes = item.likes || [];
                    const isFavorite = item.isFavorite || false;
                    const liked = likes.find(
                      (like: any) =>
                        parseInt(`${like.userId}`) === parseInt(`${userId}`)
                    )?.counter;
                    const isUserIdMatched = item?.teams?.some((team: any) =>
                      team?.members?.some(
                        (member: any) => member?.userId == userId
                      )
                    );
                    const currentDate = new Date();
                    const endDate = new Date(item?.eventEndDate);
                    const deadlineData = new Date(item?.eventDeadlineDate);
                    const isEventOver = currentDate > endDate;
                    const isDeadlineOver = currentDate > deadlineData;
                    const n = parseInt(userId || "");
                    const isUserIdInData = item?.teams?.some((team: any) =>
                      team.members.some((member: any) => member.userId === n)
                    );
                    return (
                      <div className="grid gap-2 px-4 py-1 border border-solid border-[#DCDCDC] mb-2 items-center">
                        <div className="grid grid-cols-2 bg-[#F5F5F5] items-center ">
                          <div className="py-2">
                            <p className="m-0">Organizer</p>
                          </div>
                          <div className="py-2">
                            <p className="m-0 text-start">Event Name/ Detail</p>
                          </div>
                        </div>
                        <div
                          className="grid grid-cols-2 bg-#ffffff  justify-center cursor-pointer"
                          onClick={() => router(`/edit-team/${item.id}`)}
                        >
                          <div className="flex justify-start cursor-pointer h-[50px] w-[50px]">
                            <img
                              src={
                                item.creator?.imageUrl
                                  ? item.creator?.imageUrl
                                  : "img/BG-GOLF.jpg"
                              }
                              alt=""
                              className="w-full h-full border border-indigo-600 border-solid rounded-full "
                            />
                          </div>
                          <div>
                            <p className="capitalize text-justify  p-0 m-0">
                              Event By: <br /> {item.eventName}
                            </p>
                            <p className="text-start m-0 my-1 text-sm ">
                              {item.eventDetails.length > 100
                                ? `${item.eventDetails.substring(0, 100)}...`
                                : item.eventDetails}
                            </p>
                          </div>
                          <div className="text-start">
                            <p className="m-0 ">
                              {item.creator && item.creator.nickName
                                ? item.creator.nickName
                                : "N/A"}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 bg-[#F5F5F5] items-center ">
                          <div className="p-2">Date</div>
                          <div className="p-2">Joined Members</div>
                          <div className="p-2">Actions</div>
                        </div>
                        <div className="grid grid-cols-3 bg-[#ffffff] cursor-pointer">
                          <div
                            className="p-2"
                            onClick={() => router(`/edit-team/${item.id}`)}
                          >
                            {item.eventStartDate}
                          </div>
                          <div
                            className="p-2"
                            onClick={() => router(`/edit-team/${item.id}`)}
                          >
                            <p className="my-1 p-0">
                              <span className="font-bold text-sm m-0 p-0">
                                {t("CONFIRMED")}:
                              </span>
                              <br />
                              {

                                new Set(item?.teams?.map((team: any) => team?.userId)).size
                              } /
                              {item.capacity * item.teamSize}
                            </p>
                            <p
                              className="m-0 p-0  pb-2 "
                              onClick={() => router(`/edit-team/${item.id}`)}
                            >
                              <span className="font-bold text-sm">
                                {t("WAITING")}:
                              </span>{" "}
                              <br /> {item.teamMemberCount} /{" "}
                              {item.capacity * item.teamSize}
                            </p>
                            {
                              isUserIdInData ?
                                <>
                                  {item.eventType !== "normal" && isEventOver ?
                                    <span className="bg-red text-white p-2 text-center rounded-lg m-0 hover:bg-black hover:text-white w-full" style={{
                                      boxShadow:
                                        "rgb(253 253 255 / 0%) 0px 0px 0px 0px, rgba(0, 0, 0, 0.3) 0px 1px 11px 1px",
                                    }} >{t("EVENT_END")}</span>
                                    : item.eventType !== "normal" && !isEventOver ? <span onClick={(e) => {
                                      e.preventDefault();
                                      router("/edit-team/" + item.id);
                                    }} className="bg-red text-white p-2 text-center rounded-lg m-0 hover:bg-black hover:text-white">{t("ADD_SCORE")}</span>
                                      : item.eventType === "normal" && !isEventOver ? <span>{t("JOINED")}</span>
                                        : <span onClick={(e) => {
                                          e.preventDefault();
                                          router("/edit-team/" + item.id);
                                        }}>{t("EVENT_END")}</span>}
                                </> :
                                <>
                                  {
                                    isDeadlineOver ? <span onClick={(e) => {
                                      e.preventDefault();
                                      router("/edit-team/" + item.id);
                                    }} className="bg-[#ddf4f2]  p-2 text-center text-[#17B3A6] rounded-lg m-0 hover:bg-black hover:text-white " style={{
                                      boxShadow:
                                        "rgb(253 253 255 / 0%) 0px 0px 0px 0px, rgba(0, 0, 0, 0.3) 0px 1px 11px 1px",
                                    }}> {t("JOINING_OVER")} </span> : <span onClick={(e) => {
                                      e.preventDefault();
                                      router("/pay-now/" + item.id);
                                    }} className="bg-white  p-2 text-center rounded-lg m-0 hover:bg-black hover:text-white" style={{
                                      boxShadow:
                                        "rgb(253 253 255 / 0%) 0px 0px 0px 0px, rgba(0, 0, 0, 0.3) 0px 1px 11px 1px",
                                    }}>{t("JOIN")}</span>
                                  }


                                </>
                            }
                          </div>
                          <div className="p-2">
                            <div className="text-start flex items-center">
                              <div>
                                <td className="flex gap-3 justify-center items-center py-0 text-sm whitespace-nowrap ">
                                  <div className="flex flex-col items-center gap-1 ">
                                    <div
                                      className={`flex shadow-lg cursor-pointer p-1 rounded-md`}
                                      onClick={() => handleLike(item)}
                                    >
                                      <HandThumbUpIcon
                                        className={`w-4 h-4 text-${liked ? "red" : "[#17B3A6]"
                                          } `}
                                      />
                                    </div>
                                    <div className="flex bg-white border border-solid  border-[#17B3A6] p-1 rounded-md   cursor-pointer text-center justify-center items-center h-4 w-4 p-1 rounded-md ">
                                      <div className="text-[12px]  text-[#17B3A6]  ">
                                        {
                                          (item?.likes || []).filter(
                                            (like: any) => like.counter
                                          ).length
                                        }
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-center gap-1">
                                    <div
                                      onClick={() => handleComment(item.id)}
                                      className="flex shadow-lg border border-solid bg-white border-[#17B3A6] hover:bg-black p-1 rounded-md"
                                    >
                                      <ChatBubbleBottomCenterIcon className="w-4 h-4 text-[#17B3A6] " />
                                    </div>
                                    <div className="flex bg-white border border-solid  border-[#17B3A6] p-1 rounded-md   cursor-pointer text-center justify-center items-center h-4 w-4 p-1 rounded-md ">
                                      <div className="text-[12px] text-[#17B3A6]">
                                        {item.comments?.length}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-center gap-1">
                                    <div
                                      className={`flex shadow-lg border border-solid border-[#17B3A6] p-1 hover:bg-black bg-${isFavorite ? "[white]" : "[white]"
                                        }  cursor-pointer p-1 rounded-md`}
                                      onClick={() =>
                                        handleFavoriteClick(item.id)
                                      }
                                    >
                                      <FontAwesomeIcon
                                        icon={faHeart}
                                        className={`h-4 w-4 text-${isFavorite ? "[red]" : "[#17B3A6]"
                                          }`}
                                      />
                                    </div>
                                    <div className="flex shadow-lg border border-solid bg-white border-[#17B3A6] p-1 rounded-md">
                                      <ShareIcon className="w-4 h-4 text-[#17B3A6]" />
                                    </div>
                                  </div>
                                </td>
                                <div className="flex items-center justify-center py-2 mt-[25px]">
                                  <button
                                    className="bg-[#DDF4F2] hover:bg-black text-[#17B3A6] font-bold py-2 px-8 rounded cursor-pointer"
                                    onClick={() =>
                                      router(`/score-board/${item.id}`)
                                    }
                                    style={{
                                      boxShadow:
                                        "rgb(253 253 255 / 0%) 0px 0px 0px 0px, rgba(0, 0, 0, 0.3) 0px 1px 11px 1px",
                                    }}
                                  >
                                    {t("VIEW")}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {selectedEvent === item.id && (
                          <div className="flex justify-center">
                            <SingleEventsContext>
                              <CommentModel
                                closeModal={closeModal}
                                eventIsd={item.id}
                              />
                            </SingleEventsContext>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Table.defaultProps = {
  events: [],
};

export default Table;
