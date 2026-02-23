import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name:"theme",
    initialState:false,
    reducers:{
        toggletheme:(state)=>{
           return state = !state
        }
    }
})

export const {toggletheme} = themeSlice.actions;
export default themeSlice.reducer;