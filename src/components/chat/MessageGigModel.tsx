// src/components/Messages/GigsModal.tsx

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { fetchGigsById } from "../../utils/fetchGigs"; // Ensure this utility is correctly implemented
import { teacherContext } from "../../contexts/teachersContext";
import { API_ENDPOINTS } from "../../appConfig";
import axios from "axios";

interface GigsModalProps {
  userId: string | null;
  isOpen: boolean;
  handleAllGigsClick: () => void;
  onForwardGig: (gig: any) => void;
}

const GigsModal: React.FC<GigsModalProps> = ({
  userId,
  isOpen,
  handleAllGigsClick,
  onForwardGig,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [gigs, setGigs] = useState<any>({});
  const [visibleGigsCount, setVisibleGigsCount] = useState<number>(5);
  const { teachers, isLoading } = teacherContext();
  const [allTeachers, setTeachers] = useState<any>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<any>([]);

  // Fetch all teachers on component mount
  const fetchTeachers = async () => {
    try {
      const token = localStorage.getItem("token");
      let endpoint = API_ENDPOINTS.GETALLTEACHERSPUBLIC;
      if (token && token !== "undefined") {
        endpoint = API_ENDPOINTS.GETALLTEACHERS;
      }
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          page: 1,
          pageSize: 2000,
        },
      });

      setTeachers(response.data.teachers);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // Fetch gigs for the selected teacher
  useEffect(() => {
    if (userId && allTeachers.length > 0) {
      const teacher = allTeachers.find((teacher: any) => teacher.userId === userId);
      if (teacher) {
        console.log("Fetching gigs for teacher:", teacher);
        fetchGigsById(setGigs, teacher.id);
        setVisibleGigsCount(5);
      }
    }
  }, [allTeachers, userId]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleShowMore = () => {
    setVisibleGigsCount((prevCount) => prevCount + 2);
  };

  const hasMoreGigs = gigs?.gigs?.length > visibleGigsCount;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999] overflow-y-auto"
      onClick={handleAllGigsClick} // Close modal when clicking on the backdrop
    >
      <div
        className="relative bg-white rounded-lg shadow-lg p-6 max-w-7xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
        role="dialog"
        aria-modal="true"
        aria-labelledby="gigs-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={handleAllGigsClick}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none cursor-pointer"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Title */}
        <h2 id="gigs-modal-title" className="text-2xl font-semibold mb-6">
          {t("All Gigs")}
        </h2>

        {/* Gigs Grid */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {gigs?.gigs && gigs.gigs.length > 0 ? (
            gigs.gigs.slice(0, visibleGigsCount).map((item: any) => (
              <div
                className="flex flex-col items-center p-4 border border-yellow-400 rounded-lg bg-white hover:bg-[#f1f1f1] transition duration-200 ease-in-out"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                }}
                key={item.id}
              >
                {/* Gig Image */}
                <div className="w-full h-48">
                  <img
                    className="w-full h-full object-cover rounded border-2 border-solid border-[#2dd4bf]"
                    src={item?.imageUrl}
                    alt={item.title || "Gig Image"}
                  />
                </div>

                {/* Gig Details */}
                <div className="flex flex-col justify-between w-full text-black mt-4">
                  <div>
                    {/* Rating */}
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${
                            star <= item.rating
                              ? "text-yellow-300"
                              : "text-gray-300"
                          } ms-1`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                      <p className="ml-1 text-[#949494]">
                        {item.rating} ({item.reviewCount} {t("reviews")})
                      </p>
                    </div>

                    {/* Gig Title */}
                    <h3 className="text-xl font-semibold mt-2">{item.title}</h3>

                    {/* Gig Price */}
                    <p className="mt-2">
                      {t("PRICE")}{" "}
                      <span className="text-green-500 font-bold text-2xl">
                        {item.price} ¥
                      </span>
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex flex-col gap-2">
                    <button
                      onClick={() => navigate(`/gig/${item.id}`)}
                      className="p-2 rounded-lg bg-[#2dd4bf] text-white hover:bg-black hover:text-white transition"
                    >
                      {t("SEE_MORE")}
                    </button>
                    <Link
                      to="/message-page"
                      className="p-2 rounded-lg bg-[#2dd4bf] text-white hover:bg-black hover:text-white transition text-center"
                    >
                      {t("CHAT")}
                    </Link>
                    {/* Forward Button */}
                    <button
                      onClick={() => onForwardGig(item)}
                      className="p-2 rounded-lg bg-gray-300 text-black hover:bg-gray-400 transition"
                    >
                      {t("FORWARD")}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              {t("This teacher has no gigs yet.")}
            </div>
          )}
        </div>

        {/* Show More Button */}
        {gigs?.gigs && gigs.gigs.length > 0 && hasMoreGigs && (
          <button
            onClick={handleShowMore}
            className="mt-4 p-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            {t("SHOW_MORE")}
          </button>
        )}
      </div>
    </div>
  );
};

export default GigsModal;
