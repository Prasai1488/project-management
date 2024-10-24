import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

// get paginated products
export const getProducts = createAsyncThunk("products/getProducts", async ({ page = 1 }, { rejectWithValue }) => {
  try {
    const { products, pagination } = await API.getPaginatedProducts(page);

    // Return the products and pagination information
    return { products, pagination };
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors?.[0]?.error || "Something went wrong"); // Added fallback error message
  }
});

// create product
export const createProduct = createAsyncThunk("products/createProduct", async (productData, { rejectWithValue }) => {
  try {
    const { data } = await API.createProduct(productData); // Use the API.createProduct function from api.js
    return data; // Return the newly created product data
  } catch (error) {
    // Handle error by returning a detailed error message or a fallback error message
    return rejectWithValue(error?.response?.data?.errors || "Something went wrong");
  }
});

// update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct", // Unique action type
  async ({ productId, productData }, { rejectWithValue }) => {
    try {
      const { data } = await API.updateProduct(productId, productData); // Call the API's updateProduct function
      return data; // Return the updated product data
    } catch (error) {
      // Handle error by returning a detailed error message or a fallback error message
      return rejectWithValue(error?.response?.data?.errors || "Something went wrong");
    }
  }
);
