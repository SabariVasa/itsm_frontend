import { styled } from "@mui/system";
import {
  TextField,
  Box,
  Button,
  Select,
  Typography,
  Card,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useTheme } from "../global/commonComponents/ThemeContext";

export const StyledIcon = styled("img")({
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  width: "24px",
  height: "24px",
  cursor: "pointer",
});

export const StyledPatternR = styled("img")(() => {
  const { theme } = useTheme(); // Use `useTheme` inside the function
  return {
    position: "absolute",
    right: "130px",
    borderRadius: "2em 2em 0 0",
    top: "93%",
    background: `${theme.outerBodyColor}`,
    transform: "translateY(-50%)",
    width: "70px",
    height: "6px",
    cursor: "pointer",
  };
});

export const StyledPatternL = styled("img")(() => {
  const { theme } = useTheme();
  return {
    position: "absolute",
    right: "50px",
    borderRadius: "2em 2em 0 0",
    top: "93%",
    background: `${theme.outerBodyColor}`,
    transform: "translateY(-50%)",
    width: "70px",
    height: "6px",
    cursor: "pointer",
  };
});

export const StyledFormContainer = styled(Box)(() => {
  return {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "24px",
    maxWidth: "100%",
    padding: "20px",
    "& .fullWidth": {
      gridColumn: "1 / -1",
    },
  };
});

export const GradientHeader = styled("h2")(() => {
  const { theme } = useTheme();
  return {
    fontSize: "24px",
    background: `${theme.outerBodyColor}`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: 0,
  };
});

// Styled DatePicker
export const CustomDatePicker = styled(DatePicker)(() => {
  const { theme } = useTheme();
  return {
    width: "100%",
    "& .MuiInputBase-root": {
      fontSize: "14px",
      color: `${theme.InnerBodyfontColor}`,
      background: "transparent",
      "&::placeholder": {
        color: "#7F7F7F",
        opacity: 1,
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiInputLabel-root": {
      color: "#7F7F7F",
      fontWeight: "bold",
      "&.Mui-focused": {
        color: `${theme.InnerBodyfontColor}`, // Active field label color
      },
    },
    "&:before": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "2px",
      background: `${theme.outerBodyColor}`,
      zIndex: 1,
    },
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "0%",
      height: "2px",
      background: `${theme.outerBodyColor}`,
      zIndex: 2,
      transition: "width 0.3s ease-in-out",
    },
    "&:hover:after, &:focus-within:after": {
      width: "100%",
    },
  };
});

export const CustomTextField = styled(TextField)(() => {
  const { theme } = useTheme();
  return {
    color: `${theme.valueFontColor}`,
    position: "relative",
    width: "100%",
    "& .MuiInputBase-root": {
      fontSize: "14px",
      color: `${theme.InnerBodyfontColor}`,
      background: "transparent",
      "&::placeholder": {
        color: "#7F7F7F",
        opacity: 1,
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiInputLabel-root": {
      color: "#7F7F7F",
      fontWeight: "bold",
      "&.Mui-focused": {
        color: `${theme.InnerBodyfontColor}`, // Active field label color
      },
    },
    "&:before": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "2px",
      background: `${theme.outerBodyColor}`,
      zIndex: 1,
    },
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "0%",
      height: "2px",
      background: `${theme.outerBodyColor}`,
      zIndex: 2,
      transition: "width 0.3s ease-in-out",
    },
    "&:hover:after, &:focus-within:after": {
      width: "100%",
    },
  };
});

export const HeaderContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px",
});

export const sharedStyles = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "1em !important",
    "& fieldset": {
      borderRadius: "0.4em",
      border: `2px solid #540c00`,
    },
    "&:hover fieldset": {
      border: "2px solid #540c00",
    },
    "&.Mui-focused fieldset": {
      border: "2px solid #540c00",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: " #540c00",
  },
};

