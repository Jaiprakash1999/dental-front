import { createSlice } from "@reduxjs/toolkit";

const globalSearchSlice = createSlice({
  name: "globalSearch",
  initialState: "",
  reducers: {
    setGlobalSearch: (_, actions) => {
      return actions.payload;
    },
  },
});

export const { setGlobalSearch } = globalSearchSlice.actions;
export default globalSearchSlice.reducer;
