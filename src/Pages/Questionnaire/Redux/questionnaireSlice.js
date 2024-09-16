import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createQuestionnaires,
  getAllQuestionnaires,
  getNext,
  getQuestionnaires,
  handleSearch,
  updateQuestionnaires,
} from "./thunk";

const initialState = {
  questionnaires: [],
  questionnaire: null,
  edit: false,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
  loadingQuestionnaire: false,
  loadingNext: false,
};

export const questionnairesSlice = createSlice({
  name: "questionnaire",
  initialState,
  reducers: {
    questionnairesEditSuccess: (state, action) => {
      state.edit = true;
      state.questionnaire = state.questionnaires.find((questionnaire) => questionnaire._id === action.payload);
    },
    clearAllQuestionnaire: (state) => {
      state.edit = false;
      state.loading = false;
      state.loadingUpdated = false;
      state.loadingQuestionnaire = false;
      state.questionnaire = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNext.pending, (state) => {
      state.loadingNext = true;
    });
    builder.addCase(getNext.fulfilled, (state, action) => {
      state.loadingNext = false;
      state.questionnaires = [...state.questionnaires, ...action.payload.questionnaires];
      state.next = action.payload.nextPageUrl;
    });
    builder.addCase(getNext.rejected, (state) => {
      state.loadingNext = false;
    });
    builder.addCase(createQuestionnaires.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createQuestionnaires.fulfilled, (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(createQuestionnaires.rejected, (state) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(updateQuestionnaires.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(updateQuestionnaires.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.edit = false;
    });
    builder.addCase(updateQuestionnaires.rejected, (state) => {
      state.loadingUpdated = false;
    });
    builder.addMatcher(isAnyOf(getQuestionnaires.pending, handleSearch.pending), (state) => {
      state.loadingQuestionnaire = true;
    });
    builder.addMatcher(
      isAnyOf(getQuestionnaires.fulfilled, getAllQuestionnaires.fulfilled, handleSearch.fulfilled),
      (state, action) => {
        state.loadingQuestionnaire = false;
        state.questionnaires = action.payload?.questionnaires;
        state.count = action.payload.totalCount;
        state.previous = action.payload?.previous;
        state.next = action.payload?.nextPageUrl;
      }
    );
    builder.addMatcher(isAnyOf(getQuestionnaires.rejected, getAllQuestionnaires, handleSearch.rejected), (state) => {
      state.loadingQuestionnaire = false;
    });
  },
});

export const { questionnairesEditSuccess, clearAllQuestionnaire } = questionnairesSlice.actions;

export default questionnairesSlice.reducer;
