
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    knowledgeContent : {
        articleNumber:"",
        title:"",
        articleType:"",
        category:"",
        articleContent:"",
        author:localStorage.getItem("userEmail"),
        ShortDescription:"",
        imageData:"",
        PreviewImage:""
    },
    category:""
}

export const  knowledgeSlice = createSlice(
    {
      name: "KnowledgeBase",
      initialState,
      reducers: {
        setKnowledgeContent: (state, action) => {
          state.knowledgeContent = action.payload;
        },
        setCategory: (state, action) => {
          state.category = action.payload;
        },
      },
    }
)

export const  {setKnowledgeContent,setCategory} = knowledgeSlice.actions;

export default knowledgeSlice.reducer;