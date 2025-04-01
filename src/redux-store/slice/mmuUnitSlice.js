import { createSlice } from "@reduxjs/toolkit";
const { REACT_APP_MMU_UNIT } = process.env || {};

const mmuUnitSlice = createSlice({
  name: "mmu-unit",
  initialState: REACT_APP_MMU_UNIT === undefined ? null : REACT_APP_MMU_UNIT,
  reducers: {
    setMmuUnit: (_, actions) => {
      return actions.payload;
    },
  },
});

export const { setMmuUnit } = mmuUnitSlice.actions;
export default mmuUnitSlice.reducer;
