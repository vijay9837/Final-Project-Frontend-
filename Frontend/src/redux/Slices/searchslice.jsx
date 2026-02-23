import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "searchSlice",
  initialState: {
    isSearch: true,
  },
  reducers: {
    searchboxopen: (state) => {
    state.isSearch = false
    },
    searchboxclose: (state) => {
        state.isSearch = true
    },
  },
});

export const { searchboxclose, searchboxopen } = searchSlice.actions;
export default searchSlice.reducer;
