import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userName: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
    },
    logout(state) {
      state.userId = null;
      state.userName = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
