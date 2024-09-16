import * as API from "./api";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllNotifications = createAsyncThunk(
  "notification/getAllNotifications",
  async (postsPerPage, { rejectWithValue }) => {
    try {
      const { data } = await API.getAllNotifications(postsPerPage);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateNotification = createAsyncThunk(
  "notification/updateNotification",
  async (updateData, { rejectWithValue }) => {
    const { id } = updateData;
    try {
      const { data } = await API.updateNotification(id);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const markAllNotificationRead = createAsyncThunk(
  "loans/markAllNotificationRead",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.markAllNotificationRead();
      return null;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
