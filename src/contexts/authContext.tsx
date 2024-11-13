import React, { useCallback, useEffect, useState } from "react";
import { getSingleUser, getUser, updateUser } from "../utils/fetchUser";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../appConfig";
import { fetchUserPosts } from "../utils/fetchPosts";
import { fetchUserEvents } from "../utils/fetchEvents";
import { fetchMessages, subscribeToChannel } from "../utils/fetchChat";
import { pusher } from "../components/chat/pusher";
import axios from "axios";
import { useTranslation } from "react-i18next";
const UserAuthContext = React.createContext<any>({});

export const AuthContext = ({ children }: any) => {
  const { t } = useTranslation();
  const [user, setUser] = useState<any>("");
  const [receiver, setReceiver] = useState('');
  const [message, setMessage] = useState<string>();
  const [chatUser, setChatUser] = useState<string>("4");
  const [activeChatId, setActiveChatId] = useState<any>(Boolean);
  const [notificationCount, setNotificationCount] = useState<any>([]);
  const sender = localStorage.getItem("id")
  const [allChat, setAllChat] = useState<any>([]);
  const [loading, setLoading] = useState(false);



  



  const navigate = useNavigate();
  const [userFormData, setUserFormData] = useState({
    nickName: "",
    email: "",
    password: "",
    userId: "",
    imageUrl: "",
  });
  useEffect(() => {
    getUser(setUser, navigate);
  }, [message]);

  useEffect(() => {
    setUserFormData({
      nickName: user?.nickName,
      email: user?.email,
      password: user?.password,
      userId: user?.id,
      imageUrl: user?.imageUrl || [],
    });
  }, [user]);

  const handleUser = useCallback(
    (value: any) => {
      return setUser(value);
    },
    [user]
  );
  const handleLoading = useCallback(
    (value: any) => {
      return setLoading(value);
    },
    [loading]
  );
  const handleAllChat = useCallback(
    (value: any) => {
      return setAllChat(value);
    },
    [allChat]
  );

  const handleSelectedUser = useCallback(
    (value: any) => {
      return setChatUser(value);
    },
    [chatUser]
  );
  const handleReceiver = useCallback(
    (value: any) => {
      return setReceiver(value);
    },
    [receiver]
  );
  const handleChatId = useCallback(
    (value: any) => {
      return setActiveChatId(value);
    },
    [activeChatId]
  );
  const handleNotificationCount = useCallback(
    (incomingMessage: any) => {
  
      // Optionally, if you need to store the incoming messages
      setNotificationCount((prevMessages: any[]) => [...prevMessages, incomingMessage]);
    },
    [notificationCount]
  );

  const handleUpdateUser = async () => {
    const payload = {
      nickName: userFormData.nickName,
      email: userFormData.email,
      password: userFormData.password,
      imageUrl: userFormData.imageUrl,
    };

    const authToken = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${API_ENDPOINTS.UPDATEUSERPROFILE}${userFormData.userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessage(data.message);
      toast.success(data.message);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(
          "There was a problem with the fetch operation: " + error.message
        );
        toast.error("Update failed: " + error.message);
      } else {
        console.error("An unexpected error occurred");
        toast.error(t("UNEXPECTED_ERROR"));
      }
    }
  };
  useEffect(() => {
    fetchMessages(sender, handleAllChat);
  }, [sender, notificationCount, loading]);

  useEffect(() => {
    // Function to handle the Pusher connection state
    const handlePusherConnection = () => {
      pusher.connection.bind('connected', () => {
        const id = pusher.connection.socket_id;
        if (id) {
          subscribeToChannel(id);
        } else {
          console.error('Socket ID is not available.');
        }
      });

      pusher.connection.bind('error', (error: any) => {
        console.error('Pusher connection error:', error);
      });
    };  

    handlePusherConnection();

    // Cleanup function to unsubscribe from the channel on component unmount
    return () => {
      pusher.unsubscribe('presence-channel');
    };
  }, []);

  const value = {
    handleUser,
    handleUpdateUser,
    setUserFormData,
    handleSelectedUser,
    handleReceiver,
    handleChatId,
    handleNotificationCount,
    handleLoading,
    handleAllChat,
    notificationCount,
    loading,
    activeChatId,
    receiver,
    chatUser,
    userFormData,
    user,
    message,
    allChat,
    sender
  };
  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const userAuthContext = () => React.useContext(UserAuthContext);

const SingleUserContext = React.createContext<any>({});

export const UserContext = ({ children }: any) => {
  const params = useParams<{ id: string }>();
  const userId = params.id;

  const [singleUser, setSingleUser] = useState<any>("");
  const [postCount, setPostsCount] = useState<any>("");
  const [eventCount, setEventsCount] = useState<any>("");

  console.log(eventCount,"asdsda");
  useEffect(() => {
    getSingleUser(setSingleUser, userId);
    fetchUserPosts(userId, setPostsCount);
    fetchUserEvents(userId,  setEventsCount,"", "")
  }, [userId]);

  const value = {
    singleUser,
    postCount,
    eventCount
  };
  return (
    <SingleUserContext.Provider value={value}>
      {children}
    </SingleUserContext.Provider>
  );
};

export const singleUserContext = () => React.useContext(SingleUserContext);
