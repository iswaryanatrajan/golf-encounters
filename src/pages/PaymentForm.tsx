import React, { useEffect, useState } from "react";
import ChampionShipName from "../components/ChampionShipName";
import { toast } from "react-toastify";
import { ToastConfig, toastProperties } from "../constants/toast";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { singleTeamsContextStore } from "../contexts/teamContext";
import NotFound from "./404";
import { singleEventContextStore } from "../contexts/eventContext";
interface PaymentFormProps {
  onSubmit: (values: PaymentFormValues) => void;
}

export interface PaymentFormValues {
  participationFee: number;
  accountHolderName: string;
  paypalId: string;
  accountNumber: string;
  id: string;
}

export const PaymentForm: React.FC<PaymentFormProps> = () => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const [events, setEvents] = useState<any>([]);
  const params = useParams<{ id?: string }>();
  const router = useNavigate();
  const eventID = params.id;
  const { singleEvent, loading } = singleEventContextStore();

  useEffect(() => {}, []);

  const formSubmission = async (e:any) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("id") ?? "";

      if (!token) {
        toast.error(`ログインされていません`);
        return;
      }
      const payload: any = {
      user_id: userId,
      event_id: eventID || "",
    };

      // form field values
    const paymentFullName = e.target.paymentFullName?.value || "";
    const paymentTelPhone = e.target.paymentTelPhone?.value || "";
    const paymentEmailAddress = e.target.paymentEmailAddress?.value || "";
    const paymentHandicap = e.target.PaymentHandiCap?.value || "";

   if (singleEvent?.fullNameCheckBox == 1) {
      payload.memberFullName = paymentFullName;
    }
    if (singleEvent?.telephoneCheckBox == 1) {
      payload.memberTelPhone = paymentTelPhone;
    }
    if (singleEvent?.emailCheckBox == 1) {
      payload.memberEmailAddress = paymentEmailAddress;
    }
    if (singleEvent?.handicapCheckBox == 1) {
      payload.memberHandicap = paymentHandicap;
    }

 console.log(payload);
    
      const response = await axios.post(
        API_ENDPOINTS.JOINEDEVENTS + singleEvent.id,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        toast.error(t("ERROR_EVENTS"));
      } else {
        setEvents(response.data.events || []);
        toast.success(t("JOINED_SUCCESSFULLY"));
        router("/edit-team/" + eventID);
      }
    } catch (error) {
      toast.error(t("JOINED_ERROR"));
    }
  };

  console.log(singleEvent, "asd");
  return (
    <>
      {loading ? (
        "loading.."
      ) : singleEvent?.id ? (
        <div className="">
          <ChampionShipName />
          <div className="p-4 mx-auto my-6 bg-opacity-100 border rounded-md max-w-7xl bg-gradient-to-b from-teal-50 to-teal-100 ">
            <div>
              <div className="flex items-center">
                <img
                  src="/img/golfplyr.png"
                  alt="image"
                  className="w-10 h-16"
                />
                <h2 className="text-2xl font-semibold text-blue-800 font-poppins-semibold">
                  {t("PROVIDE_INFO")}
                </h2>
              </div>
            <form                         onSubmit={formSubmission}
>
              <div className="flex items-center justify-center py-4 ml-10">
                <div className="grid grid-cols-10 gap-6 ">
                  <div className="relative col-span-3">
                    <div
                      style={{
                        backgroundImage: 'url("/img/shortImage.png")',
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      className="relative "
                    >
                      <div className="absolute inset-0 opacity-75 bg-gradient-to-b from-gray-700 via-gray-600 to-gray-800"></div>
                      <div className="flex items-center justify-center">
                        <h2 className="relative z-10 pt-10 text-white">
                         {t('JOIN_NOW')} 
                        </h2>
                      </div>
                      <img
                        src="/img/shortImage.png"
                        alt=""
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div
                    className="col-span-6 bg-[#17B3A6] shadow-lg "
                    style={{ boxShadow: "9px 9px 4px #00c5b5" }}
                  >
                    <div className="p-6">
                    
                    {(singleEvent?.fullNameCheckBox == 1 || singleEvent?.telephoneCheckBox || singleEvent?.emailCheckBox || singleEvent?.handicapCheckBox  ) ? 
                    <p className="text-2xl text-white font-poppins-medium">
                    {t("REQUIRED_INFO")}
                  </p> 
                 : <img className="h-[500px] w-full overflow-hidden" src={singleEvent?.imageUrl[0]}  />
                    }
                      {singleEvent?.fullNameCheckBox == 1 && (
                        <div className="relative w-full">
                          <label
                            htmlFor="team"
                            className="text-xl font-medium text-white capitalize font-poppins"
                          >
                            {t("FULL_NAME")}
                          </label>

                          <div className="relative flex items-center w-full my-3">
                            <svg
                              width="28"
                              height="24"
                              viewBox="0 0 28 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="absolute transform -translate-y-1/2 left-2 top-1/2"
                            >
                              <path
                                d="M6 10H17V12H6V10ZM6 15H19V17H6V15Z"
                                fill="#17B3A6"
                              />
                              <path
                                d="M26 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V22C0 22.5304 0.210714 23.0391 0.585786 23.4142C0.960859 23.7893 1.46957 24 2 24H26C26.5304 24 27.0391 23.7893 27.4142 23.4142C27.7893 23.0391 28 22.5304 28 22V2C28 1.46957 27.7893 0.960859 27.4142 0.585786C27.0391 0.210714 26.5304 0 26 0ZM26 2V4H2V2H26ZM2 22V6H26V22H2Z"
                                fill="#17B3A6"
                              />
                            </svg>
                            <input
                              type="text"
                              name="paymentFullName"
                              id="paymentFullName"
                              placeholder={t("FULL_NAME")}
                              required
                              // value={singleEvent?.accountNumber}
                              className="w-full py-4 text-base font-normal text-gray-600 border-none rounded-md pl-14 bg-gray-50 font-poppins"
                            />
                          </div>
                        </div>
                      )}
                      {singleEvent?.telephoneCheckBox == 1 && (
                        <div className="relative w-full">
                          <label
                            htmlFor="team"
                            className="text-xl font-medium text-white capitalize font-poppins"
                          >
                            {t("TELEPHONE")}
                          </label>

                          <div className="relative flex items-center w-full my-3">
                            <svg
                              width="26"
                              height="24"
                              viewBox="0 0 26 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="absolute transform -translate-y-1/2 left-2 top-1/2"
                            >
                              <path
                                d="M1 5C1 3.93913 1.42143 2.92172 2.17157 2.17157C2.92172 1.42143 3.93913 1 5 1H21C22.0609 1 23.0783 1.42143 23.8284 2.17157C24.5786 2.92172 25 3.93913 25 5V18.3333C25 19.3942 24.5786 20.4116 23.8284 21.1618C23.0783 21.9119 22.0609 22.3333 21 22.3333H5C3.93913 22.3333 2.92172 21.9119 2.17157 21.1618C1.42143 20.4116 1 19.3942 1 18.3333V5Z"
                                stroke="#17B3A6"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M17 6.33337H19.6666M17 11.6667H19.6666M6.33331 17H19.6666M6.33331 9.00004C6.33331 9.70728 6.61426 10.3856 7.11436 10.8857C7.61446 11.3858 8.29274 11.6667 8.99998 11.6667C9.70722 11.6667 10.3855 11.3858 10.8856 10.8857C11.3857 10.3856 11.6666 9.70728 11.6666 9.00004C11.6666 8.2928 11.3857 7.61452 10.8856 7.11442C10.3855 6.61433 9.70722 6.33337 8.99998 6.33337C8.29274 6.33337 7.61446 6.61433 7.11436 7.11442C6.61426 7.61452 6.33331 8.2928 6.33331 9.00004Z"
                                stroke="#17B3A6"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>

                            <input
                              type="tel"
                              name="paymentTelPhone"
                              id="paymentTelPhone"
                              placeholder={t('TELEPHONE')}
                              required
                              // value={singleEvent?.paypalId}
                              className="w-full py-4 text-base font-normal text-gray-600 uppercase border-none rounded-md pl-14 bg-gray-50 font-poppins"
                            />
                          </div>
                        </div>
                      )}
                      {singleEvent?.emailCheckBox == 1 && (
                        <div className="relative w-full capitalize ">
                          <label
                            htmlFor="team"
                            className="text-xl font-medium text-white font-poppins"
                          >
                            {t("EMAIL")}
                          </label>

                          <div className="relative flex items-center w-full my-3 ">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="absolute transform -translate-y-1/2 left-2 top-1/2"
                            >
                              <path
                                d="M12 0C13.5913 0 15.1174 0.632141 16.2426 1.75736C17.3679 2.88258 18 4.4087 18 6C18 7.5913 17.3679 9.11742 16.2426 10.2426C15.1174 11.3679 13.5913 12 12 12C10.4087 12 8.88258 11.3679 7.75736 10.2426C6.63214 9.11742 6 7.5913 6 6C6 4.4087 6.63214 2.88258 7.75736 1.75736C8.88258 0.632141 10.4087 0 12 0ZM12 15C18.63 15 24 17.685 24 21V24H0V21C0 17.685 5.37 15 12 15Z"
                                fill="#17B3A6"
                              />
                            </svg>

                            <input
                              type="email"
                              name="paymentEmailAddress"
                              id="paymentEmailAddress"
                              placeholder= {t("EMAIL")}
                              required
                              // value={singleEvent?.accountHolderName}
                              className="w-full py-4 text-base font-normal text-gray-600 border-none rounded-md pl-14 bg-gray-50 font-poppins"
                            />
                          </div>
                        </div>
                      )}
                      {singleEvent?.handicapCheckBox == 1 && (

                      <div className="relative w-full">
                        <label
                          htmlFor="team"
                          className="text-xl font-medium text-white capitalize font-poppins "
                        >
                          {t("HANDICAP_SCORE")}
                        </label>

                        <div className="relative flex items-center w-full my-3 capitalize ">
                          <svg
                            width="24"
                            height="23"
                            viewBox="0 0 24 23"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute transform -translate-y-1/2 left-2 top-1/2"
                          >
                            <path
                              d="M16 15C16 13.895 12.866 13 9 13M16 15C16 16.105 12.866 17 9 17C5.134 17 2 16.105 2 15M16 15V19.937C16 21.076 12.866 22 9 22C5.134 22 2 21.077 2 19.937V15M16 15C19.824 15 23 14.013 23 13V3M9 13C5.134 13 2 13.895 2 15M9 13C4.582 13 1 12.013 1 11V6M9 4C4.582 4 1 4.895 1 6M1 6C1 7.105 4.582 8 9 8C9 9.013 12.253 10 16.077 10C19.9 10 23 9.013 23 8M23 3C23 1.895 19.9 1 16.077 1C12.253 1 9.154 1.895 9.154 3M23 3C23 4.105 19.9 5 16.077 5C12.254 5 9.154 4.105 9.154 3M9.154 3V13.166"
                              stroke="#17B3A6"
                              stroke-width="2"
                            />
                          </svg>

                          <input
                            type="text"
                            name="PaymentHandiCap"
                            id="PaymentHandiCap"
                            placeholder={t("HANDICAP_SCORE")}
                            required
                            // value={singleEvent?.participationFee}
                            className="w-full py-4 text-base font-normal text-gray-600 border-none rounded-md pl-14 bg-gray-50 font-poppins"
                          />
                        </div>
                      </div>
)}
                      <button
                          type="submit"
                          className="px-8 py-4 w-full mt-4 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
                      >
                        {t("JOIN_NOW")}
                      </button>
                    </div>

                    <div className="flex items-center justify-end">
                       <a href="#"
                            className="py-3  lg:py-1 mx-5 px-3 xl:mx-0 mt-5  text-black items-center gap-1 rounded-md cursor-pointer inline-flex text-blue-700"
                            onClick={(e) => {
                              e.preventDefault();
                              router('/message-page/' + singleEvent?.creatorId);
                            }}
                          >
                            <h3 className="text-white">{t("CONTACT_HOST")}</h3>
                      <div>

                        <div className="ml-1 cursor-pointer">
                          <svg
                            width="60"
                            height="60"
                            viewBox="0 0 38 38"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="19"
                              cy="19"
                              r="18.5"
                              fill="#17B3A6"
                              stroke="white"
                            />
                            <path
                              d="M15.1025 15.8333H22.8974M15.1025 19.7308H20.9487M24.8461 10.9615C25.6213 10.9615 26.3648 11.2695 26.913 11.8177C27.4612 12.3659 27.7692 13.1094 27.7692 13.8846V21.6795C27.7692 22.4547 27.4612 23.1982 26.913 23.7464C26.3648 24.2946 25.6213 24.6026 24.8461 24.6026H19.9743L15.1025 27.5257V24.6026H13.1538C12.3785 24.6026 11.635 24.2946 11.0869 23.7464C10.5387 23.1982 10.2307 22.4547 10.2307 21.6795V13.8846C10.2307 13.1094 10.5387 12.3659 11.0869 11.8177C11.635 11.2695 12.3785 10.9615 13.1538 10.9615H24.8461Z"
                              stroke="white"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                          </a>
                      
                    </div>
                  </div>
                </div>
                
              </div>
              </form>

            </div>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default PaymentForm;
