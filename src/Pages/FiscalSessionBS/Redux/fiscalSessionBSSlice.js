import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getFiscalSessionBS,
  getAllFiscalSessionBS,
  getNext,
  getPrevious,
  getPageFiscalSessionBS,
  createFiscalSessionBS,
  handleSearch,
} from "./thunk";

const initialState = {
  fiscalSessionsBS: [],
  edit: false,
  fiscalSessionBS: null,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingFiscalSessionBS: false,
};

export const fiscalSessionBSSlice = createSlice({
  name: "fiscalSessionBS",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getFiscalSessionBS.pending, (state) => {
      state.loadingFiscalSessionBS = true;
    });
    builder.addCase(getFiscalSessionBS.fulfilled, (state, action) => {
      state.loadingFiscalSessionBS = false;
      state.edit = false;
      state.fiscalSessionsBS = action.payload.results;
      state.count = action.payload.count;
      state.previous = action.payload.previous;
      state.next = action.payload.next;
    });
    builder.addCase(getFiscalSessionBS.rejected, (state) => {
      state.loadingFiscalSessionBS = false;
      state.edit = false;
    });
    builder.addCase(createFiscalSessionBS.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createFiscalSessionBS.fulfilled, (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(createFiscalSessionBS.rejected, (state) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addMatcher(
      isAnyOf(
        getAllFiscalSessionBS.pending,
        getPrevious.pending,
        getNext.pending,
        getPageFiscalSessionBS.pending,
        handleSearch.pending
      ),
      (state) => {
        state.loadingFiscalSessionBS = true;
      }
    );
    builder.addMatcher(
      isAnyOf(
        getAllFiscalSessionBS.fulfilled,
        getPrevious.fulfilled,
        getNext.fulfilled,
        getPageFiscalSessionBS.fulfilled,
        handleSearch.fulfilled
      ),
      (state, action) => {
        state.loadingFiscalSessionBS = false;
        state.fiscalSessionsBS = action.payload.results;
        state.count = action.payload.count;
        state.previous = action.payload.previous;
        state.next = action.payload.next;
      }
    );
    builder.addMatcher(
      isAnyOf(
        getAllFiscalSessionBS.rejected,
        getPrevious.rejected,
        getNext.rejected,
        getPageFiscalSessionBS.rejected,
        handleSearch.rejected
      ),
      (state) => {
        state.loadingFiscalSessionBS = false;
      }
    );
  },
});

export default fiscalSessionBSSlice.reducer;
