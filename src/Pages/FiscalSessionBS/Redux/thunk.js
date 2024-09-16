import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

// get fiscalSessionBS
export const getFiscalSessionBS = createAsyncThunk(
  "fiscalSessionBS/getFiscalSessionBS",
  async (postsPerPage, { rejectWithValue }) => {
    try {
      const { data } = await API.getFiscalSessionBS(postsPerPage);
      return data;
    } catch (error) {
      return rejectWithValue("Failed to get fiscalSessionBSs.");
    }
  }
);

// get all fiscalSessionBSs
export const getAllFiscalSessionBS = createAsyncThunk(
  "fiscalSessionBS/getAllFiscalSessionBS",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.getAllFiscalSessionBS();
      return data;
    } catch (error) {
      return rejectWithValue("Failed to get fiscalSessionBSs.");
    }
  }
);

// get previous
export const getPrevious = createAsyncThunk(
  "fiscalSessionBS/getPrevious",
  async (previous, { rejectWithValue }) => {
    try {
      const { data } = await API.getPrevious(previous);
      return data;
    } catch (error) {
      return rejectWithValue("Failed to get fiscalSessionBSs.");
    }
  }
);
// get next
export const getNext = createAsyncThunk(
  "fiscalSessionBS/getNext",
  async (next, { rejectWithValue }) => {
    try {
      const { data } = await API.getNext(next);

      return data;
    } catch (error) {
      return rejectWithValue("Failed to get fiscalSessionBSs.");
    }
  }
);

// get particular page
export const getPageFiscalSessionBS = createAsyncThunk(
  "fiscalSessionBS/getPageFiscalSessionBS",
  async (data, { rejectWithValue }) => {
    const { number, postsPerPage } = data;
    try {
      const { data } = await API.getPageFiscalSessionBS(number, postsPerPage);
      return data;
    } catch (error) {
      rejectWithValue("Failed to get fiscalSessionBSs.");
    }
  }
);

// create fiscalSessionBS
export const createFiscalSessionBS = createAsyncThunk(
  "fiscalSessionBS/createFiscalSessionBS",
  async (data, { rejectWithValue, dispatch }) => {
    const { sessionFull, sessionShort } = data;
    try {
      const body = JSON.stringify({ sessionFull, sessionShort });
      const { data } = await API.createFiscalSessionBS(body);
      return data;
    } catch (error) {
      return rejectWithValue("Failed to create fiscalSessionBS.");
    }
  }
);

// handle search
export const handleSearch = createAsyncThunk(
  "fiscalSessionBS/handleSearch",
  async (data, { rejectWithValue }) => {
    const { search, postsPerPage } = data;
    try {
      const { data } = await API.handleSearch(search, postsPerPage);
      return data;
    } catch (error) {
      rejectWithValue("Failed to get fiscalSessionBS");
    }
  }
);
