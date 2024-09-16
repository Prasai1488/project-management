import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";
import { infoFunction } from "../../../Components/Alert/Alert";

// get user group
export const getUserGroup = createAsyncThunk(
  "userGroup/getUserGroup",
  async (postsPerPage, { rejectWithValue }) => {
    try {
      const { data } = await API.getUserGroup(postsPerPage);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// get all user groups
export const getAllUserGroup = createAsyncThunk(
  "userGroup/getAllUserGroup",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.getAllUserGroup();
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// get previous
export const getPrevious = createAsyncThunk(
  "userGroup/getPrevious",
  async (previous, { rejectWithValue }) => {
    try {
      const { data } = await API.getPrevious(previous);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);
// get next
export const getNext = createAsyncThunk(
  "userGroup/getNext",
  async (next, { rejectWithValue }) => {
    try {
      const { data } = await API.getNext(next);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// get particular page
export const getPageUserGroup = createAsyncThunk(
  "userGroup/getPageUserGroup",
  async (data, { rejectWithValue }) => {
    const { number, postsPerPage } = data;
    try {
      const { data } = await API.getPageUserGroup(number, postsPerPage);
      return data;
    } catch (error) {
      rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);
// create user group
export const createUserGroup = createAsyncThunk(
  "userGroup/createUserGroup",
  async (data, { rejectWithValue }) => {
    const { name, isActive, permissions } = data;
    try {
      const body = JSON.stringify({ name, isActive, permissions });
      const { data } = await API.createUserGroup(body);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// update user group
export const updateUserGroup = createAsyncThunk(
  "userGroup/updateUserGroup",
  async (data, { rejectWithValue, dispatch }) => {
    const { id, values } = data;
    const { name, isActive, permissions, remarks } = values;
    try {
      const body = JSON.stringify({ name, isActive, permissions, remarks });
      const { data } = await API.updateUserGroup(id, body);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// delete user group
export const deleteUserGroup = createAsyncThunk(
  "userGroup/deleteUserGroup",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await API.deleteUserGroup(id);
      dispatch(getUserGroup(10));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// get all permission
export const getAllPermission = createAsyncThunk(
  "userGroup/getAllPermission",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.getAllPermission();
      if (data.count === 0) {
        infoFunction("No permissions available");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// handle search
export const handleSearch = createAsyncThunk(
  "userGroup/handleSearch",
  async (data, { rejectWithValue }) => {
    const { search, postsPerPage } = data;
    try {
      const { data } = await API.handleSearch(search, postsPerPage);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// specific user permissions
export const getSpecificUserPermissions = createAsyncThunk(
  "userGroup/getSpecificUserPermissions",
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
