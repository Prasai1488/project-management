import { createSlice } from "@reduxjs/toolkit";
import { getAllNotifications, updateNotification } from "./thunk";

const initialState = {
  notifications: [],
  notification: null,
  loading: false,
  loadingUpdated: false,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    clearNotification: (state) => {
      state.notification = null;
    },
    socketNotification: (state, action) => {
      state.notifications = [action.payload, ...state.notifications];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllNotifications.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllNotifications.fulfilled, (state, action) => {
      state.loading = false;
      state.notifications = action.payload.notifications;
      state.count = action.payload.count;
      state.next = action.payload.hasNextPage;
    });

    builder.addCase(getAllNotifications.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateNotification.pending, (state) => {
      state.loadingUpdated = true;
    });

    builder.addCase(updateNotification.fulfilled, (state, action) => {
      const newData = [...state.notifications];
      const updateData = newData?.map((value) => (value.id === action.payload?.id ? action.payload : value));
      state.loadingUpdated = false;
      state.notifications = updateData;
    });

    builder.addCase(updateNotification.rejected, (state) => {
      state.loadingUpdated = false;
    });
  },
});

export const { clearNotification, socketNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
