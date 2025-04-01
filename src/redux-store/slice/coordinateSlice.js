import { createSlice } from "@reduxjs/toolkit";

const coordinateSlice = createSlice({
  name: "currentCoordinate",
  initialState: {},
  reducers: {
    setCurrentCoordinate: (_, actions) => {
      return actions.payload;
    },
  },
});
export const { setCurrentCoordinate } = coordinateSlice.actions;
export default coordinateSlice.reducer;
