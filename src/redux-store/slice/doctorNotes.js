import { createSlice } from "@reduxjs/toolkit";

const doctorNotes = createSlice({
  name: "doctorNotes",
  initialState: false,
  reducers: {
    setDoctorNotes: (state, action) => {
      return action.payload;
    },
  },
});

export const { setDoctorNotes } = doctorNotes.actions;

export default doctorNotes.reducer;
