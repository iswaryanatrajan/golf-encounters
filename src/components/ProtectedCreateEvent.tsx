import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";

const isProfileComplete = async (userId: string, token: string): Promise<boolean> => {
  try {
     const [profileRes, imageRes] = await Promise.all([
       axios.get( API_ENDPOINTS.GET_USER + userId, {
         headers: { Authorization: `Bearer ${token}` }
       }),
       axios.get(API_ENDPOINTS.ISIDENTIFICATIONIMAGEUPLOADED + userId, {
         headers: { Authorization: `Bearer ${token}` }
       })
     ]);
 
     const address = profileRes.data?.user?.address;
     const hasImage = imageRes.data?.user?.identificationImage !== null && imageRes.data?.user?.identificationImage !== undefined;
     console.log("Address:", address, "Has Image:", hasImage,imageRes.data?.identificationImage);
     return !!address && hasImage;
   } catch (err) {
     return false;
   }
};

const ProtectedCreateEvent = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const checkProfile = async () => {
      const userId = localStorage.getItem("id");
      const token = localStorage.getItem("token");

      if (userId && token) {
        const complete = await isProfileComplete(userId, token);
        setAllowed(complete);
      }

      setIsLoading(false);
    };

    checkProfile();
  }, []);

  if (isLoading) return <div>Checking profile...</div>;
  return allowed ? children : <Navigate to="/complete-profile" />;
};

export default ProtectedCreateEvent;
