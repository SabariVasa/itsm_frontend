import React from 'react';
import { Navigate } from 'react-router-dom';
import UserInfo from '../models/UserInfo';

const RoleBasedRoute = () => {
  const role = localStorage.getItem('role');
  let redirectUrl;
  console.log(role, 'role');

  if (role === 'super_admin') {
    redirectUrl = '/superadmin';
  } else if (role === 'admin') {
    redirectUrl = '/admin';
  } else if (role === 'user') {
    redirectUrl = '/endUser';
  } else {
    redirectUrl = null;
  }

  return (
    <>
      {(redirectUrl !== undefined && redirectUrl !== null && redirectUrl !== '')
        ? (
          <Navigate to={redirectUrl} />
        ) : (
          <Navigate to="/sign" />
        )}
    </>
  );
};

export default RoleBasedRoute;