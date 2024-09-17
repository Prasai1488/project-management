import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

// get organizations
export const getOrganizations = createAsyncThunk(
  "organization/getOrganizations",
  async (postsPerPage, { rejectWithValue }) => {
    try {
      const { data } = await API.getOrganizations(postsPerPage);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// get specific organization
export const getSpecificOrganization = createAsyncThunk(
  "organization/getSpecificOrganization",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.getSpecificOrganization(id);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// get all organizations
export const getAllOrganizations = createAsyncThunk(
  "organization/getAllOrganizations",
  async ({ postsPerPage, page, status, priority, level }, { rejectWithValue }) => {
    try {
      const { data } = await API.getAllOrganizations(postsPerPage, page, status, priority, level);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// get previous organization
export const getPreviousOrganization = createAsyncThunk(
  "organization/getPreviousOrganization",
  async (previous, { rejectWithValue }) => {
    try {
      const { data } = await API.getPreviousOrganization(previous);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// get next organization
export const getNextOrganization = createAsyncThunk(
  "organization/getNextOrganization",
  async (next, { rejectWithValue }) => {
    try {
      const { data } = await API.getNextOrganization(next);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// get particular page of organizations
export const getPageOrganizations = createAsyncThunk(
  "organization/getPageOrganizations",
  async ({ number, postsPerPage }, { rejectWithValue }) => {
    try {
      const { data } = await API.getPageOrganizations(number, postsPerPage);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// create organization
export const createOrganization = createAsyncThunk(
  "organization/createOrganization",
  async (data, { rejectWithValue }) => {
    const body = JSON.stringify({ ...data });
    try {
      const { data } = await API.createOrganization(body);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// update organization
export const updateOrganization = createAsyncThunk(
  "organization/updateOrganization",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const { data } = await API.updateOrganization(id, values);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// handle search for organizations
export const handleOrganizationSearch = createAsyncThunk(
  "organization/handleOrganizationSearch",
  async ({ search, postsPerPage }, { rejectWithValue }) => {
    try {
      const { data } = await API.handleOrganizationSearch(search, postsPerPage);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);
