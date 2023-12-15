import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addItem(state, action) {
    //   state.items.push(action.payload);
    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //     return obj.price + sum;
    //   }, 0);
    // },
    addItem(state, action) {
      const findItem = state.items.find(
        (obj) => obj._id === action.payload._id
      );
      //here logic if we adding same itme, then we just increase quantity.
      if (findItem) {
        findItem.quantity++;
      } else {
        //if item different,then we pushing him into array.
        state.items.push({
          ...action.payload,
          //we using this ... like to put in the end of array this item
          quantity: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.quantity + sum;
      }, 0);
    },

    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj._id === action.payload);
      if (findItem) {
        findItem.quantity--;
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.quantity + sum;
      }, 0);
      if (findItem.quantity < 1) {
        state.items = state.items.filter((obj) => obj._id !== action.payload);
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj._id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
