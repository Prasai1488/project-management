import { createAsyncThunk } from "@reduxjs/toolkit";

import * as API from "./api";

// get orders
export const getOrders = createAsyncThunk("orders/getOrders", async (value, { rejectWithValue }) => {
  console.log(value, "value");
  const { postsPerPage, startDate, endDate } = value;
  try {
    const data = await API.getOrders(postsPerPage, startDate, endDate);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
export const handleSearch = createAsyncThunk("orders/handleSearch", async (value, { rejectWithValue }) => {
  const { search, postsPerPage, startDate, endDate } = value;

  try {
    const data = await API.handleSearch(search, postsPerPage, startDate, endDate);
    return data;
  } catch (error) {
    rejectWithValue(error?.response?.data?.errors[0]?.error);
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
export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (value, { rejectWithValue }) => {
    const { postsPerPage, page, status } = value;
    console.log(status, "status");

    try {
      const response = await API.getAllOrders(postsPerPage, page, status);
      const data = response.data;
      const ordersArray = data.data || [];
      return {
        results: ordersArray,
        count: data.pagination.count,
        currentPage: data.pagination.currentPage,
        totalPages: data.pagination.totalPages,
        next: data.pagination.next,
        previous: data.pagination.previous,
      };
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.errors[0]?.error || "An error occurred while fetching orders."
      );
    }
  }
);


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
export const getNext = createAsyncThunk(
  "orders/getNext",
  async ({postsPerPage, page}, { rejectWithValue }) => {
    try {
      const response = await API.getAllOrders(postsPerPage, page);
      const data = response.data;
      const ordersArray = data.data || [];
      return {
        results: ordersArray,
        count: data.pagination.count,
        next: data.pagination.next,
        previous: data.pagination.previous,
      };
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "An error occurred while fetching next order."
      );
    }
  }
);



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

export const updateOrderByStatus = createAsyncThunk(
  "orders/updateOrderByStatus",
  async (values, { rejectWithValue }) => {
    const { orderno, status } = values;
    try {
      const body = JSON.stringify({ status: status });

      const { data } = await API.updateOrderByStatus(orderno, body);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

export const getStatus = createAsyncThunk("orders/getStatus", async (status, { rejectWithValue }) => {
  try {
    const { data } = await API.getStatus(status);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
