import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createCategory as apiCreateCategory,
  updateCategory as apiUpdateCategory,
  getAllCategories,

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
  currentPage: 1,
  totalPages: 1,
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
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getNextCategory.rejected, (state) => {
        state.loadingNext = false;
      });

    // Use addMatcher for handling multiple actions with similar logic
    builder
      .addMatcher(isAnyOf(getAllCategories.pending, handleCategorySearch.pending), (state) => {
        state.loadingCategory = true;
      })
      .addMatcher(
        isAnyOf( getAllCategories.fulfilled, handleCategorySearch.fulfilled),
        (state, action) => {
          state.loadingCategory = false;
          state.categories = action.payload?.results;
          state.count = action.payload?.count;
          state.currentPage = action.payload.currentPage;
          state.totalPages = action.payload.totalPages
          state.previous = action.payload?.previous || null;
          state.next = action.payload?.next || null;
        }
      )
      .addMatcher(
        isAnyOf( getAllCategories.rejected, handleCategorySearch.rejected),
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
