import React, { useState } from "react";
import {
  UserIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import InputWithIcon from "../components/FormComponents";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { ToastConfig, toastProperties } from "../constants/toast";

const TeacherProfile: React.FC = () => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const [formData, setFormData] = useState({
    aboutMyself: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    location: "",
   
  });

  const handleChange = async (fieldName: string, newValue: string) => {
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      const headers: any = {
        "ngrok-skip-browser-warning": "69420"
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await axios.put(
        `${API_ENDPOINTS.UPDATEUSER}`,
        formData, 
        {
          headers,
          params:{
            userId: id
          },
        }
      );

      setFormData(formData); 
    } catch (error) {
      toast.error( `ログインされていません`)        ;
    }
  };

  return (
    <div className="py-8">
      <form onSubmit={(e) => e.preventDefault()}>
        <section className="h-full max-w-7xl mx-auto mt-6 text-center">
          <div className="w-full py-6 text-start">
            <label className="text-lg font-bold" htmlFor="aboutMe">
              {t("ABOUT")}
            </label>
            <textarea
              id="aboutMyself"
              name="aboutMyself"
              value={formData.aboutMyself}
              onChange={(e) => handleChange("aboutMyself", e.target.value)}
              rows={4}
              className="w-full border border-[#51ff85]"
              placeholder={t("BIO")}
            ></textarea>
          </div>

          <div className="py-6">
            <div className="grid grid-cols-2 xl:grid grid-cols-1 gap-4 text-start ">
              <InputWithIcon
                pname="firstName"
                icon={<UserIcon />}
                label={t("FIRST_NAME")}
                value={formData.firstName}
                onChange={(value: any) => handleChange("firstName", value.target.value)}
                placeholder={t("ENTER_FIRST_NAME")}
                colSpanSm={6}
                colSpanMd={4}
                colSpanLg={2}
              />
              <InputWithIcon
                pname="lastName"
                icon={<UserIcon />}
                label={t("LAST_NAME")}
                value={formData.lastName}
                onChange={(value: any) => handleChange("lastName", value.target.value)}
                placeholder={t("ENTER_LAST_NAME")}
                colSpanSm={6}
                colSpanMd={4}
                colSpanLg={2}
              />
           
              <InputWithIcon
                pname="phoneNumber"
                icon={<PhoneIcon />}
                label={t("MOBILE")}
                value={formData.phoneNumber}
                onChange={(value: any) => handleChange("phoneNumber", value.target.value)}
                placeholder={t("ENTER_MOBILE")}
                colSpanSm={6}
                colSpanMd={4}
                colSpanLg={2}
              />
              <InputWithIcon
                pname="location"
                icon={<MapPinIcon />}
                label={t("LOCATION")}
                value={formData.location}
                onChange={(value: any) => handleChange("location", value.target.value)}
                placeholder={t("ENTER_LOCATION")}
                colSpanSm={6}   
                colSpanMd={4}
                colSpanLg={2}
              />
            </div>

            <button
              type="submit"
              className="px-16 py-4 mt-4 text-white glow-on-hover rounded-full text-[20px]"
            >
              {t("UPDATE")}
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default TeacherProfile;
