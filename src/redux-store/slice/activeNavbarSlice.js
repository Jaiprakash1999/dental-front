import { createSlice } from "@reduxjs/toolkit";

const activeNavbarSlice = createSlice({
  name: "activeNavbar",
  initialState: "home",
  reducers: {
    setActiveNavbarTab: (_, action) => {
      return action.payload;
    },
  },
});

export const { setActiveNavbarTab } = activeNavbarSlice.actions;
export default activeNavbarSlice.reducer;
