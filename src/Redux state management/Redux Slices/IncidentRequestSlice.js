import { createSlice } from "@reduxjs/toolkit";

const initialState={
    endUserIncident : {
       Email:localStorage.getItem("userEmail"),
       Impact:"",
       Urgency:"",
       Description:""
    }
}

export const  IncidentRequestSlice = createSlice(
    {
      name: "UserManagement",
      initialState,
      reducers: {
        setEndUserIncident: (state, action) => {
          state.endUserIncident = {
            ...state.endUserIncident,  
            ...action.payload
          };
        },
      },
    }
)

export const  {setEndUserIncident} = IncidentRequestSlice.actions;

export default IncidentRequestSlice.reducer;