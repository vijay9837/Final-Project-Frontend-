import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    isnotification: false,
    notifications: [
        {
            text:"sdsdc"
        },
        {
            text:"sdsdc"
        },
        {
            text:"sdsdc"
        },
        {
            text:"sdsdc"
        },
        {
            text:"sdsdc"
        },
        {
            text:"sdsdc"
        },
        {
            text:"sdsdc"
        },
        {
            text:"sdsdc"
        },
        {
            text:"sdsdc"
        },
        {
            text:"sdsdc"
        },
        {
            text:"sdsdc"
        },
    ],
  },
  reducers: {
    togglenotification:(state)=>{
        state.isnotification = !state.isnotification;
    },
    addnotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    deletenotification: (state, action) => {
      return state.notifications.filter(
        (notification) => notification.id !== action.payload,
      );
    },
    clearallnotification: (state) => {
      return (state.notifications = []);
    },
  },
});

export const { addnotification, deletenotification, clearallnotification, togglenotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
