import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const Logout: React.FC = () => {
  
  const router = useNavigate()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    new Promise((resolve) => setTimeout(resolve, 2000));

    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('teacher_id');
    localStorage.removeItem('tokenTimestamp');
    localStorage.removeItem('nickName');
    localStorage.removeItem('user');
    localStorage.removeItem('score');
    localStorage.removeItem('par');
    router('/login-page')    

    window.location.reload();
    setLoading(false);
  },[router]);
 
  return (
    <> {loading && (
      <div className="flex items-center justify-center h-screen">
        <BeatLoader color="#51ff85" size={15} />
      </div>
    )}</>
  );
    
}
export default Logout;