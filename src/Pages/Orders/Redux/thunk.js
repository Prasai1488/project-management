import { createAsyncThunk } from "@reduxjs/toolkit";

import * as API from "./api";

// get orders
export const getOrders = createAsyncThunk("orders/getOrders", async (postsPerPage, { rejectWithValue }) => {
  try {
    const { data } = await API.getOrders(postsPerPage);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
// get SpecificOrders

// export const getSpecificOrders = createAsyncThunk("orders/getSpecificOrders", async (id, { rejectWithValue }) => {
//   try {
//     const { data } = await API.getSpecificOrders(id);
//     return data;
//   } catch (error) {
//     return rejectWithValue(error?.response?.data?.errors[0]?.error);
//   }
// });
export const getSpecificOrders = createAsyncThunk("orders/getSpecificOrders", async (id, { rejectWithValue }) => {
  try {
    const response = await API.getSpecificOrders(id);
    return response.data;
  } catch (error) {
    console.error("Error fetching order details:", error?.response?.data || error.message);
    return rejectWithValue(error?.response?.data?.message || error.message || "Error fetching order");
  }
});

// get all orders
export const getAllOrders = createAsyncThunk("orders/getAllOrders", async ({ rejectWithValue }) => {
  try {
    const { data } = await API.getAllOrders();
    console.log("Fetched orders data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// get previous
export const getPrevious = createAsyncThunk("orders/getPrevious", async (previous, { rejectWithValue }) => {
  try {
    const { data } = await API.getPrevious(previous);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
// get next
export const getNext = createAsyncThunk("orders/getNext", async (next, { rejectWithValue }) => {
  try {
    const { data } = await API.getNext(next);

    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// get particular page
export const getPageOrders = createAsyncThunk("orders/getPagePurchaseInvoice", async (data, { rejectWithValue }) => {
  const { number, postsPerPage } = data;
  try {
    const { data } = await API.getPageOrders(number, postsPerPage);
    return data;
  } catch (error) {
    rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// create orders
export const createOrders = createAsyncThunk("orders/createOrders", async (data, { rejectWithValue }) => {
  const body = JSON.stringify({ ...data });

  try {
    const { data } = await API.createOrders(body);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
export const updateOrders = createAsyncThunk("orders/updateOrders", async (data, { rejectWithValue }) => {
  const { id, values } = data;
  try {
    const { data } = await API.updateOrders(id, values);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// handle search
export const handleSearch = createAsyncThunk("orders/handleSearch", async (data, { rejectWithValue }) => {
  const { search, postsPerPage } = data;
  try {
    const { data } = await API.handleSearch(search, postsPerPage);
    return data;
  } catch (error) {
    rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

export const getStatus = createAsyncThunk("orders/getStatus", async (status, { rejectWithValue }) => {
  try {
    const { data } = await API.getStatus(status);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
