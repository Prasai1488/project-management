import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

const sliceName = "Client";
const types = [
  `get${sliceName}`,
  `getAll${sliceName}`,
  `create${sliceName}`,
  `update${sliceName}`,
  `getPage${sliceName}`,
];

const createThunk = (type, apiCall) =>
  createAsyncThunk(`client/${type}`, async (arg, { rejectWithValue }) => {
    try {
      const { data } = await apiCall(arg);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  });

export const getClients = createThunk(`${types[0]}`, API.getClients);
export const getAllClients = createThunk(`${types[1]}`, ({postsPerPage,page})=>API.getAllClients({postsPerPage,page}));
export const createClients = createThunk(`${types[2]}`, (data) => API.createClients(JSON.stringify(data)));
export const updateClients = createThunk(`${types[3]}`, ({ id, values }) => API.updateClients(id, values));

export const getPageClients = createThunk(`${types[4]}`, ({ number, postsPerPage }) =>
  API.getPageClients(number, postsPerPage)
);

export const getPrevious = createThunk("getPrevious", API.getPrevious);
export const getNext = createThunk("getNext", API.getNext);

export const handleSearch = createThunk("handleSearch", ({ search, postsPerPage }) =>
  API.handleSearch(search, postsPerPage)
);
