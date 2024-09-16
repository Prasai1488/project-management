import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getUserGroup,
  getAllUserGroup,
  getPrevious,
  getNext,
  getPageUserGroup,
  createUserGroup,
  updateUserGroup,
  deleteUserGroup,
  getAllPermission,
  handleSearch,
  getSpecificUserPermissions,
} from "./thunk";

const initialState = {
  userGroups: [],
  edit: false,
  userGroup: null,
  count: 0,
  next: null,
  previous: null,
  loading: false,
  loadingUserGroup: false,
  permissions: [],
  loadingUpdated: false,
  loadingSpecific: false,
  loadingNext: false,
  permissionCount: 0,
  previousPermission: "",
  nextPermission: "",
};

export const userGroupSlice = createSlice({
  name: "userGroup",
  initialState,
  reducers: {
    userGroupEditSuccess: (state, action) => {
      state.edit = true;
      state.userGroup = state.userGroups.find((userGroup) => userGroup.id === action.payload);
      state.permissions = [];
      state.loading = false;
    },
    clearEditUserGroup: (state) => {
      state.edit = false;
      state.loadingUserGroup = false;
      state.userGroup = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNext.pending, (state) => {
      state.loadingNext = true;
    });
    builder.addCase(getNext.fulfilled, (state, action) => {
      state.loadingNext = false;
      state.userGroups = [...state.userGroups, ...action.payload.results];
      state.next = action.payload.next;
    });
    builder.addCase(getNext.rejected, (state) => {
      state.loadingNext = false;
    });

    builder.addCase(updateUserGroup.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(updateUserGroup.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.edit = false;
    });
    builder.addCase(updateUserGroup.rejected, (state) => {
      state.loadingUpdated = false;
    });

    builder.addMatcher(isAnyOf(getUserGroup.pending, handleSearch.pending), (state) => {
      state.loadingUserGroup = true;
    });
    builder.addMatcher(isAnyOf(getUserGroup.fulfilled, handleSearch.fulfilled), (state, action) => {
      state.loadingUserGroup = false;
      state.userGroups = action.payload.results;
      state.count = action.payload.count;
      state.previous = action.payload.previous;
      state.next = action.payload.next;
    });
    builder.addMatcher(isAnyOf(getUserGroup.rejected, handleSearch.rejected), (state) => {
      state.loadingUserGroup = false;
    });
    builder.addMatcher(isAnyOf(createUserGroup.pending, deleteUserGroup.pending), (state) => {
      state.loading = true;
    });
    builder.addMatcher(isAnyOf(createUserGroup.fulfilled, deleteUserGroup.fulfilled), (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addMatcher(isAnyOf(createUserGroup.rejected, deleteUserGroup.rejected), (state) => {
      state.loading = false;
      state.edit = false;
    });

    builder.addMatcher(isAnyOf(getAllPermission.pending, getSpecificUserPermissions.pending), (state) => {
      state.loadingSpecific = true;
    });
    builder.addMatcher(isAnyOf(getAllPermission.fulfilled, getSpecificUserPermissions.fulfilled), (state, action) => {
      state.loadingSpecific = false;
      state.permissions = action.payload.results;
      state.permissionCount = action.payload.count;
      state.previousPermission = action.payload.previous;
      state.nextPermission = action.payload.next;
    });
    builder.addMatcher(isAnyOf(getAllPermission.rejected, getSpecificUserPermissions.rejected), (state) => {
      state.loadingSpecific = false;
    });
  },
});

export const { userGroupEditSuccess, clearEditUserGroup } = userGroupSlice.actions;

export default userGroupSlice.reducer;
