import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createExecutiveMembers, getExecutiveMembers, getNext, handleSearch, updateExecutiveMembers } from "./thunk";

const initialState = {
  executiveMembers: [],
  executiveMember: null,
  edit: false,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
  loadingExecutiveMembers: false,
  loadingNext: false,
};

export const executiveMembers = createSlice({
  name: "executiveMembers",
  initialState,
  reducers: {
    executiveMembersEditSuccess: (state, action) => {
      state.edit = true;
      state.executiveMember = state.executiveMembers.find((executiveMember) => executiveMember.id === action.payload);
    },
    clearAllExecutiveMembers: (state) => {
      state.edit = false;
      state.loading = false;
      state.loadingUpdated = false;
      state.loadingExecutiveMembers = false;
      state.executiveMember = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNext.pending, (state) => {
      state.loadingNext = true;
    });
    builder.addCase(getNext.fulfilled, (state, action) => {
      state.loadingNext = false;
      state.executiveMembers = [...state.executiveMembers, ...action.payload.results];
      state.next = action.payload.next;
    });
    builder.addCase(getNext.rejected, (state) => {
      state.loadingNext = false;
    });
    builder.addCase(createExecutiveMembers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createExecutiveMembers.fulfilled, (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(createExecutiveMembers.rejected, (state) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(updateExecutiveMembers.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(updateExecutiveMembers.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.edit = false;
    });
    builder.addCase(updateExecutiveMembers.rejected, (state) => {
      state.loadingUpdated = false;
    });
    builder.addMatcher(isAnyOf(getExecutiveMembers.pending, handleSearch.pending), (state) => {
      state.loadingExecutiveMembers = true;
    });
    builder.addMatcher(isAnyOf(getExecutiveMembers.fulfilled, handleSearch.fulfilled), (state, action) => {
      state.loadingExecutiveMembers = false;
      state.executiveMembers = action.payload.results;
      state.count = action.payload.count;
      state.previous = action.payload.previous;
      state.next = action.payload.next;
    });
    builder.addMatcher(isAnyOf(getExecutiveMembers.rejected, handleSearch.rejected), (state) => {
      state.loadingExecutiveMembers = false;
    });
  },
});

export const { executiveMembersEditSuccess, clearAllExecutiveMembers } = executiveMembers.actions;

export default executiveMembers.reducer;
