import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";
import { rating } from "@material-tailwind/react";
import { headers } from "./fetchPosts";

export const fetchTeacherCounts = async (setAppointsCount: any) => {
  try {
    const token = localStorage.getItem("token");
    let endpoint = API_ENDPOINTS.GETTEACHERAPPPOINTMENTPUBLICCOUNT;

    if (token && token !== null) {
      headers["Authorization"] = `Bearer ${token}`;
      endpoint = API_ENDPOINTS.GETTEACHERAPPPOINTMENTCOUNT;
    }

    const response = await axios.get(endpoint, {
      headers,
    });
    console.log(response.data);
    setAppointsCount(response.data);
  } catch (error) {
    console.error("Error toggling favorite status:", error);
  }
};
export const fetchTeachers = async (
  search: any,
  locationInput: any,
  availibilty: any,
  setTeachers: any,
  setSelectedTeacher: any,
  setLoading: any
) => {
  try {
    const token = localStorage.getItem("token");
    let endpoint = API_ENDPOINTS.GETALLTEACHERSPUBLIC;
    if (token && token !== "undefined") {
      endpoint = API_ENDPOINTS.GETALLTEACHERS;
    }

    const response = await axios.get(endpoint, {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          }
        : {},
      params: {
        page: 1,
        pageSize: 20,
        search: search,
        location: locationInput,
        availability: availibilty,
      },
    });

    setTeachers(response.data.teachers);

    if (response.data.teachers && response.data.teachers.length > 0) {
      setSelectedTeacher(response.data.teachers[0]);
    }

    setLoading(false);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    setLoading(false);
  }
};

export const fetchTeacherss = async (
  setTeachers: any,
  setSelectedTeacher: any,
  setSchedules: any,
  teacherData: any
) => {
  try {
    const token = localStorage.getItem("token");
    let endpoint = API_ENDPOINTS.GETALLTEACHERSPUBLIC;
    if (token && token !== "undefined") {
      endpoint = API_ENDPOINTS.GETALLTEACHERS;
    }
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "ngrok-skip-browser-warning": "69420",
      },
      params: {
        page: 1,
        pageSize: 2000,
        rating: teacherData?.rating,
        availability: teacherData?.availability,
        subject: teacherData?.subjects,
        location: teacherData?.locationSearch,
        search: teacherData?.nameSearch,
      },
    });

    if (response.data && response.data.teachers) {
      setTeachers(response.data.teachers);
      if (response.data.teachers.length > 0) {
        setSelectedTeacher(response.data.teachers[0]);
      }
    }
  } catch (error) {
    console.error("Error fetching teachers:", error);
    toast.error("");
  }
};

export const toggleFavoriteStatus = async (teacher: any, setTeachers: any) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      API_ENDPOINTS.FAVORITETEACHER,
      { teacherId: teacher.id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );
    setTeachers((prevTeachers: any) =>
      prevTeachers.map((t: any) =>
        t.id === teacher.id ? { ...t, isFavorite: !t.isFavorite } : t
      )
    );
    toast.success(response.data.message);
  } catch (error) {
    console.error("Error toggling favorite status:", error);
  }
};
export const fetchFavoriteTeachers = async (setFavoriteTeachers: any) => {
  try {
    const token = localStorage.getItem("token");
    if (token && token !== "undefined") {
      const userId = localStorage.getItem("id");
      const response = await axios.get(API_ENDPOINTS.GETFAVORITETEACHER, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          userId: userId,
        },
      });
      if (response.status === 200) {
        setFavoriteTeachers(response.data.favoriteTeachers);
      } else {
        return "get error";
      }
    }
  } catch (error: any) {
    console.error("Error fetching favorite teachers:", error.message);
  }
};

export const fetchSingleTeacher = async (setTeacher: any, teacherId: any) => {
  try {
    const token = localStorage.getItem("token");
    let endpoint = API_ENDPOINTS.GETPUBLICTEACHERBYID + teacherId;
    if (token && token !== "undefined") {
      endpoint = API_ENDPOINTS.GETTEACHERBYID + teacherId;
    }
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (response.data && response.data.teacher) {
      setTeacher(response.data.teacher);
    }
  } catch (error) {
    console.error("Error fetching teacher:", error);
  }
};

export const updateTeacherProfile = async (setTeachers: any, formdata: any) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      API_ENDPOINTS.UPDATETEACHERPROFILE,
      formdata,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    setTeachers(response.data.teacher);
    toast.success(response.data.message);
  } catch (error) {
    console.error("Error toggling favorite status:", error);
  }
};

export const fetchTeachersAppointments = async (
  setAppointments: any,
  setIsLoading: any
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      API_ENDPOINTS.GETTEACHERBOOKEDAPPOINTMENTS,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          page: 1,
          pageSize: 20,
        },
      }
    );
console.log("fetchTeachersAppointments" , response.data);
    setAppointments(response.data.bookedAppointments);
  } catch (error: any) {
    // toast.error("ログインされていません");
  } finally {
    setIsLoading(false);
  }
};

export const fetchStudentAppointments = async (
  setStudentAppointments: any,
  setIsLoading: any
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_ENDPOINTS.GETUSERBOOKEDAPPOINTMENTS, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        page: 1,
        pageSize: 20,
      },
    });

    setStudentAppointments(response.data.bookedAppointments);
  } catch (error: any) {
    // toast.error("ログインされていません");
  } finally {
    setIsLoading(false);
  }
};

// SHIFT DELETE
export const deleteShiftById = async (shiftId: any, setLoading: any) => {
  try {
    const token = localStorage.getItem("token");
    let endpoint = API_ENDPOINTS.DELETESHIFTSBYID;
    if (token && token !== "undefined" && shiftId) {
      endpoint = `${API_ENDPOINTS.DELETESHIFTSBYID}`;
    }
    const response = await axios.delete(endpoint, {
      data:{
        shiftId: shiftId
      },
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    toast.success(response.data?.message);
  } catch (error) {
    console.error("Error fetching teacher:", error);
  }finally {
    setLoading(false);
  }
};

// schedule   DELETE
export const deleteScheduleById = async (scheduleId: any, setLoading: any) => {
  try {
    const token = localStorage.getItem("token");
    let endpoint = API_ENDPOINTS.DELETESCHEDULEBYID;
    if (token && token !== "undefined" && scheduleId) {
      endpoint = `${API_ENDPOINTS.DELETESCHEDULEBYID}`;
    }
    const response = await axios.delete(endpoint, {
      data:{
        scheduleId: scheduleId
      },
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      
    });
    toast.success(response.data?.message);
  } catch (error) {
    console.error("Error fetching teacher:", error);
  }finally {
    setLoading(false);
  }
};
