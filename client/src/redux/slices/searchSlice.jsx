import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchVa: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchVa(state, action) {
      state.searchVa = action.payload;
    },
  },
});
export const { setSearchVa } = searchSlice.actions;
export default searchSlice.reducer;
