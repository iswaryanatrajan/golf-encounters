import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
  MapPinIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import CommentModel from "./CommentModel";
import { API_ENDPOINTS } from "../appConfig";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { ToastConfig, toastProperties } from "../constants/toast";
import { eventContextStore } from "../contexts/eventContext";
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

const CreatedEventTable: React.FunctionComponent<TableProps> = ({ events }) => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const { joinedEvents, handleJoinedEvents } = eventContextStore();
  const router = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const handleComment = (eventId: string) => {
    setSelectedEvent(eventId);
    setShowModal(!showModal);
  };

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
        handleJoinedEvents((prevs: any) =>
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
        handleJoinedEvents((prev: any) =>
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
      toast.error(
        `Please Login`,
        toastProperties as ToastConfig
      );
    }
  };

  const userId = localStorage.getItem("id");


  console.log(joinedEvents, "joinedEvents")

  return (
    <div className="animate__animated animate__fadeInLeft">
      {(joinedEvents || []).length === 0 ? (
        <div className="p-5 text-center">
          <span className="text-lg font-medium">No events yet</span>
        </div>
      ) : (

        <div className="flow-root  ">
          <div className="-my-2 overflow-x-auto xl:overflow-x-auto ">
            <div className="inline-block min-w-full py-0 align-middle ">
              <div className="overflow-hidden sm:rounded-lg">
                <table
                  className="relative min-w-full px-3 divide-y divide-gray-300 z-9"
                  style={{
                    borderCollapse: "separate",
                    borderSpacing: "0 20px",
                  }}
                >
                  <thead className="bg-[#006800] text-white ">
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
                        {t("TIME")}
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2 text-sm font-semibold text-left"
                      >
                        {t("EVENTS_NAME")}
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

                  {joinedEvents?.map((event: any, index: number) => {
                    const likes = event.likes || [];
                    const isFavorite = event.isFavorite || false;
                    const liked = likes.find(
                      (like: any) =>
                        parseInt(`${like.userId}`) === parseInt(`${userId}`)
                    )?.counter;

                    return (
                      <React.Fragment key={index}>
                        <tr
                          className="mt-4 rounded-lg cursor-pointer text-black hover:rounded-lg hover:bg-[#17b3a6] hover:text-white"
                          style={{
                            width: "100%",
                            borderRadius: "10px",
                            border: "none",
                            boxShadow:
                              "rgb(253 253 255 / 0%) 0px 0px 0px 0px, rgba(0, 0, 0, 0.3) 0px 1px 11px 1px",
                          }}
                        >
                          <td
                            className=""
                            onClick={() => router(`/edit-team/${event.id}`)}
                          >
                            <div className="flex-wrap text-start items-center justify-start mx-4">
                              <img
                                src={
                                  event.imageUrl[0]
                                    ? event.imageUrl[0]
                                    : "img/BG-GOLF.jpg"
                                }
                                alt=""
                                className="w-16 h-16 border border-indigo-600 border-solid rounded-full "
                              />

                              <div
                                className="text-lg font-medium leading-6 truncate tableText"
                                title={event.creator && event.creator.nickName ? event.creator.nickName : "N/A"}
                              >
                                {event.creator && event.creator.nickName
                                  ? event.creator.nickName.length > 10
                                    ? `${event.creator.nickName.substring(0, 10)}...`
                                    : event.creator.nickName
                                  : "N/A"}
                              </div>

                            </div>
                          </td>

                          <td
                            className="px-3 py-0 text-sm whitespace-nowrap"
                            onClick={() => router(`/edit-team/${event.id}`)}

                          >
                            <p>
                              {event.eventStartDate}
                            </p>

                            {event.eventStartTime}
                          </td>
                          <td
                            className="flex items-center justify-between ml-2 text-sm  text-center whitespace-pre-wrap xl:text-left"
                            onClick={() => router(`/edit-team/${event.id}`)}
                          >
                            <div className="flex flex-col ">
                              <p className="font-bold text-2xl  capitalize text-start">{event.eventName}</p>
                              
                              <span className="flex items-center gap-1 font-normal ">
                                <MapPinIcon
                                  className={`-mr-0.5 h-4 w-4 ${event.type !== "full" && "text-[#33333]"
                                    }`}
                                  aria-hidden="true"
                                />
                                {event.place}
                              </span>
                              <p className="text-start m-0 my-1 text-sm ">{event.eventDetails}</p>
                            </div>

                            <span className="md:whitespace-nowrap px-2 text-[#17b3a6] py-0 text-sm mx-0  sm:mx-2 cursor-pointer rounded-lg  ">
                              <div
                                rel="noopener noreferrer"
                                className={`md:whitespace-nowrap rounded-lg px-0 text-[#17b3a6] py-1 text-sm mx-0 sm: cursor-pointer ${event.type === "full"
                                    ? "shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] text-[#17b3a6] bg-white hover:bg-black cursor-pointer py-0 mt-[-10px] animate__animated animate__heartBeat animate__repeat-3  h-full rounded-lg"
                                    : "shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] text-[#17b3a6] bg-white hover:bg-black py-0 mt-[10px] animate__animated animate__heartBeat   h-[100%] rounded-lg"
                                  }`}
                              >
                                <p className="p-2 sm:text-lg xl:text-x">{t("JOIN")}</p>
                              </div>
                            </span>
                          </td>
                          <td
                            className="px-3 py-0 text-sm flex-wrap"
                            onClick={() => router(`/edit-team/${event.id}`)}
                          >
                            <p>
                              <span className="font-bold"> {t("CONFIRMED")}:</span>  {event.teamMemberCount} / {event.capacity * event.teamSize}
                            </p>
                            <p>
                              <span className="font-bold">
                                {t("WAITING")}:
                              </span> {event.teamMemberCount} / {event.capacity * event.teamSize}

                            </p>

                          </td>
                          <td className="flex gap-1 px-3 py-0 text-sm whitespace-nowrap ">
                            <div className="flex flex-col items-center gap-1 ">
                              <div
                                className={`flex shadow-lg border border-solid border-white hover:bg-black bg-${liked ? "green" : "[#17B3A6]"
                                  } cursor-pointer p-1 rounded-md`}
                                onClick={() => handleLike(event)}
                              >
                                <HandThumbUpIcon className="w-3 h-3 text-white" />
                              </div>
                              <div className="flex bg-[#17B3A6]  cursor-pointer text-center justify-center h-3 w-3 p-1 rounded-md shadow-lg border border-solid border-white ">
                                <div className="text-[10px] text-white  ">
                                  {
                                    (event?.likes || []).filter(
                                      (like: any) => like.counter
                                    ).length
                                  }
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                              <div
                                onClick={() => handleComment(event.id)}
                                className="flex bg-[#17B3A6] cursor-pointer p-1 rounded-md shadow-lg border border-solid border-white hover:bg-black"
                              >
                                <ChatBubbleBottomCenterIcon className="w-3 h-3 text-white " />
                              </div>
                              <div className="flex bg-[#17B3A6]  cursor-pointer text-center justify-center h-3 w-3 p-1 rounded-md shadow-lg border border-solid border-white">
                                <div className="text-[10px] text-white">
                                  {event.comments?.length}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                              <div
                                className={`flex shadow-lg border border-solid border-white hover:bg-black bg-${isFavorite ? "[#006800]" : "[#17B3A6]"
                                  } cursor-pointer p-1 rounded-md`}
                                onClick={() => handleFavoriteClick(event.id)}
                              >
                                <FontAwesomeIcon
                                  icon={faHeart}
                                  className={`h-3 w-3 text-white`}
                                />
                              </div>
                              <div className="flex bg-[#17B3A6]  cursor-pointer text-center justify-center h-3 w-3 p-1 rounded-md shadow-lg border border-solid border-white">
                                <ShareIcon className="w-3 h-3 text-white" />
                              </div>
                            </div>
                          </td>
                          <div className="flex items-center justify-start my-1 ml-4">
                            <button
                              className="bg-[#52FF86] hover:bg-black text-white font-bold py-1 px-4 rounded cursor-pointer"
                              onClick={() => router(`/score-board/${event.id}`)}
                            >
                              {t("VIEW")}
                            </button>
                          </div>
                        </tr>

                        {selectedEvent === event.id && (
                          <tr>
                            <CommentModel
                              closeModal={closeModal}
                              eventIsd={selectedEvent}
                            />
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



export default CreatedEventTable;
