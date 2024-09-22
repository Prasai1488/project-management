import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getCountry,
  getAllCountry,
  getNext,
  getPrevious,
  getPageCountry,
  createCountry,
  updateCountry,
  handleSearch,
  deletePhoto,
} from "./thunk";

const initialState = {
  countries: [],
  edit: false,
  country: null,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
  loadingCountry: false,
};

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    countryEditSuccess: (state, action) => {
      state.edit = true;
      state.country = state.countries.find((country) => country.id === action.payload);
    },
    clearAllCountry: (state) => {
      state.edit = false;
      state.loading = false;
      state.loadingUpdated = false;
      state.loadingCountry = false;
      state.country = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCountry.pending, (state) => {
      state.loadingCountry = true;
    });
    builder.addCase(getCountry.fulfilled, (state, action) => {
      state.loadingCountry = false;
      state.edit = false;
      state.countries = action.payload.results;
      state.count = action.payload.count;
      state.previous = action.payload.previous;
      state.next = action.payload.next;
    });
    builder.addCase(getCountry.rejected, (state) => {
      state.loadingCountry = false;
      state.edit = false;
    });
    builder.addCase(createCountry.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCountry.fulfilled, (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(createCountry.rejected, (state) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(updateCountry.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(updateCountry.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.edit = false;
    });
    builder.addCase(updateCountry.rejected, (state) => {
      state.loadingUpdated = false;
    });
    builder.addCase(deletePhoto.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(deletePhoto.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.country = action.payload;
    });
    builder.addCase(deletePhoto.rejected, (state) => {
      state.loadingUpdated = false;
    });
    builder.addMatcher(
      isAnyOf(
        getAllCountry.pending,
        getPrevious.pending,
        getNext.pending,
        getPageCountry.pending,
        handleSearch.pending
      ),
      (state) => {
        state.loadingCountry = true;
      }
    );
    builder.addMatcher(
      isAnyOf(
        getAllCountry.fulfilled,
        getPrevious.fulfilled,
        getNext.fulfilled,
        getPageCountry.fulfilled,
        handleSearch.fulfilled
      ),
      (state, action) => {
        state.loadingCountry = false;
        state.countries = action.payload.results;
        state.count = action.payload.count;
        state.previous = action.payload.previous;
        state.next = action.payload.next;
      }
    );
    builder.addMatcher(
      isAnyOf(
        getAllCountry.rejected,
        getPrevious.rejected,
        getNext.rejected,
        getPageCountry.rejected,
        handleSearch.rejected
      ),
      (state) => {
        state.loadingCountry = false;
      }
    );
  },
});

export const { countryEditSuccess, clearAllCountry } = countrySlice.actions;

export default countrySlice.reducer;
