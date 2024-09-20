import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createTicketsInspection,
  getAllTicketsInspection,
  getAnswerQuestionByItemId,
  getNextTicketsInspection,
  getTicketsInspection,
  getTicketsInspectionById,
  handleSearchTicketsInspection,
  updateTicketsInspection,
} from "./thunk";

const initialState = {
  ticketInspections: [],
  questionAnswers: [],
  ticketInspection: null,
  edit: false,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
  loadingTicketInspections: false,
  loadingNext: false,
  loadingAll: false,
  questionnaires: [],
};

export const ticketInspectionSlice = createSlice({
  name: "ticketInspection",
  initialState,
  reducers: {
    ticketInspectionEditSuccess: (state, action) => {
      state.edit = true;
      state.ticketInspection = state.ticketInspections.find(
        (ticketInspection) => ticketInspection._id === action.payload
      );
    },
    clearAllTicketInspections: (state) => {
      state.edit = false;
      state.loading = false;
      state.loadingUpdated = false;
      state.loadingTicketInspections = false;
      state.loadingAll = false;
      state.ticketInspection = null;
    },
  },
  extraReducers: (builder) => {
    // Next tickets inspection
    builder.addCase(getNextTicketsInspection.pending, (state) => {
      state.loadingNext = true;
    });
    builder.addCase(getNextTicketsInspection.fulfilled, (state, action) => {
      state.loadingNext = false;
      state.ticketInspections = [...state.ticketInspections, ...action.payload.ticketInspections];
      state.next = action.payload.nextPage;
    });
    builder.addCase(getNextTicketsInspection.rejected, (state, action) => {
      state.loadingNext = false;
    });

    // Create ticket inspection
    builder.addCase(createTicketsInspection.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTicketsInspection.fulfilled, (state, action) => {
      state.loading = false;
      state.ticketInspections = action.payload.ticketInspections;
      state.edit = false;
    });
    builder.addCase(createTicketsInspection.rejected, (state) => {
      state.loading = false;
      state.edit = false;
    });

    // get all tickets inspection
    builder.addCase(getAllTicketsInspection.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllTicketsInspection.fulfilled, (state, action) => {
      state.loading = false;
      state.ticketInspections = action.payload.ticketInspections;
      state.next = action.payload.nextPage;
    });
    builder.addCase(getAllTicketsInspection.rejected, (state, action) => {
      console.error("Failed to fetch all tickets inspection:", action.payload);
      state.loading = false;
    });

    // getTicketsInspectionById;
    builder.addCase(getTicketsInspectionById.pending, (state) => {
      state.loadingTicketInspections = true;
    });
    builder.addCase(getTicketsInspectionById.fulfilled, (state, action) => {
      state.loadingTicketInspections = false;
      state.next = action.payload.nextPage;
      state.ticketInspections = action.payload.ticketInspections;
    });
    builder.addCase(getTicketsInspectionById.rejected, (state, action) => {
      state.loadingTicketInspections = false;
      console.error("Failed to fetch ticket inspection by ID:", action.payload);
    });

    // getQuestionAnsweByItemId

    builder.addCase(getAnswerQuestionByItemId.pending, (state) => {
      // state.loadingTicketInspections = true;
    });
    builder.addCase(getAnswerQuestionByItemId.fulfilled, (state, action) => {
      state.loadingTicketInspections = false;
      state.questionnaires = action.payload.questionnaires;
    });
    builder.addCase(getAnswerQuestionByItemId.rejected, (state, action) => {
      // state.loadingTicketInspections = false;
      console.error("Failed to fetch ticket inspection by ID:", action.payload);
    });

    // Update ticket inspection
    builder.addCase(updateTicketsInspection.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(updateTicketsInspection.fulfilled, (state) => {
      state.loadingUpdated = false;
      state.edit = false;
    });
    builder.addCase(updateTicketsInspection.rejected, (state) => {
      state.loadingUpdated = false;
    });

    // Handle ticket inspections and search
    builder.addMatcher(isAnyOf(getTicketsInspection.pending, handleSearchTicketsInspection.pending), (state) => {
      state.loadingTicketInspections = true;
    });
    builder.addMatcher(
      isAnyOf(getTicketsInspection.fulfilled, handleSearchTicketsInspection.fulfilled),
      (state, action) => {
        state.loadingTicketInspections = false;
        state.ticketInspections = action.payload.results;
        state.count = action.payload.count;
        state.previous = action.payload.previous;
        state.next = action.payload.nextPage;
      }
    );
    builder.addMatcher(isAnyOf(getTicketsInspection.rejected, handleSearchTicketsInspection.rejected), (state) => {
      state.loadingTicketInspections = false;
    });
  },
});

export const { ticketInspectionEditSuccess, clearAllTicketInspections } = ticketInspectionSlice.actions;

export default ticketInspectionSlice.reducer;
