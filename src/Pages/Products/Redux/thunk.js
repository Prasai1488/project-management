import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

// get products
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.getAllProducts(); // Correct invocation
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors?.[0]?.error || 'Something went wrong'); // Added fallback error message
    }
  }
);
