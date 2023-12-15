import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../App";
export const fetchRegister = createAsyncThunk(
  "user/fetchRegister",
  async (params) => {
    const { fullName, email, password } = params;
    try {
      const { data } = await axios.post(`${URL}/register`, {
        fullName: fullName,
        email: email,
        password: password,
      });
      return data;
    } catch (error) {
      return error;
    }
  }
);
export const fetchLogin = createAsyncThunk(
  "user/fetchLogin",
  async (params) => {
    const { email, password } = params;
    try {
      const { data } = await axios.post(`${URL}/login`, {
        email: email,
        password: password,
      });
      return data;
    } catch (error) {
      return error;
    }
  }
);
const initialState = {
  data: null,
  status: "loading",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchRegister.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchRegister.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    [fetchLogin.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchLogin.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
  },
});
export const selectIsAuth = (state) => Boolean(state.auth.data);
export default authSlice.reducer;
