import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createClients, getAllClients, getClients, getNext, handleSearch, updateClients } from "./thunk";

const initialState = {
  clients: [],
  client: null,
  edit: false,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
  loadingClient: false,
  loadingNext: false,
};

export const clientsSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    clientsEditSuccess: (state, action) => {
      state.edit = true;
      state.client = state.clients.find((client) => client._id === action.payload);
    },
    clearAllClient: (state) => {
      state.edit = false;
      state.loading = false;
      state.loadingUpdated = false;
      state.loadingClient = false;
      state.client = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNext.pending, (state) => {
      state.loadingNext = true;
    });
    builder.addCase(getNext.fulfilled, (state, action) => {
      state.loadingNext = false;
      state.clients = [...state.clients, ...action.payload.clients];
      state.next = action.payload.hasNextPage;
    });
    builder.addCase(getNext.rejected, (state) => {
      state.loadingNext = false;
    });
    builder.addCase(createClients.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createClients.fulfilled, (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(createClients.rejected, (state) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(updateClients.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(updateClients.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.edit = false;
    });
    builder.addCase(updateClients.rejected, (state) => {
      state.loadingUpdated = false;
    });
    builder.addMatcher(isAnyOf(getClients.pending, getAllClients.pending, handleSearch.pending), (state) => {
      state.loadingClient = true;
    });
    builder.addMatcher(
      isAnyOf(getClients.fulfilled, getAllClients.fulfilled, handleSearch.fulfilled),
      (state, action) => {
        state.loadingClient = false;
        state.clients = action.payload?.clients;
        state.count = action.payload.totalCount;
        state.previous = action.payload?.previous;
        state.next = action.payload?.nextPageUrl;
      }
    );
    builder.addMatcher(isAnyOf(getClients.rejected, getAllClients.rejected, handleSearch.rejected), (state) => {
      state.loadingClient = false;
    });
  },
});

export const { clientsEditSuccess, clearAllClient } = clientsSlice.actions;

export default clientsSlice.reducer;
