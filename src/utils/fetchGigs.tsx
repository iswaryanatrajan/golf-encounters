import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
export const fetchGigsById = async (setGigs: any, tId: any) => {

  try {
    const token = localStorage.getItem("token");
    let endpoint = API_ENDPOINTS.GETPUBLICGIGSBYTEACHER + tId;
    if (token && token !== "undefined") {
      endpoint = API_ENDPOINTS.GETGIGSBYTEACHER + tId;
    }
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        "ngrok-skip-browser-warning": "69420"

      },

    });

    setGigs(response.data)
  } catch (error) {
    console.log(error);
  }
};
export const deleteGig = async (setLoading: any, gigId: any) => {

  try {
    const token = localStorage.getItem("token");
    let endpoint = API_ENDPOINTS.DELETEGIGBYID;
    if (token && token !== "undefined") {
      endpoint = API_ENDPOINTS.DELETEGIGBYID + gigId;
    }
    const response = await axios.delete(endpoint, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        "ngrok-skip-browser-warning": "69420"

      },

    });
    if (response.status === 200) {
      toast.success(response.data.message);
      window.location.reload()

    } else {
      toast.error(response.data.error);
    }
    setLoading(response.data)
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllTeachersGigs = async (setGigs: any,) => {

  try {
    const token = localStorage.getItem("token");
    let endpoint = API_ENDPOINTS.GETPUBLICALLTEACHERSGIGS;
    if (token && token !== "undefined") {
      endpoint = API_ENDPOINTS.GETALLTEACHERSGIGS ;
    }
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        "ngrok-skip-browser-warning": "69420"

      },

    });

    setGigs(response.data.teachers)
  } catch (error) {
    console.log(error);
  }
};
export const fetchGig = async (setGigs: any, gigId:any) => {

  try {
    const token = localStorage.getItem("token");
    let endpoint = API_ENDPOINTS.GETPUBLICGIGBYID + gigId;
    if (token && token !== "undefined") {
      endpoint = API_ENDPOINTS.GETGIGBYID + gigId ;
    }
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        "ngrok-skip-browser-warning": "69420"

      },

    });

    setGigs(response.data.gig)
  } catch (error) {
    console.log(error);
  }
};

// Reserve gig

export const reserveGig = async (gigId: string, setLoading: any) => {
  const { t } = useTranslation();
  try {
    const token = localStorage.getItem("token");
    const endpoint = `${API_ENDPOINTS.RESERVEGIG}/${gigId}`;
    
    const response = await axios.post(endpoint, {}, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        "ngrok-skip-browser-warning": "69420"
      },
      params:{
        id:gigId
      }
    });

    if (response.status === 201) {
      toast.success(t('GIG_RESERVATION'));
    } else {
      toast.error(response.data.error);
    }

    setLoading(false);
  } catch (error) {
    console.log(error);
    toast.error("Error reserving gig");
    setLoading(false);
  }
};


// get

export const fetchTeacherReservedGig = async (setGigs: any,setIsLoading:any) => {

  try {
    const token = localStorage.getItem("token");
    let endpoint = API_ENDPOINTS.GETTEACHERRESERVEGIGS;
    if (token && token !== "undefined") {
      endpoint = API_ENDPOINTS.GETTEACHERRESERVEGIGS  ;
    }
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        "ngrok-skip-browser-warning": "69420"

      },

    });

    setGigs(response.data.reservedGigs)
  } catch (error) {
    console.log(error);
  }
  finally{
    setIsLoading(false)
  }
};
export const fetchUserReservedGig = async (setGigs: any) => {

  try {
    const token = localStorage.getItem("token");
    let endpoint = API_ENDPOINTS.GETUSERRESERVEGIGS;
    if (token && token !== "undefined") {
      endpoint = API_ENDPOINTS.GETUSERRESERVEGIGS  ;
    }
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        "ngrok-skip-browser-warning": "69420"

      },

    });

    setGigs(response.data.reservedGigs)
  } catch (error) {
    console.log(error);
  }
};


// manage
export const manageGigReservation = async (item: any, notificationId:any, status: string, setLoading: any) => {
  const { id } = item;

  try {
    const token = localStorage.getItem("token");
    const endpoint = `${API_ENDPOINTS.MANAGEGIG}/${item.id}`;
    
    const response = await axios.put(endpoint, { status,  notificationId }, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        "ngrok-skip-browser-warning": "69420"
      },
      params:{
        id:item.id
      }
    });

    if (response.status === 200) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.error);
    }

    setLoading(false);
  } catch (error) {
    console.log(error);
    toast.error("Error updating reservation");
    setLoading(false);
  }
};