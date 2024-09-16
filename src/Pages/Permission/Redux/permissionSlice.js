import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createPermissions,
  getAllPermissions,
  getPermissions,
  getNext,
  handleSearch,
  updatePermissions,
} from "./thunk";

const initialState = {
  permissions: [],
  permission: null,
  edit: false,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
  loadingPermission: false,
  loadingNext: false,
};

export const permissionsSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    permissionsEditSuccess: (state, action) => {
      state.edit = true;
      state.permission = state.permissions.find((permission) => permission._id === action.payload);
    },
    clearAllPermission: (state) => {
      state.edit = false;
      state.loading = false;
      state.loadingUpdated = false;
      state.loadingPermission = false;
      state.permission = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNext.pending, (state) => {
      state.loadingNext = true;
    });
    builder.addCase(getNext.fulfilled, (state, action) => {
      state.loadingNext = false;
      state.permissions = [...state.permissions, ...action.payload.permissions];
      state.next = action.payload.next;
    });
    builder.addCase(getNext.rejected, (state) => {
      state.loadingNext = false;
    });
    builder.addCase(createPermissions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPermissions.fulfilled, (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(createPermissions.rejected, (state) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(updatePermissions.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(updatePermissions.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.edit = false;
    });
    builder.addCase(updatePermissions.rejected, (state) => {
      state.loadingUpdated = false;
    });
    builder.addMatcher(isAnyOf(getPermissions.pending, handleSearch.pending), (state) => {
      state.loadingPermission = true;
    });
    builder.addMatcher(
      isAnyOf(getPermissions.fulfilled, getAllPermissions.fulfilled, handleSearch.fulfilled),
      (state, action) => {
        state.loadingPermission = false;
        state.permissions = action.payload?.permissions;
        state.count = action.payload;
        state.previous = action.payload?.previous;
        state.next = action.payload?.nextPageUrl;
      }
    );
    builder.addMatcher(isAnyOf(getPermissions.rejected, getAllPermissions.rejected, handleSearch.rejected), (state) => {
      state.loadingPermission = false;
    });
  },
});

export const { permissionsEditSuccess, clearAllPermission } = permissionsSlice.actions;

export default permissionsSlice.reducer;
