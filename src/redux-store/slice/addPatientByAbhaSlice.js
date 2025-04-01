import { createSlice } from "@reduxjs/toolkit";

const addPatientByAbhaSlice = createSlice({
  name: "addPatientByAbha",
  initialState: false,
  reducers: {
    // This reducer should return a new state value
    setAddNewPatientByAbha: (state, action) => {
      return action.payload; // Return the new state value
    },
  },
});

export const { setAddNewPatientByAbha } = addPatientByAbhaSlice.actions;

export default addPatientByAbhaSlice.reducer;
