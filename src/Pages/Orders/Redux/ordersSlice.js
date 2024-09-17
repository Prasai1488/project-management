import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createOrders, getAllOrders, getOrders, getNext, handleSearch, updateOrders, getSpecificOrders } from "./thunk";

const initialState = {
  orders: [],
  order: null,
  edit: false,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
  loadingOrder: false,
  loadingNext: false,
};

export const orders = createSlice({
  name: "order",
  initialState,
  reducers: {
    ordersEditSuccess: (state, action) => {
      state.edit = true;
      state.order = action.payload;
    },
    clearAllOrder: (state) => {
      state.edit = false;
      state.loading = false;
      state.loadingUpdated = false;
      state.loadingOrder = false;
      state.order = null;
    },
    clearEditOrder: (state) => {
      state.edit = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNext.pending, (state) => {
      state.loadingNext = true;
    });
    builder.addCase(getNext.fulfilled, (state, action) => {
      state.loadingNext = false;
      state.orders = [...state.orders, ...action.payload?.orders];
      state.next = action.payload;
    });
    builder.addCase(getNext.rejected, (state) => {
      state.loadingNext = false;
    });
    builder.addCase(createOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(createOrders.rejected, (state) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(getSpecificOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSpecificOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    });
    builder.addCase(getSpecificOrders.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateOrders.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(updateOrders.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.edit = false;
    });
    builder.addCase(updateOrders.rejected, (state) => {
      state.loadingUpdated = false;
    });
    builder.addMatcher(isAnyOf(getOrders.pending, handleSearch.pending), (state) => {
      state.loadingOrder = true;
    });
    builder.addMatcher(
      isAnyOf(getOrders.fulfilled, getAllOrders.fulfilled, handleSearch.fulfilled),
      (state, action) => {
        state.loadingOrder = false;
        state.orders = action.payload?.orders;
        state.count = action.payload.totalCount;
        state.previous = action.payload?.previous;
        state.next = action.payload;
      }
    );
    builder.addMatcher(isAnyOf(getOrders.rejected, getAllOrders.rejected, handleSearch.rejected), (state) => {
      state.loadingOrder = false;
    });
  },
});

export const { ordersEditSuccess, clearAllOrder, clearEditOrder } = orders.actions;

export default orders.reducer;
