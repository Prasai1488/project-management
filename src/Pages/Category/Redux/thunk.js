import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";


// Get specific category
export const getSpecificCategory = createAsyncThunk("category/getSpecificCategory", async (id, { rejectWithValue }) => {
  try {
    const { data } = await API.getSpecificCategory(id);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
  }
});



export const getAllCategories = createAsyncThunk(
  "category/getCategory",
  async ({ postsPerPage, page }, { rejectWithValue }) => {

    try {
      const response = await API.getAllCategories(postsPerPage, page);
      const data = response.data;
      const categoriesArray = data.data || [];
      return {
        results: categoriesArray,
        count: data.pagination.count,
        currentPage: data.pagination.currentPage,
        totalPages: data.pagination.totalPages,
        next: data.pagination.next,
        previous: data.pagination.previous,
      };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "An error occurred while fetching categories.");
    }
  }
);



// Get previous category
export const getPreviousCategory = createAsyncThunk(
  "category/getPreviousCategory",
  async (previous, { rejectWithValue }) => {
    try {
      const { data } = await API.getPreviousCategory(previous);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
    }
  }
);

export const getNextCategory = createAsyncThunk(
  "category/getNextCategory",
  async ({ postsPerPage, page }, { rejectWithValue }) => {
    try {
      const response = await API.getAllCategories(postsPerPage, page);
      const data = response.data;
      const categoriesArray = data.data || [];
      return {
        results: categoriesArray,
        count: data.pagination.count,
        next: data.pagination.next,
        previous: data.pagination.previous,
      };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "An error occurred while fetching next category.");
    }
  }
);

// Get page of categories
export const getPageCategories = createAsyncThunk(
  "category/getPageCategories",
  async ({ number, postsPerPage }, { rejectWithValue }) => {
    try {
      const { data } = await API.getPageCategories(number, postsPerPage);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
    }
  }
);

// Create category
export const createCategory = createAsyncThunk("category/createCategory", async (data, { rejectWithValue }) => {
  try {
    const { data: responseData } = await API.createCategory(data);
    return responseData;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
  }
});

// Update category thunk
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      console.log("Updating category with ID:", id);
      console.log("Values being sent:", values);
      const { data } = await API.updateCategory(id, values);
      return data;
    } catch (error) {
      console.error("Error updating category:", error.response.data);
      const errorMessage = error?.response?.data?.errors?.[0]?.error || error.message || "Something went wrong";
      return rejectWithValue(errorMessage);
    }
  }
);

// Handle search for categories
export const handleCategorySearch = createAsyncThunk(
  "category/handleSearch",
  async ({ search, postsPerPage, page }, { rejectWithValue }) => {
    try {
      const response = await API.handleCategorySearch(search, postsPerPage, page);
      const data = response.data;

      const categoriesArray = data.data || [];
      return {
        results: categoriesArray,
        count: data.pagination.count,
        currentPage: data.pagination.currentPage,
        totalPages: data.pagination.totalPages,
        next: data.pagination.next,
        previous: data.pagination.previous,
      };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "An error occurred while searching categories.");
    }
  }
);
