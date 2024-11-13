import axios from "axios";
import { formatDate } from "./getStartedDate";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";

export const fetchEvents = async (startDate: any, endDate: any, setEvents: any, location?: any, status?: any) => {
  try {
    const token = localStorage.getItem("token");
    const headers: any = {
      "ngrok-skip-browser-warning": "69420"
    }; if (token) {
      headers["Authorization"] = `Bearer ${token}`;



    }
    const response = await axios.get(token && token !== "undefined" ? API_ENDPOINTS.GETALLEVENT : API_ENDPOINTS.PUBLICEVENTS, {
      headers
      ,
      params: {
        page: 1,
        pageSize: 50000,
        eventStartDate: startDate ? formatDate(startDate) : "",
        eventEndDate: endDate ? formatDate(endDate) : "",
        status: status,
        place: location
      },
    });
    setEvents(response.data.events);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      localStorage.clear();
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("An error occurred. Please try again.");
    }
  }
};

export const deleteEvent = async (eventId: any) => {
  try {
    const token = localStorage.getItem("token");
    let endpoint = API_ENDPOINTS.DELETE_EVENT + eventId;
    const headers: any = {
      "ngrok-skip-browser-warning": "69420"
    };
    if (token && token !== "undefined") {
      headers["Authorization"] = `Bearer ${token}`;
    }
    let response = await axios.delete(endpoint, { headers });
    if (response.status === 200) {

      toast.success('Event Deleted Successfully')
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      toast.error("Session expired. Please log in again.");
      localStorage.clear()
    } else {
      toast.error("An error occurred. Please try again.");
    }
  }
};

export const fetchEventss = async (setEvents: any, setEventsCount: any, queryParams: any, navigate: any) => {

  const { store_token, currentPage, locations, startDate, endDate, pageSize, eventStatus } = queryParams;
  try {
    const headers: any = {
      "ngrok-skip-browser-warning": "69420"
    }; if (store_token) {
      headers["Authorization"] = `Bearer ${store_token}`;

    }

    const response = await axios.get(store_token && store_token !== "undefined" ? API_ENDPOINTS.GETALLEVENT : API_ENDPOINTS.PUBLICEVENTS, {
      headers,
      params: {
        page: currentPage,
        pageSize: pageSize,
        eventStartDate: startDate ? formatDate(startDate) : "",
        eventEndDate: endDate ? formatDate(endDate) : "",
        status: eventStatus,
        place: locations[0]
      },
    });

    if (response.status === 401) {
      console.error("Unauthorized access - 401 error");
      return;
    }
    setEvents(response.data.events);

    setEventsCount(response.data.count)
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


export const fetchTeacherByID = async (setUser: any) => {
  try {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const teacher_id = localStorage.getItem("teacher_id");
    const headers: any = {
      "ngrok-skip-browser-warning": "69420"
    };
    if (token) {
      console.error("User not authenticated");
      headers["Authorization"] = `Bearer ${token}`

    }
    const response = await axios.get(token ? API_ENDPOINTS.GETTEACHERBYID + teacher_id : API_ENDPOINTS.PUBLICEVENTS, {
      headers,
    });

    setUser(response.data.teacher);
    console.log(response.data.events);

  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      localStorage.clear();
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("An error occurred. Please try again.");
    }
  }
};

export const fetchSingleEvent = async (eventId: any) => {

  const token = localStorage.getItem("token");
  const headers: any = {
    "ngrok-skip-browser-warning": "69420"
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await axios.get(
    token && token !== "undefined"
      ? API_ENDPOINTS.GETEVENTBYID + eventId
      : API_ENDPOINTS.GETPUBLICEVENTBYID + eventId,
    {
      headers,
    }
  );

  return response.data;

};

export const fetchCreatedEvents = async (activeTab: any, pageSize: any, currentPage: any, setTotalPage: any, setEvents: any) => {
  try {
    const userID = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const status = activeTab;

    if (userID && token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.defaults.headers.common['ngrok-skip-browser-warning'] = `69420`;

      const response = await axios.get(API_ENDPOINTS.GETEVENTSBYID, {
        params: {
          pageSize,
          
          page: currentPage,
          status,
          eventStartDate: "",
          eventEndDate: "",

        },
      });

      const data = response.data.rows;
      const count = response.data.count;
      setTotalPage(count);
      setEvents(data);

    } else {
      console.error('User ID or token not found in local storage');

    }
  } catch (error) {
    console.error('Error fetching user created events:', error);
  }
};


export const approveEvent = async (formData: any) => {
  try {
    const userID = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    const headers: any = {}
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    if (userID && token) {
      const response = await axios.put(API_ENDPOINTS.APPROVE_EVENT, formData, {
        headers
      });

      const data = response.data;
      // setMessage(data);

    } else {
      console.error('apprive error');

    }
  } catch (error) {
    console.error(error);
  }
};


export const fetchSeachedEvents = async (query: any, setEvents: any) => {

  const token = localStorage.getItem('token'); 
  if (!token) {
    console.log("No token found in localStorage");
    return;
  }
  const headers = new Headers({
    'Authorization': `Bearer ${token}`, // Use Bearer authentication scheme
    'Content-Type': 'application/json',
  });

  try {
    const response = await fetch(`${API_ENDPOINTS.SEARCH_EVENT}?name=${query}`, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`); // Handle HTTP errors
    }

    const data = await response.json();


    if (data && data.events) {
      setEvents(data.events);
    } else {
      console.log('No results or error in fetching'); // Debugging
    }
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
};
export const fetchSeachedEventsNames = async (query: any, setEvents: any) => {

  const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  if (!token) {
    console.log("No token found in localStorage");
    return; // Exit if no token is found
  }
  const headers = new Headers({
    'Authorization': `Bearer ${token}`, // Use Bearer authentication scheme
    'Content-Type': 'application/json',
  });

  try {
    const response = await fetch(`${API_ENDPOINTS.SEARCH_EVENT_NAME}?name=${query}`, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`); // Handle HTTP errors
    }

    const data = await response.json();


    if (data && data.events) {
      setEvents(data.events);
    } else {
      console.log('No results or error in fetching'); // Debugging
    }
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
};

export const fetchJoinedEvents = async (setJoinedEvents: any, setEventsCount: any, queryParams: any,) => {
  const { store_token, currentPage, locations, startDate, endDate, pageSize, eventStatus } = queryParams;

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error(`ログインされていません`);
      return;
    }

    const response = await axios.get(API_ENDPOINTS.GETJOINEDEVENTS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: currentPage,
        pageSize: pageSize,

      },

    });

    setJoinedEvents(response.data.joinedEvents);
    setEventsCount(response.data.count)

  } catch (error) {

  }
};

