import { createSlice } from "@reduxjs/toolkit";

const addPatientSlice = createSlice({
  name: "addNewPatientWithoutAbha",
  initialState: false,
  reducers: {
    // This reducer should return a new state value
    setAddNewPatientWithoutAbha: (state, action) => {
      return action.payload; // Return the new state value
    },
  },
});

export const { setAddNewPatient } = addPatientSlice.actions;

export default addPatientSlice.reducer;
