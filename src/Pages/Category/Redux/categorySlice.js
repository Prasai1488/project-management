import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createCategory as apiCreateCategory,
  updateCategory as apiUpdateCategory, // Renamed to avoid conflict
  getAllCategories,
  getCategories,
  getNextCategory,
  handleCategorySearch,
  getSpecificCategory,
} from "./thunk";

const initialState = {
  categories: [],
  category: null,
  edit: false,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
  loadingCategory: false,
  loadingNext: false,
};

export const categories = createSlice({
  name: "category",
  initialState,
  reducers: {
    categoriesEditSuccess: (state, action) => {
      state.edit = true;
      state.category = action.payload;
    },
    clearAllCategory: (state) => {
      state.edit = false;
      state.loading = false;
      state.loadingUpdated = false;
      state.loadingCategory = false;
      state.category = null;
      state.categories = [];
    },
    clearEditCategory: (state) => {
      state.edit = false;
    },
    addCategory: (state, action) => {
      state.categories = [...state.categories, action.payload];
    },
    updateCategory: (state, action) => { // Avoiding conflict with thunk imports
      const index = state.categories.findIndex(
        (category) => category.id === action.payload.id
      );
      if (index !== -1) {
        state.categories[index] = action.payload.updatedCategory;
      }
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNextCategory.pending, (state) => {
      state.loadingNext = true;
    });
    builder.addCase(getNextCategory.fulfilled, (state, action) => {
      state.loadingNext = false;
      state.categories = [
        ...state.categories,
        ...action.payload?.categories,
      ];
      state.next = action.payload;
    });
    builder.addCase(getNextCategory.rejected, (state) => {
      state.loadingNext = false;
    });
    builder.addCase(apiCreateCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(apiCreateCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(apiCreateCategory.rejected, (state) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(getSpecificCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSpecificCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
    });
    builder.addCase(getSpecificCategory.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(apiUpdateCategory.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(apiUpdateCategory.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.edit = false;
    });
    builder.addCase(apiUpdateCategory.rejected, (state) => {
      state.loadingUpdated = false;
    });
    builder.addMatcher(
      isAnyOf(getCategories.pending, handleCategorySearch.pending),
      (state) => {
        state.loadingCategory = true;
      }
    );
    builder.addMatcher(
      isAnyOf(
        getCategories.fulfilled,
        getAllCategories.fulfilled,
        handleCategorySearch.fulfilled
      ),
      (state, action) => {
        state.loadingCategory = false;
        state.categories = action.payload?.categories;
        state.count = action.payload.totalCount;
        state.previous = action.payload?.previous;
        state.next = action.payload;
      }
    );
    builder.addMatcher(
      isAnyOf(
        getCategories.rejected,
        getAllCategories.rejected,
        handleCategorySearch.rejected
      ),
      (state) => {
        state.loadingCategory = false;
      }
    );
  },
});

export const {
  categoriesEditSuccess,
  clearAllCategory,
  clearEditCategory,
  addCategory,
  updateCategory, // Correctly defined without conflict
  deleteCategory,
} = categories.actions;

export default categories.reducer;
