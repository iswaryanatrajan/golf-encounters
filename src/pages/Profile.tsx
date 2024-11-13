import { Link, useNavigate, useParams } from "react-router-dom";
import { singleUserContext, userAuthContext } from "../contexts/authContext";
import { Fragment, useEffect, useState } from "react";
import { postContext } from "../contexts/postsContext";
import { createdEventsStore, eventContextStore } from "../contexts/eventContext";
import { useTranslation } from "react-i18next";
import UpdateTeacher from "./UpdateTeacher";
import { useTeacherContext } from "../contexts/teachersContext";
import { Transition } from "@headlessui/react";
import ReviewsModal from "../components/comments/ReviewsModal";
import { gigsContextStore } from "../contexts/gigsContext";
import { API_ENDPOINTS } from "../appConfig";
import axios from "axios";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import DeletePopup from "../components/AreSure";
import { deleteGig } from "../utils/fetchGigs";
import { hasImageExtension } from "../utils/imgExtension";
import GetAllGigs from "../components/GetAllGigs";
const Profile = () => {
  const { t } = useTranslation();
  const { user } = userAuthContext();
  const { post, handleCategory } = postContext();
  const { createdEvents } = createdEventsStore();
  const { handleEventStatus, eventss } = eventContextStore();
  handleEventStatus("joined");
  const { studentAppointments, isLoading } = useTeacherContext();
  const { teacher } = useTeacherContext();
  const teacherId = localStorage.getItem("teacher_id");
  const UserId = localStorage.getItem("id");
  const { id } = useParams<{ id: string }>();
  console.log(studentAppointments);
  const router = useNavigate();
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };
  useEffect(() => {
    handleCategory("MyPost");
  }, []);
  const tId = localStorage.getItem("teacher_id");
  const { singleUser, postCount, eventCount } = singleUserContext();
  const [isTeacher, setIsTeacher] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [openEditTeacher, setEditTeacher] = useState(false);
  const { gigs, handleTeacherId } = gigsContextStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGigModalOpen, setGigModalOpen] = useState(false);
  useEffect(() => {
    const tch = localStorage.getItem("teacher_id");
    const checkTeacher = tch && tch !== "null" ? true : false;
    setIsTeacher(checkTeacher);
  });
  const handleDeleteTeacher = async () => {
    try {
      const response = await axios.delete(API_ENDPOINTS.DELETETEACHER + teacherId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        alert(t("TEACHER_DELETE"));
        localStorage.removeItem("teacher_id");
        setIsTeacher(false);
        setIsModalOpen(false);
        router("/profile-page");
      }
    } catch (error) {
      console.error("Error deleting teacher:", error);
      alert(t("ERROR_TEACHER_DELETE"));
    }
  };
  const handleClick = () => {
    setEditTeacher(!openEditTeacher);
  };

  handleTeacherId(tId);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleGigDelete = (id: any, e: any) => {
    e.preventDefault();
    deleteGig("", id);
    setGigModalOpen(false);

    handleTeacherId(tId);
  };
  const handlePostsClick = () => {
    router('/user-posts/' + user)

  };
  console.log(eventss, "helllo")
  return (
    <>
      <div className="max-w-7xl mx-auto h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="xl:relative h-35 md:h-65">
          {isTeacher ? (
            <div
              className="xl:absolute bottom-1 left-1  z-10 sm:bottom-4 sm:right-4 my-2 flex items-center gap-2 justify-center xl:justify-start sm:flex-nowrap items-center z-0"
              onClick={handleClick}
            >
              <label
                htmlFor="cover"
                className="flex cursor-pointer items-center justify-center gap-2 bg-[#17b3a6] hover:bg-blue-700 text-white xl:font-bold py-1 xl:py-2 px-4 rounded"
              >
                <Link to={`/edit-teacher-profile/${tId}`} className="text-white">
                  <span>{t("EDIT_TEACHER")}</span>
                </Link>
              </label>
              <Link
                to={`/create-catalogs/${tId}`}
                className="flex cursor-pointer items-center justify-center gap-2 bg-[#17b3a6] hover:bg-blue-700 text-white xl:font-bold py-1 xl:py-2 px-4 rounded"
              >
                <span>{t("CREATE_CATELOGS")}</span>
              </Link>

              <div className="xl:absolute  right-1 z-10 ">
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2">
                  <div
                    className="bg-[#17b3a6] py-1 xl:py-2 px-4 hover:bg-blue-700 text-white xl:font-bold rounded cursor-pointer"
                    onClick={() =>
                      router(!tId ? "/edit-profile" : "/edit-teacher")
                    }
                  >
                    {/* <span>
                  <svg
                    className="fill-current"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.99992 5.83329C6.03342 5.83329 5.24992 6.61679 5.24992 7.58329C5.24992 8.54979 6.03342 9.33329 6.99992 9.33329C7.96642 9.33329 8.74992 8.54979 8.74992 7.58329C8.74992 6.61679 7.96642 5.83329 6.99992 5.83329ZM4.08325 7.58329C4.08325 5.97246 5.38909 4.66663 6.99992 4.66663C8.61075 4.66663 9.91659 5.97246 9.91659 7.58329C9.91659 9.19412 8.61075 10.5 6.99992 10.5C5.38909 10.5 4.08325 9.19412 4.08325 7.58329Z"
                      fill="white"
                    />
                  </svg>
                </span> */}
                    <span>{t("EDIT_PROFILE")}</span>
                  </div>
                  {tId !== "null" && (
                    <div
                      className="bg-[#17b3a6] py-1 xl:py-2 px-4 hover:bg-blue-700 text-white xl:font-bold rounded cursor-pointer"
                      onClick={() => router("/appointments")}
                    >
                      <span>{t("APPOINTMENTS")}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <Link
              to="/teacher-page"
              className="absolute bottom-1 left-1 z-10 sm:bottom-4 sm:right-4 my-2"
            >
              <button className="flex cursor-pointer items-center justify-center gap-2 bg-[#17b3a6] hover:bg-blue-700 text-white xl:font-bold py-1 xl:py-2 px-4 rounded">
                {t("BECOME_TEACHER")}
              </button>
            </Link>
          )}
          <img
            src="/img/cover-01.png"
            alt="profile cover"
            className="h-full w-[100%] rounded-tl-sm rounded-tr-sm object-cover object-center"
          />
        </div>

        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur  sm:max-w-44 sm:p-3">
            <div className="absolute top-[-140px] xl:top-[-100px] left-[37%] right-[40%] drop-shadow-2  ">
              <img
                src={user?.imageUrl}
                alt="profile"
                className="w-20 h-20 xl:w-40 xl:h-40 rounded-full"
              />
              {/* <label
                htmlFor="profile"
                className="absolute bottom-0 right-[20px] flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-[70px] "
              >
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 14 14"
                  fill=""
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                    fill="#17b3a6"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                    fill="#17b3a6"
                  />
                </svg>
                <input
                  type="file"
                  name="profile"
                  id="profile"
                  className="sr-only"
                />
              </label> */}
            </div>
          </div>
          <div className="mt-16">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {user.nickName}
            </h3>
            <p className="font-medium">{user.email}</p>
            <div className="mx-auto mt-4.5 mb-5.5 grid grid-cols-4  rounded-md border border-stroke py-4 shadow-1 cursor-pointer dark:border-strokedark dark:bg-[#37404F]">
              <div onClick={() => {
                router('/user-posts/' + UserId)
              }} className="flex flex-col py-2 items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {post.length}
                </span>
                <span className="text-sm">{t("POSTS")}</span>
              </div>
              <div className="flex flex-col py-2 items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row cursor-pointer" onClick={() => {
                router('/created-events')
              }}>
                <span className="font-semibold text-black dark:text-white">
                  {createdEvents.length > 0 ? createdEvents.length : 0}
                </span>
                <span className="text-sm">{t("CREATED_EVENTS")}</span>
              </div>
              <div className="flex flex-col py-2 items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row" onClick={() => {
                router('/joined-events')
              }}>
                <span className="font-semibold text-black dark:text-white">
                  {eventss.length > 0 ? eventss.length : 0}
                </span>
                <span className="text-sm">{t("JOINED_EVENTS")}</span>
              </div>
              <div onClick={() => {
                router('/teacher-reserved-gigs/' + teacherId)
              }} className="flex flex-col py-2 items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {post.length}
                </span>
                <span className="text-sm">{t("Reserve_Gigs")}</span>
              </div>
            </div>
            <div>
              <GetAllGigs />
            </div>
            <div className="text-center md:mt-20 sm:mt-0 xl:flex items-center justify-between">
              <p className="font-bold">
                {t("MEMBERS_SINCE")} : {formatDate(user.createdAt)}
              </p>

              {tId && (
                <div className="flex justify-center">
                  <button
                    onClick={toggleModal}
                    className="flex cursor-pointer items-center justify-center gap-2 bg-[#17b3a6] hover:bg-blue-700 text-white xl:font-bold py-1 xl:py-2 px-4 rounded"
                  >
                    <span>Delete Teacher Account</span>
                  </button>
                </div>
              )}

              {isModalOpen && (
                <DeletePopup
                  mainFunc={handleDeleteTeacher}
                  toggleModal={toggleModal}
                  title="are you sure to delete teacher"
                  isModalOpen={isModalOpen}
                />
              )}
            </div>
          </div>
        </div>
        <div>
          <h3>{t("APPOINTMENTS_STATUS")}:</h3>
          <>
            {isLoading ? (
              <div className="flex justify-center items-center h-auto">
                <div>
                  <img
                    className="w-10 h-10 animate__animated animate__bounce animate__infinite"
                    src="/img/golfball.jpg"
                    alt=""
                  />
                  <p>loading...</p>
                </div>
              </div>
            ) : (
              <div className="max-w-7xl mx-10 xl:mx-auto">
                <div
                  aria-live="assertive"
                  className="animate__animated animate__fadeInLeft"
                >
                  <div className="w-full justify-center">
                    {studentAppointments?.length === 0 ? (
                      <p>No Appointments</p>
                    ) : (
                      studentAppointments?.map((item: any, index: any) => (
                        <Transition
                          show={true}
                          as={Fragment}
                          enter="transform ease-out duration-300 transition"
                          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                          key={index}
                        >
                          <div
                            className={`mt-2 pointer-events-auto w-full max-w-5xl rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 ${!item.isRead ? "bg-[#f3f3f3]" : "bg-white"
                              }`}
                          >
                            <div className="p-4">
                              <div className="flex items-start">
                                <div
                                  className="flex items-center justify-center border-2 border-solid border-[#17b3a6] rounded-full h-8 w-8"
                                  onClick={() => router("/user-page/" + item?.bookedBy)}
                                >
                                  <img
                                    className="w-full h-full rounded-full"
                                    src={""}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-3 w-0 flex-1">
                                  <p className="text-sm font-medium text-gray-900">
                                    {item?.bookedShifts?.nickName}
                                  </p>
                                  <p className="mt-1 text-sm text-gray-500">
                                    {item?.bookedShifts?.nickName} wants to book
                                    appointment from {item?.startTime} to{" "}
                                    {item?.endTime} on {item?.day}
                                  </p>
                                  <p>
                                    {item?.status == ""
                                      ? "PENDING"
                                      : item?.status}
                                  </p>
                                  {item?.status == "BOOKED" && (
                                    <button
                                      onClick={() => setShowModal(true)}
                                      className="text-[11px] cursor-pointer text-white bg-[#17b3a6] text-xs p-2 rounded"
                                    >
                                      {t("COMPLETE_LESSON")}
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Transition>
                      ))
                    )}
                  </div>
                </div>
                {/* {showModal && <ReviewsModal onClose={() => setShowModal(false)} />} */}
              </div>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default Profile;