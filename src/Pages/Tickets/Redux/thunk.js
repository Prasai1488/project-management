import { createAsyncThunk } from "@reduxjs/toolkit";

import * as API from "./api";

// get ticket
export const getTickets = createAsyncThunk("ticket/getTickets", async (postsPerPage, { rejectWithValue }) => {
  try {
    const { data } = await API.getTickets(postsPerPage);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
//get SpecificTicket
export const getSpecificTicket = createAsyncThunk("ticket/getSpecificTicket", async (id, { rejectWithValue }) => {
  try {
    const { data } = await API.getSpecificTicket(id);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// get all ticket
export const getAllTickets = createAsyncThunk(
  "ticket/getAllTickets",
  async ({ postsPerPage, page, status, priroity, level }, { rejectWithValue }) => {
    try {
      const { data } = await API.getAllTickets(postsPerPage, page, status, priroity, level);

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// get previous
export const getPrevious = createAsyncThunk("ticket/getPrevious", async (previous, { rejectWithValue }) => {
  try {
    const { data } = await API.getPrevious(previous);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
// get next
export const getNext = createAsyncThunk("ticket/getNext", async (next, { rejectWithValue }) => {
  try {
    const { data } = await API.getNext(next);

    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// get particular page
export const getPageTickets = createAsyncThunk("ticket/getPageTickets", async (data, { rejectWithValue }) => {
  const { number, postsPerPage } = data;
  try {
    const { data } = await API.getPageTickets(number, postsPerPage);
    return data;
  } catch (error) {
    rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// create ticket
export const createTickets = createAsyncThunk("ticket/createTickets", async (data, { rejectWithValue }) => {
  const body = JSON.stringify({ ...data });
  try {
    const { data } = await API.createTickets(body);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
export const updateTickets = createAsyncThunk("ticket/updateTickets", async (data, { rejectWithValue }) => {
  const { id, values } = data;
  try {
    const { data } = await API.updateTickets(id, values);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// handle search
export const handleSearch = createAsyncThunk("ticket/handleSearch", async (data, { rejectWithValue }) => {
  const { search, postsPerPage } = data;
  try {
    const { data } = await API.handleSearch(search, postsPerPage);
    return data;
  } catch (error) {
    rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
