import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createOfficeActivities, getNext, getOfficeActivities, handleSearch, updateOfficeActivities } from "./thunk";

const initialState = {
  officeActivities: [],
  officeActivity: null,
  edit: false,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
  loadingOfficeActivities: false,
  loadingNext: false,
};

export const officeActivities = createSlice({
  name: "officeActivities",
  initialState,
  reducers: {
    officeActivitiesEditSuccess: (state, action) => {
      state.edit = true;
      state.officeActivity = state.officeActivities.find((officeActivity) => officeActivity.id === action.payload);
    },
    clearAllOfficeActivities: (state) => {
      state.edit = false;
      state.loading = false;
      state.loadingUpdated = false;
      state.loadingOfficeActivities = false;
      state.officeActivity = null;
    },

    officeActivityReply: (state, action) => {
      state.officeActivity = state.officeActivities.find((officeActivity) => officeActivity.id === action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNext.pending, (state) => {
      state.loadingNext = true;
    });
    builder.addCase(getNext.fulfilled, (state, action) => {
      state.loadingNext = false;
      state.officeActivities = [...state.officeActivities, ...action.payload.results];
      state.next = action.payload.next;
    });
    builder.addCase(getNext.rejected, (state) => {
      state.loadingNext = false;
    });
    builder.addCase(createOfficeActivities.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createOfficeActivities.fulfilled, (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(createOfficeActivities.rejected, (state) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(updateOfficeActivities.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(updateOfficeActivities.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.edit = false;
    });
    builder.addCase(updateOfficeActivities.rejected, (state) => {
      state.loadingUpdated = false;
    });
    builder.addMatcher(isAnyOf(getOfficeActivities.pending, handleSearch.pending), (state) => {
      state.loadingOfficeActivities = true;
    });
    builder.addMatcher(isAnyOf(getOfficeActivities.fulfilled, handleSearch.fulfilled), (state, action) => {
      state.loadingOfficeActivities = false;
      state.officeActivities = action.payload.results;
      state.count = action.payload.count;
      state.previous = action.payload.previous;
      state.next = action.payload.next;
    });
    builder.addMatcher(isAnyOf(getOfficeActivities.rejected, handleSearch.rejected), (state) => {
      state.loadingOfficeActivities = false;
    });
  },
});

export const { officeActivitiesEditSuccess, clearAllOfficeActivities, officeActivityReply } = officeActivities.actions;

export default officeActivities.reducer;
