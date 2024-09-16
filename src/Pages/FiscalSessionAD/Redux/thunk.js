import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

// get fiscalSessionAD
export const getFiscalSessionAD = createAsyncThunk(
  "fiscalSessionAD/getFiscalSessionAD",
  async (postsPerPage, { rejectWithValue }) => {
    try {
      const { data } = await API.getFiscalSessionAD(postsPerPage);
      return data;
    } catch (error) {
      return rejectWithValue("Failed to get fiscalSessionADs.");
    }
  }
);

// get all fiscalSessionADs
export const getAllFiscalSessionAD = createAsyncThunk(
  "fiscalSessionAD/getAllFiscalSessionAD",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.getAllFiscalSessionAD();
      return data;
    } catch (error) {
      return rejectWithValue("Failed to get fiscalSessionADs.");
    }
  }
);

// get previous
export const getPrevious = createAsyncThunk(
  "fiscalSessionAD/getPrevious",
  async (previous, { rejectWithValue }) => {
    try {
      const { data } = await API.getPrevious(previous);
      return data;
    } catch (error) {
      return rejectWithValue("Failed to get fiscalSessionADs.");
    }
  }
);
// get next
export const getNext = createAsyncThunk(
  "fiscalSessionAD/getNext",
  async (next, { rejectWithValue }) => {
    try {
      const { data } = await API.getNext(next);

      return data;
    } catch (error) {
      return rejectWithValue("Failed to get fiscalSessionADs.");
    }
  }
);

// get particular page
export const getPageFiscalSessionAD = createAsyncThunk(
  "fiscalSessionAD/getPageFiscalSessionAD",
  async (data, { rejectWithValue }) => {
    const { number, postsPerPage } = data;
    try {
      const { data } = await API.getPageFiscalSessionAD(number, postsPerPage);
      return data;
    } catch (error) {
      rejectWithValue("Failed to get fiscalSessionADs.");
    }
  }
);

// create fiscalSessionAD
export const createFiscalSessionAD = createAsyncThunk(
  "fiscalSessionAD/createFiscalSessionAD",
  async (data, { rejectWithValue, dispatch }) => {
    const { sessionFull, sessionShort } = data;
    try {
      const body = JSON.stringify({ sessionFull, sessionShort });
      const { data } = await API.createFiscalSessionAD(body);
      return data;
    } catch (error) {
      return rejectWithValue("Failed to create fiscalSessionAD.");
    }
  }
);

// handle search
export const handleSearch = createAsyncThunk(
  "fiscalSessionAD/handleSearch",
  async (data, { rejectWithValue }) => {
    const { search, postsPerPage } = data;
    try {
      const { data } = await API.handleSearch(search, postsPerPage);
      return data;
    } catch (error) {
      rejectWithValue("Failed to get fiscalSessionAD");
    }
  }
);
