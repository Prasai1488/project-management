import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

// get categories
export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (postsPerPage, { rejectWithValue }) => {
    try {
      const { data } = await API.getCategories(postsPerPage);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// get specific category
export const getSpecificCategory = createAsyncThunk(
  "category/getSpecificCategory",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.getSpecificCategory(id);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// get all categories
export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async ({ postsPerPage, page, status, priority, level }, { rejectWithValue }) => {
    try {
      const { data } = await API.getAllCategories(postsPerPage, page, status, priority, level);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// get previous category
export const getPreviousCategory = createAsyncThunk(
  "category/getPreviousCategory",
  async (previous, { rejectWithValue }) => {
    try {
      const { data } = await API.getPreviousCategory(previous);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// get next category
export const getNextCategory = createAsyncThunk(
  "category/getNextCategory",
  async (next, { rejectWithValue }) => {
    try {
      const { data } = await API.getNextCategory(next);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// get particular page of categories
export const getPageCategories = createAsyncThunk(
  "category/getPageCategories",
  async ({ number, postsPerPage }, { rejectWithValue }) => {
    try {
      const { data } = await API.getPageCategories(number, postsPerPage);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// create category
export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (data, { rejectWithValue }) => {
    const body = JSON.stringify({ ...data });
    try {
      const { data } = await API.createCategory(body);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// update category
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const { data } = await API.updateCategory(id, values);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// handle search for categories
export const handleCategorySearch = createAsyncThunk(
  "category/handleCategorySearch",
  async ({ search, postsPerPage }, { rejectWithValue }) => {
    try {
      const { data } = await API.handleCategorySearch(search, postsPerPage);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);
