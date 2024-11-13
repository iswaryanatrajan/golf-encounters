import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";
import { set } from "date-fns";
export let headers:any = {
  "ngrok-skip-browser-warning": "69420"
};
export const fetchPosts = async (setPosts: any, category: any, navigate:any, setCount:any,setpostLoading:any, reqObj:any) => {

  const {currentPage, pageSize} = reqObj
  try {
    const token = localStorage.getItem("token");
    let endpoint = API_ENDPOINTS.GETPUBLICPOSTS;
    if (token && token !== "undefined") {
      headers["Authorization"] = `Bearer ${token}`;
      endpoint = API_ENDPOINTS.GETPOSTS;
    }
    const response = await axios.get(endpoint, {
      headers,
      params: { category , page: currentPage, pageSize: pageSize },
    });
    console.log(response);
    setPosts(response.data.posts);
    setCount(response.data.count)
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      localStorage.removeItem('token');
          localStorage.clear();
      toast.error("Session expired. Please log in again.");
      navigate('/login-page');
    } else {
      toast.error("An error occurred. Please try again.");
    }
  }finally{
    setpostLoading(false)
  }
};
export const fetchMyPosts = async (setPosts: any,setpostLoading:any, navigate:any) => {
  try {
    const token = localStorage.getItem("token");
    let endpoint = API_ENDPOINTS.GETMYPOSTS;
    if (token && token !== "undefined") {
      headers["Authorization"] = `Bearer ${token}`;
      endpoint = API_ENDPOINTS.GETMYPOSTS;
    }
    const response = await axios.get(endpoint, {
      headers,
    });
    setPosts(response.data.posts);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      localStorage.clear();
      toast.error("Session expired. Please log in again.");
      navigate('/login-page');
    } else {
      toast.error("An error occurred. Please try again.");
    }
  }finally{
    setpostLoading(false)
  }
};

export const fetchAllPosts = async (setPosts: any,reqObj:any,setpostLoading:any, navigate:any, setCount:any) => {


  const {currentPage, pageSize, category,} = reqObj;


  try {
    const token = localStorage.getItem("token");
    let endpoint = API_ENDPOINTS.GETPUBLICPOSTS;
    
    if (token && token !== "undefined") {
      headers["Authorization"] = `Bearer ${token}`;
      endpoint = API_ENDPOINTS.GETALLPOSTS;
    }
    const response = await axios.get(endpoint, {
      headers,
      params: {
        page: currentPage,
        pageSize: pageSize,
      }   
    });
    setPosts(response.data.posts);
    setCount(response.data.count);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      localStorage.clear();
      toast.error("Session expired. Please log in again.");
      navigate('/login-page');
    } else {
      toast.error("An error occurred. Please try again.");
    }
  }finally{
    setpostLoading(false)
  }
};

export const fetchSinglePosts = async (setSinglePosts: any, id: any) => {
  try {
    const token = localStorage.getItem("token");
    let endpoint = API_ENDPOINTS.GETPOSTBYID + id;
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
      endpoint = API_ENDPOINTS.GETPOSTBYID + id;
    }
    const response = await axios.get(endpoint, {
      headers,
    });
    console.log(response);
    setSinglePosts(response.data.post);
  } catch (error) {
    throw error;
  }
};

export const addPostComment = async (formData: any, handleMessage?: any) => {
  try {
    const response = await axios.post(API_ENDPOINTS.ADDPOSTCOMMENT, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 201) {
      handleMessage(response.data)
      return response.data;

    } else {
      throw new Error("Failed to add comment");
    }
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (postId: any,setMessage:any, navigate: any) => {
  try {
      const token = localStorage.getItem("token");
      let endpoint = API_ENDPOINTS.DELETEPOST + postId;
      const headers: any = {
        "ngrok-skip-browser-warning": "69420"
      };
      if (token && token !== "undefined") {
          headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await axios.delete(endpoint, { headers });

      toast.success(response.data.message)
      setMessage(response.data.message);
  } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
          toast.error("Session expired. Please log in again.");
          localStorage.clear();
          navigate('/login-page');
      } else {
          toast.error("An error occurred. Please try again.");
      }
  }
};

export const createPost = async ( formData:any, setMessage:any ) => {
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

    const response = await axios.post(
      API_ENDPOINTS.CREATEPOSTS,
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


export const fetchMostLikedPosts = async (setMostLiked: any) => {
  try {
    const token = localStorage.getItem("token");
    let endpoint = API_ENDPOINTS.GETPUBLICALLPOSTS;
    if (token && token !== "undefined") {
      headers["Authorization"] = `Bearer ${token}`;
      endpoint = API_ENDPOINTS.GETALLPOSTS;
    }
    const response = await axios.get(endpoint, {
      headers,
      params: {
        page: 1,
        pageSize: 4,
        topLiked: 1
      }
    });
    setMostLiked(response.data.posts);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      localStorage.clear();
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("An error occurred. Please try again.");
    }
  }
};


export const fetchMostCommentedPosts = async (setMostLiked: any) => {
  try {
    const token = localStorage.getItem("token");
    let endpoint = API_ENDPOINTS.GETPUBLICALLPOSTS;
    if (token && token !== "undefined") {
      headers["Authorization"] = `Bearer ${token}`;
      endpoint = API_ENDPOINTS.GETALLPOSTS;
    }
    const response = await axios.get(endpoint, {
      headers,
      params: {
        page: 1,
        pageSize: 4,
        topCommented: 1
      }
    });
    setMostLiked(response.data.posts);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      localStorage.clear();
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("An error occurred. Please try again.");
    }
  }
};



// getUserAllPosts
export const fetchUserPosts = async (userId?: string, setPosts?: any,  setPageLoading?: any, navigate?: any) => {
  const reqObj = {
    currentPage: 1,
    pageSize: 10
  };
  const { currentPage, pageSize } = reqObj;
  try {
    const token = localStorage.getItem("token");
    let endpoint = API_ENDPOINTS. GETUSERALLPOSTS + userId; 
    if (token && token !== "undefined") {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await axios.get(endpoint, {
      headers,
      params: {
        page: currentPage,
        pageSize: pageSize,
      }
    });
    // setCount(response.data.count)
    setPosts(response.data.posts);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.clear();
      toast.error("Session expired. Please log in again.");
      navigate('/login-page');
    } else {
      toast.error("An error occurred. Please try again.");
    }
  }
};


