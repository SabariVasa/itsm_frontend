import React from "react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "../../global/commonComponents/ThemeContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ReduxProvider } from "../../application/shared/provider";
import { restbaseurl } from "../../global/utils/constants";
import axios from "axios";

axios.defaults.baseURL = restbaseurl;

export const AppProvider = ({ children }) => {
  return (
    <div
      className="h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url(/bodybg.png)",
      }}
    >
      <ReduxProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider>{children}</ThemeProvider>
        </LocalizationProvider>
      </ReduxProvider>
      <Toaster />
    </div>
  );
};
