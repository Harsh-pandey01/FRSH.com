import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartData: [],
  },
  reducers: {
    addItemToCart(state, action) {
      const index = state.cartData.findIndex(
        (item) => item.productId === action.payload.productId
      );

      if (index === -1) {
        // Item not found → add new
        state.cartData.push({ ...action.payload, quantity: 1 });
      } else {
        // Item exists → increase quantity
        state.cartData[index].quantity += 1;
      }
    },
  },
});

export const { addItemToCart } = cartSlice.actions;
export default cartSlice.reducer;
