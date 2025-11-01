import { createSlice } from "@reduxjs/toolkit";

const wishListSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
  },
  reducers: {
    addItemToWishlist(state, action) {
      const isPresent = state.wishlist.find(
        (item) => item.productId === action.payload.productId
      );

      if (!isPresent) {
        state.wishlist.push(action.payload);
      }
    },

    removeItemFromWishlist(state, action) {
      state.wishlist = state.wishlist.filter(
        (item) => item.productId !== action.payload.productId
      );
    },
  },
});

export default wishListSlice.reducer;
export const { addItemToWishlist, removeItemFromWishlist } =
  wishListSlice.actions;
