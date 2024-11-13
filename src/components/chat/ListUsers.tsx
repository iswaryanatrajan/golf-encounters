import React, { useEffect, useState } from "react";
import axios from "axios";
import { Client as PusherPushNotifications } from "@pusher/push-notifications-web";
import { UsersList } from "./UsersList";
import { userAuthContext } from "../../contexts/authContext";
import { useTranslation } from "react-i18next";
import { getTimeAgo } from "../../pages/ReadPost";
import { API_ENDPOINTS } from "../../appConfig";
import {
  fetchMessages,
  fetchOnlineUsers,
  updateChatStatus,
} from "../../utils/fetchChat";
import {
  faHome,
  faGlobe,
  faBell,
  faUser,
  faCalendar,
  faUserFriends,
  faMessage,
  faPeopleGroup,
  faSearch,
  faGear,
  faSignOutAlt,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
const AllUserChat = () => {
  const { t, i18n } = useTranslation();
  const [sender, setSender] = useState(localStorage.getItem("id"));
  const [markChecked, setMarkChecked] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const { newChat } = useParams();  // Get newChat from params


  const {
    handleSelectedUser,
    receiver,
    handleNotificationCount,
    notificationCount,
    handleReceiver,
    handleChatId,
    activeChatId,
    allChat,
    handleLoading,
    loading,
  } = userAuthContext();

  useEffect(() => {
    // Check if allChat and allChat.user exist and have users
    if (newChat) {
      handleReceiver(newChat);
      handleChatId(newChat);
    } else {
      handleReceiver(allChat[0]?.user?.id);
      handleChatId(allChat[0]?.user.id);
    }
    fetchOnlineUsers(setOnlineUsers);

  }, [allChat, loading, newChat]);

  const handleChatStatus = () => {
    const formData = {
      sender: sender,
      receiver: receiver,
    };
    updateChatStatus(formData, handleLoading);
  };
  const router = useNavigate();
  console.log(onlineUsers, "isOnline");
  return (
    <div className={` w-[100%]  h-[100vh] sticky md:block md:w-[30%] ${activeChatId ? "hidden" : "block"}`}>
      <div className=" shadow-lg pb-10 h-full md:h-[83%] overflow-hidden overflow-y-auto bg-[#17b3a6]  ">
        <div className="px-2 text-white">
          <div className="flex items-center gap-10">

            <h4 className="ml-0 md:ml-3">{t("MESSAGE")}</h4>
          </div>

          <UsersList />
        </div>

        {allChat.map((item: any) => {
          const isActive = activeChatId == item.user.id;
          const hasNotification = notificationCount.some(
            (notif: any) => notif.sender == item.user.id
          );
          const isOnline = onlineUsers.includes(item.user.id.toString());
          return (
            <div
              key={item.user.id}
              className={`border-solid border-[#c8c8c8] border-b-[1px] cursor-pointer pt-3 relative ${isActive ? "bg-black" : ""
                }`}
              onClick={(e: any) => {
                handleReceiver(item.user.id);
                handleChatId(item.user.id);
                router('/message-page/' + item.user.id)
              }}
            >
              <div className="flex items-center p-2 gap-4 z-[0]">
                <img
                  width="50px"
                  height="50px"
                  className="rounded-full"
                  src={item.user.imageUrl || "/img/zozo.png"}
                  alt={`${item.user.nickName}'s profile`}
                />
                <span>
                  <p className="text-white font-bold">
                    {item.user.nickName}&nbsp; &nbsp; &nbsp;
                    <span>
                      <small className="text-white">
                        {getTimeAgo(new Date(item.messages[0].timestamp), t)}
                      </small>
                    </span>
                  </p>

                  <p className="text-white">
                    {item.messages[0].message
                      ? item.messages[0].message.slice(0, 15) + (item.messages[0].message.length > 10 ? '...' : '')
                      : ''}
                  </p>

                </span>
                {isOnline ? (
                  <span className="w-4 h-4 absolute top-[30%] left-[15%] bg-blue-400 rounded-full"></span>
                ) : (
                  ""
                )}
              </div>
              {item.messages?.filter(
                (e: any) => e.is_read == false && e.receiver == sender
              )?.length > 0 && (
                  <div className=" absolute right-[10%] top-[50%] flex cursor-pointer rounded-full text-center bg-red  text-white">
                    {/* {item.messages.length} */}
                    <div className="   rounded-full w-[20px]">
                      {
                        item?.messages.filter(
                          (i: any) => i.is_read == false && i.receiver == sender
                        ).length
                      }
                    </div>

                    <button
                      className="rounded"
                      onClick={(e: any) => {
                        e.preventDefault();
                        handleChatStatus();
                      }}
                    >
                      mark as read
                    </button>
                  </div>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllUserChat;
