import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { notificationsContextStore } from "../contexts/notificationContext";
import { useTranslation } from "react-i18next";
interface NotificationProp {
  setNotification: any;
}

export const NotificationPop: React.FC<NotificationProp> = ({ setNotification }) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(true);
  const { notificationData, notification, isLoading } = notificationsContextStore();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/notification-page");
  };

  return (
    <>
      <div
        aria-live="assertive"
        className="hidden pointer-events-none left-0 right-[100px] top-[50px] z-[999] absolute inset-0 md:flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="w-full space-y-4 sm:items-end flex flex-col items-end">
          <div className="flex flex-col bg-white mt-4 w-1/5 p-4" style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
            {isLoading && (
              <div className="flex justify-center items-center">
                <div>
                  <img className="w-10 h-10 animate__animated animate__bounce animate__infinite" src="/img/golfball.jpg" alt="" />
                  <p>Loading...</p>
                </div>
              </div>

           )}
            {!isLoading && notificationData?.map((data: any) => {
              console.log(notificationData, 'nd')
                if( data.isRead !== true ){

                return (
                  <Transition
                    key={data.id}
                    show={show}
                    as={Fragment}
                    enter="transform ease-out duration-300 transition"
                    enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                    enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="w-full mt-2 max-w-sm overflow-hidden bg-white rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5 cursor-pointer" onClick={() => navigate('/notification-page')}>
                      <div className="p-4">
                        <div className="flex items-center">
                          <div className="flex-1 w-0 ml-3 ">
                            <p className="text-sm font-medium text-gray-900">
                              {data.message}
                            </p>
                          </div>
                          <div className="flex flex-shrink-0 ml-4">
                            <button
                              type="button"
                              className="inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={() => {
                                setShow(false);
                                setNotification(false);
                              }}
                            >
                              <span className="sr-only">Close</span>
                              <XMarkIcon className="w-5 h-5" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Transition>
                )
              }
              return null;
            })}
            {!isLoading && notificationData && notificationData.length > 4 && (
              <div className="flex justify-end">
                <button onClick={handleButtonClick} className="bg-transparent mt-2">
                {t("SEE_ALL")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
