import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NotificationPop } from "./NotificationPop";
import { userAuthContext } from "../contexts/authContext";
import { NotificationsContext, notificationsContextStore } from "../contexts/notificationContext";

import socket from "../socket";

export default function ProfileButton() {
  const { user } = userAuthContext();
  const { notifications, filteredNotifications, notificationData } = notificationsContextStore();
  const { t, i18n } = useTranslation();
  let n = [];
  const token = localStorage.getItem('token');

  const languages = {
    en: { displayName: "English" },
    ja: { displayName: i18n.language === "en" ? "日本語" : "日本語" },
  };

  console.log({notifications, filteredNotifications, notificationData})
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem('lang');
    if (storedLang) {
      i18n.changeLanguage(storedLang);
    }
  }, []);

  const handleDotClick = () => {
    setDropdownOpen((prevState) => !prevState);

    const timeoutId = setTimeout(() => {
      setDropdownOpen(false);
    }, 5000);

    return () => clearTimeout(timeoutId);
  };

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang); // Save language preference to localStorage
  };

  
  return (
    <div className=" lg:flex lg:flex-1 lg:justify-end">
      <div className="relative flex-shrink-0 block">
        <div className="flex items-center">
          {token && user ? (
            <>
             
                <div className=" sm:gap-2 lg:mr-8">
                  <button
                    onClick={() => handleChangeLanguage("ja")}
                    className={
                      i18n.resolvedLanguage === "ja" ? "actives rounded-l-md p-1 h-[35px] w-[70px] cursor-pointer border-[1px] border-solid border-white" : "rounded-l-md p-[5px] h-[35px] w-[70px] cursor-pointer bg-transparent border-[1px] border-solid border-white text-white"
                    }
                  >
                    {languages.ja.displayName}
                  </button>
                  <button
                    onClick={() => handleChangeLanguage("en")}
                    className={
                      i18n.resolvedLanguage === "en"
                        ? "actives rounded-r-md  p-[5px] py-[7px] cursor-pointer  border-solid border-white border-[1px] w-[70px] h-[35px]"
                        : "rounded-r-md  cursor-pointer p-1 py-[7px] cursor-pointer bg-transparent border-[1px] border-solid border-white text-white w-[70px] h-[35px]"
                    }
                  >
                    {languages.en.displayName}
                  </button>
                </div>
                <div className="flex items-center justify-center mx-2">
                <img
                  className="inline-block h-8 w-8 cursor-pointer border-solid border border-[#ffffff] rounded-full p-1"
                  src={user?.imageUrl}
                  alt=""
                />
              
              <div className="sm:gap-2 mx-2 flex">
                <p className="my-1 text-base font-medium text-[#fff] group-hover:text-gray-900">
                {user.nickName ? user.nickName : user.email}
                <span
          className="top-[5px] relative cursor-pointer material-icons"
          onClick={handleDotClick}
        >
          {dropdownOpen ? "expand_less" : "expand_more"}
        </span>
                </p>
               

                <div className="relative">
            {/*<button
              onClick={handleDotClick}
              className="relative px-1 bg-transparent focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="white"
                className="w-6 h-6 cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>*/}
            {/* Dropdown */}
            {dropdownOpen && (
              <div className="fixed right-[130px] top-[80px]  bg-white rounded-md shadow-lg w-max-content z-[9999]">
                <ul className="pl-1 pr-3 text-center">
                  {token ? (
                    <>
                    <Link to="/profile-page">
                      <li className="flex items-center justify-start gap-2 px-3 py-3 text-sm text-gray-700 hover:bg-gray-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                          />
                        </svg>

                        <Link to="/profile-page">{t("PROFILE")}</Link>
                      </li>
                    </Link>
                     <Link to="/edit-profile">
                     <li className="flex items-center justify-start gap-2 px-3 py-3 text-sm text-gray-700 hover:bg-gray-100">
                       <svg
                         xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 24 24"
                         stroke-width="1.5"
                         stroke="currentColor"
                         className="w-4 h-4"
                       >
                         <path
                           stroke-linecap="round"
                           stroke-linejoin="round"
                           d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                         />
                       </svg>

                       <Link to="/edit-profile">{t("EDIT_PROFILE")}</Link>
                     </li>
                   </Link>
                   </>
                  ) : (
                    ""
                  )}
                  {token ? (
                    ""
                  ) : (
                    
                    <Link to="/register-page">
                      <li className="flex items-center justify-start gap-2 px-3 py-3 text-sm text-gray-700 hover:bg-gray-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                          />
                        </svg>

                        <Link to="/register-page">{t("SIGN_UP")}</Link>
                      </li>
                    </Link>
                  )}
                  {token ? (
                    <Link to="/logout">
                      <li className="flex items-center justify-start gap-2 px-3 py-3 text-sm text-gray-700 hover:bg-gray-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                          />
                        </svg>

                        <Link to="/logout">{t("SIGN_OUT")}</Link>
                      </li>
                    </Link>
                  ) : (
                    <Link to="/login-page">
                      <li className="flex items-center justify-start gap-2 px-3 py-3 text-sm text-gray-700 hover:bg-gray-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                          />
                        </svg>

                        <Link to="/login-page">{t("SIGN_IN")}</Link>
                      </li>
                    </Link>
                  )}
                </ul>
              </div>
            )}
          </div>
          </div>
                </div>

            </>
          ) : (
            <>
             
                <div className="ml-3 lg:w-[230px]">
                  <button
                    onClick={() => handleChangeLanguage("ja")}
                    className={
                      i18n.resolvedLanguage === "ja"
                        ? "actives rounded-l-md p-1 h-[35px] w-[70px] cursor-pointer border-[1px] border-solid border-white" : "rounded-l-md p-[5px] h-[35px] w-[70px] cursor-pointer bg-transparent border-[1px] border-solid border-white text-white"
                    }
                  >
                    {languages.ja.displayName}
                  </button>
                  <button
                    onClick={() => handleChangeLanguage("en")}
                    className={
                      i18n.resolvedLanguage === "en"
                        ? "actives rounded-r-md  p-[5px] py-[7px] cursor-pointer  border-solid border-white border-[1px] w-[70px] h-[35px]"
                        : "rounded-r-md  cursor-pointer p-1 py-[7px] cursor-pointer bg-transparent border-[1px] border-solid border-white text-white w-[70px] h-[35px]"
                    }
                  >
                    {languages.en.displayName}
                  </button>
                </div>
                <div className="ml-8 mr-8 ">
                <p className="m-0 text-base font-medium text-white group-hover:text-gray-900">
                  <Link to="/login-page" className="text-white font-bold">
                    Login
                  </Link>
                </p>
              </div>
            </>
          )}
         
          {
            token && user && (

            
          <div
            onClick={() => {
              setNotification(!notification);
            }}
            className="hidden md:block px-6"
          >
            <span>
              
              <div className="relative cursor-pointer">
                <svg
                  className="w-5 h-5 text-white animate-wiggle"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 21 21"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.585 15.5H5.415A1.65 1.65 0 0 1 4 13a10.526 10.526 0 0 0 1.5-5.415V6.5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v1.085c0 1.907.518 3.78 1.5 5.415a1.65 1.65 0 0 1-1.415 2.5zm1.915-11c-.267-.934-.6-1.6-1-2s-1.066-.733-2-1m-10.912 3c.209-.934.512-1.6.912-2s1.096-.733 2.088-1M13 17c-.667 1-1.5 1.5-2.5 1.5S8.667 18 8 17"
                  />
                </svg>
                <div className="absolute px-1 text-sm text-center text-[#17b3a6] bg-white rounded-full -top-3 -end-2">
                  {/* {n.length > 0 && n.length} */}
                  {filteredNotifications && notifications && (filteredNotifications?.length + notifications.length)}
                  <div className="absolute top-0 w-full h-full text-black rounded-full start-0 -z-10 animate-ping"></div>
                </div>
              </div>
            </span>
          </div>
          )
        }
        </div>
      </div>
      {notification && (
        <NotificationsContext>

        <NotificationPop
          setNotification={setNotification}
        />
        </NotificationsContext>

      )}
    </div>
  );
}
