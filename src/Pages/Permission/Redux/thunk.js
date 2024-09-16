import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

const sliceName = "Permission";
const types = [
  `get${sliceName}`,
  `getAll${sliceName}`,
  `create${sliceName}`,
  `update${sliceName}`,
  `getPage${sliceName}`,
];

const createThunk = (type, apiCall) =>
  createAsyncThunk(`permission/${type}`, async (arg, { rejectWithValue }) => {
    try {
      const { data } = await apiCall(arg);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  });

export const getPermissions = createThunk(`${types[0]}`, API.getPermissions);
export const getAllPermissions = createThunk(`${types[1]}`, ({ limit, permissionCategory }) =>
  API.getAllPermissions(permissionCategory)
);
export const createPermissions = createThunk(`${types[2]}`, (data) => API.createPermissions(JSON.stringify(data)));
export const updatePermissions = createThunk(`${types[3]}`, ({ id, values }) => API.updatePermissions(id, values));

export const getPagePermissions = createThunk(`${types[4]}`, ({ number, postsPerPage }) =>
  API.getPagePermissions(number, postsPerPage)
);

export const getPrevious = createThunk("getPrevious", API.getPrevious);
export const getNext = createThunk("getNext", API.getNext);

export const handleSearch = createThunk("handleSearch", ({ search, postsPerPage }) =>
  API.handleSearch(search, postsPerPage)
);
