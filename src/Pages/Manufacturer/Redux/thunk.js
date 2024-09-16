import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

const sliceName = "Manufacturer";
const types = [
  `get${sliceName}`,
  `getAll${sliceName}`,
  `create${sliceName}`,
  `update${sliceName}`,
  `getPage${sliceName}`,
];

const createThunk = (type, apiCall) =>
  createAsyncThunk(`manufacturer/${type}`, async (arg, { rejectWithValue }) => {
    try {
      const { data } = await apiCall(arg);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  });

export const getManufacturers = createThunk(`${types[0]}`, API.getManufacturers);
export const getAllManufacturers = createThunk(`${types[1]}`, ({ postsPerPage, page }) =>
  API.getAllManufacturers({ postsPerPage, page })
);
export const createManufacturers = createThunk(`${types[2]}`, (data) => API.createManufacturers(JSON.stringify(data)));
export const updateManufacturers = createThunk(`${types[3]}`, ({ id, values }) => API.updateManufacturers(id, values));

export const getPageManufacturers = createThunk(`${types[4]}`, ({ number, postsPerPage }) =>
  API.getPageManufacturers(number, postsPerPage)
);

export const getPrevious = createThunk("getPrevious", API.getPrevious);
export const getNext = createThunk("getNext", API.getNext);

export const handleSearch = createThunk("handleSearch", ({ search, postsPerPage }) =>
  API.handleSearch(search, postsPerPage)
);
