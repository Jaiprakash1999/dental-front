import { createSlice } from "@reduxjs/toolkit";

const saveTemplate = createSlice({
  name: "saveTemplate",
  initialState: false,
  reducers: {
    setIsSaveTemplate: (state, actions) => {
      return actions.payload;
    },
  },
});

export const { setIsSaveTemplate } = saveTemplate.actions;

export default saveTemplate.reducer;
