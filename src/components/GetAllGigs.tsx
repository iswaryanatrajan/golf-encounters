import { Link, useNavigate, useParams } from "react-router-dom";
import { singleUserContext, userAuthContext } from "../contexts/authContext";
import { Fragment, useEffect, useState } from "react";
import { postContext } from "../contexts/postsContext";
import { createdEventsStore, eventContextStore } from "../contexts/eventContext";
import { useTranslation } from "react-i18next";
// import UpdateTeacher from "./UpdateTeacher";
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
const GetAllGigs = () => {
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

        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">

          <div className="mt-16">
            {tId && (
              <div className="my-8">
                <h2 className="text-xl text-start font-semibold mb-4">{t("CREATED_GIG")}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {gigs.gigs?.length != 0 ? (
                    gigs.gigs?.map((item: any) => {
                      const arrayImages = item?.imageUrl?.split(",");

                      return (
                        <div
                          className=" xl:w-auto mb-4  xl:mb-0 px-2 py-4 space-y-4 text-white hover:bg-[#f1f1f1] cursor-pointer border border-yellow-400 rounded-lg bg-white lg:py-10 md:px-12 md:w-auto md:flex-row md:items-center md:space-x-4 lg:space-x-12"
                          style={{
                            boxShadow:
                              "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                          }}
                          
                        >
                          <div className=" items-center text-black relative" >
                            <div className="flex justify-end xl:absolute top-[-30px] left-[238px] ]">
                              <TrashIcon
                                onClick={(e) => {
                                  e.preventDefault();
                                  setGigModalOpen(!isGigModalOpen);
                                }}
                                className="h-[18px] text-red  p-[2px] border-2 border-solid rounded-full cursor-pointer ml-2 "
                              />
                              <PencilSquareIcon
                                onClick={() => {
                                  router("/update-gig/" + item.id);
                                }}
                                className="h-[18px] text-green  p-[2px] border-2 border-solid rounded-full cursor-pointer ml-2 "
                              />
                              {isGigModalOpen && (
                                <DeletePopup
                                  mainFunc={(e: any) => {
                                    handleGigDelete(item.id, e);
                                  }}
                                  toggleModal={() =>
                                    setGigModalOpen(!isGigModalOpen)
                                  }
                                  title="are you sure to delete gig "
                                  isModalOpen={isGigModalOpen}
                                />
                              )}
                            </div>
                            <div className="w-full h-full xl:w-[300px] xl:h-[200px] ">


                              <>
                                {/* Ensure key is unique and at the top element */}
                                {hasImageExtension(arrayImages[0]) ? (
                                  <div className=" w-[100%]">
                                    <img
                                      className="w-full h-[200px] object-fit rounded-lg "
                                      src={arrayImages[0]}
                                      alt="Blog Post Image"
                                    />
                                  </div>
                                ) : (
                                  <div className=" ">
                                    <video
                                      controls
                                      className="w-full h-[200px] object-contain rounded-lg "
                                      src={arrayImages[0]}
                                    />
                                  </div>
                                )}
                              </>

                            </div>

                            <div className="flex flex-col">
                 
                              <h3>{item.title}</h3>
                              <p className="text-start font-bold text-green">
                                Price {item.price} ¥{" "}
                              </p>
                              <button
                                onClick={(e) => router(`/gig/` + item.id)}
                                className="p-2 rounded-lg cursor-pointer bg-[#2dd4bf] text-white hover:bg-black hover:text-white"
                              >
                                See More
                              </button>
                              {
                                item.teacherId != localStorage.getItem("teacher_id") &&
                              <Link
                                to="/message-page"
                                className="text-center bg-[#2dd4bf] text-white p-2 mt-2 rounded-lg cursor-pointer hover:bg-black hover:text-white"
                              >
                                Chat
                              </Link>
                    }
                              {
                                item.teacherId != localStorage.getItem("teacher_id") &&
                                < Link
                                to="/gig"
                              className="text-center bg-[#2dd4bf] text-white p-2 mt-2 rounded-lg cursor-pointer hover:bg-black hover:text-white"
                              >
                             Buy Gig
                            </Link>
                              }

                          </div>
                        </div>
                        </div>
                );
                    })
                ) : (
                <>
                  <h2 className="text-center">
                    {t("OPPS")}
                    <span className="text-[#17b3a6]">GIGS!</span>
                  </h2>
                  {/* <button
                      className="text-white bg-[#17b3a6] px-6 py-2 cursor-pointer rounded hover:bg-green-600 text-sm md:text-base"
                      onClick={() => router(`/create-catalogs/${teacher?.id}`)}
                    >
                      Create GIG
                    </button> */}
                </>
                  )}
              </div>
              </div>
            )}

        </div>
      </div>
      <div>

      </div>
    </div >
    </>
  );
};

export default GetAllGigs;