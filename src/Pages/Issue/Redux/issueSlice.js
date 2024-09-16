import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createIssues, getAllIssues, getIssues, getNext, getSpecificIssue, handleSearch, updateIssues } from "./thunk";

const initialState = {
  issues: [],
  issue: null,
  edit: false,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
  loadingIssue: false,
  loadingNext: false,
};

export const issuesSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {
    issuesEditSuccess: (state, action) => {
      state.edit = true;
      state.issue = state.issues.find((issue) => issue._id === action.payload);
    },
    clearAllIssue: (state) => {
      state.edit = false;
      state.loading = false;
      state.loadingUpdated = false;
      state.loadingIssue = false;
      state.issue = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNext.pending, (state) => {
        state.loadingNext = true;
      })
      .addCase(getNext.fulfilled, (state, action) => {
        state.loadingNext = false;
        state.issues = [...state.issues, ...action.payload.issues]; // Ensure action.payload.issues is an array
        state.next = action.payload.next;
      })
      .addCase(getNext.rejected, (state) => {
        state.loadingNext = false;
      })

      .addCase(createIssues.pending, (state) => {
        state.loading = true;
      })
      .addCase(createIssues.fulfilled, (state, action) => {
        state.loading = false;
        state.edit = false;
      })
      .addCase(createIssues.rejected, (state) => {
        state.loading = false;
        state.edit = false;
      })
      .addCase(updateIssues.pending, (state) => {
        state.loadingUpdated = true;
      })
      .addCase(updateIssues.fulfilled, (state, action) => {
        state.loadingUpdated = false;
        state.edit = false;
      })
      .addCase(updateIssues.rejected, (state) => {
        state.loadingUpdated = false;
      })
      .addMatcher(isAnyOf(getIssues.pending, handleSearch.pending), (state) => {
        state.loadingIssue = true;
      })
      .addMatcher(isAnyOf(getIssues.fulfilled, getAllIssues.fulfilled, handleSearch.fulfilled), (state, action) => {
        state.loadingIssue = false;
        state.issues = action.payload?.issues;
        state.count = action.payload?.totalCount; // Make sure this is the correct property
        state.previous = action.payload?.previous;
        state.next = action.payload?.nextPageUrl;
      })
      .addMatcher(isAnyOf(getIssues.rejected, getAllIssues.rejected, handleSearch.rejected), (state) => {
        state.loadingIssue = false;
      });
  },
});

export const { issuesEditSuccess, clearAllIssue } = issuesSlice.actions;

export default issuesSlice.reducer;
