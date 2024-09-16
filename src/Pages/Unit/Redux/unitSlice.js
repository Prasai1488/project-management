import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createUnits, getAllUnits, getUnits, getNext, handleSearch, updateUnits } from "./thunk";

const initialState = {
  units: [],
  unit: null,
  edit: false,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
  loadingUnit: false,
  loadingNext: false,
};

export const unitsSlice = createSlice({
  name: "unit",
  initialState,
  reducers: {
    unitsEditSuccess: (state, action) => {
      state.edit = true;
      state.unit = state.units.find((unit) => unit._id === action.payload);
    },
    clearAllUnit: (state) => {
      state.edit = false;
      state.loading = false;
      state.loadingUpdated = false;
      state.loadingUnit = false;
      state.unit = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNext.pending, (state) => {
      state.loadingNext = true;
    });
    builder.addCase(getNext.fulfilled, (state, action) => {
      state.loadingNext = false;
      state.units = [...state.units, ...action.payload.units];
      state.next = action.payload.nextPageUrl;
    });
    builder.addCase(getNext.rejected, (state) => {
      state.loadingNext = false;
    });
    builder.addCase(createUnits.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createUnits.fulfilled, (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(createUnits.rejected, (state) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(updateUnits.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(updateUnits.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.edit = false;
    });
    builder.addCase(updateUnits.rejected, (state) => {
      state.loadingUpdated = false;
    });
    builder.addMatcher(isAnyOf(getUnits.pending, getAllUnits.pending, handleSearch.pending), (state) => {
      state.loadingUnit = true;
    });
    builder.addMatcher(isAnyOf(getUnits.fulfilled, getAllUnits.fulfilled, handleSearch.fulfilled), (state, action) => {
      state.loadingUnit = false;
      state.units = action.payload?.units;
      state.count = action.payload.totalCount;
      state.previous = action.payload?.previous;
      state.next = action.payload?.nextPageUrl;
    });
    builder.addMatcher(isAnyOf(getUnits.rejected, getAllUnits.rejected, handleSearch.rejected), (state) => {
      state.loadingUnit = false;
    });
  },
});

export const { unitsEditSuccess, clearAllUnit } = unitsSlice.actions;

export default unitsSlice.reducer;
