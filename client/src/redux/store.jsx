import { configureStore } from "@reduxjs/toolkit";

import filter from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import pizza from "./slices/pizzaSlice";
import search from "./slices/searchSlice";
import auth from "./slices/authSlice";
export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
    search,
    auth,
  },
});
