import { createSlice } from "@reduxjs/toolkit";

const selectedUser = createSlice({
  name: "selectedUser",
  initialState: {},
  reducers: {
    setSelectedUser: (_, actions) => {
      return actions.payload;
    },
  },
});

export const { setSelectedUser } = selectedUser.actions;

export default selectedUser.reducer;
