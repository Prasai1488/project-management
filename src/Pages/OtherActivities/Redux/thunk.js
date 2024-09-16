import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

// get otherActivities
export const getOtherActivities = createAsyncThunk(
  "otherActivities/getOtherActivities",
  async (postsPerPage, { rejectWithValue }) => {
    try {
      const { data } = await API.getOtherActivities(postsPerPage);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// get all otherActivities
export const getAllOtherActivities = createAsyncThunk(
  "otherActivities/getAllOtherActivities",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.getAllOtherActivities();
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// get previous
export const getPrevious = createAsyncThunk("otherActivities/getPrevious", async (previous, { rejectWithValue }) => {
  try {
    const { data } = await API.getPrevious(previous);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
// get next
export const getNext = createAsyncThunk("otherActivities/getNext", async (next, { rejectWithValue }) => {
  try {
    const { data } = await API.getNext(next);

    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// get particular page
export const getPageOtherActivities = createAsyncThunk(
  "otherActivities/getPageOtherActivities",
  async (data, { rejectWithValue }) => {
    const { number, postsPerPage } = data;
    try {
      const { data } = await API.getPageOtherActivities(number, postsPerPage);
      return data;
    } catch (error) {
      rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// create otherActivities
export const createOtherActivities = createAsyncThunk(
  "otherActivities/createOtherActivities",
  async (data, { rejectWithValue }) => {
    const { title, sector, description, documentName, document } = data;

    const issuseData = new FormData();
    issuseData.append("title", title);
    issuseData.append("sector", sector);
    issuseData.append("description", description);
    issuseData.append("documentName", documentName);
    issuseData.append("file", document);

    try {
      const { data } = await API.createOtherActivities(issuseData);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);
export const updateOtherActivities = createAsyncThunk(
  "otherActivities/updateOtherActivities",
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
      const { data } = await API.updateOtherActivities(id, issuseData);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// handle search
export const handleSearch = createAsyncThunk("otherActivities/handleSearch", async (data, { rejectWithValue }) => {
  const { search, postsPerPage } = data;
  try {
    const { data } = await API.handleSearch(search, postsPerPage);
    return data;
  } catch (error) {
    rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
