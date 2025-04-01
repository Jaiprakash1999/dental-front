import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  chiefComplaint: [],
  complaints: [],
  templateName: "",
  diagnosis: [],
  rxList: [
    {
      drugName: "",
      dose: "",
      measurement: "",
      timing: "",
      frequency: "",
      duration: "",
      notes: "",
    },
  ],
  labInvestigations: [],
  medicalHandoubts: [],
  medicalTags: [],
  signature: false,
  stamp: false,
  instructions: [],
  lifeStyleRecommendations: [],
  followUp: "",
  followUpDate: "1945-07-02",
};

const prescriptionDataSlice = createSlice({
  name: "prescription",
  initialState,
  reducers: {
    setPrescriptionData(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setPrescriptionData } = prescriptionDataSlice.actions;
export default prescriptionDataSlice.reducer;
