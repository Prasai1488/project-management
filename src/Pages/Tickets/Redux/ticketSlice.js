import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createTickets,
  getAllTickets,
  getTickets,
  getNext,
  handleSearch,
  updateTickets,
  getSpecificTicket,
} from "./thunk";

const initialState = {
  tickets: [],
  ticket: null,
  edit: false,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
  loadingTicket: false,
  loadingNext: false,
};

export const tickets = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    ticketsEditSuccess: (state, action) => {
      state.edit = true;
      state.ticket = action.payload;
    },
    clearAllTicket: (state) => {
      state.edit = false;
      state.loading = false;
      state.loadingUpdated = false;
      state.loadingTicket = false;
      state.ticket = null;
    },
    clearEditTicket: (state) => {
      state.edit = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getNext.pending, (state) => {
      state.loadingNext = true;
    });
    builder.addCase(getNext.fulfilled, (state, action) => {
      state.loadingNext = false;
      state.tickets = [...state.tickets, ...action.payload?.tickets];
      state.next = action.payload.nextPageUrl;
    });
    builder.addCase(getNext.rejected, (state) => {
      state.loadingNext = false;
    });
    builder.addCase(createTickets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTickets.fulfilled, (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(createTickets.rejected, (state) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(getSpecificTicket.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSpecificTicket.fulfilled, (state, action) => {
      state.loading = false;
      state.ticket = action.payload;
    });
    builder.addCase(getSpecificTicket.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateTickets.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(updateTickets.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.edit = false;
    });
    builder.addCase(updateTickets.rejected, (state) => {
      state.loadingUpdated = false;
    });
    builder.addMatcher(isAnyOf(getTickets.pending, handleSearch.pending), (state) => {
      state.loadingTicket = true;
    });
    builder.addMatcher(
      isAnyOf(getTickets.fulfilled, getAllTickets.fulfilled, handleSearch.fulfilled),
      (state, action) => {
        state.loadingTicket = false;
        state.tickets = action.payload?.tickets;
        state.count = action.payload.totalCount;
        state.previous = action.payload?.previous;
        state.next = action.payload?.nextPageUrl;
      }
    );
    builder.addMatcher(isAnyOf(getTickets.rejected, getAllTickets.rejected, handleSearch.rejected), (state) => {
      state.loadingTicket = false;
    });
  },
});

export const { ticketsEditSuccess, clearAllTicket, clearEditTicket } = tickets.actions;

export default tickets.reducer;
