import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../modules/auth/hooks/useAuth";

export const UnAuthGuard = ({ component }) => {
  const { user_auth } = useAuth();

  if (user_auth) {
    return <Redirect to="/" />;
  }

  return <React.Fragment>{component}</React.Fragment>;
};
