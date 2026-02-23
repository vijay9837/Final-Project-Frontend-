import { createSlice } from "@reduxjs/toolkit";

const addInstitute = createSlice({
  name: "addInstitue",
  initialState: false,
  reducers: {
    openAddInstitute: () => {
      
      return true;
    },
    closeAddInstitue: () => {
      return false;
    },
  },
});

export const { closeAddInstitue, openAddInstitute } = addInstitute.actions;

export default addInstitute.reducer;
