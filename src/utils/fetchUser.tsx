import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";

export  const getAllUsers = async ( setUsers: any) => {
    try {
        const token = localStorage.getItem("token");

      if (token && token !== "undefined") {
        const response = await axios.get(`${API_ENDPOINTS.ALLUSERS}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        localStorage.setItem( "nickName", response.data.nickName)
        setUsers(response.data.users)
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        localStorage.clear();
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
};
export  const getUser = async ( setUser: any, navigate:any) => {
    try {
        const userId = localStorage.getItem("id");
        const token = localStorage.getItem("token");

      if (token && token !== "undefined") {
        const response = await axios.get(`${API_ENDPOINTS.GET_USER}${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420"
          },
        });

        localStorage.setItem( "nickName", response.data.nickName)
        setUser(response.data.user)
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        localStorage.clear();
        toast.error("Session expired. Please log in again.");
        navigate('/login-page'); 
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
};
export  const getSingleUser = async ( setSingleUser: any,  userId:any) => {
  try {
      const token = localStorage.getItem("token");

    if (token && token !== "undefined") {
      const response = await axios.get(`${API_ENDPOINTS.GET_USER}${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420"
        },
      });

      setSingleUser(response.data.user)
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      localStorage.clear();
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("An error occurred. Please try again.");
    }
  }
};
export const updateUser = async (formData:any, setUser:any) => {
    const userToken = localStorage.getItem("token");

    console.log(formData, "updd")
    try {
      const formDataToSend = new FormData();

      console.log(formData.imageUrl);
      formDataToSend.append("nickName", formData.nickName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("userId", formData.userId);
      formDataToSend.append("imageUrl", formData.imageUrl?.[0]);
   
      console.log("FormData:", formDataToSend);
      const response = await axios.put(
        API_ENDPOINTS.UPDATEUSERPROFILE + formData.userId,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
            "ngrok-skip-browser-warning": "69420"
          },
        }
      );
      setUser(response.data.user);
    } catch (error: unknown) {}
};