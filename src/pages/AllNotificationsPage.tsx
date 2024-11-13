import { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { notificationsContextStore } from "../contexts/notificationContext";
import { getTimeAgo } from "./ReadPost";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchNotifications, updateNotificationsStatus } from "../utils/fetchNotifications";
import { API_ENDPOINTS } from "../appConfig";
import axios from "axios";
import { isHtmlElement } from "react-router-dom/dist/dom";

export default function AllNotification() {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const { t } = useTranslation();
  // const [isLoading, setIsLoading] = useState(true);

  const { isloading, handleMessage, notificationData } =
    notificationsContextStore();

    console.log(notificationData ,"hellonotificationData")
  const handleApprove = (e: any, eventId: any, message: any) => {
    e.preventDefault();

    const obj = {
      notificationId: eventId,
      message: message,
    }
   const updateNotificationsStatus = async (
      
    ) => {
      handleMessage(true);
      try {
        const token = localStorage.getItem("token");
        const headers: any = {};
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
        const response = await axios.put(API_ENDPOINTS.UPDATENOTIFICATIONSTATUS, obj, { headers });
        if (response.status === 200) {
          window.location.reload(); 
        }
        handleMessage(false);
      } catch (error) {
        console.log(error);
        handleMessage(false); 
      }
    };
    updateNotificationsStatus();
    toast.success(t("MARKED_SUCCESS"));

  };
  
  return (
    <>
      {
        isloading ? <div className="flex justify-center items-center h-[100vh]">
          <div>
            <img className="w-10 h-10 animate__animated animate__bounce animate__infinite " src="/img/golfball.jpg" alt="" />
            <p>loading...</p>
          </div>
        </div> :
          <div className="max-w-7xl mx-10 xl:mx-auto">
            <h4>{t("ALL_NOTIFICATION")}</h4>
            <div
              aria-live="assertive"
              className=" h-screen animate__animated animate__fadeInLeft "
            >
              <div className="w-full justify-center">
                {notificationData?.map((item: any, index: any) => {
                  return (
                    <Transition
                      show={show}
                      as={Fragment}
                      enter="transform ease-out duration-300 transition"
                      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className={`mt-2 pointer-events-auto w-full max-w-5xl rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 ${!item.isRead ? 'bg-[#f3f3f3]' : 'bg-white'
                        }`} onClick={(e) => {
                          



                          if (item?.eventId !== null) {
                            if(item?.isRead != true){
                              handleApprove(e, item?.id, item?.message)

                            }
                            navigate('/edit-team/' + item?.eventId);

                          } else if (item?.teacherId !== null) {
                            if(item?.isRead != true){
                              handleApprove(e, item?.id, item?.message)

                            }
                            navigate('/appointments');

                          } else if (item?.postId !== null) {
                            if(item?.isRead != true){
                              handleApprove(e, item?.id, item?.message)

                            } else
                            navigate('/read-post/' + item?.postId);

                          }

                        }}>
                        
                        <div className="p-4">
                          <div className="flex items-start">
                            <div className="flex items-center justify-center  border-2 border-solid border-[#17b3a6] rounded-full  h-8 w-8">
                              <img
                                className="w-full h-full rounded-full"
                                src={item?.User.imageUrl}
                                alt=""
                              />
                            </div>
                            <div className="ml-3 w-0 flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {item.User.nickname}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.message}
                              </p>
                            
                            </div>
                            <div className="text-start flex-col mb-2">
                              {!item.isRead && (
                                <div className=" text-left">
                                  <button
                                    type="button"
                                    className="text-[11px] cursor-pointer text-black bg-transparent text-xs"
                                    onClick={(e) =>
                                      handleApprove(e, item?.id, item?.message)
                                    }
                                  >
                                    {t("IS_READ")}
                                  </button>

                                </div>
                              )}
                              <p className="text-[12px]">
                                {getTimeAgo(new Date(item?.createdAt), t)}
                              </p>

                            </div>
                          </div>
                        </div>
                      </div>
                    </Transition>
                  );

                })}
              </div>
            </div>
          </div>
      }
    </>
  );
}
