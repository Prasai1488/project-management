import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

const sliceName = "SalesDetails";
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

export const getSalesDetails = createThunk(`${types[0]}`, API.getSalesDetails);
export const getAllSalesDetails = createThunk(`${types[1]}`, API.getAllSalesDetails);
export const createSalesDetails = createThunk(`${types[2]}`, (data) => API.createSalesDetails(JSON.stringify(data)));
export const updateSalesDetails = createThunk(`${types[3]}`, ({ id, values }) => API.updateSalesDetails(id, values));

export const getPageSalesDetails = createThunk(`${types[4]}`, ({ number, postsPerPage }) =>
  API.getPageSalesDetails(number, postsPerPage)
);

export const getPrevious = createThunk("getPrevious", API.getPrevious);
export const getNext = createThunk("getNext", API.getNext);

export const handleSearch = createThunk("handleSearch", ({ search, postsPerPage }) =>
  API.handleSearch(search, postsPerPage)
);
export const getSpecificSalesDetails = createThunk(`${types[0]}`, ({ saleId, postsPerPage, page }) =>
  API.getSpecificSalesDetails({ saleId, postsPerPage, page })
);
