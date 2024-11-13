import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";

const fetchUserCreatedEvents = async () => {
    try {
      const userId = 123; 
      const response = await axios.get(`${API_ENDPOINTS.GETEVENTSBYID}/${userId}`);
      return response.data; 
    } catch (error) {
      console.error('Error fetching user created events:', error);
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
