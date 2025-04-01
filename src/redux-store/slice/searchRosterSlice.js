import { createSlice } from "@reduxjs/toolkit";

const searchRosterSlice = createSlice({
  name: "searchRoster",
  initialState: "",
  reducers: {
    setSearchRoster: (_, actions) => {
      return actions.payload;
    },
  },
});
export const { setSearchRoster } = searchRosterSlice.actions;
export default searchRosterSlice.reducer;
