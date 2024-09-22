import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

// get country
export const getCountry = createAsyncThunk("country/getCountry", async (postsPerPage, { rejectWithValue }) => {
  try {
    const { data } = await API.getCountry(postsPerPage);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// get all countries
export const getAllCountry = createAsyncThunk("country/getAllCountry", async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.getAllCountry();
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// get previous
export const getPrevious = createAsyncThunk("country/getPrevious", async (previous, { rejectWithValue }) => {
  try {
    const { data } = await API.getPrevious(previous);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
// get next
export const getNext = createAsyncThunk("country/getNext", async (next, { rejectWithValue }) => {
  try {
    const { data } = await API.getNext(next);

    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// get particular page
export const getPageCountry = createAsyncThunk("country/getPageCountry", async (data, { rejectWithValue }) => {
  const { number, postsPerPage } = data;
  try {
    const { data } = await API.getPageCountry(number, postsPerPage);
    return data;
  } catch (error) {
    rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// create country
export const createCountry = createAsyncThunk("country/createCountry", async (data, { rejectWithValue }) => {
  const { name, countryCode, phoneCode, flagImage, active } = data;
  try {
    const body = new FormData();
    body.append("name", name);
    body.append("countryCode", countryCode);
    body.append("phoneCode", phoneCode);
    body.append("active", active);
    if (flagImage) {
      body.append("flagImage", flagImage);
    }

    const { data } = await API.createCountry(body);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
export const updateCountry = createAsyncThunk("country/updateCountry", async (data, { rejectWithValue }) => {
  const { id, values } = data;
  const { name, countryCode, phoneCode, flagImage, active } = values;
  try {
    const body = new FormData();
    body.append("name", name);
    body.append("countryCode", countryCode);
    body.append("phoneCode", phoneCode);
    body.append("active", active);
    if (flagImage) {
      body.append("flagImage", flagImage);
    }
    const { data } = await API.updateCountry(id, body);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// handle search
export const handleSearch = createAsyncThunk("country/handleSearch", async (data, { rejectWithValue }) => {
  const { search, postsPerPage } = data;
  try {
    const { data } = await API.handleSearch(search, postsPerPage);
    return data;
  } catch (error) {
    rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// delete photo
export const deletePhoto = createAsyncThunk("country/deletePhoto", async (id, { rejectWithValue }) => {
  try {
    const body = JSON.stringify({ photo: "" });
    const { data } = await API.deletePhoto(id, body);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
