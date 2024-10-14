// import { Description } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeStep: 0,
  steps: ["General Information", "Technical Information", "Create Item"],
}

export const GlobalStepperSlice = createSlice(
  {
    name: "UserManagement",
    initialState,
    reducers: {
      setActiveStep: (state, action) => {
        state.activeStep = action.payload;
      },
      setSteps: (state, action) => {
        state.steps = action.payload;
      }
    },
  }
)

export const { setActiveStep, setSteps } = GlobalStepperSlice.actions;

export default GlobalStepperSlice.reducer;