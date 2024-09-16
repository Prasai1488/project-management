import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getFiscalSessionAD,
  getAllFiscalSessionAD,
  getNext,
  getPrevious,
  getPageFiscalSessionAD,
  createFiscalSessionAD,
  handleSearch,
} from "./thunk";

const initialState = {
  fiscalSessionsAD: [],
  edit: false,
  fiscalSessionAD: null,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingFiscalSessionAD: false,
};

export const fiscalSessionADSlice = createSlice({
  name: "fiscalSessionAD",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getFiscalSessionAD.pending, (state) => {
      state.loadingFiscalSessionAD = true;
    });
    builder.addCase(getFiscalSessionAD.fulfilled, (state, action) => {
      state.loadingFiscalSessionAD = false;
      state.edit = false;
      state.fiscalSessionsAD = action.payload.results;
      state.count = action.payload.count;
      state.previous = action.payload.previous;
      state.next = action.payload.next;
    });
    builder.addCase(getFiscalSessionAD.rejected, (state) => {
      state.loadingFiscalSessionAD = false;
      state.edit = false;
    });
    builder.addCase(createFiscalSessionAD.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createFiscalSessionAD.fulfilled, (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(createFiscalSessionAD.rejected, (state) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addMatcher(
      isAnyOf(
        getAllFiscalSessionAD.pending,
        getPrevious.pending,
        getNext.pending,
        getPageFiscalSessionAD.pending,
        handleSearch.pending
      ),
      (state) => {
        state.loadingFiscalSessionAD = true;
      }
    );
    builder.addMatcher(
      isAnyOf(
        getAllFiscalSessionAD.fulfilled,
        getPrevious.fulfilled,
        getNext.fulfilled,
        getPageFiscalSessionAD.fulfilled,
        handleSearch.fulfilled
      ),
      (state, action) => {
        state.loadingFiscalSessionAD = false;
        state.fiscalSessionsAD = action.payload.results;
        state.count = action.payload.count;
        state.previous = action.payload.previous;
        state.next = action.payload.next;
      }
    );
    builder.addMatcher(
      isAnyOf(
        getAllFiscalSessionAD.rejected,
        getPrevious.rejected,
        getNext.rejected,
        getPageFiscalSessionAD.rejected,
        handleSearch.rejected
      ),
      (state) => {
        state.loadingFiscalSessionAD = false;
      }
    );
  },
});

export default fiscalSessionADSlice.reducer;
