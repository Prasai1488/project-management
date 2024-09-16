import { createAsyncThunk } from "@reduxjs/toolkit";

import * as API from "./api";

// get sale
export const getSales = createAsyncThunk("sale/getSales", async (postsPerPage, { rejectWithValue }) => {
  try {
    const { data } = await API.getSales(postsPerPage);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
// get specificSale
export const getSpecificSale = createAsyncThunk("sale/getSpecificSale", async (id, { rejectWithValue }) => {
  try {
    const { data } = await API.getSpecificSale(id);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
// get all sale
export const getAllSales = createAsyncThunk(
  "sale/getAllSales",
  async ({ postsPerPage, page, startDate, endDate }, { rejectWithValue }) => {
    try {
      const { data } = await API.getAllSales({ postsPerPage, page, startDate, endDate });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// get previous
export const getPrevious = createAsyncThunk("sale/getPrevious", async (previous, { rejectWithValue }) => {
  try {
    const { data } = await API.getPrevious(previous);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
// get next
export const getNext = createAsyncThunk("sale/getNext", async (next, { rejectWithValue }) => {
  try {
    const { data } = await API.getNext(next);

    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// get particular page
export const getPageSales = createAsyncThunk("sale/getPageSales", async (data, { rejectWithValue }) => {
  const { number, postsPerPage } = data;
  try {
    const { data } = await API.getPageSales(number, postsPerPage);
    return data;
  } catch (error) {
    rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// create sale
export const createSales = createAsyncThunk("sale/createSales", async (data, { rejectWithValue }) => {
  const body = JSON.stringify({ ...data });
  try {
    const { data } = await API.createSales(body);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
export const updateSales = createAsyncThunk("sale/updateSales", async (data, { rejectWithValue }) => {
  const { id, values } = data;
  try {
    const { data } = await API.updateSales(id, values);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// handle search
export const handleSearch = createAsyncThunk("sale/handleSearch", async (data, { rejectWithValue }) => {
  const { search, postsPerPage } = data;
  try {
    const { data } = await API.handleSearch(search, postsPerPage);
    return data;
  } catch (error) {
    rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
