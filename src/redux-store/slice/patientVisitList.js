import { createSlice } from "@reduxjs/toolkit";

const patientVisitList = createSlice({
  name: "patientVisitList",
  initialState: [],
  reducers: {
    setPatientVisitList: (state, actions) => {
      return actions.payload; // Replace the state with the new data
    },
  },
});

export const { setPatientVisitList } = patientVisitList.actions;
export default patientVisitList.reducer;
