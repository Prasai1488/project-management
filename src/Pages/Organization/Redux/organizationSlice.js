import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getOrganization,
  getAllOrganization,
  getNext,
  getPrevious,
  getPageOrganization,
  createOrganization,
  updateOrganization,
  handleSearch,
} from "./thunk";

const initialState = {
  organizations: [],
  edit: false,
  organization: null,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
  loadingOrganization: false,
};

export const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    organizationEditSuccess: (state, action) => {
      state.edit = true;
      state.organization = state.organizations.find(
        (org) => org.id === action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrganization.pending, (state) => {
      state.loadingOrganization = true;
    });
    builder.addCase(getOrganization.fulfilled, (state, action) => {
      state.loadingOrganization = false;
      state.edit = false;
      state.organizations = action.payload.results;
      state.count = action.payload.count;
      state.previous = action.payload.previous;
      state.next = action.payload.next;
    });
    builder.addCase(getOrganization.rejected, (state) => {
      state.loadingOrganization = false;
      state.edit = false;
    });
    builder.addCase(createOrganization.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createOrganization.fulfilled, (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(createOrganization.rejected, (state) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(updateOrganization.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(updateOrganization.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.edit = false;
    });
    builder.addCase(updateOrganization.rejected, (state) => {
      state.loadingUpdated = false;
      state.edit = false;
    });
    builder.addMatcher(
      isAnyOf(
        getAllOrganization.pending,
        getPrevious.pending,
        getNext.pending,
        getPageOrganization.pending,
        handleSearch.pending
      ),
      (state) => {
        state.loadingOrganization = true;
      }
    );
    builder.addMatcher(
      isAnyOf(
        getAllOrganization.fulfilled,
        getPrevious.fulfilled,
        getNext.fulfilled,
        getPageOrganization.fulfilled,
        handleSearch.fulfilled
      ),
      (state, action) => {
        state.loadingOrganization = false;
        state.organizations = action.payload.results;
        state.count = action.payload.count;
        state.previous = action.payload.previous;
        state.next = action.payload.next;
      }
    );
    builder.addMatcher(
      isAnyOf(
        getAllOrganization.rejected,
        getPrevious.rejected,
        getNext.rejected,
        getPageOrganization.rejected,
        handleSearch.rejected
      ),
      (state) => {
        state.loadingOrganization = false;
      }
    );
  },
});
export const { organizationEditSuccess } = organizationSlice.actions;
export default organizationSlice.reducer;
