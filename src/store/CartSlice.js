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

    reduceItemQuantity(state, action) {
      const index = state.cartData.findIndex(
        (item) => item.productId === action.payload.productId
      );

      if (index !== -1) {
        const item = state.cartData[index];
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // remove item when quantity reaches 0
          const res = confirm("Want to remove the item");

          if (res) state.cartData.splice(index, 1);
        }
      }
    },
  },
});

export const { addItemToCart, reduceItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
