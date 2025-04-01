import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const patientRecordSlice = createSlice({
  name: "patientRecord",
  initialState,
  reducers: {
    setPatientRecords: (state, actions) => {
      return [...state, actions.payload];
    },
  },
});

export const { setPatientRecords } = patientRecordSlice.actions;
export default patientRecordSlice.reducer;
