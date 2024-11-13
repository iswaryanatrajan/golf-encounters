import React, { useCallback, useEffect, useState } from "react";
import socket from "../socket";
import { fetchNotifications } from "../utils/fetchNotifications";
import { approveEvent } from "../utils/fetchEvents";

const NotiContext = React.createContext<any>({});

export const NotificationsContext = ({ children }: any) => {
  const [notifications, setNotifications] = useState<any>([])
  const [notificationData, setNotificationData] = useState<any>(null);
  const [message, setMessage] = useState(null)
  const [formData, setFormData] = useState<any>({userId: '', eventId: ''});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  let userId = localStorage.getItem("id");
  let tId = localStorage.getItem("teacher_id");

  useEffect(() => {
    console.log(isLoading ," isloasd")

    fetchNotifications(setNotificationData, setIsLoading);
    const handleAppointmentBooked = (data: any) => {
      console.log(data, ' babu')
      const check = (data.teacherId == tId || data.organizer == userId || data.studentId == userId || data.organizerId == userId || data.userId == userId) 
      if(check){
        setNotifications((prevNotifications: any) => [...prevNotifications, data]); 
      }

      console.log(notifications, check, 'awa li')
    }

   
    socket.on('appointmentBooked', handleAppointmentBooked);
    socket.on('joinRequest', handleAppointmentBooked);
    socket.on('appointmentDeclined', handleAppointmentBooked);
    socket.on('reservedGig', handleAppointmentBooked);
    socket.on('gigStatus', handleAppointmentBooked);
    return () => {
      socket.off('appointmentBooked', handleAppointmentBooked);
      socket.off('joinRequest', handleAppointmentBooked);
      socket.off('appointmentDeclined', handleAppointmentBooked);
      socket.off('reservedGig', handleAppointmentBooked);
      socket.off('gigStatus', handleAppointmentBooked);

    };
  }, [isLoading, message]); 
  const handleLoading = useCallback((value: any) => {
    setIsLoading(value);
  }, [isLoading]);
  const handleNotification = useCallback((value: any) => {
    setNotifications(value);
  }, [notifications]);

  const handleMessage = useCallback((value: any) => {
    setMessage(value);
  }, [message]);

  const handleFormData = useCallback((value: any) => {
    setFormData(value)
  }, [formData]);

  const [filteredNotifications, setFilteredNotifications] = useState([]);
  useEffect(() => {
    let filtered:any = notificationData?.filter((item:any) => item.isRead !== true);

    setFilteredNotifications(filtered);
    console.log("called");

  }, [notificationData, message]);

  

  const value = { handleNotification,handleLoading, handleMessage, handleFormData, isLoading, formData, notifications,filteredNotifications,  notificationData }; 

  return <NotiContext.Provider value={value}> {children}</NotiContext.Provider>
}

export const notificationsContextStore = () => React.useContext(NotiContext);
