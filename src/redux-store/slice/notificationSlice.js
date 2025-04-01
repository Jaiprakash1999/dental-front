import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "globalNotifications",
  initialState: { unreadCount: 0, messages: [] },
  reducers: {
    addNotification: (state, action) => {
      state.unreadCount += 1;
      state.messages.push(action.payload);
    },
    clearNotifications: (state) => {
      state.unreadCount = 0;
      // state.messages = [];
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { addNotification, clearMessages, clearNotifications } =
  notificationSlice.actions;

export default notificationSlice.reducer;
