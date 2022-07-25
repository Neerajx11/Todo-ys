import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import todoReducer from "./features/todoSlice";
import {
  getTodoFromLocalStorage,
  getUserFromLocalStorage,
} from "./helper/localStorageHelper";

const initialAuthState = {
  fullName: "",
  email: "",
  password: "",
  rememberMe: false,
};

const initialTodoState = {
  todo: [],
  progress: [],
  completed: [],
};

const authLocalState = getUserFromLocalStorage() || initialAuthState;
const todoLocalState = getTodoFromLocalStorage() || initialTodoState;

const store = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer,
  },
  preloadedState: {
    auth: authLocalState,
    todo: todoLocalState,
  },
});

export default store;
