import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  rememberMe: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      return action.payload;
    },
    singin: (state, action) => {
      return action.payload;
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { login, singin, logout } = authSlice.actions;
export default authSlice.reducer;
