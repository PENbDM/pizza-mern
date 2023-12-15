import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  category: 0,
  sortBy: 0,
  page: 1,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.category = action.payload;
    },
    setSortType(state, action) {
      state.sortBy = action.payload;
    },
    setCurrentPage(state, action) {
      state.page = action.payload;
    },
    setFilters(state, action) {
      state.category = action.payload.category;
      state.sortBy = action.payload.sortBy;
      state.page = action.payload.page;
    },
  },
});

export const { setCategoryId, setSortType, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
