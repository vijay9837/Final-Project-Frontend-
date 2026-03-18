import { createSlice } from "@reduxjs/toolkit";

const storedAdmin = JSON.parse(sessionStorage.getItem("admin"));

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: storedAdmin ? storedAdmin : null,
    isAuthenticated: storedAdmin ? true : false,
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state, action) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      sessionStorage.removeItem("admin");
    },
  },
});

export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;