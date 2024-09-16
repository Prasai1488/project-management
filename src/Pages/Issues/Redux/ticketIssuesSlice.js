import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createReply,
  createTicketIssues,
  getNext,
  getReplies,
  getReply,
  getTicketIssues,
  handleSearch,
  updateReply,
  updateTicketIssues
} from "./thunk";

const initialState = {
  ticketIssues: [],
  ticketIssue: null,
  replies: [],
  reply: null,
  edit: false,
  editReply: false,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingReply: false,
  loadingUpdatedReply: false,
  loadingUpdated: false,
  loadingTicketIssues: false,
  loadingNext: false,
};

export const ticketIssues = createSlice({
  name: "ticketIssues",
  initialState,
  reducers: {
    ticketIssuesEditSuccess: (state, action) => {
      state.edit = true;
      state.ticketIssue = state.ticketIssues.find((ticketIssue) => ticketIssue.id === action.payload);
    },
    clearAllTicketIssues: (state) => {
      state.edit = false;
      state.loading = false;
      state.loadingUpdated = false;
      state.loadingTicketIssues = false;
      state.ticketIssue = null;
    },

    ticketIssueReply: (state, action) => {
      state.ticketIssue = state.ticketIssues.find((ticketIssue) => ticketIssue.id === action.payload);
    },
    setIssue: (state, action) => {
      state.ticketIssue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNext.pending, (state) => {
      state.loadingNext = true;
    });
    builder.addCase(getNext.fulfilled, (state, action) => {
      state.loadingNext = false;
      state.ticketIssues = [...state.ticketIssues, ...action.payload.results];
      state.next = action.payload.next;
    });
    builder.addCase(getNext.rejected, (state) => {
      state.loadingNext = false;
    });
    builder.addCase(createTicketIssues.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTicketIssues.fulfilled, (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(createTicketIssues.rejected, (state) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(updateTicketIssues.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(updateTicketIssues.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.edit = false;
    });
    builder.addCase(updateTicketIssues.rejected, (state) => {
      state.loadingUpdated = false;
    });

    builder.addCase(createReply.pending, (state, action) => {
      state.loadingReply = false;
      state.editReply = true;
    });
    builder.addCase(createReply.fulfilled, (state, action) => {
      state.loadingReply = false;
      state.editReply = false;
    });
    builder.addCase(createReply.rejected, (state, action) => {
      state.loadingReply = false;
      state.editReply = false;
    });

    builder.addCase(getReplies.pending, (state, action) => {
      state.loadingReply = true;
    });
    builder.addCase(getReplies.fulfilled, (state, action) => {
      state.loadingReply = false;
      state.replies = action.payload.results;
    });
    builder.addCase(getReplies.rejected, (state, action) => {
      state.loadingReply = false;
    });

    builder.addCase(getReply.pending, (state, action) => {
      state.loadingReply = true;
    });
    builder.addCase(getReply.fulfilled, (state, action) => {
      state.loadingReply = false;
      state.reply = action.payload;
    });
    builder.addCase(getReply.rejected, (state, action) => {
      state.loadingReply = false;
    });

    builder.addCase(updateReply.pending, (state, action) => {
      state.loadingReply = true;
    });
    builder.addCase(updateReply.fulfilled, (state, action) => {
      state.loadingReply = false;
      state.editReply = false;
    });
    builder.addCase(updateReply.rejected, (state, action) => {
      state.loadingReply = false;
      state.editReply = false;
    });

    builder.addMatcher(isAnyOf(getTicketIssues.pending, handleSearch.pending), (state) => {
      state.loadingTicketIssues = true;
    });
    builder.addMatcher(isAnyOf(getTicketIssues.fulfilled, handleSearch.fulfilled), (state, action) => {
      state.loadingTicketIssues = false;
      state.ticketIssues = action.payload.results;
      state.count = action.payload.count;
      state.previous = action.payload.previous;
      state.next = action.payload.next;
    });

    builder.addMatcher(isAnyOf(getTicketIssues.rejected, handleSearch.rejected), (state) => {
      state.loadingTicketIssues = false;
    });
  },
});

export const { ticketIssuesEditSuccess, clearAllTicketIssues, ticketIssueReply,setIssue } = ticketIssues.actions;

export default ticketIssues.reducer;
