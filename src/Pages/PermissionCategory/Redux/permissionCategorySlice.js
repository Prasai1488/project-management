import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createPermissionCategorys,
  getAllPermissionCategorys,
  getNext,
  getPermissionCategorys,
  handleSearch,
  updatePermissionCategorys,
} from "./thunk";

const initialState = {
  permissionCategorys: [],
  permissionCategory: null,
  edit: false,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
  loadingPermissionCategory: false,
  loadingNext: false,
};

export const permissionCategorysSlice = createSlice({
  name: "permissionCategory",
  initialState,
  reducers: {
    permissionCategorysEditSuccess: (state, action) => {
      state.edit = true;
      state.permissionCategory = state.permissionCategorys.find(
        (permissionCategory) => permissionCategory._id === action.payload
      );
    },
    clearAllPermissionCategory: (state) => {
      state.edit = false;
      state.loading = false;
      state.loadingUpdated = false;
      state.loadingPermissionCategory = false;
      state.permissionCategory = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNext.pending, (state) => {
      state.loadingNext = true;
    });
    // builder.addCase(getNext.fulfilled, (state, action) => {
    //   console.log(action.payload, "type of action payload");
    //   console.log(typeof(action.payload));
    //   state.permissionCategorys =[...state.permissionCategorys, ...action.payload];
    //   state.next = action.payload.next;
    //   state.loadingNext = false;
    // });

    builder.addCase(getNext.fulfilled, (state, action) => {
      if (Array.isArray(action.payload.permissionCategories)) {
        state.permissionCategorys = [...state.permissionCategorys, ...action.payload.permissionCategories];
      } else {
        console.error("Expected error ocurred");
      }

      // Handle the next page URL
      state.next = action.payload.next || null;
      state.loadingNext = false;
    });

    builder.addCase(getNext.rejected, (state) => {
      state.loadingNext = false;
    });
    builder.addCase(createPermissionCategorys.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPermissionCategorys.fulfilled, (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(createPermissionCategorys.rejected, (state) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(updatePermissionCategorys.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(updatePermissionCategorys.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.edit = false;
    });
    builder.addCase(updatePermissionCategorys.rejected, (state) => {
      state.loadingUpdated = false;
    });
    builder.addMatcher(
      isAnyOf(getPermissionCategorys.pending, getAllPermissionCategorys.pending, handleSearch.pending),
      (state) => {
        state.loadingPermissionCategory = true;
      }
    );
    builder.addMatcher(
      isAnyOf(getPermissionCategorys.fulfilled, getAllPermissionCategorys.fulfilled, handleSearch.fulfilled),
      (state, action) => {
        state.loadingPermissionCategory = false;
        state.permissionCategorys = Array.isArray(action.payload?.permissionCategories)
          ? action.payload.permissionCategories
          : [];
        state.count = action.payload?.totalCount || 0;
        state.previous = action.payload?.previous;
        state.next = action.payload?.nextPageUrl;
      }
    );
    builder.addMatcher(
      isAnyOf(getPermissionCategorys.rejected, getAllPermissionCategorys.rejected, handleSearch.rejected),
      (state) => {
        state.loadingPermissionCategory = false;
      }
    );
  },
});

export const { permissionCategorysEditSuccess, clearAllPermissionCategory } = permissionCategorysSlice.actions;

export default permissionCategorysSlice.reducer;
