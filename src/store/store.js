// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session"; // ✅ use sessionStorage

// Import your reducers
import authReducer from "../store/AuthSlice";
import wishlistReducer from "../store/WishListSlice";
import cartReducer from "../store/CartSlice";
import productReducer from "../store/ProductSlice";

// Combine all reducers
const rootReducer = combineReducers({
  authState: authReducer,
  cartdata: cartReducer,
  wishlistdata: wishlistReducer,
  productsData: productReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["authState", "cartdata", "wishlistdata"],
};

// Wrap root reducer with persistence
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);
export default store;

// Optional: Debugging
console.log("Initial State:", store.getState());
