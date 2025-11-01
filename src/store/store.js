import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/AuthSlice";
import wishlistReducer from "../store/WishListSlice";
import cartReducer from "../store/CartSlice";
const store = configureStore({
  reducer: {
    authState: authReducer,
    cartdata: cartReducer,
    wishlistdata: wishlistReducer,
  },
});

export default store;

console.log(store.getState());
