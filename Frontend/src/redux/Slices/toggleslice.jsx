import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggle",
  initialState: true,
  reducers: {
    sidenavtoggle: (state) => {
      console.log("hi")
      return state = !state
    },
    opensidenav: () => {
      return false;
    },
    closesidenav: () => {
      return true;
    },
  },
});

export const { sidenavtoggle,opensidenav,closesidenav } = toggleSlice.actions;
export default toggleSlice.reducer;
