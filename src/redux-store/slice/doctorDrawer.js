import { createSlice } from "@reduxjs/toolkit";

const openDoctorDrawer = createSlice({
  name: "doctorDrawer",
  initialState: null,
  reducers: {
    setDoctorDrawer: (state, action) => {
      return action.payload;
    },
  },
});

export const { setDoctorDrawer } = openDoctorDrawer.actions;

export default openDoctorDrawer.reducer;
