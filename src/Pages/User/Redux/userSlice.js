import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createUser,
  deletePhoto,
  deleteUser,
  getCurrentUser,
  getNext,
  getSpecificUser,
  getUser,
  handleSearch,
  updateUser,
} from "./thunk";

// initialState
const initialState = {
  users: [],
  edit: false,
  user: null,
  userInfo: null,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingCurrent: false,
  loadingUser: false,
  loadingUpdated: false,
  loadingSpecific: true,
  loadingNext: false,
};

//
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userEditSuccess: (state, action) => {
      state.edit = true;
      state.user = action.payload;
      state.loading = false;
      state.loadingUpdated = false;
    },
    clearEditUser: (state) => {
      state.edit = false;
      state.user = null;
      state.loading = false;
      state.loadingUser = false;
      state.loadingUpdated = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getNext.pending, (state) => {
      state.loadingNext = true;
    });
    builder.addCase(getNext.fulfilled, (state, action) => {
      state.loadingNext = false;
      state.users = [...state.users, ...action.payload.results];
      state.next = action.payload.hasNextPage;
    });
    builder.addCase(getNext.rejected, (state) => {
      state.loadingNext = false;
    });

    builder.addCase(getCurrentUser.pending, (state) => {
      state.loadingCurrent = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.loadingCurrent = false;
      state.userInfo = action.payload.results;
    });
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.loadingCurrent = false;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.edit = false;
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.loadingUpdated = false;
    });
    builder.addCase(getSpecificUser.pending, (state) => {
      state.loadingSpecific = true;
    });
    builder.addCase(getSpecificUser.fulfilled, (state, action) => {
      state.loadingSpecific = false;
      state.user = action.payload.data;
    });
    builder.addCase(getSpecificUser.rejected, (state) => {
      state.loadingSpecific = false;
    });
    builder.addCase(deletePhoto.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(deletePhoto.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.user = action.payload;
    });
    builder.addCase(deletePhoto.rejected, (state) => {
      state.loadingUpdated = false;
    });
    builder.addMatcher(isAnyOf(getUser.pending, handleSearch.pending), (state) => {
      state.loadingUser = true;
    });
    builder.addMatcher(isAnyOf(getUser.fulfilled, handleSearch.fulfilled), (state, action) => {
      state.loadingUser = false;
      state.users = action.payload.results;
      state.count = action.payload.totalCount;
      state.previous = action.payload.previous;
      state.next = action.payload.hasNextPage;
    });
    builder.addMatcher(isAnyOf(getUser.rejected, handleSearch.rejected), (state) => {
      state.loadingUser = false;
    });
    builder.addMatcher(isAnyOf(createUser.pending, deleteUser.pending), (state) => {
      state.loading = true;
    });
    builder.addMatcher(isAnyOf(createUser.fulfilled, deleteUser.fulfilled), (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addMatcher(isAnyOf(createUser.rejected, deleteUser.rejected), (state) => {
      state.loading = false;
      state.edit = false;
    });
  },
});

export const { userEditSuccess, clearEditUser } = userSlice.actions;

export default userSlice.reducer;
