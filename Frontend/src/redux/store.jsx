import { configureStore } from "@reduxjs/toolkit";
import toggleReducers from "./Slices/toggleslice";
import notificationReducer from "./Slices/notificationSlice";
import themeReducers from "./Slices/themeslice";
import searchReducer from "./Slices/searchslice";
import userReducer from "./Slices/user";
import addInstituteReducer from "./Slices/addInstituteSlice";
import authReducer from "./Slices/auth";
export const store = configureStore({
  reducer: {
    toggle: toggleReducers,
    notification: notificationReducer,
    theme: themeReducers,
    search: searchReducer,
    User: userReducer,
    addInstitute: addInstituteReducer,
    auth: authReducer,
  },
});
