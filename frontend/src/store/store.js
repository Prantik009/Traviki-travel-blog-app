// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import blogReducer from "./slices/blogSlice";
import chatReducer from "./slices/chatSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    chat: chatReducer,
  },
});

export default store;
