import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import ownerReducer from "./slices/ownerSlice";
import mapReducer from "./slices/mapSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    owner: ownerReducer,
    map: mapReducer,
  },
});
