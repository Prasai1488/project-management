import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getCustomer,
  getNext,
  createCustomer,
  updateCustomer,
  handleSearch,
  createOtherActivities,
  updateOtherActivities,
  getOtherActivities,
} from "./thunk";

const initialState = {
  otherActivities: [],
  otherActivity: null,
  edit: false,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
  loadingOtherActivities: false,
  loadingNext: false,
};

export const otherActivities = createSlice({
  name: "otherActivities",
  initialState,
  reducers: {
    otherActivitiesEditSuccess: (state, action) => {
      state.edit = true;
      state.otherActivity = state.otherActivities.find((otherActivity) => otherActivity.id === action.payload);
    },
    clearAllOtherActivities: (state) => {
      state.edit = false;
      state.loading = false;
      state.loadingUpdated = false;
      state.loadingOtherActivities = false;
      state.otherActivity = null;
    },

    otherActivityReply: (state, action) => {
      state.otherActivity = state.otherActivities.find((otherActivity) => otherActivity.id === action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNext.pending, (state) => {
      state.loadingNext = true;
    });
    builder.addCase(getNext.fulfilled, (state, action) => {
      state.loadingNext = false;
      state.otherActivities = [...state.otherActivities, ...action.payload.results];
      state.next = action.payload.next;
    });
    builder.addCase(getNext.rejected, (state) => {
      state.loadingNext = false;
    });
    builder.addCase(createOtherActivities.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createOtherActivities.fulfilled, (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(createOtherActivities.rejected, (state) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(updateOtherActivities.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(updateOtherActivities.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.edit = false;
    });
    builder.addCase(updateOtherActivities.rejected, (state) => {
      state.loadingUpdated = false;
    });
    builder.addMatcher(isAnyOf(getOtherActivities.pending, handleSearch.pending), (state) => {
      state.loadingOtherActivities = true;
    });
    builder.addMatcher(isAnyOf(getOtherActivities.fulfilled, handleSearch.fulfilled), (state, action) => {
      state.loadingOtherActivities = false;
      state.otherActivities = action.payload.results;
      state.count = action.payload.count;
      state.previous = action.payload.previous;
      state.next = action.payload.next;
    });
    builder.addMatcher(isAnyOf(getOtherActivities.rejected, handleSearch.rejected), (state) => {
      state.loadingOtherActivities = false;
    });
  },
});

export const { otherActivitiesEditSuccess, clearAllOtherActivities, otherActivityReply } = otherActivities.actions;

export default otherActivities.reducer;
