import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createRole,
  deleteRole,
  getAllPermission,
  getNext,
  getRole,
  getSpecificUserPermissions,
  handleSearch,
  updateRole,
} from "./thunk";

const initialState = {
  roles: [],
  edit: false,
  role: null,
  count: 0,
  next: null,
  previous: null,
  loading: false,
  loadingRole: false,
  permissions: [],
  loadingUpdated: false,
  loadingSpecific: false,
  loadingNext: false,
  permissionCount: 0,
  previousPermission: "",
  nextPermission: "",
};

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    roleEditSuccess: (state, action) => {
      state.edit = true;
      state.role = action.payload;
      state.permissions = [];
      state.loading = false;
    },
    clearEditRole: (state) => {
      state.edit = false;
      state.loadingRole = false;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNext.pending, (state) => {
      state.loadingNext = true;
    });
    builder.addCase(getNext.fulfilled, (state, action) => {
      state.loadingNext = false;
      state.roles = [...state.roles, ...action.payload.results];
      state.next = action.payload.next;
    });
    builder.addCase(getNext.rejected, (state) => {
      state.loadingNext = false;
    });

    builder.addCase(updateRole.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(updateRole.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.edit = false;
    });
    builder.addCase(updateRole.rejected, (state) => {
      state.loadingUpdated = false;
    });

    builder.addMatcher(isAnyOf(getRole.pending, handleSearch.pending), (state) => {
      state.loadingRole = true;
    });
    builder.addMatcher(isAnyOf(getRole.fulfilled, handleSearch.fulfilled), (state, action) => {
      state.loadingRole = false;
      state.roles = action.payload.roles;
      state.count = action.payload.totalCount;
      state.previous = action.payload.previous;
      state.next = action.payload.next;
    });
    builder.addMatcher(isAnyOf(getRole.rejected, handleSearch.rejected), (state) => {
      state.loadingRole = false;
    });
    builder.addMatcher(isAnyOf(createRole.pending, deleteRole.pending), (state) => {
      state.loading = true;
    });
    builder.addMatcher(isAnyOf(createRole.fulfilled, deleteRole.fulfilled), (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addMatcher(isAnyOf(createRole.rejected, deleteRole.rejected), (state) => {
      state.loading = false;
      state.edit = false;
    });

    builder.addMatcher(isAnyOf(getAllPermission.pending, getSpecificUserPermissions.pending), (state) => {
      state.loadingSpecific = true;
    });
    builder.addMatcher(isAnyOf(getAllPermission.fulfilled, getSpecificUserPermissions.fulfilled), (state, action) => {
      state.loadingSpecific = false;
      state.permissions = action.payload.permissions;
      state.permissionCount = action.payload.count;
      state.previousPermission = action.payload.previous;
      state.nextPermission = action.payload.next;
    });
    builder.addMatcher(isAnyOf(getAllPermission.rejected, getSpecificUserPermissions.rejected), (state) => {
      state.loadingSpecific = false;
    });
  },
});

export const { roleEditSuccess, clearEditRole } = roleSlice.actions;

export default roleSlice.reducer;
