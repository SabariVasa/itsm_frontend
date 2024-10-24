import React from 'react';
// import { Navigate } from 'react-router-dom';
import UserInfo from '../models/UserInfo';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

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
          <Redirect to={redirectUrl} />
        ) : (
          <Redirect to="/sign" />
        )}
    </>
  );
};

export default RoleBasedRoute;