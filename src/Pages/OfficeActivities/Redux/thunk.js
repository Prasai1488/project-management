import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

// get officeActivities
export const getOfficeActivities = createAsyncThunk(
  "officeActivities/getOfficeActivities",
  async (postsPerPage, { rejectWithValue }) => {
    try {
      const { data } = await API.getOfficeActivities(postsPerPage);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// get all officeActivities
export const getAllOfficeActivities = createAsyncThunk(
  "officeActivities/getAllOfficeActivities",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.getAllOfficeActivities();
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// get previous
export const getPrevious = createAsyncThunk("officeActivities/getPrevious", async (previous, { rejectWithValue }) => {
  try {
    const { data } = await API.getPrevious(previous);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
// get next
export const getNext = createAsyncThunk("officeActivities/getNext", async (next, { rejectWithValue }) => {
  try {
    const { data } = await API.getNext(next);

    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// get particular page
export const getPageOfficeActivities = createAsyncThunk(
  "officeActivities/getPageOfficeActivities",
  async (data, { rejectWithValue }) => {
    const { number, postsPerPage } = data;
    try {
      const { data } = await API.getPageOfficeActivities(number, postsPerPage);
      return data;
    } catch (error) {
      rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// create officeActivities
export const createOfficeActivities = createAsyncThunk(
  "officeActivities/createOfficeActivities",
  async (data, { rejectWithValue }) => {
    const { title, sector, description, documentName, document } = data;

    const issuseData = new FormData();
    issuseData.append("title", title);
    issuseData.append("sector", sector);
    issuseData.append("description", description);
    issuseData.append("documentName", documentName);
    issuseData.append("file", document);

    try {
      const { data } = await API.createOfficeActivities(issuseData);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);
export const updateOfficeActivities = createAsyncThunk(
  "officeActivities/updateOfficeActivities",
  async (data, { rejectWithValue }) => {
    const { id, values } = data;
    const { title, sector, description, documentName, document } = values;

    const issuseData = new FormData();
    issuseData.append("title", title);
    issuseData.append("sector", sector);
    issuseData.append("description", description);
    issuseData.append("documentName", documentName);
    issuseData.append("file", document);

    try {
      const { data } = await API.updateOfficeActivities(id, issuseData);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// handle search
export const handleSearch = createAsyncThunk("officeActivities/handleSearch", async (data, { rejectWithValue }) => {
  const { search, postsPerPage } = data;
  try {
    const { data } = await API.handleSearch(search, postsPerPage);
    return data;
  } catch (error) {
    rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
