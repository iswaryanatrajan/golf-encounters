import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";

export const fetchNotifications = async (
  setNotificationData: any,
  setIsLoading: any
) => {
  const token = localStorage.getItem("token");
  if(token) {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");
    const tId = localStorage.getItem("teacher_id");
    const headers: any = {
        "ngrok-skip-browser-warning": "69420"
      };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await axios.get(API_ENDPOINTS.GET_NOTIFICATION, {
      headers,
      params:{
        organizerId: userId,
        teacherId: tId,
        userId: userId
      }
    });
    setNotificationData(response.data.notifications);
  } catch (error) {
    console.log(error) 
  } finally {
    setIsLoading(false);
  }
}else{
  setNotificationData([])
}
};

export const updateNotificationsStatus = async (
  setIsLoading: any,
  formData: any,
) => {
  setIsLoading(true);
  try {
    const token = localStorage.getItem("token");
    const headers: any = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await axios.put(API_ENDPOINTS.UPDATENOTIFICATIONSTATUS, formData, { headers });
    if (response.status === 200) {
     
    }
    setIsLoading(false);
  } catch (error) {
    console.log(error);
    setIsLoading(false); 
  }
};
  