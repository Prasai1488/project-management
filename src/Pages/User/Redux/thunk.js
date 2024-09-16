import { createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import * as API from "./api";

// get user
export const getUser = createAsyncThunk("user/getUser", async ({ postsPerPage, page }, { rejectWithValue }) => {
  try {
    const { data } = await API.getUser(postsPerPage, page);

    const filteredData = data.users.filter((user) => user.isSuperuser !== true);
    return { ...data, results: filteredData };
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// get all users
export const getAllUser = createAsyncThunk("user/getAllUser", async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.getAllUser();
    const filteredData = data.results.filter((user) => user.isSuperuser !== true);
    return { ...data, results: filteredData };
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// get previous
export const getPrevious = createAsyncThunk("user/getPrevious", async (previous, { rejectWithValue }) => {
  try {
    const { data } = await API.getPrevious(previous);
    const filteredData = data.results.filter((user) => user.isSuperuser === false);
    return { ...data, results: filteredData, count: filteredData?.length };
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
// get next
export const getNext = createAsyncThunk("user/getNext", async (next, { rejectWithValue }) => {
  try {
    const { data } = await API.getNext(next);
    const filteredData = data.results.filter((user) => user.isSuperuser === false);
    return { ...data, results: filteredData, count: filteredData?.length };
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// get particular page
export const getPageUser = createAsyncThunk("user/getPageUser", async (data, { rejectWithValue }) => {
  const { number, postsPerPage } = data;
  try {
    const { data } = await API.getPageUser(number, postsPerPage);
    const filteredData = data.results.filter((user) => user.isSuperuser === false);
    return { ...data, results: filteredData, count: filteredData?.length };
  } catch (error) {
    rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// get current user
export const getCurrentUser = createAsyncThunk("user/getCurrentUser", async (token, { rejectWithValue }) => {
  try {
    const decoded = token && jwt_decode(token);
    const { data } = await API.getCurrentUser(decoded);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// create user
export const createUser = createAsyncThunk("user/createUser", async (data, { rejectWithValue, dispatch }) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    username,
    address,
    phone,
    isActive,
    photo,
    roles,
    level,
    gender,
    password,
    confirmPassword,
  } = data;
  try {
    const body = new FormData();

    body.append("firstName", firstName);
    body.append("middleName", middleName);
    body.append("lastName", lastName);
    body.append("email", email);
    body.append("username", username);
    body.append("address", address);

    body.append("phoneNo", phone);
    body.append("isActive", isActive);
    body.append("gender", gender);
    body.append("password", password);
    body.append("confirmPassword", confirmPassword);
    await roles.forEach((group, i) => {
      body.append(`roles[${i}]`, group);
    });
    body.append("level", level);

    if (photo) {
      body.append("profileImage", photo);
    }

    const { data } = await API.createUser(body);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
// update user
export const updateUser = createAsyncThunk("user/updateUser", async (data, { rejectWithValue, dispatch }) => {
  const { id, values } = data;
  const {
    firstName,
    middleName,
    lastName,
    email,
    username,
    address,
    phone,
    isActive,
    photo,
    roles,
    level,
    gender,
    password,
    confirmPassword,
  } = values;
  try {
    const body = new FormData();

    body.append("firstName", firstName);
    body.append("middleName", middleName);
    body.append("lastName", lastName);
    body.append("email", email);
    body.append("username", username);
    body.append("address", address);

    body.append("phoneNo", phone);
    body.append("isActive", isActive);
    body.append("gender", gender);
    body.append("password", password);
    body.append("confirmPassword", confirmPassword);
    await roles.forEach((group, i) => {
      body.append(`roles[${i}]`, group);
    });
    body.append("level", level);

    if (photo) {
      body.append("profileImage", photo);
    }

    const { data } = await API.updateUser(id, body);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// get specific user
export const getSpecificUser = createAsyncThunk("user/getSpecificUser", async (id, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await API.getSpecificUser(id);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// delete user
export const deleteUser = createAsyncThunk("user/deleteUser", async (id, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await API.deleteUser(id);
    dispatch(getUser(10));
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// handle search
export const handleSearch = createAsyncThunk("user/handleSearch", async (data, { rejectWithValue }) => {
  const { search, postsPerPage } = data;
  try {
    const { data } = await API.handleSearch(search, postsPerPage);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// delete photo
export const deletePhoto = createAsyncThunk("user/deletePhoto", async (id, { rejectWithValue }) => {
  try {
    const body = JSON.stringify({ photo: "" });
    const { data } = await API.deletePhoto(id, body);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
