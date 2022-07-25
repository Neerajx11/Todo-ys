import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import todoReducer from "./features/todoSlice";
import { getUserFromLocalStorage } from "./helper/localStorageHelper";

const initialAuthState = {
  fullName: "",
  email: "",
  password: "",
  rememberMe: false,
};

const authLocalState = getUserFromLocalStorage("user") || initialAuthState;

const store = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer,
  },
  preloadedState: {
    auth: authLocalState,
  },
});

export default store;
