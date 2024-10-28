import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createCategory as apiCreateCategory,
  updateCategory as apiUpdateCategory,
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
      Object.assign(state, initialState);
    },
    clearEditCategory: (state) => {
      state.edit = false;
      state.category = null;
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    updateCategoryState: (state, action) => {
      const index = state.categories.findIndex((category) => category.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = { ...state.categories[index], ...action.payload.updatedCategory };
      }
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter((category) => category.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    // Handle category creation
    builder
      .addCase(apiCreateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(apiCreateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.edit = false;
        state.categories.push(action.payload);
      })
      .addCase(apiCreateCategory.rejected, (state) => {
        state.loading = false;
      });

    // Handle category update
    builder
      .addCase(apiUpdateCategory.pending, (state) => {
        state.loadingUpdated = true;
      })
      .addCase(apiUpdateCategory.fulfilled, (state, action) => {
        state.loadingUpdated = false;
        state.edit = false;
        const index = state.categories.findIndex((category) => category.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = { ...state.categories[index], ...action.payload };
        }
      })
      .addCase(apiUpdateCategory.rejected, (state) => {
        state.loadingUpdated = false;
      });

    // Handle fetching the next set of categories for infinite scrolling
    builder
      .addCase(getNextCategory.pending, (state) => {
        state.loadingNext = true;
      })
      .addCase(getNextCategory.fulfilled, (state, action) => {
        state.loadingNext = false;
        state.categories = [...state.categories, ...action.payload.data];
        state.next = action.payload.next;
        state.previous = action.payload.previous;
        state.count = action.payload.totalCount;
      })
      .addCase(getNextCategory.rejected, (state) => {
        state.loadingNext = false;
      });

    // Use addMatcher for handling multiple actions with similar logic
    builder
      .addMatcher(isAnyOf(getCategories.pending, handleCategorySearch.pending), (state) => {
        state.loadingCategory = true;
      })
      .addMatcher(
        isAnyOf(getCategories.fulfilled, getAllCategories.fulfilled, handleCategorySearch.fulfilled),
        (state, action) => {
          state.loadingCategory = false;
          state.categories = action.payload?.data || [];
          state.count = action.payload?.totalCount || 0;
          state.previous = action.payload?.previous || null;
          state.next = action.payload?.next || null;
        }
      )
      .addMatcher(
        isAnyOf(getCategories.rejected, getAllCategories.rejected, handleCategorySearch.rejected),
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
  updateCategoryState,
  deleteCategory,
} = categories.actions;

export default categories.reducer;
