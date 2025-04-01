import { createSlice } from "@reduxjs/toolkit";

const profilePhotoUploadSlice = createSlice({
  name: "uploadedProfilePhoto",
  initialState: null,
  reducers: {
    setUploadProfilePhoto: (_, actions) => {
      return actions.payload;
    },
  },
});

export const { setUploadProfilePhoto } = profilePhotoUploadSlice.actions;
export default profilePhotoUploadSlice.reducer;
