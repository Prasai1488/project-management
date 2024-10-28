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
  "subCategory/getAllSubCategories",
  async ({ page, postsPerPage }, { rejectWithValue }) => {
    try {
      const { data } = await API.getAllSubCategories(page, postsPerPage);
      console.log(data, "this is subcategory datafdghjk");
      return data;
    } catch (error) {
      console.error("Error fetching subcategories:", error.response);
      return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
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
  async (next, { rejectWithValue }) => {
    try {
      const { data } = await API.getNextSubCategory(next);
      console.log(data, "this is next subcategory data");
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
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
  "subCategory/handleSubCategorySearch",
  async ({ page, postsPerPage, search }, { rejectWithValue }) => {
    try {
      const { data } = await API.handleSubCategorySearch(page, postsPerPage, search);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
    }
  }
);
