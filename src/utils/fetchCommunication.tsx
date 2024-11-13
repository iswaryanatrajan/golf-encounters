import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
export const handleEditForm = async (e: React.FormEvent,setIsEdit:any,handleMessage:any, formData:any) => {
  const { t, i18n } = useTranslation();
    e.preventDefault();
    try {
      const response = await axios.put(
        API_ENDPOINTS.EDITPOSTCOMMENTS,
        {
          commentId: formData.commentId,
          content: formData.content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setIsEdit((prevState: any) => ({
        false: false,
      }));
      if (response.status === 200) {
        handleMessage(response.data.updatedComment.content);
        toast.success(t("COMMENT_UPDATE"));
      }
    } catch (error) {
      toast.error(t("ERROR_UPDATE_LIKES"));
    }
  };

  export const handleDeleteComment = async (commentId: any, userId: any, handleMessage: any, setIsEdit: any) => {
    try {
      const response = await axios.delete(API_ENDPOINTS.DELETECOMMENTBYID + commentId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          commentId: commentId,
        },
      });
  
      setIsEdit(false);
        handleMessage(response.data.message);
        toast.success("comment has been deleted");

    
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };