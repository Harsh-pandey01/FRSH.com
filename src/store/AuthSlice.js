import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: null,
  },
  reducers: {
    userLoggedIn(state, action) {
      state.userInfo = action.payload.userInfo;
    },

    userLoggedOut(state, action) {
      state.userInfo = null;
    },
  },
});

export default authSlice.reducer;
export const { userLoggedIn, userLoggedOut } = authSlice.actions;