export const fetchFavoriteEvents = async (setFavoriteEvents: any, setEventsCount: any, queryParams: any,) => {
  const { store_token, currentPage, locations, startDate, endDate, pageSize, eventStatus } = queryParams;

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("User not authenticated");
      return;
    }
    const response = await axios.get(API_ENDPOINTS.GETFAVEVENTS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: currentPage,
        pageSize: pageSize,

      },
    });
    setFavoriteEvents(response.data.events);
    setEventsCount(response.data.count)
  } catch (error) {
    toast.error(`ログインされていません`);
  }
};
export const updateEventMedia = async ( formData:any, setMessage:any ) => {
  const userToken = localStorage.getItem("token");

  try {
    const formDataToSend = new FormData();
    formDataToSend.append("userId", formData.userId);
    formDataToSend.append("text", formData.text);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("tags", formData.tags);

    formData.mediaFiles.forEach((file:any, index:any) => {
      formDataToSend.append("mediaFiles", file);
    });

    const response = await axios.put(
      API_ENDPOINTS.UPDATE_EVENT_MEDIA,
      formDataToSend,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 201) {

      setMessage(response.data.message);
      toast.success(response.data.message);
    }
  } catch (error: unknown) {

  }
};

export const fetchUserEvents = async (userId:any, setEventsCount: any, setEvents: any,queryParams: any) => {
  const userToken = localStorage.getItem("token");

  const { store_token=userToken, currentPage='1', locations, startDate, endDate, pageSize='6000', eventStatus } = queryParams;

  try {
    const headers: any = {
     
    }; 
    if (store_token) {
      headers["Authorization"] = `Bearer ${userToken || userToken}`;

    }

    const response = await axios.get(userToken ? API_ENDPOINTS.GETUSEREVENTS + userId : API_ENDPOINTS.PUBLICEVENTS, {
      headers,
      params: {
        page: 1,
        pageSize: 6000,
        // eventStartDate: startDate ? formatDate(startDate) : "",
        // eventEndDate: endDate ? formatDate(endDate) : "",
        // status: eventStatus,
        // place: locations[0]
      },
    });

    setEventsCount(response.data.count);
    setEvents(response.data.events);

    

  } catch (error) {
  }
};

export const addEventCeremonyDetails = async (eventId:any, eventInfo:any, files:any, token:any) => {
  const formData = new FormData();
  formData.append('eventId', eventId);
  formData.append('eventInfo', eventInfo);
  files.forEach((file:any, index:any) => {
    formData.append(`files`, file); 
  });

  const response = await axios.post(API_ENDPOINTS.ADD_EVENT_CEREMONY, formData, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
  return response.data;
};
export const getCeremonyDetails = async (eventId:any, setEventCeremony:any) => {
try {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${API_ENDPOINTS. GET_EVENT_CEREMONY}/${eventId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  
  });
  setEventCeremony(response.data.ceremony)
} catch (error) {
  console.log(error,'error')
}
};

export const updateCeremonyDetails = async (
  formData: FormData,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  closeModal:any
) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.put(
      `${API_ENDPOINTS.UPDATE_EVENT_CEREMONY}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    setMessage(response.data.ceremony);

  } catch (error) {
    console.error('Error updating ceremony details:', error);
    throw error;
  }finally{
    closeModal(false)
  }
};