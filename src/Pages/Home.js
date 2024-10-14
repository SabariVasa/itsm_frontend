import React from 'react';
import HomeRouter from '../Routes/HomeRouter';
import AuthenticationRoutes from '../Routes/AuthenticationRoutes';
// import {BrowserRouter,Routes,Route} from "react-router-dom";
import {AuthenticatedTemplate,UnauthenticatedTemplate,useMsal } from '@azure/msal-react';



function Home() {
  const {instance} = useMsal();
  const activeAccount = instance.getActiveAccount();
 const Authenticated = localStorage.getItem("Auth");

  return (
    <>
      <AuthenticatedTemplate>
          <HomeRouter/>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
          <AuthenticationRoutes/>
      </UnauthenticatedTemplate>
    </>
  );
}

export default Home;

