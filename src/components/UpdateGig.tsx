import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "react-quill/dist/quill.snow.css";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { gigsContextStore } from "../contexts/gigsContext";
import { hasImageExtension } from "../utils/imgExtension";
interface CreateCatalogType {
  title: string;
  description: string;
  mediaFiles: any;
  price: string;
}

const UpdateGig: React.FC<any> = () => {
  const { t } = useTranslation();
  const { gig, handleTeacherId } = gigsContextStore();

  const userId = localStorage.getItem("id");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const router = useNavigate();
  const [formData, setFormData] = useState<CreateCatalogType>({
    title: "",
    description: "",
    mediaFiles: null,
    price: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleReset = () => {
    setFormData(formData);
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const filesArray: File[] = Array.from(files).slice(0, 5);
      setSelectedFiles([...selectedFiles, ...filesArray]);
      setFormData((prevFormData: CreateCatalogType) => ({
        ...prevFormData,
        mediaFiles: [...filesArray],
      }));
    }
  };
  console.log(formData, "for");
  const removeSelectedFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    setFormData((prevFormData: CreateCatalogType) => ({
      ...prevFormData,
      mediaFiles: updatedFiles,
    }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    const isTextEmpty =
      !formData.title || !formData.title.replace(/<(.|\n)*?>/g, "").trim();
    if (isTextEmpty && formData?.mediaFiles?.length === 0) {
      toast.error(t("BEFORE_POST"));
      return;
    }

    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    if (formData.mediaFiles) {
      // Append each file in the mediaFiles array to formDataToSend
      for (let i = 0; i < formData.mediaFiles.length; i++) {
        formDataToSend.append("mediaFiles[]", formData.mediaFiles[i]);
      }
    }
    formDataToSend.append("price", formData.price);
    try {
      const response = await axios.put(
        API_ENDPOINTS.UPDATEGIG + gig.id,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        handleTeacherId(gig.id);
        handleReset();
        router("/profile-page");
      } else {
        toast.error(response.data.error);
      }
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error || "An error occurred.");
      } else if (error.request) {
        toast.error("No response received from the server.");
      } else {
        toast.error("Error setting up the request.");
      }
    } finally {
      setLoading(false);
    }

    setFormData({
      title: "",
      description: "",
      mediaFiles: [],
      price: "",
    });

    setSelectedFiles([]);
    setLoading(false);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  useEffect(() => {
    setFormData((prevData: any) => ({
      ...prevData,
      title: gig.title,
      description: gig.description,
      mediaFiles: gig.mediaFiles,
      price: gig.price,
    }));
  }, [gig]);
  const arrayImages = gig?.imageUrl?.split(",");

  return (
    <div className="flex items-center justify-center p-4">
      <div
        className=" w-full max-w-xl p-6 mx-auto bg-white rounded-lg xl:mx-auto"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <form className="px-2">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">
              {t("Create Your Gig")} &#128515;
            </h1>
          </div>
          <div className="pr-3 mx-3">
            <label>{t("Title")}</label> <br />
            <input
              className="w-full  mt-2 p-3 mb-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:border-[#51ff85] focus:ring-1 focus:ring-[#51ff85] focus:outline-none"
              placeholder={t("Gig_Title")}
              name="title"
              value={formData?.title}
              onChange={handleInputChange}
              required
            />
          </div>{" "}
          <div className="pr-3 mx-3">
            <label htmlFor="">{t("Gig_Description")}</label> <br />
            <textarea
              className="w-full mt-2 p-3 mb-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:border-[#51ff85] focus:ring-1 focus:ring-[#51ff85] focus:outline-none"
              placeholder={t("Gig_Description")}
              name="description"
              value={formData?.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="pr-3 mx-3">
            <label htmlFor="">{t("Gig_Price")}(Yun)</label> <br />
            <input
              className="w-full mt-2 p-3 mb-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:border-[#51ff85] focus:ring-1 focus:ring-[#51ff85] focus:outline-none"
              placeholder={t("Gig_Price")}
              name="price"
              type="number"
              value={formData?.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mx-2 w-full">
            <label className="block text-gray-700">{t("ADD_VIDEOS")}</label>
            <div className="flex flex-wrap  gap-4 mt-2  ">
              {arrayImages?.map((img: string, index: number) => {
                return (
                  <>
                    {/* Ensure key is unique and at the top element */}
                    {hasImageExtension(img) ? (
                      <div key={index} className="relative ">
                        <img
                    className="w-16 h-16 object-cover rounded-lg "
                    src={img}
                          alt="Blog Post Image"
                        />
                      </div>
                    ) : (
                      <div key={index} className="relative ">
                        <video
                          controls
                          className="w-16 h-16 object-cover rounded-lg "
                          src={img}
                        />
                      </div>
                    )}
                  </>
                );
              })}
              {selectedFiles?.map((file, index) => (
                <div key={index} className="relative ">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`file-${index}`}
                    className="w-16 h-16 object-cover rounded-lg "
                  />
                  <button
                    className="absolute top-0 right-[-10px] h-4 w-4 bg-[#61cbc2] rounded-full text-white text-[14px] flex justify-center items-center cursor-pointer"
                    onClick={() => removeSelectedFile(index)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            <input
              id="file-upload"
              name="mediaFiles"
              ref={fileInputRef}
              className="hidden "
              type="file"
              multiple
              onChange={handleImageChange}
              accept="image/*,video/*"
            />
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center p-4  border-2 border-dashed rounded-lg border-[#61cbc2] cursor-pointer"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path d="M12 4v16m8-8H4"></path>
              </svg>
            </label>
          </div>
          <button
            className="w-full bg-[#45e07d] cursor-pointer  text-white font-bold py-3 px-4 rounded-lg shadow hover:shadow-md transition-all mt-10"
            // disabled={
            //   isLoading ||
            //   (!formData.title.trim() && formData?.mediaFiles?.length === 0)
            // }
            type="submit"
            onClick={(e) => handleCreate(e)}
          >
            {t("UPDATE_GIG")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateGig;