export const CustomSelect = styled(Select)(() => {
  const { theme } = useTheme();
  return {
    fontSize: "14px",
    width: "100%",
    fontWeight: 300,
    color: `${theme.InnerBodyfontColor}`,
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&:before": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "2px",
      background: `${theme.outerBodyColor}`,
      zIndex: 1,
    },
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "0%",
      height: "2px",
      background: `${theme.outerBodyColor}`,
      zIndex: 2,
      transition: "width 0.3s ease-in-out",
    },
    "&:hover:after, &:focus-within:after": {
      width: "100%",
    },
  };
});

export const StyledCard = styled(Card)(() => {
  const { theme } = useTheme();
  return {
    position: "relative",
    height: 150,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    background: "#f2f2f2",
    border: `3px solid ${theme.InnerBodyfontColor}`, // Additional border color
    boxShadow:
      "4px 4px 10px rgba(0, 0, 0, 0.2), -4px -4px 10px rgba(255, 255, 255, 0.5)", // 3D shadow effect
    "&:hover": {
      transform: "translateY(-5px)", // Hover effect to lift the card
      boxShadow:
        "8px 8px 20px rgba(0, 0, 0, 0.3), -8px -8px 20px rgba(255, 255, 255, 0.6)", // Enhanced shadow on hover
    },
  };
});

export const StyledTypography = styled(Typography)({
  color: "black",
  fontWeight: 500,
  // fontStyle: '',
  fontSize: "16px",
  marginTop: "1em",
});

// export const StyledButton = styled(Button)({
//   backgroundColor: "#752B8D",
//   color: "#fff",
//   fontWeight: "bold",
//   borderRadius: "0.5em",
//   boxShadow:
//     "4px 4px 0px #2c3e50,8px 8px 0px #34495e,12px 12px 0px #ecf0f1",
//   transition: "transform 0.3s ease, box-shadow 0.3s ease",
//   textTransform: "none",
//   marginTop: "20px",
//   ":hover": {
//     backgroundColor: "#752B8D",
//   },
// });
// console.log(theme.outerBodyColor, 'outerBodyColor');
export const StyledButton = styled(Button)({
  backgroundColor: "#A17D34",
  color: "#fff",
  fontWeight: "bold",
  borderRadius: "0.5em",
  boxShadow:
    "4px 4px 0px #9A7127, 8px 8px 0px rgb(154, 113, 39), 12px 12px 0px #ecf0f1",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  textTransform: "none",
  marginTop: "20px",

  ":hover": {
    backgroundColor: "#A17D34",
  },

  ":active": {
    transform: "translate(12px, 12px)", // Simulates pressing the button
    boxShadow: "0px 0px 0px #2c3e50", // Removes shadow to create a pressed effect
  },
});

//left side panel

export const styles = {
  menuContainer: {
    // backgroundColor: theme.outerBodyColor,
    padding: "10px",
    borderRadius: "8px",
  },
  menuItem: {
    margin: "10px 0",
    padding: "12px",
    borderRadius: "8px",
    background: "linear-gradient(145deg, #e6e6e6, #ffffff)",
    boxShadow: "5px 5px 10px #d1d1d1, -5px -5px 10px #ffffff",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  menuItemHover: {
    boxShadow: "8px 8px 15px #c1c1c1, -8px -8px 15px #ffffff",
  },
  activeMenu: {
    background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
    boxShadow: "inset 5px 5px 10px #d1d1d1, inset -5px -5px 10px #ffffff",
    transform: "scale(1.05)",
  },
  accordion: {
    margin: "10px 0",
    borderRadius: "8px",
    background: "linear-gradient(145deg, #e6e6e6, #ffffff)",
    boxShadow: "5px 5px 10px #d1d1d1, -5px -5px 10px #ffffff",
    transition: "all 0.3s ease",
  },
  accordionHover: {
    boxShadow: "8px 8px 15px #c1c1c1, -8px -8px 15px #ffffff",
  },
  activeAccordion: {
    background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
    boxShadow: "inset 5px 5px 10px #d1d1d1, inset -5px -5px 10px #ffffff",
  },
  accordionSummary: {
    padding: "12px",
  },
  icon: {
    color: "#606060",
    transition: "color 0.3s ease",
  },
  iconHover: {
    color: "#007bff",
  },
};
