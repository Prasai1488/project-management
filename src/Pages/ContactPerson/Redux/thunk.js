import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

const sliceName = "ContactPerson";
const types = [
  `get${sliceName}`,
  `getAll${sliceName}`,
  `create${sliceName}`,
  `update${sliceName}`,
  `getPage${sliceName}`,
];

const createThunk = (type, apiCall) =>
  createAsyncThunk(`contactperson/${type}`, async (arg, { rejectWithValue }) => {
    try {
      const { data } = await apiCall(arg);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  });

export const getContactPersons = createThunk(`${types[0]}`, API.getContactPersons);
export const getAllContactPersons = createThunk(`${types[1]}`, ({ postsPerPage, page }) =>
  API.getAllContactPersons({ postsPerPage, page })
);
export const createContactPersons = createThunk(`${types[2]}`, (data) =>
  API.createContactPersons(JSON.stringify(data))
);
export const updateContactPersons = createThunk(`${types[3]}`, ({ id, values }) =>
  API.updateContactPersons(id, values)
);

export const getPageContactPersons = createThunk(`${types[4]}`, ({ number, postsPerPage }) =>
  API.getPageContactPersons(number, postsPerPage)
);

export const getPrevious = createThunk("getPrevious", API.getPrevious);
export const getNext = createThunk("getNext", (next) => API.getNext(next));

export const handleSearch = createThunk("handleSearch", ({ search, postsPerPage }) =>
  API.handleSearch(search, postsPerPage)
);
