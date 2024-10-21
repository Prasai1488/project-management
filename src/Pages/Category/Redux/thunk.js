import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

// Get categories
export const getCategories = createAsyncThunk("category/getCategories", async (postsPerPage, { rejectWithValue }) => {
  try {
    const { data } = await API.getCategories(postsPerPage);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
  }
});

// Get specific category
export const getSpecificCategory = createAsyncThunk("category/getSpecificCategory", async (id, { rejectWithValue }) => {
  try {
    const { data } = await API.getSpecificCategory(id);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
  }
});

// Get all categories
export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async ({ postsPerPage, offset, search, orderBy, createdAt }, { rejectWithValue }) => {
    try {
      const { data } = await API.getAllCategories(postsPerPage, offset, search, orderBy, createdAt);
      console.log(data, "this is product categoried data");
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
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

// Get next category
export const getNextCategory = createAsyncThunk("category/getNextCategory", async (next, { rejectWithValue }) => {
  try {
    const { data } = await API.getNextCategory(next);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
  }
});

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

// Update category
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const { data } = await API.updateCategory(id, values);
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.errors?.[0]?.error || error.message || "Something went wrong";
      return rejectWithValue(errorMessage);
    }
  }
);

// Handle search for categories
export const handleCategorySearch = createAsyncThunk(
  "category/handleCategorySearch",
  async ({ search, postsPerPage }, { rejectWithValue }) => {
    try {
      const { data } = await API.handleCategorySearch(search, postsPerPage);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
    }
  }
);
