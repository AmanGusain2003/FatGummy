import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { UserContext } from './UserContext';

const PrivateRoute = () => {
  const { user, loading } = useContext(UserContext);
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Allow access to /invite if the user is authenticated but has no partnerId
  if (location.pathname === '/invite') {
    return <Outlet />;
  }

  // Redirect to /invite if user does not have a partnerId
  if (!user.partnerId) {
    return <Navigate to="/invite" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
