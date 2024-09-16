import { createAsyncThunk } from "@reduxjs/toolkit";
import { infoFunction } from "../../../Components/Alert/Alert";
import * as API from "./api";

// get Role
export const getRole = createAsyncThunk("role/getRole", async (postsPerPage, { rejectWithValue }) => {
  try {
    const { data } = await API.getRole(postsPerPage);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// get all Roles
export const getAllRole = createAsyncThunk("role/getAllRole", async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.getAllRole();
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// get previous
export const getPrevious = createAsyncThunk("role/getPrevious", async (previous, { rejectWithValue }) => {
  try {
    const { data } = await API.getPrevious(previous);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
// get next
export const getNext = createAsyncThunk("role/getNext", async (next, { rejectWithValue }) => {
  try {
    const { data } = await API.getNext(next);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// get particular page
export const getPageRole = createAsyncThunk("role/getPageRole", async (data, { rejectWithValue }) => {
  const { number, postsPerPage } = data;
  try {
    const { data } = await API.getPageRole(number, postsPerPage);
    return data;
  } catch (error) {
    rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
// create Role
export const createRole = createAsyncThunk("role/createRole", async (data, { rejectWithValue }) => {
  const { name, isActive, permissions } = data;
  try {
    const body = JSON.stringify({ name, isActive, permissions });
    const { data } = await API.createRole(body);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// update Role
export const updateRole = createAsyncThunk("role/updateRole", async (data, { rejectWithValue, dispatch }) => {
  const { id, values } = data;
  const { name, isActive, permissions, remarks } = values;
  try {
    const body = JSON.stringify({ name, isActive, permissions, remarks });
    const { data } = await API.updateRole(id, body);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// delete Role
export const deleteRole = createAsyncThunk("role/deleteRole", async (id, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await API.deleteRole(id);
    dispatch(getRole(10));
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// get all permission
export const getAllPermission = createAsyncThunk("role/getAllPermission", async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.getAllPermission();
    if (data.count === 0) {
      infoFunction("No permissions available");
    }
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// handle search
export const handleSearch = createAsyncThunk("role/handleSearch", async (data, { rejectWithValue }) => {
  const { search, postsPerPage } = data;
  try {
    const { data } = await API.handleSearch(search, postsPerPage);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// specific user permissions
export const getSpecificUserPermissions = createAsyncThunk(
  "role/getSpecificUserPermissions",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.getSpecificPermissions(id);
      if (data.count === 0) {
        infoFunction("No permissions available.");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);
