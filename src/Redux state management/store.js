import { configureStore } from "@reduxjs/toolkit";
import requestReducers from "./Redux Slices/RequestSlice";
import knowledgeReducers from "./Redux Slices/KnowledgeDataSlice";
import incidentReducers from "./Redux Slices/IncidentRequestSlice";
import globalReducers from "./Redux Slices/GlobalStepperSlice";

export const store = configureStore({
    reducer:{
        requestReducers,
        knowledgeReducers,
        incidentReducers,
        globalReducers
    }
})