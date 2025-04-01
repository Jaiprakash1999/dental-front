import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  userDrawer: false,
  checkInDrawer: false,
  skipABHA: false,
  createABHAbyAadhaar: false,
  createABHAaddress: false,
};

const checkInDrawerSlice = createSlice({
  name: "dashboardDrawer",
  initialState: initialState,
  reducers: {
    setDashboardDrawer: (state, actions) => {
      return { ...state, ...actions.payload };
    },
  },
});

export const { setDashboardDrawer } = checkInDrawerSlice.actions;
export default checkInDrawerSlice.reducer;
