import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const RequireAuth = () => {
  const { auth, isCheckingAuth } = useAuth();
  return (
    !isCheckingAuth ? 
      auth?.userId
        ? <Outlet/>
        : <Navigate to='/presentation'/>
      : <></>
  );
};
 
export default RequireAuth;