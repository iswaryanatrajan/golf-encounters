import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";
import { pusher } from "../components/chat/pusher";

export const fetchMessages = async (sender: any, setAllChat: any) => {
  try {
    const response = await axios.get(API_ENDPOINTS.ALLCHAT, {
      params: { receiver: sender },
    });
    setAllChat(response.data);
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
};
export const fetchMessage = async (
  receiver: any,
  sender: any,
  setMessages: any
) => {
  try {
    const response = await axios.get(API_ENDPOINTS.GETCHAT, {
      params: { receiver: sender, sender: receiver },
    });
    setMessages(response.data);
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
};

export const postChat = async (formData: any, setMessage: any, handleLoading:any) => {
  const { newMessage, sender, receiver } = formData;
  try {
    const res =  await axios.post(API_ENDPOINTS.POSTCHAT, {
      channel: "my-channel",
      event: "my-event",
      message: newMessage,
      sender: sender,
      receiver: receiver,
    });
    fetchMessage(sender, receiver, setMessage);
    const refresh = Math.random();
    handleLoading(refresh)
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
export const updateChatStatus = async (formData: any, setLoading:any) => {
  const { sender, receiver } = formData;
  try {
    const res = await axios.put(
      API_ENDPOINTS.UPDATECHATSTATUS,
      {
        sender: sender,
        receiver: receiver,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    toast.success(res.data.message);
    setLoading(res.data.message); 
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
export const updateMessageStatus = async (formData: any, setUpdate:any) => {
  const { messageId, isRead } = formData;
  try {
    const res = await axios.put(
      API_ENDPOINTS.UPDATEMESSAGESTATUS,
      {
        messageId: messageId,
        isRead: isRead,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    toast.success(res.data.message);
    setUpdate(res.data.message)
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
export const updateChatMessage = async (formData: any, setUpdate:any) => {
  const { messageId, isRead , message} = formData;
  try {
    const res = await axios.put(
      `${API_ENDPOINTS.UPDATEMESSAGE}/${messageId}`,
      {
        isRead: isRead,
        message: message,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    toast.success(res.data.message);
    setUpdate(res.data.message)
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
export const deleteChatMessage = async (messageId: any, setUpdate: any) => {
  try {
    const res = await axios.delete(
      `${API_ENDPOINTS.DELETEMESSAGE}/${messageId}`, // Append messageId to the URL
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    toast.success(res.data.message);
    setUpdate(res.data);
  } catch (error) {
    console.error("Error deleting message:", error);
    toast.error("Failed to delete the message."); // Display error notification
  }
};
export const updateUserPresence = async (userId:any, status:any) => {
  try {
    const response = await axios.post(
      API_ENDPOINTS.UPDATEUSERPRESENSE,
      { userId, status },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Make sure the token is available in local storage
        },
      }
    );
    console.log(response.data.message);
  } catch (error) {
    console.error('Error updating user status:', error);
  }
};
export const fetchOnlineUsers = async (setOnlineUsers?: any) => {
  try {
    const response = await axios.get(API_ENDPOINTS.ONLINEUSERS, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure token is available and valid
      },
    });

    // Log the full response for debugging
    console.log('API Response:', response);

    // Access the data correctly
    const onlineUsers = response.data.onlineUsers; // Adjust this based on your response structure
    setOnlineUsers(onlineUsers)

    return onlineUsers; // Return the data if needed elsewhere
  } catch (error) {
    console.error('Error fetching online users:', error);
    return []; // Return an empty array or handle the error as needed
  }
};
export const subscribeToChannel = async (socketId: string) => {
  try {
    const channelName = 'presence-channel';

    const response = await axios.post(API_ENDPOINTS.PUSHERAUTH, {
      socket_id: socketId,
      channel_name: channelName,
      user_id: localStorage.getItem('id'), // Include userId in the request
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace with actual token
      },
    });

    // Subscribe to the presence channel
    const channel = pusher.subscribe(channelName);

    // Bind to the 'pusher:subscription_succeeded' event to handle successful subscription
    channel.bind('pusher:subscription_succeeded', function(members: any) {
      console.log('Subscription succeeded:', members);
    });

  } catch (error) {
    console.error('Error subscribing to Pusher channel:', error);
  }
};