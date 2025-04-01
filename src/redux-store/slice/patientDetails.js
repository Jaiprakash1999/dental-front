import { createSlice } from "@reduxjs/toolkit";

const patientDetails = createSlice({
  name: "patientDetails",
  initialState: {},
  reducers: {
    setPatientDetails: (state, actions) => {
      return actions.payload;
    },
  },
});
export const { setPatientDetails } = patientDetails.actions;
export default patientDetails.reducer;
