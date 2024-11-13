import React, { useState } from "react";
import { API_ENDPOINTS } from "../appConfig";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Cog6ToothIcon, EyeDropperIcon, EyeIcon, EyeSlashIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
export default function Register(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    nickName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: [],
    });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const filesArray = Array.from(files).slice(0, 5);
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        image: filesArray.length === 1 ? filesArray[0] : [...prevFormData.files, ...filesArray],
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError(t("PASSWORD_ERROR"));
      return;
    }
  
    try {
      const response = await axios.post(API_ENDPOINTS.REGISTER, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        navigate("/login-page");
      }
      setError(null);
    } catch (error) {
      setError(
        (error as any)?.response?.data?.error ||
          (error as any)?.response?.data?.message
      );
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const togglePasswordConfirm = () => {
    setShowPasswordConfirm((prevState) => !prevState);
  };
  return (
    <section className="shadow-lg bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 animate__animated animate__fadeInLeft">
        <div className="w-full bg-white rounded-lg shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            {t("REGISTER_NOW")}
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="text-[red] text-sm mt-2">
                  {error}
                </div>
              )}
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="nick-name"
                >
                  {t("NICK_NAME")}
                </label>
                <input
                  type="string"
                  name="nickName"
                  id="nickname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={t("ENTER_NICKNAME")}
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("YOUR_EMAIL")}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("PASSWORD")}
                </label>
                <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={handleChange}
                />
                <div
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeIcon className="text-gray-600 h-6 w-8" />
                      ) : (
                        <EyeSlashIcon className="text-gray-600 h-6 w-8" />
                      )}
                    </div>
                    </div>
              </div>
              <div>
                <label
                  htmlFor="profile"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("CONFIRM_PASSWORD")}
                </label>
                <div className="relative">
                <input
                    type={showPasswordConfirm ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  onChange={handleChange}
                />
                 <div
                      onClick={togglePasswordConfirm}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    >
                      {showPasswordConfirm ? (
                        <EyeIcon className="text-gray-600 h-6 w-8" />
                      ) : (
                        <EyeSlashIcon className="text-gray-600 h-6 w-8" />
                      )}
                    </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="profile"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("PROFILE_PIC")}
                </label>
                <input
                  type="file"
                  name="image" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={handleImage}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {t("SIGN_UP")}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              {t("ALREADY_ACCOUNT")}
                <Link
                  to="/login-page"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                 {t("SIGN_IN")}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
