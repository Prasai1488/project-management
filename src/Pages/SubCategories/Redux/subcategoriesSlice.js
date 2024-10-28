import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createSubCategory as apiCreateSubCategory,
  updateSubCategory as apiUpdateSubCategory,
  getAllSubCategories,
  getSubCategories,
  getNextSubCategory,
  handleSubCategorySearch,
  getSpecificSubCategory,
} from "./thunk";

const initialState = {
  subCategories: [],
  subCategory: null,
  edit: false,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
  loadingSubCategory: false,
  loadingNext: false,
};

export const subCategories = createSlice({
  name: "subCategory",
  initialState,
  reducers: {
    subCategoriesEditSuccess: (state, action) => {
      state.edit = true;
      // state.subCategory = action.payload;
    },
    clearAllSubCategory: (state) => {
      Object.assign(state, initialState);
    },
    clearEditSubCategory: (state) => {
      state.edit = false;
      state.subCategory = null;
    },
    addSubCategory: (state, action) => {
      state.subCategories.push(action.payload);
    },
    updateSubCategoryState: (state, action) => {
      const index = state.subCategories.findIndex((subCategory) => subCategory.id === action.payload.id);
      if (index !== -1) {
        state.subCategories[index] = { ...state.subCategories[index], ...action.payload.updatedSubCategory };
      }
    },
    deleteSubCategory: (state, action) => {
      state.subCategories = state.subCategories.filter((subCategory) => subCategory.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(apiCreateSubCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(apiCreateSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.edit = false;
        state.subCategories.push(action.payload);
      })
      .addCase(apiCreateSubCategory.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getSpecificSubCategory.pending, (state) => {
        state.loading = true;
      })

      .addCase(getNextSubCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNextSubCategory.fulfilled, (state, action) => {
        state.loadingNext = false;
        state.subCategories = [...state.subCategories, ...action.payload?.subCategories];
        state.next = action.payload.next;
      })
      .addCase(getNextSubCategory.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getSpecificSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategory = action.payload.data;
      })

      .addCase(getSpecificSubCategory.rejected, (state) => {
        state.loading = false;
      })
      .addCase(apiUpdateSubCategory.pending, (state) => {
        state.loadingUpdated = true;
        console.log("Update subCategory pending...");
      })
      .addCase(apiUpdateSubCategory.fulfilled, (state, action) => {
        state.loadingUpdated = false;
        state.edit = false;

        console.log("Update subCategory fulfilled:", action.payload);
        const index = state.subCategories.findIndex((subCategory) => subCategory.id === action.payload.id);

        console.log("Looking for subCategory with ID:", action.payload.id);

        if (index !== -1) {
          console.log("SubCategory found at index:", index);
          state.subCategories[index] = { ...state.subCategories[index], ...action.payload };
          console.log("Updated subCategory:", state.subCategories[index]);
        } else {
          console.log("SubCategory not found for ID:", action.payload.id);
        }
      })
      .addCase(apiUpdateSubCategory.rejected, (state, action) => {
        state.loadingUpdated = false;
        console.error("Update subCategory failed:", action.error);
      });

    // Use addMatcher for handling multiple actions with similar logic
    builder
      .addMatcher(isAnyOf(getSubCategories.pending, handleSubCategorySearch.pending), (state) => {
        state.loadingSubCategory = true;
      })
      .addMatcher(
        isAnyOf(getSubCategories.fulfilled, getAllSubCategories.fulfilled, handleSubCategorySearch.fulfilled),
        (state, action) => {
          state.loadingSubCategory = false;
          state.subCategories = action.payload?.data || [];
          state.count = action.payload?.totalCount || 0;
          state.previous = action.payload?.previous || null;
          state.next = action.payload?.next || null;
        }
      )
      .addMatcher(
        isAnyOf(getSubCategories.rejected, getAllSubCategories.rejected, handleSubCategorySearch.rejected),
        (state) => {
          state.loadingSubCategory = false;
        }
      );
  },
});

export const {
  subCategoriesEditSuccess,
  clearAllSubCategory,
  clearEditSubCategory,
  addSubCategory,
  updateSubCategoryState,
  deleteSubCategory,
} = subCategories.actions;

export default subCategories.reducer;
