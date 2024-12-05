import React, { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { notificationsContextStore } from "../contexts/notificationContext";
import { getTimeAgo } from "./ReadPost";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY; // Add this key in your .env file

export default function AllNotification() {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const { t, i18n } = useTranslation();
  const { isloading, handleMessage, notificationData } =
    notificationsContextStore();
  
  const [translatedMessages, setTranslatedMessages] = useState<Record<number, string>>({});
  const BATCH_SIZE = 1;

  // Function to translate a batch of messages using Google Translate API
  const translateBatch = async (batch: { id: number; message: string }[]) => {
    try {
      const translationsPromises = batch.map((item) =>
        axios.post(
          `https://translation.googleapis.com/language/translate/v2`,
          null,
          {
            params: {
              key: GOOGLE_API_KEY,
              q: item.message,
              target: i18n.language, // Use the current language set in i18n
            },
          }
        )
      );

      const responses = await Promise.all(translationsPromises);
      const newTranslations: Record<number, string> = {};

      responses.forEach((response, index) => {
        const translatedText = response.data.data.translations[0]?.translatedText || batch[index].message;
        newTranslations[batch[index].id] = translatedText;
      });

      setTranslatedMessages((prev) => ({ ...prev, ...newTranslations }));
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Throttle requests
    } catch (error) {
      console.error("Translation Error:", error);
    }
  };

  // Use Effect to process notifications in batches
  useEffect(() => {
    if (notificationData?.length) {
      const unprocessedMessages = notificationData.filter((item: any) => !translatedMessages[item.id]);
      const batches = Array.from({ length: Math.ceil(unprocessedMessages.length / BATCH_SIZE) }, (_, i) =>
        unprocessedMessages.slice(i * BATCH_SIZE, i * BATCH_SIZE + BATCH_SIZE)
      );

      (async () => {
        for (const batch of batches) {
          await translateBatch(batch); // Translate batch-by-batch
        }
      })();
    }

    // Listen to language change and trigger translations
    const handleLanguageChange = () => {
      setTranslatedMessages({}); // Clear current translations when language changes
      translateBatch(notificationData.map((item: any) => ({ id: item.id, message: item.message })));
    };

    // Register the language change listener
    i18n.on('languageChanged', handleLanguageChange);

    // Cleanup listener on unmount
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [notificationData, i18n.language, translatedMessages]);

  const handleApprove = async (e: React.MouseEvent, eventId: number, message: string) => {
    e.preventDefault();

    const obj = {
      notificationId: eventId,
      message: message,
    };

    try {
      handleMessage(true);
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
      toast.success(t("MARKED_SUCCESS"));
    } catch (error) {
      console.error(error);
      handleMessage(false);
    }
  };

  return (
    <>
      {isloading ? (
        <div className="flex justify-center items-center h-[100vh]">
          <div>
            <img className="w-10 h-10 animate__animated animate__bounce animate__infinite" src="/img/golfball.jpg" alt="" />
            <p>Loading...</p>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-10 xl:mx-auto">
          <h4>{t("ALL_NOTIFICATION")}</h4>
          <div aria-live="assertive" className="h-screen animate__animated animate__fadeInLeft">
            <div className="w-full justify-center">
              {notificationData?.map((item: any) => (
                <Transition
                  show={show}
                  as={Fragment}
                  enter="transform ease-out duration-300 transition"
                  enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                  enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  key={item.id}
                >
                  <div
                    className={`mt-2 pointer-events-auto w-full max-w-5xl rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 ${
                      !item.isRead ? "bg-[#f3f3f3]" : "bg-white"
                    }`}
                    onClick={(e) => {
                      if (!item.isRead) {
                        handleApprove(e, item.id, item.message);
                      }
                      if (item.eventId) navigate(`/edit-team/${item.eventId}`);
                      else if (item.teacherId) navigate("/appointments");
                      else if (item.postId) navigate(`/read-post/${item.postId}`);
                    }}
                  >
                    <div className="p-4">
                      <div className="flex items-start">
                        <div className="flex items-center justify-center border-2 border-solid border-[#17b3a6] rounded-full h-8 w-8">
                          <img
                            className="w-full h-full rounded-full"
                            src={item?.User?.imageUrl}
                            alt=""
                          />
                        </div>
                        <div className="ml-3 w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {item?.User?.nickname}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {translatedMessages[item.id] || item.message} 
                          </p>
                        </div>
                        <div className="text-start flex-col mb-2">
                          {!item.isRead && (
                            <button
                              type="button"
                              className="text-[11px] cursor-pointer text-black bg-transparent text-xs"
                              onClick={(e) => handleApprove(e, item.id, item.message)}
                            >
                              {t("IS_READ")}
                            </button>
                          )}
                          <p className="text-[12px]">{getTimeAgo(new Date(item?.createdAt), t)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
