import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    otpVerified: false
  },
  reducers: {
    setOtpVerified: (state, action) => {
      console.log(action.payload)
      state.otpVerified = action.payload;
    }
  }
});

export const {setOtpVerified} = authSlice.actions;
export default authSlice.reducer;
