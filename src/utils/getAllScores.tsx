import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
export const getAllScores = async ( setScore: any,setLoading:any, navigate:any) => {
  try {
    
    const token = localStorage.getItem("token");
    let endpoint = API_ENDPOINTS.GETALLSCOREPUBLIC;
    const headers: any = {
      "ngrok-skip-browser-warning": "69420"
    };
    if (token && token !== "undefined") {
      headers["Authorization"] = `Bearer ${token}`;
      endpoint = API_ENDPOINTS.GETALLSCORE;
    }
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420"

      },
    
    });
    setScore(response.data)
  }
   catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        localStorage.clear();
        toast.error("Session expired. Please log in again.");
        navigate('/login-page'); 
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }finally{
      setLoading(false);
    }
  };

  export const getScoreById = async (setEventScore: any, setScoreLoading: any, eventId: any) => {
    try {
        const token = localStorage.getItem("token");
        let endpoint = API_ENDPOINTS.GETSCOREBYEVENTID + eventId;

        if (!token || token === "undefined") {
            // Use public endpoint if token doesn't exist or is undefined
            endpoint = API_ENDPOINTS.GETPUBLICSCOREBYEVENTID + eventId;
        }

        const headers: any = {
        "ngrok-skip-browser-warning": "69420"
      };
        if (token && token !== "undefined") {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await axios.get(endpoint, {
            headers,
        });

        setEventScore(response.data);
    } catch (error) {
        console.error(error);
        // Handle error appropriately
    } finally {
        setScoreLoading(false);
    }
};


export const postScores = async (score: any, message:any) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        API_ENDPOINTS.ADDSCORE,
        score,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(message);
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };