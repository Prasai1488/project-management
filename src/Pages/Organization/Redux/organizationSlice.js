import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createOrganization as apiCreateOrganization,
  updateOrganization as apiUpdateOrganization, // Renamed to avoid conflict
  getAllOrganizations,
  getOrganizations,
  getNextOrganization,
  handleOrganizationSearch,
  getSpecificOrganization,
} from "./thunk";

const initialState = {
  organizations: [],
  organization: null,
  edit: false,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
  loadingOrganization: false,
  loadingNext: false,
};

export const organizations = createSlice({
  name: "organization",
  initialState,
  reducers: {
    organizationEditSuccess: (state, action) => {
      state.edit = true;
      state.organization = action.payload;
    },
    clearAllOrganization: (state) => {
      state.edit = false;
      state.loading = false;
      state.loadingUpdated = false;
      state.loadingOrganization = false;
      state.organization = null;
      state.organizations = [];
    },
    clearEditOrganization: (state) => {
      state.edit = false;
    },
    addOrganization: (state, action) => {
      state.organizations = [...state.organizations, action.payload];
    },
    updateOrganization: (state, action) => {
      // Avoiding conflict with thunk imports
      const index = state.organizations.findIndex((organization) => organization.id === action.payload.id);
      if (index !== -1) {
        state.organizations[index] = action.payload.updatedOrganization;
      }
    },
    deleteOrganization: (state, action) => {
      state.organizations = state.organizations.filter((organization) => organization.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNextOrganization.pending, (state) => {
      state.loadingNext = true;
    });
    builder.addCase(getNextOrganization.fulfilled, (state, action) => {
      state.loadingNext = false;
      state.organizations = [...state.organizations, ...action.payload?.organizations];
      state.next = action.payload;
    });
    builder.addCase(getNextOrganization.rejected, (state) => {
      state.loadingNext = false;
    });
    builder.addCase(apiCreateOrganization.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(apiCreateOrganization.fulfilled, (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(apiCreateOrganization.rejected, (state) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(getSpecificOrganization.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSpecificOrganization.fulfilled, (state, action) => {
      state.loading = false;
      state.organization = action.payload;
    });
    builder.addCase(getSpecificOrganization.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(apiUpdateOrganization.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(apiUpdateOrganization.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.edit = false;
    });
    builder.addCase(apiUpdateOrganization.rejected, (state) => {
      state.loadingUpdated = false;
    });
    builder.addMatcher(isAnyOf(getOrganizations.pending, handleOrganizationSearch.pending), (state) => {
      state.loadingOrganization = true;
    });
    builder.addMatcher(
      isAnyOf(getOrganizations.fulfilled, getAllOrganizations.fulfilled, handleOrganizationSearch.fulfilled),
      (state, action) => {
        state.loadingOrganization = false;
        state.organizations = action.payload?.organizations;
        state.count = action.payload.totalCount;
        state.previous = action.payload?.previous;
        state.next = action.payload;
      }
    );
    builder.addMatcher(
      isAnyOf(getOrganizations.rejected, getAllOrganizations.rejected, handleOrganizationSearch.rejected),
      (state) => {
        state.loadingOrganization = false;
      }
    );
  },
});

export const {
  organizationEditSuccess,
  clearAllOrganization,
  clearEditOrganization,
  addOrganization,
  updateOrganization, // Correctly defined without conflict
  deleteOrganization,
} = organizations.actions;

export default organizations.reducer;
