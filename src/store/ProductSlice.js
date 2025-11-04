import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
  },
  reducers: {
    fetchAllProduct(state, action) {
      state.allProducts = action.payload;
    },
  },
});

// Export actions
export const { fetchAllProduct } = ProductSlice.actions;

// Export reducer
export default ProductSlice.reducer;
