import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

// get fiscalYear
export const getFiscalYear = createAsyncThunk("fiscalYear/getFiscalYear", async (postsPerPage, { rejectWithValue }) => {
  try {
    const { data } = await API.getFiscalYear(postsPerPage);
    return data;
  } catch (error) {
    return rejectWithValue("Failed to get fiscal year.");
  }
});

// get all fiscal year
export const getAllFiscalYear = createAsyncThunk("fiscalYear/getAllFiscalYear", async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.getAllFiscalYear();
    return data;
  } catch (error) {
    return rejectWithValue("Failed to get fiscal year.");
  }
});

// get previous
export const getPrevious = createAsyncThunk("fiscalYear/getPrevious", async (previous, { rejectWithValue }) => {
  try {
    const { data } = await API.getPrevious(previous);
    return data;
  } catch (error) {
    return rejectWithValue("Failed to get fiscal year.");
  }
});
// get next
export const getNext = createAsyncThunk("fiscalYear/getNext", async (next, { rejectWithValue }) => {
  try {
    const { data } = await API.getNext(next);

    return data;
  } catch (error) {
    return rejectWithValue("Failed to get fiscal year.");
  }
});

// get particular page
export const getPageFiscalYear = createAsyncThunk("fiscalYear/getPageFiscalYear", async (data, { rejectWithValue }) => {
  const { number, postsPerPage } = data;
  try {
    const { data } = await API.getPageFiscalYear(number, postsPerPage);
    return data;
  } catch (error) {
    rejectWithValue("Failed to get fiscal year.");
  }
});

// create fiscalYear
export const createFiscalYear = createAsyncThunk(
  "fiscalYear/createFiscalYear",
  async (data, { rejectWithValue, dispatch }) => {
    const { currentPage, values } = data;
    const { sessionFull, sessionShort } = values;
    try {
      const body = JSON.stringify({ sessionFull, sessionShort });
      const { data } = await API.createFiscalYear(body);
      dispatch(getPageFiscalYear({ number: currentPage, postsPerPage: 10 }));
      return data;
    } catch (error) {
      return rejectWithValue("Failed to create fiscalYear.");
    }
  }
);

// handle search
export const handleSearch = createAsyncThunk("fiscalYear/handleSearch", async (data, { rejectWithValue }) => {
  const { search, postsPerPage } = data;
  try {
    const { data } = await API.handleSearch(search, postsPerPage);
    return data;
  } catch (error) {
    rejectWithValue("Failed to get fiscalYear");
  }
});
