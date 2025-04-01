import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
  title: "",
  category: "",
  viewAblePerson: "",
  tags: [],
  notes: [],
};

const createNewNote = createSlice({
  name: "createNewNote",
  initialState: initialState,
  reducers: {
    setNewNote(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setNewNote } = createNewNote.actions;
export default createNewNote.reducer;
