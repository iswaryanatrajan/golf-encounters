import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import { Rating } from "@material-tailwind/react";
import axios from "axios";
import { API_ENDPOINTS } from "../../appConfig";

interface AddReview {
  rating: number;
  feedback: string;
}

interface ReviewsModalProps {
  closeModal: () => void;
  teacherId: string;
  allinfo: any;
}

const ReviewsModal: React.FC<ReviewsModalProps> = ({ closeModal, teacherId, allinfo }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<AddReview>({
    rating: 0,
    feedback: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData: AddReview) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRatingChange = (value: number) => {
    setFormData((prevFormData: AddReview) => ({
      ...prevFormData,
      rating: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("id");
    if (!userId) {
      alert("User ID not found");
      return;
    }
    try {
      // let startTime = allinfo.startTime.split("to")[0].trim();
      // let endDate = allinfo.startTime.split("to")[1].trim();

      const updateResponse = await axios.post(API_ENDPOINTS.COMPLETEAPPOINTMENTSTATUS, {
        scheduleId: allinfo.scheduleId,
        day: allinfo.day,
        startTime: allinfo.startTime,
        endTime: "",
        status: "COMPLETED",
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (updateResponse.status === 200) {
        
        const feedbackResponse = await axios.post(API_ENDPOINTS.FEEDBACKTEACHER, {
          teacherId: teacherId,
          userId: userId,
          rating: formData.rating,
          feedback: formData.feedback,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (feedbackResponse.status === 200) {
          console.log("Review submitted successfully");
          closeModal();
        } else {
          console.error("Error submitting review:", feedbackResponse.data);
        }
      } else {
        console.error("Error updating appointment status:", updateResponse.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="z-[9999]   inset-0 flex items-center justify-center p-4 bg-gray-500 bg-opacity-50 backdrop-blur-sm ">
      <div
        className="w-full max-w-xl p-6 mx-auto bg-white rounded-lg mx-20 xl:mx-auto"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
      >
        <form className="px-2" onSubmit={handleSubmit}>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">{t("WRITE_FEEDBACK")}</h1>
            <button
              type="button"
              onClick={closeModal}
              className="p-2 rounded-full cursor-pointer"
            >
              <XMarkIcon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <div>
            <label className="mb-2">Rating:</label> <br />
            <Rating
              className="my-2 flex items-center justify-center"
              onChange={(value) => handleRatingChange(value as number)}
            />
          </div>
          <div>
            <label className="mb-2">Write Feedback</label> <br />
            <input
              className="xs:w-[100%] md:w-[400px] xl:w-[533px] p-3 mb-4 text-gray-700 border mt-2 border-gray-300 rounded-lg shadow-sm focus:border-[#51ff85] focus:ring-1 focus:ring-[#51ff85] focus:outline-none"
              name="feedback"
              onChange={handleInputChange}
            />
          </div>
          <button
            className="w-full bg-[#61cbc2] hover:bg-[#45e07d] text-white font-bold py-3 px-4 rounded-lg shadow hover:shadow-md transition-all"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewsModal;
