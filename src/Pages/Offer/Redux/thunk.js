import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

// Get offers with pagination
export const getOffers = createAsyncThunk("offers/getOffers", async (postsPerPage, { rejectWithValue }) => {
  try {
    const { data } = await API.getOffers(postsPerPage);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors?.[0]?.error || "Failed to fetch offers");
  }
});

// Get all offers without pagination
export const getAllOffers = createAsyncThunk("offers/getAllOffers", async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.getAllOffers();
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors?.[0]?.error || "Failed to fetch all offers");
  }
});

// Get previous paginated data
export const getPrevious = createAsyncThunk("offers/getPrevious", async (previous, { rejectWithValue }) => {
  try {
    const { data } = await API.getPrevious(previous);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors?.[0]?.error || "Failed to fetch previous data");
  }
});

// Get next paginated data
export const getNext = createAsyncThunk("offers/getNext", async (next, { rejectWithValue }) => {
  try {
    const { data } = await API.getNext(next);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors?.[0]?.error || "Failed to fetch next data");
  }
});

// Get a particular page of offers
export const getPageOffers = createAsyncThunk(
  "offers/getPageOffers",
  async ({ number, postsPerPage }, { rejectWithValue }) => {
    try {
      const { data } = await API.getOfferPage(number, postsPerPage);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors?.[0]?.error || "Failed to fetch paginated data");
    }
  }
);

// Create a new offer
export const createOffer = createAsyncThunk(
  "offers/createOffer",
  async ({ title, sector, description, documentName, document }, { rejectWithValue }) => {
    const offerData = new FormData();
    offerData.append("title", title);
    offerData.append("sector", sector);
    offerData.append("description", description);
    offerData.append("documentName", documentName);
    offerData.append("file", document);

    try {
      const { data } = await API.createOffer(offerData);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors?.[0]?.error || "Failed to create offer");
    }
  }
);

// Update an existing offer
export const updateOffer = createAsyncThunk(
  "offers/updateOffer",
  async ({ id, values: { title, sector, description, documentName, document } }, { rejectWithValue }) => {
    const offerData = new FormData();
    offerData.append("title", title);
    offerData.append("sector", sector);
    offerData.append("description", description);
    offerData.append("documentName", documentName);
    offerData.append("file", document);

    try {
      const { data } = await API.updateOffer(id, offerData);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors?.[0]?.error || "Failed to update offer");
    }
  }
);

// Handle search for offers
export const handleSearch = createAsyncThunk(
  "offers/handleSearch",
  async ({ search, postsPerPage }, { rejectWithValue }) => {
    try {
      const { data } = await API.handleSearch(search, postsPerPage);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors?.[0]?.error || "Failed to search offers");
    }
  }
);
