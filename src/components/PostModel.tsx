import React, { useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { API_ENDPOINTS } from "../appConfig";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { postContext } from "../contexts/postsContext";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
interface CreatePostType {
  text: string;
  category: string;
  tags: string;
  userId: string | null;
  mediaFiles: File[];
}

const PostModal: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const { t } = useTranslation();
  const [postContent, setPostContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const userId = localStorage.getItem("id");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { handleCreatePost, formData, setFormData } = postContext();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const filesArray: File[] = Array.from(files).slice(0, 5);
      setSelectedFiles([...selectedFiles, ...filesArray]);
      setFormData((prevFormData: CreatePostType) => ({
        ...prevFormData,
        mediaFiles: [...prevFormData.mediaFiles, ...filesArray],
      }));
    }
  };

  const removeSelectedFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    setFormData((prevFormData: CreatePostType) => ({
      ...prevFormData,
      mediaFiles: updatedFiles,
    }));
  };

  const handlePost = async (event: React.FormEvent) => {
    event.preventDefault();
  
    // Check if text is effectively empty or if no files are selected
    const isTextEmpty = !formData.text || !formData.text.replace(/<(.|\n)*?>/g, '').trim();
    if (isTextEmpty && formData.mediaFiles.length === 0) {
      alert(t("BEFORE_POST"));
      return;
    }
  
    setLoading(true);
    handleCreatePost(formData);
  
    // Reset form data
    setFormData({
      text: '',
      category: '',
      tags: '',
      userId: userId,
      mediaFiles: [],
    });
  
    setSelectedFiles([]);
    setSelectedCategory('');
    setLoading(false);
    closeModal();
  };
  

  const handleInputوTextChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleInputTextChange = (content: string) => {
    // Check if the content is effectively empty (ignoring HTML tags)
    const isContentEmpty = !content.replace(/<(.|\n)*?>/g, '').trim();
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      text: isContentEmpty ? '' : content,
    }));
  };
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedCategory(value);
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="z-[9999] fixed inset-0 flex items-center justify-center p-4 bg-gray-500 bg-opacity-50 backdrop-blur-sm ">
      <div
        className=" w-full max-w-xl p-6 mx-auto bg-white rounded-lg    mx-20 xl:mx-auto"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
          maxHeight: '90vh', // Maximum height of the modal
          overflowY: 'auto', // Enable vertical scrolling
        }}
      >
        <form className="px-2">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">{t("WRITE_POST")}</h1>
            <button
              onClick={closeModal}
              className="p-2 rounded-full cursor-pointer"
            >
              <XMarkIcon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <div style={{ height: '300px', overflow: 'hidden' }}>
            <ReactQuill
              theme="snow"
              value={formData.text}
              onChange={handleInputTextChange}
              placeholder={t("WRITE_TEXT")}
              style={{ height: "220px" }}

            />{" "}

          </div>

          <div>
            <label className="block text-gray-700">{t("ADD_VIDEOS")}</label>
            <div className="flex flex-wrap gap-4 mt-2  ">
              {selectedFiles.map((file, index) => (
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
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 4v16m8-8H4"></path>
              </svg>
            </label>
          </div>
          <p className="p-0 mt-4">{t("ADD_CATEGORY")}</p>
          <select
            className="w-full p-3 mb-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:border-[#51ff85] focus:ring-1 focus:ring-[#51ff85] focus:outline-none"
            onChange={handleSelectChange}
            name="category"
          >
            <option value="">{t("SELECT_CATEGORY")}</option>
            <option value="Public">{t("PUBLIC")}</option>
            <option value="Private">{t("PRIVATE")}</option>
          </select>
          <div>
            <label htmlFor="">{t("ADD_TAGS")}</label> <br />
            <input
              className="xs:w-[200px] sm:w-[300px] md:w-[400px] xl:w-[533px] p-3 mb-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:border-[#51ff85] focus:ring-1 focus:ring-[#51ff85] focus:outline-none"
              placeholder={t("ADD_TAGS")}
              name="tags"
              onChange={handleInputChange}
              required
            />
          </div>

          <button
            className="w-full bg-[#61cbc2] hover:bg-[#45e07d] text-white font-bold py-3 px-4 rounded-lg shadow hover:shadow-md transition-all"
            disabled={isLoading || (!formData.text.trim() && formData.mediaFiles.length === 0)}
            type="submit"
            onClick={(event) => handlePost(event)}
          >
            {t("POST")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostModal;
