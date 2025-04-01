import { createSlice } from "@reduxjs/toolkit";

// Create the slice for managing the active doctor tab
const activeDoctorTab = createSlice({
  name: "doctorTab", // The name of the slice
  initialState: { activeTab: null }, // Initial state is an object with an activeTab property
  reducers: {
    // Reducer to set the active tab
    setActiveDoctorTab: (state, action) => {
      state.activeTab = action.payload; // Update the activeTab property in the state
    },
  },
});

// Export the action for setting the active tab
export const { setActiveDoctorTab } = activeDoctorTab.actions;

// Export the reducer to be used in the store
export default activeDoctorTab.reducer;
