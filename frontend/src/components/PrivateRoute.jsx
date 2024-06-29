import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from './UserContext';

const PrivateRoute = ({ redirectTo }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return user ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
