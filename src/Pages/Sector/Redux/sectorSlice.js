import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createSectors, getSectors, getNext, handleSearch, updateSectors } from "./thunk";

const initialState = {
  sectors: [],
  sector: null,
  edit: false,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
  loadingSectors: false,
  loadingNext: false,
};

export const sectors = createSlice({
  name: "sectors",
  initialState,
  reducers: {
    sectorsEditSuccess: (state, action) => {
      state.edit = true;
      state.sector = state.sectors.find((sector) => sector.id === action.payload);
    },
    clearAllSectors: (state) => {
      state.edit = false;
      state.loading = false;
      state.loadingUpdated = false;
      state.loadingSectors = false;
      state.sector = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNext.pending, (state) => {
      state.loadingNext = true;
    });
    builder.addCase(getNext.fulfilled, (state, action) => {
      state.loadingNext = false;
      state.sectors = [...state.sectors, ...action.payload.results];
      state.next = action.payload.next;
    });
    builder.addCase(getNext.rejected, (state) => {
      state.loadingNext = false;
    });
    builder.addCase(createSectors.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createSectors.fulfilled, (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(createSectors.rejected, (state) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(updateSectors.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(updateSectors.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.edit = false;
    });
    builder.addCase(updateSectors.rejected, (state) => {
      state.loadingUpdated = false;
    });
    builder.addMatcher(isAnyOf(getSectors.pending, handleSearch.pending), (state) => {
      state.loadingSectors = true;
    });
    builder.addMatcher(isAnyOf(getSectors.fulfilled, handleSearch.fulfilled), (state, action) => {
      state.loadingSectors = false;
      state.sectors = action.payload.results;
      state.count = action.payload.count;
      state.previous = action.payload.previous;
      state.next = action.payload.next;
    });
    builder.addMatcher(isAnyOf(getSectors.rejected, handleSearch.rejected), (state) => {
      state.loadingSectors = false;
    });
  },
});

export const { sectorsEditSuccess, clearAllSectors } = sectors.actions;

export default sectors.reducer;
