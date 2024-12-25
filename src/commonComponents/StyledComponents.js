// StyledComponents.js
import { styled } from "@mui/system";
import { TextField, Box, Button, Select } from "@mui/material";
// import { useTheme } from "../global/commonComponents/ThemeContext";

// eslint-disable-next-line react-hooks/rules-of-hooks
// const { theme } = useTheme();

export const StyledIcon = styled("img")({
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  width: "24px",
  height: "24px",
  cursor: "pointer",
});

export const StyledPatternR = styled("img")({
  position: "absolute",
  right: "130px",
  borderRadius: "2em 2em 0 0",
  top: "93%",
  background: "linear-gradient(90deg, #F51275 0%, #622098 100%)",
  transform: "translateY(-50%)",
  width: "70px",
  height: "6px",
  cursor: "pointer",
});

export const StyledPatternL = styled("img")({
  position: "absolute",
  right: "50px",
  borderRadius: "2em 2em 0 0",
  top: "93%",
  background: "linear-gradient(90deg, #F51275 0%, #622098 100%)",
  transform: "translateY(-50%)",
  width: "70px",
  height: "6px",
  cursor: "pointer",
});

export const StyledFormContainer = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)", // Two equal columns
  gap: "24px", // Space between fields
  maxWidth: "100%",
  padding: "20px",
  "& .fullWidth": {
    gridColumn: "1 / -1", // Span across both columns
  },
});

export const GradientHeader = styled("h2")({
  fontSize: "24px",
  background: "linear-gradient(90deg, #F51275 0%, #622098 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  margin: 0,
});

export const CustomTextField = styled(TextField)({
  position: "relative",
  width: "100%",
  "& .MuiInputBase-root": {
    fontSize: "14px", // Font size
    color: "#E81885", // Active field value color
    background: "transparent",
    "&::placeholder": {
      color: "#7F7F7F", // Placeholder color
      opacity: 1,
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none", // Remove default Material-UI border
  },
  "& .MuiInputLabel-root": {
    color: "#7F7F7F", // Label color for idle state
    fontWeight: "bold",
    "&.Mui-focused": {
      color: "#7F7F7F", // Label color for active state
    },
  },
  "&:before": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "2px",
    background: "linear-gradient(90deg, #F51275 0%, #622098 100%)",
    zIndex: 1,
  },
  "&:after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "0%",
    height: "2px",
    background: "linear-gradient(90deg, #F51275 0%, #622098 100%)",
    zIndex: 2,
    transition: "width 0.3s ease-in-out",
  },
  "&:hover:after, &:focus-within:after": {
    width: "100%", // Expand gradient border on hover/focus
  },
});

export const HeaderContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
});

export const CustomSelect = styled(Select)({
  fontSize: "14px",
  fontWeight: 300,
  color: "#E81885",
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
    background: "linear-gradient(90deg, #F51275 0%, #622098 100%)",
    zIndex: 1,
  },
  "&:after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "0%",
    height: "2px",
    background: "linear-gradient(90deg, #F51275 0%, #622098 100%)",
    zIndex: 2,
    transition: "width 0.3s ease-in-out",
  },
  "&:hover:after, &:focus-within:after": {
    width: "100%", // Expand gradient border on hover/focus
  },
  "& .MuiInputLabel-root": {
    color: "#7F7F7F",
    "&.Mui-focused": {
      color: "#7F7F7F",
    },
  },
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
  backgroundColor: "#752B8D",
  color: "#fff",
  fontWeight: "bold",
  borderRadius: "0.5em",
  boxShadow: "4px 4px 0px #2c3e50, 8px 8px 0px #34495e, 12px 12px 0px #ecf0f1",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  textTransform: "none",
  marginTop: "20px",

  ":hover": {
    backgroundColor: "#752B8D",
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
