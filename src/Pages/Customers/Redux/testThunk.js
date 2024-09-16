import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

const sliceName = "Customers";
const types = [
  `get${sliceName}`,
  `getAll${sliceName}`,
  `create${sliceName}`,
  `update${sliceName}`,
  `getPage${sliceName}`,
];

const createThunk = (type, apiCall) =>
  createAsyncThunk(`customer/${type}`, async (arg, { rejectWithValue }) => {
    try {
      const { data } = await apiCall(arg);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  });

export const getCustomers = createThunk(`${types[0]}`, API.getCustomers);
export const getAllCustomers = createThunk(`${types[1]}`, API.getAllCustomers);
export const createCustomers = createThunk(`${types[2]}`, (data) => API.createCustomers(JSON.stringify(data)));
export const updateCustomers = createThunk(`${types[3]}`, ({ id, values }) => API.updateCustomers(id, values));

export const getPageCustomers = createThunk(`${types[4]}`, ({ number, postsPerPage }) =>
  API.getPageCustomers(number, postsPerPage)
);

export const getPrevious = createThunk("getPrevious", API.getPrevious);
export const getNext = createThunk("getNext", API.getNext);

export const handleSearch = createThunk("handleSearch", ({ search, postsPerPage }) =>
  API.handleSearch(search, postsPerPage)
);
