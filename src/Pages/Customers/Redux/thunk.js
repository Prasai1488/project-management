import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

// get customer
export const getCustomers = createAsyncThunk("customer/getCustomers", async (postsPerPage, { rejectWithValue }) => {
  try {
    const { data } = await API.getCustomers(postsPerPage);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// get all customer
export const getAllCustomers = createAsyncThunk("customer/getAllCustomers", async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.getAllCustomers();
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// get previous
export const getPrevious = createAsyncThunk("customer/getPrevious", async (previous, { rejectWithValue }) => {
  try {
    const { data } = await API.getPrevious(previous);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
// get next
export const getNext = createAsyncThunk("customer/getNext", async (next, { rejectWithValue }) => {
  try {
    const { data } = await API.getNext(next);

    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// get particular page
export const getPageCustomers = createAsyncThunk("customer/getPageCustomers", async (data, { rejectWithValue }) => {
  const { number, postsPerPage } = data;
  try {
    const { data } = await API.getPageCustomers(number, postsPerPage);
    return data;
  } catch (error) {
    rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// create customer
export const createCustomers = createAsyncThunk("customer/createCustomers", async (data, { rejectWithValue }) => {
  const body = JSON.stringify(data);
  try {
    const { data } = await API.createCustomers(body);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
export const updateCustomers = createAsyncThunk("customer/updateCustomers", async (data, { rejectWithValue }) => {
  const { id, values } = data;
  try {
    const { data } = await API.updateCustomers(id, values);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// handle search
export const handleSearch = createAsyncThunk("customer/handleSearch", async (data, { rejectWithValue }) => {
  const { search, postsPerPage } = data;
  try {
    const { data } = await API.handleSearch(search, postsPerPage);
    return data;
  } catch (error) {
    rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
