import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

const sliceName = "Issue";
const types = [
  `get${sliceName}`,
  `getAll${sliceName}`,
  `create${sliceName}`,
  `update${sliceName}`,
  `getPage${sliceName}`,
];

const createThunk = (type, apiCall) =>
  createAsyncThunk(`issue/${type}`, async (arg, { rejectWithValue }) => {
    try {
      const { data } = await apiCall(arg);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  });

export const getIssues = createThunk(`${types[0]}`, API.getIssues);
export const getAllIssues = createThunk(`${types[1]}`, ({ postsPerPage, page }) =>
  API.getAllIssues({ postsPerPage, page })
);
export const createIssues = createThunk(`${types[2]}`, (data) => API.createIssues(JSON.stringify(data)));
export const updateIssues = createThunk(`${types[3]}`, ({ id, values }) => API.updateIssues(id, values));

export const getPageIssues = createThunk(`${types[4]}`, ({ number, postsPerPage }) =>
  API.getPageIssues(number, postsPerPage)
);

export const getPrevious = createThunk("getPrevious", API.getPrevious);
export const getNext = createThunk("getNext", API.getNext);

export const handleSearch = createThunk("handleSearch", ({ search, postsPerPage }) =>
  API.handleSearch(search, postsPerPage)
);
