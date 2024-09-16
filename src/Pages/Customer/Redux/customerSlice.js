import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createCustomers, getAllCustomers, getCustomers, getNext, handleSearch, updateCustomers } from "./thunk";

const initialState = {
  customers: [],
  customer: null,
  edit: false,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
  loadingCustomer: false,
  loadingNext: false,
};

export const customersSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    customersEditSuccess: (state, action) => {
      state.edit = true;
      state.customer = state.customers.find((customer) => customer._id === action.payload);
    },
    clearAllCustomer: (state) => {
      state.edit = false;
      state.loading = false;
      state.loadingUpdated = false;
      state.loadingCustomer = false;
      state.customer = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNext.pending, (state) => {
      state.loadingNext = true;
    });
    builder.addCase(getNext.fulfilled, (state, action) => {
      state.loadingNext = false;
      state.customers = [...state.customers, ...action.payload.customers];
      state.next = action.payload.hasNextPage;
    });
    builder.addCase(getNext.rejected, (state) => {
      state.loadingNext = false;
    });
    builder.addCase(createCustomers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCustomers.fulfilled, (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(createCustomers.rejected, (state) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(updateCustomers.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(updateCustomers.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.edit = false;
    });
    builder.addCase(updateCustomers.rejected, (state) => {
      state.loadingUpdated = false;
    });
    builder.addMatcher(isAnyOf(getCustomers.pending, getAllCustomers.pending, handleSearch.pending), (state) => {
      state.loadingCustomer = true;
    });
    builder.addMatcher(
      isAnyOf(getCustomers.fulfilled, getAllCustomers.fulfilled, handleSearch.fulfilled),
      (state, action) => {
        state.loadingCustomer = false;
        state.customers = action.payload?.customers;
        state.count = action.payload.total;
        state.count = action.payload.totalCount;
        state.previous = action.payload?.previous;
        state.next = action.payload?.hasNextPage;
      }
    );
    builder.addMatcher(isAnyOf(getCustomers.rejected, getAllCustomers.rejected, handleSearch.rejected), (state) => {
      state.loadingCustomer = false;
    });
  },
});

export const { customersEditSuccess, clearAllCustomer } = customersSlice.actions;

export default customersSlice.reducer;
