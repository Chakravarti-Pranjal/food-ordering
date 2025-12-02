import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import postsReducer from "./slices/postSlice";
import usersReducer from "./slices/usersSlice";
import asyncPostReducer from "./slices/asyncPostSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    users: usersReducer,
    asyncPosts: asyncPostReducer,
  },
});
