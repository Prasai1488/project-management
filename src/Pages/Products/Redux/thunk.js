

import { createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import * as API from "./api";

// get product
export const getProduct = createAsyncThunk(
  "product/getProduct",
  async ({ postsPerPage, page }, { rejectWithValue }) => {
    try {
      const response = await API.getProduct(postsPerPage, page);
      const data = response.data;
      console.log("getProduct response data:", data);
      const productsArray = data.data || [];
      return {
        results: productsArray,
        count: data.pagination.count,
        currentPage: data.pagination.currentPage,
        totalPages: data.pagination.totalPages,
        next: data.pagination.next,
        previous: data.pagination.previous,
      };
    } catch (error) {
      console.error("Error fetching products:", error);
      return rejectWithValue(error?.response?.data?.message || "An error occurred while fetching products.");
    }
  }
);

// get all products
export const getAllProduct = createAsyncThunk("product/getAllProduct", async (_, { rejectWithValue }) => {
  try {
    const response = await API.getAllProduct();
    const data = response.data;

    const productsArray = data.data || [];
    const filteredData = productsArray; 

    return {
      results: filteredData,
      count: data.pagination.count,
      next: data.pagination.next,
      previous: data.pagination.previous,
    };
  } catch (error) {
    console.error("Error fetching all products:", error);
    return rejectWithValue(error?.response?.data?.message || "An error occurred while fetching all products.");
  }
});

// get previous
export const getPrevious = createAsyncThunk("product/getPrevious", async (previous, { rejectWithValue }) => {
  try {
    const { data } = await API.getPrevious(previous);
    const filteredData = data.results.filter((user) => user.isSuperuser === false);
    return { ...data, results: filteredData, count: filteredData?.length };
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
// get next
export const getNext = createAsyncThunk("product/getNext", async ({ postsPerPage, page }, { rejectWithValue }) => {
  try {
    const response = await API.getProduct(postsPerPage, page);
    const data = response.data;
    const productsArray = data.data || [];
    return {
      results: productsArray,
      count: data.pagination.count,
      next: data.pagination.next,
      previous: data.pagination.previous,
    };
  } catch (error) {
    console.error("Error fetching next products:", error);
    return rejectWithValue(error?.response?.data?.message || "An error occurred while fetching next products.");
  }
});

// get particular page
export const getPageProduct = createAsyncThunk("product/getPageProduct", async (data, { rejectWithValue }) => {
  const { number, postsPerPage } = data;
  try {
    const { data } = await API.getPageProduct(number, postsPerPage);
    const filteredData = data.results.filter((user) => user.isSuperuser === false);
    return { ...data, results: filteredData, count: filteredData?.length };
  } catch (error) {
    rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// get current product
export const getCurrentProduct = createAsyncThunk("product/getCurrentProduct", async (token, { rejectWithValue }) => {
  try {
    const decoded = token && jwt_decode(token);
    const { data } = await API.getCurrentProduct(decoded);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// create product
export const createProduct = createAsyncThunk("product/createProduct", async (formData, { rejectWithValue }) => {
  try {
    const response = await API.createProduct(formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data || "An error occurred while creating the product.");
  }
});

// update product

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await API.updateProduct(id, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || "An error occurred while updating the product.");
    }
  }
);

// get specific product
export const getSpecificProduct = createAsyncThunk(
  "product/getSpecificProduct",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await API.getSpecificProduct(id);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// delete product
export const deleteProduct = createAsyncThunk("product/deleteProduct", async (id, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await API.deleteProduct(id);
    dispatch(getProduct(10));
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// handle search
export const handleSearch = createAsyncThunk(
  "product/handleSearch",
  async ({ search, postsPerPage, page }, { rejectWithValue }) => {
    try {
      const response = await API.handleSearch(search, postsPerPage, page);
      const data = response.data;

      const productsArray = data.data || [];
      return {
        results: productsArray,
        count: data.pagination.count,
        currentPage: data.pagination.currentPage,
        totalPages: data.pagination.totalPages,
        next: data.pagination.next,
        previous: data.pagination.previous,
      };
    } catch (error) {
      console.error("Error searching products:", error);
      return rejectWithValue(error?.response?.data?.message || "An error occurred while searching products.");
    }
  }
);
// delete photo
export const deletePhoto = createAsyncThunk("product/deletePhoto", async (id, { rejectWithValue }) => {
  try {
    const body = JSON.stringify({ photo: "" });
    const { data } = await API.deletePhoto(id, body);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
