import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "../../App";
export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { categoryId, sortType, currentPage } = params;
    const { data } = await axios.get(`${URL}/categorysort`, {
      params: {
        category: categoryId,
        sortBy: sortType,
        page: currentPage,
      },
    });
    return data;
  }
);
const initialState = {
  items: [],
  _id: localStorage.getItem("pizzaId") || "", // Load from localStorage
  status: "loading",
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    setId(state, action) {
      state._id = action.payload;
      // Save to localStorage whenever _id changes
      localStorage.setItem("pizzaId", action.payload);
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const { setItems, setId } = pizzaSlice.actions;

export default pizzaSlice.reducer;
