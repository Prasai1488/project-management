import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createManufacturers,
  getAllManufacturers,
  getManufacturers,
  getNext,
  handleSearch,
  updateManufacturers,
} from "./thunk";

const initialState = {
  manufacturers: [],
  manufacturer: null,
  edit: false,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
  loadingManufacturer: false,
  loadingNext: false,
};

export const manufacturersSlice = createSlice({
  name: "manufacturer",
  initialState,
  reducers: {
    manufacturersEditSuccess: (state, action) => {
      state.edit = true;
      state.manufacturer = state.manufacturers.find((manufacturer) => manufacturer._id === action.payload);
    },
    clearAllManufacturer: (state) => {
      state.edit = false;
      state.loading = false;
      state.loadingUpdated = false;
      state.loadingManufacturer = false;
      state.manufacturer = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNext.pending, (state) => {
      state.loadingNext = true;
    });
    builder.addCase(getNext.fulfilled, (state, action) => {
      state.loadingNext = false;
      state.manufacturers = [...state.manufacturers, ...action.payload.manufacturers];
      state.next = action.payload.next;
    });
    builder.addCase(getNext.rejected, (state) => {
      state.loadingNext = false;
    });
    builder.addCase(createManufacturers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createManufacturers.fulfilled, (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(createManufacturers.rejected, (state) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(updateManufacturers.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(updateManufacturers.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.edit = false;
    });
    builder.addCase(updateManufacturers.rejected, (state) => {
      state.loadingUpdated = false;
    });
    builder.addMatcher(
      isAnyOf(getManufacturers.pending, getAllManufacturers.pending, handleSearch.pending),
      (state) => {
        state.loadingManufacturer = true;
      }
    );
    builder.addMatcher(
      isAnyOf(getManufacturers.fulfilled, getAllManufacturers.fulfilled, handleSearch.fulfilled),
      (state, action) => {
        state.loadingManufacturer = false;
        state.manufacturers = action.payload?.manufacturers;
        state.count = action.payload.totalCount;
        state.previous = action.payload?.previous;
        state.next = action.payload?.nextPageUrl;
      }
    );
    builder.addMatcher(
      isAnyOf(getManufacturers.rejected, getAllManufacturers.rejected, handleSearch.rejected),
      (state) => {
        state.loadingManufacturer = false;
      }
    );
  },
});

export const { manufacturersEditSuccess, clearAllManufacturer } = manufacturersSlice.actions;

export default manufacturersSlice.reducer;
