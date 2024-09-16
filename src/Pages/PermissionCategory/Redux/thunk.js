import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

const sliceName = "PermissionCategory";
const types = [
  `get${sliceName}`,
  `getAll${sliceName}`,
  `create${sliceName}`,
  `update${sliceName}`,
  `getPage${sliceName}`,
];

const createThunk = (type, apiCall) =>
  createAsyncThunk(`permissioncategory/${type}`, async (arg, { rejectWithValue }) => {
    try {
      const { data } = await apiCall(arg);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  });

export const getPermissionCategorys = createThunk(`${types[0]}`, API.getPermissionCategorys);
export const getAllPermissionCategorys = createThunk(`${types[1]}`, ({ postsPerPage, page }) =>
  API.getAllPermissionCategorys({ postsPerPage, page })
);
export const createPermissionCategorys = createThunk(`${types[2]}`, (data) =>
  API.createPermissionCategorys(JSON.stringify(data))
);
export const updatePermissionCategorys = createThunk(`${types[3]}`, ({ id, values }) =>
  API.updatePermissionCategorys(id, values)
);

export const getPagePermissionCategorys = createThunk(`${types[4]}`, ({ number, postsPerPage }) =>
  API.getPagePermissionCategorys(number, postsPerPage)
);

export const getPrevious = createThunk("getPrevious", API.getPrevious);
export const getNext = createThunk("getNext", API.getNext);

export const handleSearch = createThunk("handleSearch", ({ search, postsPerPage }) =>
  API.handleSearch(search, postsPerPage)
);
