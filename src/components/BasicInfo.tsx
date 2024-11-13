import React, { useRef, ChangeEvent, useState, useEffect } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { GroupBase, OptionsOrGroups } from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../appConfig";
import { useParams } from "react-router-dom";
import { singleEventContextStore } from "../contexts/eventContext";

interface BasicInfoProps {
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  formData?: any;
}

interface OptionType {
  label: string;
  value: string;
}

type GroupedOptionType = GroupBase<OptionType>;

const BasicInfo: React.FC<BasicInfoProps> = ({
  onChange,
  setFormData,
  formData,
}) => {
  const { t } = useTranslation();
  const params = useParams<{ id: string }>();
  const eventId = params.id;

  const JapanCities: GroupedOptionType[] = [
    {
      label: t("HOKKAIDO_TOHOKU"),
      options: [
        { value: "北海道 (Hokkaido)", label: t("北海道 (Hokkaido)") },
        { value: "青森県 (Aomori Prefecture)", label: t("青森県 (Aomori Prefecture)") },
        { value: "岩手県 (Iwate Prefecture)", label: t("岩手県 (Iwate Prefecture)") },
        { value: "宮城県 (Miyagi Prefecture)", label: t("宮城県 (Miyagi Prefecture)") },
        { value: "秋田県 (Akita)", label: t("秋田県 (Akita)") },
        { value: "山形県 (Yamagata Prefecture)", label: t("山形県 (Yamagata Prefecture)") },
        { value: "福島県 (Fukushima Prefecture)", label: t("福島県 (Fukushima Prefecture)") },
      ],
    },
    {
      label: t("KANTO"),
      options: [
        { value: "茨城県 (Ibaraki Prefecture)", label: t("茨城県 (Ibaraki Prefecture)") },
        { value: "栃木県 (Tochigi Prefecture)", label: t("栃木県 (Tochigi Prefecture)") },
        { value: "群馬県 (Gunma Prefecture)", label: t("群馬県 (Gunma Prefecture)") },
        { value: "埼玉県 (Saitama)", label: t("埼玉県 (Saitama)") },
        { value: "千葉県 (Chiba prefecture)", label: t("千葉県 (Chiba prefecture)") },
        { value: "東京都 (Tokyo)", label: t("東京都 (Tokyo)") },
        { value: "神奈川県 (Kanagawa Prefecture)", label: t("神奈川県 (Kanagawa Prefecture)") },
      ],
    },
    {
      label: t("中部 (Chubu)"),
      options: [
        { value: "神奈川県 (Niigata Prefecture)", label: t("神奈川県 (Niigata Prefecture)") },
        { value: "富山県 (Toyama Prefecture)", label: t("富山県 (Toyama Prefecture)") },
        { value: "富山県 (Ishikawa Prefecture)", label: t("富山県 (Ishikawa Prefecture)") },
        { value: "福井県 (Fukui prefecture)", label: t("福井県 (Fukui prefecture)") },
        { value: "山梨県 (Yamanashi Prefecture)", label: t("山梨県 (Yamanashi Prefecture)") },
        { value: "長野県 (Nagano Prefecture)", label: t("長野県 (Nagano Prefecture)") },
      ],
    },
    {
      label: t("TOKAI"),
      options: [
        { value: "静岡 (Shizuoka Prefecture)", label: t("静岡 (Shizuoka Prefecture)") },
        { value: "愛知県 (Aichi prefecture)", label: t("愛知県 (Aichi prefecture)") },
        { value: "三重県 (Mie Prefecture)", label: t("三重県 (Mie Prefecture)") },
        { value: "岐阜県 (Gifu Prefecture)", label: t("岐阜県 (Gifu Prefecture)") },
      ],
    },
    {
      label: t("近畿 (Kinki)"),
      options: [
        { value: "滋賀県 (Shiga Prefecture)", label: t("滋賀県 (Shiga Prefecture)") },
        { value: "京都府 (Kyoto)", label: t("京都府 (Kyoto)") },
        { value: "大阪府 (Osaka prefecture)", label: t("大阪府 (Osaka prefecture)") },
        { value: "兵庫県 (Hyogo prefecture)", label: t("兵庫県 (Hyogo prefecture)") },
        { value: "奈良県 (Nara Prefecture)", label: t("奈良県 (Nara Prefecture)") },
        { value: "和歌山県 (Wakayama Prefecture)", label: t("和歌山県 (Wakayama Prefecture)") },
      ],
    },
    {
      label: t("SHIKOKU"),
      options: [
        { value: "鳥取県 (Tottori prefecture)", label: t("鳥取県 (Tottori prefecture)") },
        { value: "島根県 (Shimane Prefecture)", label: t("島根県 (Shimane Prefecture)") },
        { value: "岡山県 (Okayama Prefecture)", label: t("岡山県 (Okayama Prefecture)") },
        { value: "広島県 (Hiroshima)", label: t("広島県 (Hiroshima)") },
        { value: "山口県 (Yamaguchi Prefecture)", label: t("山口県 (Yamaguchi Prefecture)") },
        { value: "徳島県 (Tokushima)", label: t("徳島県 (Tokushima)") },
        { value: "香川県 (Kagawa Prefecture)", label: t("香川県 (Kagawa Prefecture)") },
        { value: "愛媛県 (Ehime Prefecture)", label: t("愛媛県 (Ehime Prefecture)") },
        { value: "高知県 (Kochi Prefecture)", label: t("高知県 (Kochi Prefecture)") },
      ],
    },
    {
      label: t("九州・沖縄 (Kyushu-Okinawa)"),
      options: [
        { value: "福岡県 (Fukuoka Prefecture)", label: t("福岡県 (Fukuoka Prefecture)") },
        { value: "佐賀県 (Saga Prefecture)", label: t("佐賀県 (Saga Prefecture)") },
        { value: "長崎県 (Nagasaki Prefecture)", label: t("長崎県 (Nagasaki Prefecture)") },
        { value: "熊本県 (Kumamoto Prefecture)", label: t("熊本県 (Kumamoto Prefecture)") },
        { value: "大分県 (Oita Prefecture)", label: t("大分県 (Oita Prefecture)") },
        { value: "宮崎県 (Miyazaki prefecture)", label: t("宮崎県 (Miyazaki prefecture)") },
        { value: "鹿児島県 (Kagoshima prefecture)", label: t("鹿児島県 (Kagoshima prefecture)") },
        { value: "沖縄県 (Okinawa Prefecture)", label: t("沖縄県 (Okinawa Prefecture)") },
      ],
    },
  ];
  const [isHovered, setIsHovered] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isWithinJapan, setIsWithinJapan] = useState(true);
  const handleFileInputChange = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    setUploadedImages(files);
    if (formData !== undefined) {
      handleSelectedImage(files, eventId);
    }
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      files: files,
    }));
  };
  const handleChange = (selectedOption: any) => {
    handleCitySelection(selectedOption.value);
  };

  const handleCitySelection = (selectedCity: string) => {
    onChange({
      target: {
        name: "place",
        value: selectedCity,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };
  //test
  const { handleMessage } = singleEventContextStore();
  const [updateEventMedia, setUpdateEventMedia] = useState<any>(null);
  useEffect(() => {
    if (
      updateEventMedia != null &&
      updateEventMedia &&
      formData !== undefined
    ) {
      handleUpdateEventMedia(updateEventMedia);
    }
  }, [updateEventMedia]);

  const handleSelectedImage = (selectedImage: any, eId: any) => {

    let url: any = "";
    if (URL === selectedImage) {
      url = new URL(selectedImage || "");
    }

    if (eId != undefined) {
      setUpdateEventMedia({
        eventId: eId || "",
        removedMediaUrls:
          typeof selectedImage === "string" ? selectedImage : "",
        mediaFiles: selectedImage,
      });
    }
  };

  const handleUpdateEventMedia = async (formd: any) => {
    const userToken = localStorage.getItem("token");

    try {
      if (!userToken) {
        throw new Error("Token not found in localStorage");
      }

      const response = await axios.put(
        API_ENDPOINTS.UPDATE_EVENT_MEDIA,
        formd,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        handleMessage(response.data.event);
        toast.success(t("EVENT_UPDATE"));
      }
    } catch (error) {
      console.error("Error updating event media:");
      toast.error(t("FAILED_EVENT_UPDATE"));
    }
  };

  //test
  return (
    <motion.div
      className="px-2 mx-auto lg:max-w-7xl "
      animate={{ x: [0, 100, 0] }}
    >
      <div
        className="p-4 mt-4 rounded-md bg-clip-padding "
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <h2 className="text-4xl text-[#626262] ">{t("BASIC_INFORMATION")}</h2>
        <div className="grid grid-cols-9 py-8 mx-auto lg:gap-x-16 ">
          <div className="col-span-8 py-2 lg:col-span-4 md:col-span-5 md:mr-0 md:mb-3 ">
            <label
              className="block mb-2 text-lg tracking-wide text-[#626262] captilize "
              htmlFor="grid-event-name"
            >
              {t("EVENT_NAME")}
            </label>
            <input
              className="block w-full  py-4 mb-3 leading-tight text-gray-800 transition duration-300 ease-in-out transform bg-white border border-[#51ff85] rounded shadow-xl appearance-none focus:outline-none focus: "
              style={{
                boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
              }}
              id="grid-Event-Name"
              type="text"
              name="eventName"
              value={formData?.eventName}
              placeholder={t("EVENT_NAME")}
              onChange={onChange}
              required
            />
          </div>
          <div className="col-span-8 py-2 lg:col-span-4 md:col-span-5 md:mr-0 md:mb-3">
            <label
              className="block mb-2 text-lg tracking-wide text-[#626262] captilize"
              htmlFor="grid-short-video"
            >
              {t("SHORT_VIDEO")}
            </label>
            <input
              className="block w-full  py-4 mb-3 leading-tight text-gray-800 transition duration-300 ease-in-out transform bg-white border border-[#51ff85] rounded shadow-inner focus:outline-none focus:bg-white "
              style={{
                boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
              }}
              id="grid-first-name"
              type="text"
              name="eventVideoUrl"
              placeholder={t("SHORT_VIDEO")}
              value={formData?.eventVideoUrl}
              required
              onChange={onChange}
            />
          </div>
          <div className="col-span-8 py-2 lg:col-span-4 md:col-span-5 md:mr-0 md:mb-3">
            <label
              className="relative flex items-center gap-2 mb-2 text-lg tracking-wide text-[#626262] capitalize captilize"
              htmlFor="grid-short-video"
            >
              {t("EVENT_DETAILS")}
              <svg
                height="20"
                className="cursor-pointer"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <path
                  d="M20 0C16.0444 0 12.1776 1.17298 8.8886 3.37061C5.59962 5.56823 3.03617 8.69181 1.52242 12.3463C0.00866569 16.0008 -0.387401 20.0222 0.384303 23.9018C1.15601 27.7814 3.06082 31.3451 5.85787 34.1421C8.65492 36.9392 12.2186 38.844 16.0982 39.6157C19.9778 40.3874 23.9991 39.9913 27.6537 38.4776C31.3082 36.9638 34.4318 34.4004 36.6294 31.1114C38.827 27.8224 40 23.9556 40 20C39.9944 14.6974 37.8855 9.61356 34.136 5.86405C30.3864 2.11453 25.3026 0.00559965 20 0ZM20 36.9231C16.6529 36.9231 13.381 35.9305 10.598 34.071C7.81506 32.2115 5.64599 29.5685 4.36512 26.4762C3.08426 23.3839 2.74912 19.9812 3.4021 16.6985C4.05508 13.4157 5.66685 10.4003 8.03358 8.03358C10.4003 5.66684 13.4157 4.05508 16.6985 3.40209C19.9812 2.74911 23.3839 3.08425 26.4762 4.36511C29.5685 5.64598 32.2115 7.81505 34.071 10.598C35.9306 13.381 36.9231 16.6529 36.9231 20C36.918 24.4867 35.1334 28.7882 31.9608 31.9608C28.7882 35.1334 24.4867 36.918 20 36.9231ZM23.0769 29.2308C23.0769 29.6388 22.9148 30.0301 22.6263 30.3186C22.3378 30.6071 21.9465 30.7692 21.5385 30.7692C20.7224 30.7692 19.9398 30.445 19.3628 29.868C18.7857 29.291 18.4615 28.5084 18.4615 27.6923V20C18.0535 20 17.6622 19.8379 17.3737 19.5494C17.0852 19.2609 16.9231 18.8696 16.9231 18.4615C16.9231 18.0535 17.0852 17.6622 17.3737 17.3737C17.6622 17.0852 18.0535 16.9231 18.4615 16.9231C19.2776 16.9231 20.0602 17.2472 20.6373 17.8243C21.2143 18.4013 21.5385 19.1839 21.5385 20V27.6923C21.9465 27.6923 22.3378 27.8544 22.6263 28.1429C22.9148 28.4314 23.0769 28.8227 23.0769 29.2308ZM16.9231 11.5385C16.9231 11.082 17.0584 10.6359 17.312 10.2564C17.5656 9.87688 17.926 9.58109 18.3477 9.40643C18.7693 9.23177 19.2333 9.18607 19.681 9.27511C20.1286 9.36415 20.5398 9.58394 20.8626 9.90667C21.1853 10.2294 21.4051 10.6406 21.4941 11.0883C21.5832 11.5359 21.5375 11.9999 21.3628 12.4216C21.1881 12.8433 20.8924 13.2037 20.5129 13.4572C20.1334 13.7108 19.6872 13.8462 19.2308 13.8462C18.6187 13.8462 18.0318 13.603 17.599 13.1702C17.1662 12.7375 16.9231 12.1505 16.9231 11.5385Z"
                  fill="white"
                />
              </svg>
              {isHovered && (
                <div
                  className="absolute bg-white border rounded-md px-1 z-[10] shadow-lg"
                  style={{
                    top: "-34px",
                    right: "135px",
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.3s ease-in-out",
                  }}
                  id="info-box"
                >
                  <p className="text-sm text-[#17B3A6]">
                    {t("ADDITIONAL_INFORMATION")}
                  </p>
                </div>
              )}
            </label>
            <textarea
              className="block w-full py-4 mb-3 leading-tight text-gray-800 transition duration-300 ease-in-out transform bg-white border border-[#51ff85] rounded appearance-none focus:outline-none focus:bg-white "
              style={{
                boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
              }}
              id="grid-first-name"
              name="eventDetails"
              placeholder={t("EVENT_DETAILS")}
              value={formData?.eventDetails}
              required
              onChange={onChange}
              rows={4}
            ></textarea>
          </div>
          <div className="col-span-8 py-0  lg:col-span-4 md:col-span-5 md:mr-0 md:mb-3">
            <label
              className="relative block mb-2 text-lg tracking-wide text-[#626262] captilize"
              htmlFor="grid-short-video"
            >
              {t("UPLOAD_IMAGES")}

              <div className="absolute hidden p-2 mt-2 text-gray-800 transition-opacity duration-300 ease-in-out bg-white border rounded opacity-0">
                <p>First Image Will Use For Event Image</p>
              </div>
            </label>
            <div className="relative">
              <div className="flex justify-center">
                {formData?.files?.length > 0 &&
                  formData?.files.map((item: any) => {
                    return (
                      <div>
                        <img
                          className="h-[50px] w-[50px]"
                          key={item}
                          src={item}
                          alt="scd"
                        />
                        {eventId && (
                          <button
                            className="absolute top-0 h-4 w-4 bg-[#61cbc2] rounded-full text-white text-[14px] flex justify-center items-center cursor-pointer"
                            onClick={() => {
                              handleSelectedImage(item, eventId);
                            }}
                          >
                            X
                          </button>
                        )}
                      </div>
                    );
                  })}
              </div>

              <div className="flex items-center ">
                <input
                  className="filehidden appearance-none block w-full bg-white text-gray-800 border border-[#51ff85] rounded py-12 px-2  mb-3 leading-tight focus:outline-none focus:bg-white transition duration-300 ease-in-out transform shadow-xl"
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
                  }}
                  type="file"
                  name="files"
                  onChange={handleImageChange}
                  onClick={handleFileInputChange}
                  required
                  multiple
                  readOnly
                />
                <span
                  className="absolute top-[65px] left-[50%] transform -translate-x-1/2 pr-3 flex items-center text-gray-700 cursor-pointer "
                  onClick={handleFileInputChange}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </span>
              </div>
            </div>
          </div>
          <div className="relative w-full col-span-8 mt-0 lg:col-span-4 md:col-span-5 md:mr-0 md:mb-6">
            <label
              className="block mb-2 text-lg tracking-wide text-[#626262] captilize"
              htmlFor="place"
            >
              {t("PLACE")}
            </label>
            <Select
              name="place"
              required
              placeholder={formData?.place}
              options={
                JapanCities as OptionsOrGroups<
                  OptionType,
                  GroupBase<OptionType>
                >
              }
              onChange={handleChange}
              className="w-full text-base border border-gray-300 rounded shadow hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />

            {!isWithinJapan && (
              <p className="text-[#dc0000] bg-white text-center w-full">
                Please enter a location within Japan.
              </p>
            )}
          </div>
          <div className="col-span-8 py-2 lg:col-span-6 md:col-span-5 md:mr-0 md:mb-3">
            <label
              className="block mb-2 text-lg tracking-wide text-[#626262] captilize"
              htmlFor="grid-short-video"
            >
              {t("ADDRESS")}
            </label>
            <input
              className="block w-full  py-4 mb-3 leading-tight text-gray-800 transition duration-300 ease-in-out transform bg-white border border-[#51ff85] rounded shadow-inner focus:outline-none focus:bg-white "
              style={{
                boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
              }}
              id="grid-first-name"
              type="text"
              name="address"
              placeholder={t("ADDRESS")}
              value={formData?.address}
              required
              onChange={onChange}
            />
          </div>
        </div>

        <div className="relative col-span-12 mx-4 sm:mx-16 md:col-span-8 lg:col-span-8 ">
          <iframe
            className="col-span-4 sm:col-span-4 rounded-2xl"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8181116.269949623!2d130.64039243803072!3d36.56179855912495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34674e0fd77f192f%3A0xf54275d47c665244!2sJapan!5e0!3m2!1sen!2s!4v1700468556527!5m2!1sen!2s"
            width="100%"
            height="350px"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          <div className="absolute top-0 left-0 right-0 flex items-center justify-center mt-4">
            <button
              className="bg-[#51ff85] mx-2 text-white py-3  mb-2 md:mb-0 md:mr-2 rounded-md"
              onClick={() => {}}
            >
              {t("MAP")}
            </button>
            <input
              type="text"
              className="w-3/4 md:w-1/2 p-2 rounded-md focus:outline-none border-[#52FF86]"
              placeholder={t("SEARCH_LOCATION")}
              required
              value={formData?.place}
            />
            <button
              className="py-3 mx-2 text-white bg-blue-500 rounded-md sm:mx-0 lg:mx-2"
              onClick={() => {}}
            >
              1{t("SELECT")}
            </button>
          </div>
        </div>
      </div>
      <div
        className="grid grid-cols-9 px-4 py-4 mx-auto lg:gap-x-16 my-10"
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <div className="col-span-8 py-2 lg:col-span-7  md:col-span-5 md:mr-0 md:mb-0 ">
          <label
            className="block mb-2 text-xs font-bold tracking-wide text-[#626262] captilize"
            htmlFor="grid-event-name"
          >
            {t("PARTICIPATION_FEE")}
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-[#626262] border border-[#51ff85] bg-transparent  rounded py-4 px-4 mb-0 leading-tight focus:outline-none "
            id="participationFee"
            type="number"
            pattern="[0-9]*"
            name="participationFee"
            value={formData?.participationFee}
            onChange={onChange}
            title="Please enter a valid number"
            placeholder={t("ENTER_AMOUNT")}
            min="0"
          />
        </div>
      </div>
      <div
        className="grid grid-cols-9 px-4 py-0 mx-auto lg:gap-x-16 my-10 py-6"
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <div className="col-span-8 py-2 lg:col-span-4 md:col-span-5 md:mr-0 md:mb-3">
          <label
            className="relative flex items-center gap-2 mb-2 text-lg tracking-wide text-[#626262] capitalize captilize"
            htmlFor="grid-short-video"
          >
            {t("CANCELLATION_FEE")}
            <svg
              height="20"
              className="cursor-pointer"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <path
                d="M20 0C16.0444 0 12.1776 1.17298 8.8886 3.37061C5.59962 5.56823 3.03617 8.69181 1.52242 12.3463C0.00866569 16.0008 -0.387401 20.0222 0.384303 23.9018C1.15601 27.7814 3.06082 31.3451 5.85787 34.1421C8.65492 36.9392 12.2186 38.844 16.0982 39.6157C19.9778 40.3874 23.9991 39.9913 27.6537 38.4776C31.3082 36.9638 34.4318 34.4004 36.6294 31.1114C38.827 27.8224 40 23.9556 40 20C39.9944 14.6974 37.8855 9.61356 34.136 5.86405C30.3864 2.11453 25.3026 0.00559965 20 0ZM20 36.9231C16.6529 36.9231 13.381 35.9305 10.598 34.071C7.81506 32.2115 5.64599 29.5685 4.36512 26.4762C3.08426 23.3839 2.74912 19.9812 3.4021 16.6985C4.05508 13.4157 5.66685 10.4003 8.03358 8.03358C10.4003 5.66684 13.4157 4.05508 16.6985 3.40209C19.9812 2.74911 23.3839 3.08425 26.4762 4.36511C29.5685 5.64598 32.2115 7.81505 34.071 10.598C35.9306 13.381 36.9231 16.6529 36.9231 20C36.918 24.4867 35.1334 28.7882 31.9608 31.9608C28.7882 35.1334 24.4867 36.918 20 36.9231ZM23.0769 29.2308C23.0769 29.6388 22.9148 30.0301 22.6263 30.3186C22.3378 30.6071 21.9465 30.7692 21.5385 30.7692C20.7224 30.7692 19.9398 30.445 19.3628 29.868C18.7857 29.291 18.4615 28.5084 18.4615 27.6923V20C18.0535 20 17.6622 19.8379 17.3737 19.5494C17.0852 19.2609 16.9231 18.8696 16.9231 18.4615C16.9231 18.0535 17.0852 17.6622 17.3737 17.3737C17.6622 17.0852 18.0535 16.9231 18.4615 16.9231C19.2776 16.9231 20.0602 17.2472 20.6373 17.8243C21.2143 18.4013 21.5385 19.1839 21.5385 20V27.6923C21.9465 27.6923 22.3378 27.8544 22.6263 28.1429C22.9148 28.4314 23.0769 28.8227 23.0769 29.2308ZM16.9231 11.5385C16.9231 11.082 17.0584 10.6359 17.312 10.2564C17.5656 9.87688 17.926 9.58109 18.3477 9.40643C18.7693 9.23177 19.2333 9.18607 19.681 9.27511C20.1286 9.36415 20.5398 9.58394 20.8626 9.90667C21.1853 10.2294 21.4051 10.6406 21.4941 11.0883C21.5832 11.5359 21.5375 11.9999 21.3628 12.4216C21.1881 12.8433 20.8924 13.2037 20.5129 13.4572C20.1334 13.7108 19.6872 13.8462 19.2308 13.8462C18.6187 13.8462 18.0318 13.603 17.599 13.1702C17.1662 12.7375 16.9231 12.1505 16.9231 11.5385Z"
                fill="white"
              />
            </svg>
            {isHovered && (
              <div
                className="absolute bg-white border rounded-md px-1 z-[10] shadow-lg"
                style={{
                  top: "-34px",
                  right: "135px",
                  opacity: isHovered ? 1 : 0,
                  transition: "opacity 0.3s ease-in-out",
                }}
                id="info-box"
              >
                <p className="text-sm text-[#17B3A6]">
                  {t("ADDITIONAL_INFORMATION")}
                </p>
              </div>
            )}
          </label>
          <textarea
            className="comment-content block w-full py-4 mb-3 leading-tight text-gray-800 transition duration-300 ease-in-out transform bg-white border border-[#51ff85] rounded appearance-none focus:outline-none focus:bg-white "
            style={{
              boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
            }}
            id="grid-first-name"
            name="cancellationFee"
            placeholder={t("CANCELLATION_FEE")}
            value={formData?.cancellationFee}
            required
            onChange={onChange}
            rows={4}
          ></textarea>
        </div>
      </div>
    </motion.div>
  );
};
export default BasicInfo;
