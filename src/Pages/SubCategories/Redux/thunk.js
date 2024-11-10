import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../Utils/axios";
import * as API from "./api";

// Get subcategories
export const getSubCategories = createAsyncThunk(
  "subCategory/getSubCategories",
  async (postsPerPage, { rejectWithValue }) => {
    try {
      const { data } = await API.getSubCategories(postsPerPage);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
    }
  }
);

// Get specific subcategory
export const getSpecificSubCategory = createAsyncThunk(
  "subCategory/getSpecificSubCategory",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.getSpecificSubCategory(id);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
    }
  }
);

// Get all subcategories
export const getAllSubCategories = createAsyncThunk(
  "subCategory/getAllSubCategory",
  async ({ postsPerPage, page }, { rejectWithValue }) => {
  
    try {
      const response = await API.getAllSubCategories(postsPerPage, page);
      const data = response.data;
      const subCategoriesArray = data.data || [];
      return {
        results: subCategoriesArray,
        count: data.pagination.count,
        currentPage: data.pagination.currentPage,
        totalPages: data.pagination.totalPages,
        next: data.pagination.next,
        previous: data.pagination.previous,
      };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "An error occurred while fetching Sub categories.");
    }
  }
);


// Get previous subcategory
export const getPreviousSubCategory = createAsyncThunk(
  "subCategory/getPreviousSubCategory",
  async (previous, { rejectWithValue }) => {
    try {
      const { data } = await API.getPreviousSubCategory(previous);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
    }
  }
);

// Get next subcategory
export const getNextSubCategory = createAsyncThunk(
  "subCategory/getNextSubCategory",
  async ({ postsPerPage, page }, { rejectWithValue }) => {
    try {
      const response = await API.getAllSubCategories(postsPerPage, page);
      const data = response.data;
      const subCategoriesArray = data.data || [];
      return {
        results: subCategoriesArray,
        count: data.pagination.count,
        next: data.pagination.next,
        previous: data.pagination.previous,
      };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "An error occurred while fetching next sub category.");
    }
  }
);


// Get page of subcategories
export const getPageSubCategories = createAsyncThunk(
  "subCategory/getPageSubCategories",
  async ({ number, postsPerPage }, { rejectWithValue }) => {
    try {
      const { data } = await API.getPageSubCategories(number, postsPerPage);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
    }
  }
);

// Create subcategory
export const createSubCategory = createAsyncThunk(
  "subCategory/createSubCategory",
  async (data, { rejectWithValue }) => {
    try {
      const { data: responseData } = await API.createSubCategory(data);
      return responseData;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
    }
  }
);

// Update subcategory thunk
export const updateSubCategory = createAsyncThunk(
  "subCategory/updateSubCategory",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const { data } = await API.updateSubCategory(id, values);
      return data;
    } catch (error) {
      console.error("Error updating subcategory:", error.response);
      console.error("Error updating subcategory:", error.response.data);
      const errorMessage = error?.response?.data?.errors?.[0]?.error || error.message || "Something went wrong";
      return rejectWithValue(errorMessage);
    }
  }
);

// Handle search for subcategories
export const handleSubCategorySearch = createAsyncThunk(
  "sub-category/handleSearch",
  async ({ search, postsPerPage, page }, { rejectWithValue }) => {
    try {
      const response = await API.handleSubCategorySearch(search, postsPerPage, page);
      const data = response.data;

      const subCategoriesArray = data.data || [];
      return {
        results: subCategoriesArray,
        count: data.pagination.count,
        currentPage: data.pagination.currentPage,
        totalPages: data.pagination.totalPages,
        next: data.pagination.next,
        previous: data.pagination.previous,
      };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "An error occurred while searching sub categories.");
    }
  }
);