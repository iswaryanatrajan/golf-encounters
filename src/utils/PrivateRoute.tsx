// utils/PrivateRoute.tsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  element: any;
  path: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, path }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Redirect to the login page if the token is not present
    return <Navigate to="/login-page" />;
  }

  // Render the specified element if the token is present
  return <Route path={path} element={element} />;
};

export default PrivateRoute;
