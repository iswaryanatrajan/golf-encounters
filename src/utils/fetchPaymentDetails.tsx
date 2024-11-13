import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";
import { headers } from "./fetchPosts";

export const fetchPaymentDetails = async (setPosts:any, category:any) => {
    try {
      const token = localStorage.getItem("token");
      let endpoint = API_ENDPOINTS.GETPUBLICPOSTS;
  
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
        endpoint = API_ENDPOINTS.GETPOSTS; 
      }
      const response = await axios.get(endpoint, {
        headers,
        params: { category }, 
      });
      console.log(response);
      setPosts(response.data.posts);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        localStorage.removeItem('token');
            localStorage.removeItem('tokenTimestamp');
            localStorage.removeItem('nickName');
            localStorage.removeItem('teacher_id');
            localStorage.removeItem('user');
            localStorage.removeItem('id');
            localStorage.removeItem('score');
            localStorage.removeItem('par');
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };