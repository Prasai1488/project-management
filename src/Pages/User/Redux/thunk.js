import { createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import * as API from "./api";

// get user

export const getUser = createAsyncThunk("user/getUser", async ({ postsPerPage, page }, { rejectWithValue }) => {
  try {
  
    const response = await API.getUser(postsPerPage, page);
    const data = response.data;
    console.log("getUser response data:", data);
    
    const usersArray = data.data || []; 
    return {
      results: usersArray,
      count: data.totalCount, 
      currentPage: page, 
      totalPages: Math.ceil(data.totalCount / postsPerPage), 
      next: data.hasNextPage ? page + 1 : null, 
      previous: page > 1 ? page - 1 : null, 
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    // Handle error and reject with message
    return rejectWithValue(error?.response?.data?.message || "An error occurred while fetching users.");
  }
});


// get all users
export const getAllUser = createAsyncThunk("user/getAllUser", async (_, { rejectWithValue }) => {
  try {
    const response = await API.getAllUser();
    const data = response.data;

    const usersArray = data.data || [];
    const filteredData = usersArray; // Apply any necessary filtering

    return {
      results: filteredData,
      count: data.pagination.count,
      next: data.pagination.next,
      previous: data.pagination.previous,
    };
  } catch (error) {
    console.error("Error fetching all users:", error);
    return rejectWithValue(error?.response?.data?.message || "An error occurred while fetching all users.");
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
export const getNext = createAsyncThunk("user/getNext", async ({ postsPerPage, page }, { rejectWithValue }) => {
  try {
    const response = await API.getUser(postsPerPage, page);
    const data = response.data;
    const usersArray = data.data || [];
    return {
      results: usersArray,
      count: data.pagination.count,
      next: data.pagination.next,
      previous: data.pagination.previous,
    };
  } catch (error) {
    console.error("Error fetching next users:", error);
    return rejectWithValue(error?.response?.data?.message || "An error occurred while fetching next users.");
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
export const createUser = createAsyncThunk("user/createUser", async (data, { rejectWithValue }) => {
  try {
    const { email, fullName, userType, phone } = data;

    // Use the correct field name
    const payload = {
      email,
      full_name: fullName,
      user_type: userType,
      phone,
    };

    const response = await API.createUser(payload);
    console.log("Create user response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    if (error.response) {
      console.error("Server response:", error.response.data);
      if (error.response.data.errors) {
        console.error("Error details:", error.response.data.errors);
        if (error.response.data.errors.full_name) {
          console.error("full_name errors:", error.response.data.errors.full_name);
        }
      }
    }
    return rejectWithValue(
      error?.response?.data?.errors?.full_name?.[0] ||
        error?.response?.data?.message ||
        "An error occurred while creating the user."
    );
  }
});

// update user
export const updateUser = createAsyncThunk("user/updateUser", async (data, { rejectWithValue }) => {
  const { id, values } = data;
  const { fullName, email, phone, userType } = values;

  try {
    const userData = {
      email,
      full_name: fullName,
      user_type: userType,
      phone,
    };

    const response = await API.updateUser(id, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    if (error.response) {
      console.error("Server response:", error.response.data);
    }
    return rejectWithValue(
      error?.response?.data?.errors?.[0]?.error || error.message || "An error occurred while updating the user."
    );
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
export const handleSearch = createAsyncThunk(
  "user/handleSearch",
  async ({ search, postsPerPage, page }, { rejectWithValue }) => {
    try {
      const response = await API.handleSearch(search, postsPerPage, page);
      const data = response.data;

      const usersArray = data.data || [];
      return {
        results: usersArray,
        count: data.pagination.count,
        currentPage: data.pagination.currentPage,
        totalPages: data.pagination.totalPages,
        next: data.pagination.next,
        previous: data.pagination.previous,
      };
    } catch (error) {
      console.error("Error searching users:", error);
      return rejectWithValue(error?.response?.data?.message || "An error occurred while searching users.");
    }
  }
);
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
