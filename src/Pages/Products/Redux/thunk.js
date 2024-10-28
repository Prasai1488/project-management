import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

// Get products with pagination
export const getProducts = createAsyncThunk("product/getProducts", async (postsPerPage, { rejectWithValue }) => {
  try {
    const { data } = await API.getProducts(postsPerPage);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
  }
});

// Get a specific product by ID
export const getSpecificProduct = createAsyncThunk("product/getSpecificProduct", async (id, { rejectWithValue }) => {
  try {
    const { data } = await API.getSpecificProduct(id);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
  }
});

// Get all products with filters
export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async ({ postsPerPage, offset, search, order_by, createdAt }, { rejectWithValue }) => {
    try {
      const { data } = await API.getAllProducts(postsPerPage, offset, search, order_by, createdAt);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
    }
  }
);

// Get the previous page of products
export const getPreviousProductPage = createAsyncThunk(
  "product/getPreviousProductPage",
  async (previous, { rejectWithValue }) => {
    try {
      const { data } = await API.getPreviousProductPage(previous);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
    }
  }
);

// Get the next page of products
export const getNextProductPage = createAsyncThunk("product/getNextProductPage", async (next, { rejectWithValue }) => {
  try {
    const { data } = await API.getNextProductPage(next);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
  }
});

// Get a specific page of products with pagination
export const getPageProducts = createAsyncThunk(
  "product/getPageProducts",
  async ({ number, postsPerPage }, { rejectWithValue }) => {
    try {
      const { data } = await API.getPageProducts(number, postsPerPage);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
    }
  }
);

// Create a new product
export const createProduct = createAsyncThunk("product/createProduct", async (data, { rejectWithValue }) => {
  try {
    const { data: responseData } = await API.createProduct(data);
    return responseData;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
  }
});

// Update an existing product
export const updateProduct = createAsyncThunk("product/updateProduct", async ({ id, values }, { rejectWithValue }) => {
  try {
    const { data } = await API.updateProduct(id, values);
    return data;
  } catch (error) {
    const errorMessage = error?.response?.data?.errors?.[0]?.error || error.message || "Something went wrong";
    return rejectWithValue(errorMessage);
  }
});

// Search products with pagination
export const handleProductSearch = createAsyncThunk(
  "product/handleProductSearch",
  async ({ search, postsPerPage }, { rejectWithValue }) => {
    try {
      const { data } = await API.handleProductSearch(search, postsPerPage);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
    }
  }
);
