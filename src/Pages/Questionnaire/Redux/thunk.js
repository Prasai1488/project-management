import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

const sliceName = "Questionnaire";
const types = [
  `get${sliceName}`,
  `getAll${sliceName}`,
  `create${sliceName}`,
  `update${sliceName}`,
  `getPage${sliceName}`,
];

const createThunk = (type, apiCall) =>
  createAsyncThunk(`questionnaire/${type}`, async (arg, { rejectWithValue }) => {
    try {
      const { data } = await apiCall(arg);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  });

export const getQuestionnaires = createThunk(`${types[0]}`, API.getQuestionnaires);
export const getAllQuestionnaires = createThunk(`${types[1]}`, ({ postsPerPage, page, item }) =>
  API.getAllQuestionnaires({ postsPerPage, page, item: item ? item : "" })
);
export const createQuestionnaires = createThunk(`${types[2]}`, (data) =>
  API.createQuestionnaires(JSON.stringify(data))
);
export const updateQuestionnaires = createThunk(`${types[3]}`, ({ id, values }) =>
  API.updateQuestionnaires(id, values)
);

export const getPageQuestionnaires = createThunk(`${types[4]}`, ({ number, postsPerPage }) =>
  API.getPageQuestionnaires(number, postsPerPage)
);

export const getPrevious = createThunk("getPrevious", API.getPrevious);
export const getNext = createThunk("getNext", API.getNext);

export const handleSearch = createThunk("handleSearch", ({ search, postsPerPage }) =>
  API.handleSearch(search, postsPerPage)
);
