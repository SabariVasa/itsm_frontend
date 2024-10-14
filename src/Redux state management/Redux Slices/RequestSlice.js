import { createSlice } from "@reduxjs/toolkit";

const getLocalStorageItem = (key) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key) || "";
  }
  return "";
};

const initialState={
    requestDetails:[],
    requestService:{
        requestNumber:"",
        requestType:"",
        approvalStatus:"",
        requestState:"",
        openedDate:"",
        dueDate:"",
        requestFor:getLocalStorageItem("userEmail"),
        openedBy:getLocalStorageItem("userEmail"),
        ShortDescription:"",
        selectedItem:[],
        createdBy:getLocalStorageItem("userEmail")
    },
    requestGeneralService:{
        requestNumber:"",
        requestType:"",
        requesterName:getLocalStorageItem("userEmail"),
        requesterEmail:"",
        requesterServiceType:"",
        affectedUser:"",
        preferedContact:"",
        priority:"",
        approvalStatus:"",
        reasonDescription:"",
        requestAccess:"",
        approvalFrom:"",
        userRole:"",
        affectedService:"",
        changeDate:"",
        backoutPlan:"",
        changeApproval:"",
        openedDate:"",
        createdBy:localStorage.getItem("userEmail")
    },
    updateRequestDetails:[],
    selectedRequest:""
}

export const  requestSlice = createSlice(
    {
      name: "request",
      initialState,
      reducers: {
        setRequestDetails: (state, action) => {
          // state.requestDetails = [...state.requestDetails, action.payload];
          if (Array.isArray(action.payload)) {
            state.requestDetails = [
              ...state.requestDetails,
              ...action.payload,
            ];
          } else {
            state.requestDetails = [
              ...state.requestDetails,
              action.payload,
            ];
          }
          console.log(state.requestDetails)
        },
        setRequestServiceData: (state, action) => {
          state.requestService = action.payload;
          console.log(state.requestService)
        },
        setRequestGeneralService: (state, action) => {
          state.requestGeneralService = action.payload;
        },
        setSelectedRequest: (state, action) => {
          state.selectedRequest = action.payload;
        },
        setUpdateRequestDetails: (state, action) => {
          state.updateRequestDetails = action.payload;
        },
      },
    }
)

export const  {setRequestDetails,setUpdateRequestDetails,setSelectedRequest,setRequestServiceData,setRequestGeneralService} = requestSlice.actions;

export default requestSlice.reducer;