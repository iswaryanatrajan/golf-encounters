import React, { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../appConfig";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import { ToastConfig, toastProperties } from "../constants/toast";
import { useTranslation } from "react-i18next";
import { Chat } from "@pubnub/chat";
import { userAuthContext } from "../contexts/authContext";
import "./app.css";
import { Cog6ToothIcon, EyeDropperIcon, EyeIcon, EyeSlashIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'; // Importing the eye icons from react-icons

const Login: React.FC = () => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const { chatUser } = userAuthContext();

  const router = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pubnubUser, setPubNubUser] = useState<any>(null); // State for PubNub user
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(API_ENDPOINTS.LOGIN, formData);
      const tokenTimestamp = new Date().getTime().toString();

      if (response.status === 200) {
        localStorage.setItem("token", response.data.jwtToken);
        localStorage.setItem("id", response.data.id);
        response.data.teacherId != null &&
          localStorage.setItem("teacher_id", response.data.teacherId);
        localStorage.setItem("tokenTimestamp", tokenTimestamp);

        const chat = await Chat.init({
          publishKey: process.env.REACT_APP_PUB_KEY,
          subscribeKey: process.env.REACT_APP_SUB_KEY || "",
          userId: localStorage.getItem("id") || "",
        });

        const userId = response.data.id.toString();
        const user =
          (await chat.getUser(chatUser)) ||
          (await chat.createUser(userId, { name: response.data.username }));

        setPubNubUser(user);

        router("/");
        window.location.reload();
      }
      setError(null);
    } catch (error) {
      const apiError =
        (error as any)?.response?.data?.message || "We are not able to Login";
      toast.error(`${apiError}`, toastProperties as ToastConfig);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <section className="bg-gray-50">
      {loading ? (
        <div className="flex items-center justify-center h-[100vh] ">
          <BeatLoader color="#51ff85" size={15} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 animate__animated animate__fadeInLeft overflow-hidden">
          <div className="w-full bg-white rounded-lg shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {t("LOGIN")}
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                {error && <div className="text-[#F80202] text-sm mt-2">{error}</div>}
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
                    className="bg-gray-50 border border-[#dddddd] text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                      className="bg-gray-50 border outline-none border-[#dddddd] text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border-solid border-[#dddddd] rounded bg-blue-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        {t("REMEMBER")}
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    {t("FORGOT_PASSWORD")}
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {t("SIGN_IN")}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  {t("HAVE_ACCOUNT")}
                  <Link
                    to="/register-page"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    {t("SIGN_UP")}
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Login;
