import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createContactPersons,
  getAllContactPersons,
  getContactPersons,
  getNext,
  handleSearch,
  updateContactPersons,
} from "./thunk";

const initialState = {
  contactPersons: [],
  contactPerson: null,
  edit: false,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
  loadingContactPerson: false,
  loadingNext: false,
};

export const contactPersonsSlice = createSlice({
  name: "contactPerson",
  initialState,
  reducers: {
    contactPersonsEditSuccess: (state, action) => {
      state.edit = true;
      state.contactPerson = state.contactPersons.find((contactPerson) => contactPerson._id === action.payload);
    },
    clearAllContactPerson: (state) => {
      state.edit = false;
      state.loading = false;
      state.loadingUpdated = false;
      state.loadingContactPerson = false;
      state.contactPerson = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNext.pending, (state) => {
      state.loadingNext = true;
    });
    builder.addCase(getNext.fulfilled, (state, action) => {
      state.loadingNext = false;
      state.contactPersons = [...state.contactPersons, ...action.payload?.contactPersons];
      state.next = action.payload.nextPageUrl;
    });
    builder.addCase(getNext.rejected, (state) => {
      state.loadingNext = false;
    });    
    builder.addCase(createContactPersons.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createContactPersons.fulfilled, (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(createContactPersons.rejected, (state) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(updateContactPersons.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(updateContactPersons.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.edit = false;
    });
    builder.addCase(updateContactPersons.rejected, (state) => {
      state.loadingUpdated = false;
    });
    builder.addMatcher(
      isAnyOf(getContactPersons.pending, getAllContactPersons.pending, handleSearch.pending),
      (state) => {
        state.loadingContactPerson = true;
      }
    );
    builder.addMatcher(
      isAnyOf(getContactPersons.fulfilled, getAllContactPersons.fulfilled, handleSearch.fulfilled),
      (state, action) => {
        state.loadingContactPerson = false;
        state.contactPersons = action.payload?.contactPersons;
        state.count = action.payload.totalCount;
        state.previous = action.payload?.previous;
        state.next = action?.payload?.nextPageUrl;
      }
    );
    builder.addMatcher(
      isAnyOf(getContactPersons.rejected, getAllContactPersons.rejected, handleSearch.rejected),
      (state) => {
        state.loadingContactPerson = false;
      }
    );
  },
});

export const { contactPersonsEditSuccess, clearAllContactPerson } = contactPersonsSlice.actions;

export default contactPersonsSlice.reducer;
