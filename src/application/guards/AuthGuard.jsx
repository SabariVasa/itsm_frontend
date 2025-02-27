import React from "react";
import { useAuth } from "../modules/auth/hooks/useAuth";
import { Redirect } from "react-router-dom";
import { DrawerProvider } from "../../global/commonComponents/drawer/DrawerContext";

export const AuthGuard = ({ component }) => {
  const { user_auth } = useAuth();

  if (!user_auth) {
    return <Redirect to="/signin" />;
  }

  return <DrawerProvider>{component}</DrawerProvider>;
};
