import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

// get ticketIssues
export const getTicketIssues = createAsyncThunk(
  "ticketIssues/getTicketIssues",
  async (postsPerPage, { rejectWithValue }) => {
    try {
      const { data } = await API.getTicketIssues(postsPerPage);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// get all ticketIssues
export const getAllTicketIssues = createAsyncThunk(
  "ticketIssues/getAllTicketIssues",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.getAllTicketIssues();
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// get previous
export const getPrevious = createAsyncThunk("ticketIssues/getPrevious", async (previous, { rejectWithValue }) => {
  try {
    const { data } = await API.getPrevious(previous);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
// get next
export const getNext = createAsyncThunk("ticketIssues/getNext", async (next, { rejectWithValue }) => {
  try {
    const { data } = await API.getNext(next);

    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// get particular page
export const getPageTicketIssues = createAsyncThunk(
  "ticketIssues/getPageTicketIssues",
  async (data, { rejectWithValue }) => {
    const { number, postsPerPage } = data;
    try {
      const { data } = await API.getPageTicketIssues(number, postsPerPage);
      return data;
    } catch (error) {
      rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

// create ticketIssues
export const createTicketIssues = createAsyncThunk(
  "ticketIssues/createTicketIssues",
  async (data, { rejectWithValue }) => {
    const { title, sector, description, documentName, document } = data;

    const issuseData = new FormData();
    issuseData.append("title", title);
    issuseData.append("sector", sector);
    issuseData.append("description", description);
    issuseData.append("documentName", documentName);
    issuseData.append("file", document);

    try {
      const { data } = await API.createTicketIssues(issuseData);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);
export const updateTicketIssues = createAsyncThunk(
  "ticketIssues/updateTicketIssues",
  async (data, { rejectWithValue }) => {
    const { id, values } = data;
    const { title, sector, description, documentName, document, status } = values;

    const issuseData = new FormData();
    issuseData.append("title", title);
    issuseData.append("sector", sector);
    issuseData.append("description", description);
    issuseData.append("documentName", documentName);
    issuseData.append("file", document);
    issuseData.append("status", status);

    try {
      const { data } = await API.updateTicketIssues(id, issuseData);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  }
);

export const createReply = createAsyncThunk("ticketIssues/createReply", async (data, { rejectWithValue }) => {
  const { issue, message, documentName, document } = data;

  const formData = new FormData();
  formData.append("issue", issue);
  formData.append("message", message);
  formData.append("documentName", documentName);
  formData.append("file", document);

  try {
    const { data } = await API.createReply(formData);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

export const getReplies = createAsyncThunk("ticketIssues/getReplies", async (id, { rejectWithValue }) => {
  try {
    const { data } = await API.getReplies(id);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

export const getReply = createAsyncThunk("ticketIssues/getReply", async (id, { rejectWithValue }) => {
  try {
    const { data } = await API.getReply(id);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

export const updateReply = createAsyncThunk("ticketIssues/updateReply", async (data, { rejectWithValue }) => {
  const { id, values } = data;
  const { message, documentName, document } = values;

  const formData = new FormData();

  formData.append("message", message);
  formData.append("documentName", documentName);
  formData.append("file", document);

  try {
    const { data } = await API.updateReply(id, formData);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});

// handle search
export const handleSearch = createAsyncThunk("ticketIssues/handleSearch", async (data, { rejectWithValue }) => {
  const { search, postsPerPage } = data;
  try {
    const { data } = await API.handleSearch(search, postsPerPage);
    return data;
  } catch (error) {
    rejectWithValue(error?.response?.data?.errors[0]?.error);
  }
});
