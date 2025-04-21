// src/components/Messages/Messages.tsx

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import GigsModal from "./MessageGigModel"; // Ensure correct import path
import { userAuthContext } from "../../contexts/authContext";
import { getTimeAgo } from "../../pages/ReadPost";
import {
  deleteChatMessage,
  fetchMessage,
  postChat,
  updateChatMessage,
  updateMessageStatus,
} from "../../utils/fetchChat";
import { Client as PusherPushNotifications } from "@pusher/push-notifications-web";
import { toast } from "react-toastify";

const Messages: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [messageDropdown, setMessageDropdown] = useState<any>(null);
  const [showmessageDropdown, setShowMessageDropdown] = useState<any>(false);
  const sender = localStorage.getItem("id");
  const [editMessage, setEditMessage] = useState<any>(null);
    const [isSending, setIsSending] = useState(false);

  const {
    receiver,
    handleNotificationCount,
    handleLoading,
    activeChatId,
    handleChatId,
    loading,
  } = userAuthContext();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Fetch messages when sender, receiver, loading, or notificationCount changes
  useEffect(() => {
    if (sender && receiver) {
      fetchMessage(receiver, sender, setMessages);
    }
  }, [sender, receiver, loading]);

  // Setup push notifications on component mount
  useEffect(() => {
    setupNotifications();
  }, [sender]);

  // Handle incoming service worker messages for notifications
  useEffect(() => {
    const handleNotification = (event: any) => {
      if (event.data && event.data.type === "NEW_NOTIFICATION") {
        const incomingMessage = {
          sender: event.data.title,
          message: event.data.body,
          timestamp: new Date().toISOString(),
        };
        handleNotificationCount(incomingMessage);
      }
    };

    const checkForNotifications = () => {
      if (navigator.serviceWorker) {
        navigator.serviceWorker.ready
          .then((registration) => {
            if (registration.active) {
              console.log("Adding event listener for service worker messages");
              navigator.serviceWorker.addEventListener(
                "message",
                handleNotification
              );
            }
          })
          .catch((error) => {
            console.error("Service Worker not ready:", error);
          });
      } else {
        console.error("Service Worker is not supported or not registered.");
      }
    };

    checkForNotifications();

    return () => {
      if (navigator.serviceWorker) {
        navigator.serviceWorker.ready.then((registration) => {
          if (registration.active) {
            console.log("Removing event listener for service worker messages");
            navigator.serviceWorker.removeEventListener(
              "message",
              handleNotification
            );
          }
        });
      }
    };
  }, []);

  // Scroll to the bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to send a new message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;
    setIsSending(true); 
    console.log("isSending:",isSending);
    const formData = {
      newMessage: newMessage.trim(),
      sender: sender,
      receiver: receiver,
    };
    try {
      await postChat(formData, setMessages, handleLoading);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false); // enable the button again
    }
   
  };

  // Function to setup push notifications
  const setupNotifications = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted" && sender) {
          const beamsClient = new PusherPushNotifications({
            instanceId: process.env.REACT_APP_PUSHER_INSTANCE_KEY || "",
          });

          beamsClient
            .start()
            .then(() => beamsClient.addDeviceInterest(`user-${sender}`))
            .then(() =>
              console.log("Successfully registered and subscribed to interest!")
            )
            .catch(console.error);
        }
      });
    } else {
      console.error("Notifications are not supported by this browser.");
    }
  };

  // Toggle message dropdown for options like edit and delete
  const handleMessageDropdown = (msgId: any) => {
    setMessageDropdown(msgId);
    setShowMessageDropdown((prev:any) => !prev);
  };

  // Delete a specific message
  const handleDeleteMessage = async (msgId: any) => {
    await deleteChatMessage(msgId, handleLoading);
  };

  // Edit a specific message
  const editChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editMessage || !editMessage.message.trim()) return;

    const formData = {
      messageId: editMessage.id,
      isRead: false,
      message: editMessage.message.trim(),
    };
    await updateChatMessage(formData, handleLoading);
    setEditMessage(null);
  };

  // Toggle message read/unread status
  const handleMessageStatus = async (msgId: any, isRead: boolean) => {
    const formData = {
      messageId: msgId,
      isRead: isRead,
    };
    await updateMessageStatus(formData, handleLoading);
  };

  // Handle input change when editing a message
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedMessage = e.target.value;
    setEditMessage((prev: any) => ({
      ...prev,
      message: updatedMessage,
    }));
  };

  // Navigate back to previous chat or user page
  const handleBack = () => {
    handleChatId(false);
  };

  // Toggle GigsModal open state
  const handleAllGigsClick = () => {
    setIsModalOpen((prev) => !prev);
  };

  /**
   * **handleForwardGig Function**
   * Formats the gig details and sends them as a chat message.
   * @param {Object} gig - The gig object containing details to forward.
   */
  const handleForwardGig = async (gig: any) => {
    const formattedMessage = `Gig Details:\n- Title: ${gig.title}\n- Price: ¥${gig.price}\n- Description: ${gig.description}`.trim();
  
    const formData = {
      newMessage: formattedMessage,
      sender: sender,
      receiver: receiver,
    };
    await postChat(formData, setMessages, handleLoading);
    setIsModalOpen(false); // Close the modal after forwarding
    toast.success(t("Gig details forwarded successfully!"));
  };
  

  return (
    <div
      className={`md:flex ${activeChatId ? "block" : "hidden"
        } overflow-hidden flex-col justify-center md:h-[80vh] pb-16 sticky w-full relative bg-white md:shadow-lg`}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-8 shadow-lg p-4">
        {/* User Info and Back Button */}
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => {
            navigate("/user-page/" + messages.sender?.id);
          }}
        >
          {activeChatId && (
            <button
              className="bg-grey block md:hidden rounded-full h-6 w-6 cursor-pointer"
              onClick={handleBack}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          )}
          <img
            src={messages.sender?.imageUrl}
            className="rounded-full"
            width="50px"
            height="50px"
            alt="Receiver"
          />
          <p>{messages.sender?.nickName}</p>
        </div>
        {/* All Gigs Button */}
        <div className="cursor-pointer">
          <button
            className="bg-[#17b3a6] text-white p-2 rounded-md"
            onClick={handleAllGigsClick}
          >
            {t("All gigs")}
          </button>
          {isModalOpen && (
            <GigsModal
              userId={messages.sender?.id}
              isOpen={isModalOpen}
              handleAllGigsClick={handleAllGigsClick}
              onForwardGig={handleForwardGig}
            />
          )}
        </div>
        {/* Optional: Member Since Info */}
        {/* <div>
          <p>
            Member Since:
            {getTimeAgo(new Date(messages.receiver?.createdAt), t)}
          </p>
        </div> */}
      </div>

      {/* Messages Display */}
      <div className="flex-1  custom-scrollbar md:overflow-y-auto bg-white border border-gray-300 rounded-lg p-4">
        {messages.userMessages?.length > 0 ? (
          messages.userMessages.map((msg: any, index: number) => (
            <div
              key={index}
              className={`p-2 mb-2 sm:w-1/2 w-full rounded-e-xl relative ${msg.sender === sender
                  ? "float-right rounded-es-xl bg-gray-100 w-11/12"
                  : "float-left w-11/12 bg-[#e4fffd]"
                }`}
            >
              {/* Timestamp and Dropdown */}
              <div className="absolute z-50 right-[40px] md:right-[10px] top-0 p-2  flex justify-center gap-1 items-center">
                <span>
                  <small className="text-gray-500">
                    {getTimeAgo(new Date(msg.timestamp), t)}
                  </small>
                </span>
                {
                  <button
                    className="p-0 m-0  focus:outline-none bg-transparent"
                    onClick={() => {
                      handleMessageDropdown(msg.id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="black"
                      className="w-6 h-6 cursor-pointer"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                }
              </div>

              {/* Dropdown Menu */}
              {messageDropdown == msg.id && showmessageDropdown && (
                <div className="absolute right-[15%] h-auto p-2 w-24 rounded-md bg-white z-50 ">
                  {sender != msg.receiver && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setEditMessage((prevState: any) =>
                            prevState?.id === msg.id
                              ? null
                              : { id: msg.id, message: msg.message }
                          );
                          setShowMessageDropdown(
                            (prevState: any) => !prevState
                          );
                        }}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleDeleteMessage(msg.id);
                          setShowMessageDropdown(
                            (prevState: any) => !prevState
                          );
                        }}
                        className="focus:outline-none text-white bg-red hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                      >
                        Delete
                      </button>
                    </>
                  )}
                  {sender == msg.receiver && (
                    <>
                      {msg.is_read == false ? (
                        <button
                          type="button"
                          onClick={() => {
                            handleMessageStatus(msg.id, true);
                            setShowMessageDropdown(
                              (prevState: any) => !prevState
                            );
                          }}
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                        >
                          Read
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            handleMessageStatus(msg.id, false);
                            setShowMessageDropdown(
                              (prevState: any) => !prevState
                            );
                          }}
                          className="focus:outline-none text-white bg-red hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                        >
                          Unread
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Message Content */}
              <div className="flex items-start gap-4 relative">
                <div>
                  <div className="flex items-start">

                    <strong
                      className={`text-blue-600 gap-4 ${msg.sender === sender ? "text-left" : "text-right"}`}
                    >
                      {msg.sender === sender ? (
                        <>
                          {/* <img
                            src={messages.sender?.imageUrl}  
                            className="rounded-full"
                            width="30px"
                            height="30px"
                            alt="Sender Image"
                          /> */}
                          Me
                        </>
                      ) : (
                        <div className="flex items-center gap-2">
                          <img
                            src={messages.sender?.imageUrl}
                            className="rounded-full"
                            width="30px"
                            height="30px"
                            alt="Receiver Image"
                          />
                          {messages.sender?.nickName}
                        </div>
                      )}
                    </strong>

                  </div>
                  <p className="whitespace-pre-wrap">
                    {editMessage?.id === msg.id ? (
                      <form onSubmit={editChatMessage}>
                        <input
                          type="text"
                          name="message"
                          value={editMessage.message}
                          onChange={handleInputChange}
                        />
                        <button type="submit" className="">
                          update
                        </button>
                      </form>
                    ) : (
                      msg.message
                      
                    )}
                    
                  </p>
                </div>
              </div>

              {/* Read Receipt */}
              {msg.sender === sender && msg.is_read && (
                <small className="text-green-600">{t("Read")}</small>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">{t("No messages available.")}</p>
        )}
        <div ref={messagesEndRef} />
        <form
        onSubmit={handleSendMessage}
        className="block z-[0] md:absolute bottom-[-2%] w-[97%] gap-2 md:p-4   border-t border-gray-300 "
      >
        <div className="fixed bg-[#e6e6e6] md:bg-transparent px-1 py-2 justify-center gap-2  md:justify-start flex md:sticky md:top-0 w-full bottom-0  flex gap-2 p-[12px 0px] z-[9999]">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write message"
            required
            className="flex md:flex-1 px-3 w-[80%] md:px-5 xl:w-[600px] py-2 border-[1px] border-solid border-[#e7e7e7] rounded-lg  transition-shadow duration-200 ease-in-out shadow-sm focus:shadow-md hover:shadow-lg"

          />
          <button
            type="submit"
            disabled={isSending || !newMessage}
            className="w-[15%] md:w-auto mx-2 md:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          >
            <PaperAirplaneIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>
        </div>
      </form>
      </div>

      {/* Message Input Form */}
      
    </div>
  );
};

export default Messages;
