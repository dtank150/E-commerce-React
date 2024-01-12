import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.push({ ...action.payload, quantity: 1 }); // Initialize quantity as 1
    },
    deleteFromCart(state, action) {
      return state.filter((item) => item.id != action.payload.id);
    },
    setCart(state, action) {
      return action.payload;
    },
  },
});

export const { addToCart, deleteFromCart, setCart } = cartSlice.actions;

export default cartSlice.reducer;
