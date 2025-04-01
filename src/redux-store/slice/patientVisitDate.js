import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const patientVisitDate = createSlice({
  name: "patientVisitDate",
  initialState: moment(new Date()).format("yyyy-MM-DD"),
  reducers: {
    setPatientVisitDate: (state, actions) => {
      return actions.payload;
    },
  },
});

export const { setPatientVisitDate } = patientVisitDate.actions;
export default patientVisitDate.reducer;
