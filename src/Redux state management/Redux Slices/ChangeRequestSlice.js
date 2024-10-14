import { createSlice } from "@reduxjs/toolkit";

const initialState={
    changeRequest : {
        changeNumber:"",
        changeModel:"",
        requestedBy:"",
        changeState:"",
        configurationItem:"",
        conflictStatus:"",
        assignmentTo:"",
        assignmentGroup:"",
        changePriority:"",
        changeRisk:"",
        changeImpact:"",
        shortDescription:"",
        Description:"",
        implementationPlan:"",
        backoutPlan:"",
        testPlan:"",
        planningStartDate:"",
        planningEndDate:"",
        actualStartDate:"",
        actualEnddate:""
      }
}

export const ChangeRequestSlice = createSlice(
    {
      name: "ChangeRequest",
      initialState,
      reducers: {
        setChangeRequest: (state, action) => {
          state.changeRequest = action.payload;
        },
      },
    }
)

export const  {setChangeRequest} = ChangeRequestSlice.actions;

export default ChangeRequestSlice.reducer;