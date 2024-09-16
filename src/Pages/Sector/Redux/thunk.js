import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

// get members
export const getSectors = createAsyncThunk("members/getSectors", async (postsPerPage, { rejectWithValue }) => {
  try {
    const { data } = await API.getSectors(postsPerPage);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// get all members
export const getAllSectors = createAsyncThunk("members/getAllSectors", async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.getAllSectors();
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// get previous
export const getPrevious = createAsyncThunk("members/getPrevious", async (previous, { rejectWithValue }) => {
  try {
    const { data } = await API.getPrevious(previous);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
// get next
export const getNext = createAsyncThunk("members/getNext", async (next, { rejectWithValue }) => {
  try {
    const { data } = await API.getNext(next);

    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// get particular page
export const getPageSectors = createAsyncThunk("members/getPageSectors", async (data, { rejectWithValue }) => {
  const { number, postsPerPage } = data;
  try {
    const { data } = await API.getPageSectors(number, postsPerPage);
    return data;
  } catch (error) {
    rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// create members
export const createSectors = createAsyncThunk("members/createSectors", async (data, { rejectWithValue }) => {
  function createFormData(fmData) {
    const formData = new FormData();
  
    function appendFormData(data, parentKey) {
      if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
        Object.keys(data).forEach(key => {
          appendFormData(data[key], parentKey ? `${parentKey}[${key}]` : key);
        });
      } else {
        formData.append(parentKey, data);
      }
    }
  
    appendFormData(fmData);
    return formData;
  }
  
  const memberData = createFormData(data);
  try {
    const { data } = await API.createSectors(memberData);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
export const updateSectors = createAsyncThunk("members/updateSectors", async (data, { rejectWithValue }) => {
  const { id, values } = data;
  const { title, sector, description, documentName, document } = values;

  const issuseData = new FormData();
  issuseData.append("title", title);
  issuseData.append("sector", sector);
  issuseData.append("description", description);
  issuseData.append("documentName", documentName);
  issuseData.append("user", document);

  try {
    const { data } = await API.updateSectors(id, issuseData);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// handle search
export const handleSearch = createAsyncThunk("members/handleSearch", async (data, { rejectWithValue }) => {
  const { search, postsPerPage } = data;
  try {
    const { data } = await API.handleSearch(search, postsPerPage);
    return data;
  } catch (error) {
    rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
