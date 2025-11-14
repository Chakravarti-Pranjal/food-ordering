import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    name: "John Wick",
  },
  {
    id: "2",
    name: "Tony Stark",
  },
  {
    id: "3",
    name: "Thor",
  },
];

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => {
  return Array.isArray(state.users) ? state.users : [];
};

export default usersSlice.reducer;
