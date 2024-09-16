import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

// get branch
export const getBranch = createAsyncThunk(
  "branch/getBranch",
  async (postsPerPage, { rejectWithValue }) => {
    try {
      const { data } = await API.getBranch(postsPerPage);
      return data;
    } catch (error) {
      return rejectWithValue("Failed to get fiscal year.");
    }
  }
);

// get all fiscal year
export const getAllBranch = createAsyncThunk(
  "branch/getAllBranch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.getAllBranch();
      return data;
    } catch (error) {
      return rejectWithValue("Failed to get fiscal year.");
    }
  }
);

// get previous
export const getPrevious = createAsyncThunk(
  "branch/getPrevious",
  async (previous, { rejectWithValue }) => {
    try {
      const { data } = await API.getPrevious(previous);
      return data;
    } catch (error) {
      return rejectWithValue("Failed to get fiscal year.");
    }
  }
);
// get next
export const getNext = createAsyncThunk(
  "branch/getNext",
  async (next, { rejectWithValue }) => {
    try {
      const { data } = await API.getNext(next);

      return data;
    } catch (error) {
      return rejectWithValue("Failed to get fiscal year.");
    }
  }
);

// get particular page
export const getPageBranch = createAsyncThunk(
  "branch/getPageBranch",
  async (data, { rejectWithValue }) => {
    const { number, postsPerPage } = data;
    try {
      const { data } = await API.getPageBranch(number, postsPerPage);
      return data;
    } catch (error) {
      rejectWithValue("Failed to get fiscal year.");
    }
  }
);

// create branch
export const createBranch = createAsyncThunk(
  "branch/createBranch",
  async (data, { rejectWithValue, dispatch }) => {
    const { currentPage, values } = data;
    const { name, code, email, contact, active } = values;
    try {
      const body = JSON.stringify({ name, code, email, contact, active });
      const { data } = await API.createBranch(body);
      dispatch(getPageBranch({ number: currentPage, postsPerPage: 10 }));
      return data;
    } catch (error) {
      return rejectWithValue("Failed to create branch.");
    }
  }
);
export const updateBranch = createAsyncThunk(
  "branch/updateBranch",
  async (data, { rejectWithValue, dispatch }) => {
    const { currentPage, values } = data;
    const { id, name, code, email, contact, active } = values;
    try {
      const body = JSON.stringify({ name, code, email, contact, active });
      const { data } = await API.updateBranch(id, body);
      dispatch(getPageBranch({ number: currentPage, postsPerPage: 10 }));
      return data;
    } catch (error) {
      return rejectWithValue("Failed to update branch.");
    }
  }
);

// handle search
export const handleSearch = createAsyncThunk(
  "branch/handleSearch",
  async (data, { rejectWithValue }) => {
    const { search, postsPerPage } = data;
    try {
      const { data } = await API.handleSearch(search, postsPerPage);
      return data;
    } catch (error) {
      rejectWithValue("Failed to get branch");
    }
  }
);
