import React from 'react';
import { Navigate } from 'react-router-dom';
import HomeRouter from './HomeRouter';
import EndUserRouter from './EndUserRouter';
import AdminRouter from './AdminRouter';

const ProtectedRoute = ({ user, children }) => {
  if (!user || !user.privilege) {
    // If no user or no privilege, redirect to login
    return <Navigate to="/login" />;
  }

  // Conditionally render routers based on user privilege
  switch (user.privilege) {
    case 'superAdmin':
      return <AdminRouter />; // SuperAdmin can access everything under AdminRouter
    case 'admin':
      return <HomeRouter />; // Admin can access the HomeRouter (can also add Admin specific routes here)
    case 'user':
      return <EndUserRouter />; // Regular user accesses EndUserRouter
    default:
      return <Navigate to="/unauthorized" />; // Unauthorized if the privilege doesn't match
  }
};

export default ProtectedRoute;
