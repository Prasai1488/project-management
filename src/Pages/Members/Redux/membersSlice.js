import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createMembers, getMembers, getNext, handleSearch, updateMembers } from "./thunk";

const initialState = {
  members: [],
  member: null,
  edit: false,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
  loadingMembers: false,
  loadingNext: false,
};

export const members = createSlice({
  name: "members",
  initialState,
  reducers: {
    membersEditSuccess: (state, action) => {
      state.edit = true;
      state.member = state.members.find((member) => member.id === action.payload);
    },
    clearAllMembers: (state) => {
      state.edit = false;
      state.loading = false;
      state.loadingUpdated = false;
      state.loadingMembers = false;
      state.member = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNext.pending, (state) => {
      state.loadingNext = true;
    });
    builder.addCase(getNext.fulfilled, (state, action) => {
      state.loadingNext = false;
      state.members = [...state.members, ...action.payload.results];
      state.next = action.payload.next;
    });
    builder.addCase(getNext.rejected, (state) => {
      state.loadingNext = false;
    });
    builder.addCase(createMembers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createMembers.fulfilled, (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(createMembers.rejected, (state) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(updateMembers.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(updateMembers.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.edit = false;
    });
    builder.addCase(updateMembers.rejected, (state) => {
      state.loadingUpdated = false;
    });
    builder.addMatcher(isAnyOf(getMembers.pending, handleSearch.pending), (state) => {
      state.loadingMembers = true;
    });
    builder.addMatcher(isAnyOf(getMembers.fulfilled, handleSearch.fulfilled), (state, action) => {
      state.loadingMembers = false;
      state.members = action.payload.results;
      state.count = action.payload.count;
      state.previous = action.payload.previous;
      state.next = action.payload.next;
    });
    builder.addMatcher(isAnyOf(getMembers.rejected, handleSearch.rejected), (state) => {
      state.loadingMembers = false;
    });
  },
});

export const { membersEditSuccess, clearAllMembers } = members.actions;

export default members.reducer;
