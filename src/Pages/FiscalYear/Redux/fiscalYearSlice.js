import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getFiscalYear,
  getAllFiscalYear,
  getNext,
  getPrevious,
  getPageFiscalYear,
  createFiscalYear,
  handleSearch,
} from "./thunk";

const initialState = {
  fiscalYears: [],
  edit: false,
  fiscalYear: null,
  count: null,
  next: null,
  previous: null,
  loading: false,
};

export const fiscalYearSlice = createSlice({
  name: "fiscalYear",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFiscalYear.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFiscalYear.fulfilled, (state, action) => {
      state.loading = false;
      state.edit = false;
      state.fiscalYears = action.payload.results;
      state.count = action.payload.count;
      state.previous = action.payload.previous;
      state.next = action.payload.next;
    });
    builder.addCase(getFiscalYear.rejected, (state) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(createFiscalYear.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createFiscalYear.fulfilled, (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(createFiscalYear.rejected, (state) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addMatcher(
      isAnyOf(
        getAllFiscalYear.pending,
        getPrevious.pending,
        getNext.pending,
        getPageFiscalYear.pending,
        handleSearch.pending
      ),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(
        getAllFiscalYear.fulfilled,
        getPrevious.fulfilled,
        getNext.fulfilled,
        getPageFiscalYear.fulfilled,
        handleSearch.fulfilled
      ),
      (state, action) => {
        state.loading = false;
        state.fiscalYears = action.payload.results;
        state.count = action.payload.count;
        state.previous = action.payload.previous;
        state.next = action.payload.next;
      }
    );
    builder.addMatcher(
      isAnyOf(
        getAllFiscalYear.rejected,
        getPrevious.rejected,
        getNext.rejected,
        getPageFiscalYear.rejected,
        handleSearch.rejected
      ),
      (state) => {
        state.loading = false;
      }
    );
  },
});

export default fiscalYearSlice.reducer;
