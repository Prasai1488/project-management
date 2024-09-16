import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createTicketsInspection,
  getAllTicketsInspection,
  getNextTicketsInspection,
  getAnswerQuestionByItemId,
  getTicketsInspection,
  getPageTicketsInspection,
  getTicketsInspectionById,
  handleSearchTicketsInspection,
  updateTicketsInspection,
  getSpecificTicketInspection,
} from "./thunk";
import { State } from "country-state-city";

const initialState = {
  ticketInspections: [],
  ticketInspection: null,
  edit: false,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
  loadingNextQuestionAnswer: false,
  loadingNext: false,
  questions: [],
  nextQuestion: null,
};

export const newTicketInspectionSlice = createSlice({
  name: "newTicketInspection",
  initialState,
  reducers: {
    ticketInspectionEditSuccess: (state, action) => {
      state.edit = true;
    },
    clearAllTicketInspections: (state) => {
      state.edit = false;
      state.loading = false;
      state.loadingUpdated = false;
      state.ticketInspection = null;
    },
  },
  extraReducers: (builder) => {
    // get all tickets inspection
    builder.addCase(getTicketsInspectionById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTicketsInspectionById.fulfilled, (state, action) => {
      console.log("Action Payload:", action.payload);
      state.loading = false;
      state.ticketInspections = action.payload.ticketInspections;
      state.next = action.payload?.nextPage;
    });
    builder.addCase(getTicketsInspectionById.rejected, (state, action) => {
      state.loading = false;
    });

    // get next ticket inspection
    //issue

    builder.addCase(getNextTicketsInspection.pending, (state) => {
      state.loadingNext = true;
    });

    builder.addCase(getNextTicketsInspection.fulfilled, (state, action) => {
      state.loadingNext = false;
      state.ticketInspections = [...state.ticketInspections, ...action.payload.ticketInspections];
      state.next = action.payload.nextPage;
    });
    builder.addCase(getNextTicketsInspection.rejected, (state) => {
      state.loadingNext = false;
    });
    // get questionAnswerByItemId
    builder.addCase(getAnswerQuestionByItemId.pending, (state) => {
      state.loading = true;
      state.loadingNextQuestionAnswer = false;
    });
    builder.addCase(getAnswerQuestionByItemId.fulfilled, (state, action) => {
      state.loading = false;
      state.loadingNextQuestionAnswer = true;
      state.questions = action.payload.questionnaires;
      state.nextQuestion = action.payload;
      state.count = action.payload;
    });
    builder.addCase(getAnswerQuestionByItemId.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getSpecificTicketInspection.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSpecificTicketInspection.fulfilled, (state, action) => {
      state.loading = false;
      state.ticketInspection = action.payload;
    });
    builder.addCase(getSpecificTicketInspection.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const { ticketInspectionEditSuccess, clearAllTicketInspections } = newTicketInspectionSlice.actions;

export default newTicketInspectionSlice.reducer;
