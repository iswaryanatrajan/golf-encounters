
import React, { useEffect, useState } from 'react';
import RegisterPage from "../components/Register";
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
 
  const history = useNavigate();
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      history('/event-main-page')    
  }
  }, [history]);


  return (
    <div>
    {token ? 
        <div>ss</div>
     : (
      <RegisterPage/>
      )}
    </div>
    
  );
};

export default Register;
