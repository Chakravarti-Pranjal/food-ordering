import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import ownerReducer from "./slices/ownerSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    owner: ownerReducer,
  },
});
