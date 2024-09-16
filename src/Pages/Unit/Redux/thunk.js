import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

const sliceName = "Unit";
const types = [
  `get${sliceName}`,
  `getAll${sliceName}`,
  `create${sliceName}`,
  `update${sliceName}`,
  `getPage${sliceName}`,
];

const createThunk = (type, apiCall) =>
  createAsyncThunk(`unit/${type}`, async (arg, { rejectWithValue }) => {
    try {
      const { data } = await apiCall(arg);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  });

export const getUnits = createThunk(`${types[0]}`, API.getUnits);
export const getAllUnits = createThunk(`${types[1]}`, ({ postsPerPage, page }) =>
  API.getAllUnits({ postsPerPage, page })
);
export const createUnits = createThunk(`${types[2]}`, (data) => API.createUnits(JSON.stringify(data)));
export const updateUnits = createThunk(`${types[3]}`, ({ id, values }) =>
  API.updateUnits(id, values).then((res) => res.data)
);

export const getPageUnits = createThunk(`${types[4]}`, ({ number, postsPerPage }) =>
  API.getPageUnits(number, postsPerPage)
);

export const getPrevious = createThunk("getPrevious", API.getPrevious);
export const getNext = createThunk("getNext", API.getNext);

export const handleSearch = createThunk("handleSearch", ({ search, postsPerPage }) =>
  API.handleSearch(search, postsPerPage)
);
