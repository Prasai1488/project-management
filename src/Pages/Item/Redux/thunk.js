import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

const sliceName = "Item";
const types = [
  `get${sliceName}`,
  `getAll${sliceName}`,
  `create${sliceName}`,
  `update${sliceName}`,
  `getPage${sliceName}`,
];

const createThunk = (type, apiCall) =>
  createAsyncThunk(`item/${type}`, async (arg, { rejectWithValue }) => {
    try {
      const { data } = await apiCall(arg);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  });

export const getItems = createThunk(`${types[0]}`, API.getItems);
export const getAllItems = createThunk(`${types[1]}`, ({ postsPerPage, page, itemType, maxPrice, minPrice }) => {
  return API.getAllItems({ postsPerPage, page, itemType, maxPrice, minPrice });
});
export const createItems = createThunk(`${types[2]}`, (data) => API.createItems(JSON.stringify(data)));
export const updateItems = createThunk(`${types[3]}`, ({ id, values }) => API.updateItems(id, values));

export const getPageItems = createThunk(`${types[4]}`, ({ number, postsPerPage }) =>
  API.getPageItems(number, postsPerPage)
);

export const getPrevious = createThunk("getPrevious", API.getPrevious);
export const getNext = createThunk("getNext", (next) => API.getNext(next));

export const handleSearch = createThunk("handleSearch", ({ search, postsPerPage }) =>
  API.handleSearch(search, postsPerPage)
);
