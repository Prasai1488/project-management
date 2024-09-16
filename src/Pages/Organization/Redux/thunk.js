import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

// get organization
export const getOrganization = createAsyncThunk(
  "organization/getOrganization",
  async (postsPerPage, { rejectWithValue }) => {
    try {
      const { data } = await API.getOrganization(postsPerPage);
      return data;
    } catch (error) {
      return rejectWithValue("Failed to get organization.");
    }
  }
);

// get all organization
export const getAllOrganization = createAsyncThunk(
  "organization/getAllOrganization",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.getAllOrganization();
      return data;
    } catch (error) {
      return rejectWithValue("Failed to get organization.");
    }
  }
);

// get previous
export const getPrevious = createAsyncThunk("organization/getPrevious", async (previous, { rejectWithValue }) => {
  try {
    const { data } = await API.getPrevious(previous);
    return data;
  } catch (error) {
    return rejectWithValue("Failed to get organization.");
  }
});
// get next
export const getNext = createAsyncThunk("organization/getNext", async (next, { rejectWithValue }) => {
  try {
    const { data } = await API.getNext(next);

    return data;
  } catch (error) {
    return rejectWithValue("Failed to get organization.");
  }
});

// get particular page
export const getPageOrganization = createAsyncThunk(
  "organization/getPageOrganization",
  async (data, { rejectWithValue }) => {
    const { number, postsPerPage } = data;
    try {
      const { data } = await API.getPageOrganization(number, postsPerPage);
      return data;
    } catch (error) {
      rejectWithValue("Failed to get organization.");
    }
  }
);

// create organization
export const createOrganization = createAsyncThunk(
  "organization/createOrganization",
  async (data, { rejectWithValue, dispatch }) => {
    const { name, address, phoneNo1, phoneNo2, panVatNo, email, websiteUrl, favicon, logo, stamp, signature } = data;
    try {
      const body = new FormData();
      body.append("name", name);
      body.append("phoneNo1 ", phoneNo1);
      body.append("email", email);
      body.append("phoneNo2", phoneNo2);
      body.append("panVatNo", panVatNo);
      body.append("address", address);
      body.append("websiteUrl", websiteUrl);

      if (favicon) {
        body.append("favicon", favicon);
      }
      if (logo) {
        body.append("logo", logo);
      }
      if (stamp) {
        body.append("stamp", stamp);
      }
      if (signature) {
        body.append("signature", signature);
      }
      const { data } = await API.createOrganization(body);
      return data;
    } catch (error) {
      return rejectWithValue("Failed to create organization.");
    }
  }
);
export const updateOrganization = createAsyncThunk(
  "organization/updateOrganization",
  async (data, { rejectWithValue, dispatch }) => {
    const { id, values } = data;
    const { name, phoneNo1, email, phoneNo2, panVatNo, address, websiteUrl, logo, stamp, favicon, signature } = values;
    try {
      const body = new FormData();
      body.append("name", name);
      body.append("phoneNo1 ", phoneNo1);
      body.append("email", email);
      body.append("phoneNo2", phoneNo2);
      body.append("panVatNo", panVatNo);
      body.append("address", address);
      body.append("websiteUrl", websiteUrl);
      if (favicon) {
        body.append("favicon", favicon);
      }
      if (logo) {
        body.append("logo", logo);
      }
      if (stamp) {
        body.append("stamp", stamp);
      }
      if (signature) {
        body.append("signature", signature);
      }
      const { data } = await API.updateOrganization(id, body);
      return data;
    } catch (error) {
      return rejectWithValue("Failed to update organization.");
    }
  }
);

// handle search
export const handleSearch = createAsyncThunk("organization/handleSearch", async (data, { rejectWithValue }) => {
  const { search, postsPerPage } = data;
  try {
    const { data } = await API.handleSearch(search, postsPerPage);
    return data;
  } catch (error) {
    rejectWithValue("Failed to get organization");
  }
});
