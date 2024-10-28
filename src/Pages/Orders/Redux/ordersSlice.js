import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createOrders,
  getAllOrders,
  getOrders,
  getNext,
  handleSearch,
  updateOrders,
  getSpecificOrders,
  getStatus,
} from "./thunk";

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
      Object.assign(state, initialState);
    },
    clearEditOrder: (state) => {
      state.edit = false;
      state.order = null;
    },
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    updateOrderState: (state, action) => {
      const index = state.orders.findIndex((order) => order.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = { ...state.orders[index], ...action.payload.updatedOrder };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.edit = false;
        state.orders.push(action.payload);
      })
      .addCase(createOrders.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getSpecificOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSpecificOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getSpecificOrders.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getStatus.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getNext.pending, (state) => {
        state.loadingNext = true;
      })
      .addCase(getNext.fulfilled, (state, action) => {
        state.loadingNext = false;
        state.orders = [...state.orders, ...action.payload?.orders];
        state.next = action.payload.nextPageUrl;
      })
      .addCase(getNext.rejected, (state) => {
        state.loadingNext = false;
      })

      .addCase(updateOrders.pending, (state) => {
        state.loadingUpdated = true;
      })
      .addCase(updateOrders.fulfilled, (state, action) => {
        state.loadingUpdated = false;
        state.edit = false;
        const index = state.orders.findIndex((order) => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = { ...state.orders[index], ...action.payload };
        }
      })
      .addCase(updateOrders.rejected, (state) => {
        state.loadingUpdated = false;
      })
      .addMatcher(isAnyOf(getOrders.pending, handleSearch.pending), (state) => {
        state.loadingOrder = true;
      })
      .addMatcher(isAnyOf(getOrders.fulfilled, getAllOrders.fulfilled, handleSearch.fulfilled), (state, action) => {
        state.loadingOrder = false;
        state.orders = action.payload?.data || [];
        state.count = action.payload?.totalCount || 0;
        state.previous = action.payload?.previous || null;
        state.next = action.payload?.next || null;
      })
      .addMatcher(isAnyOf(getOrders.rejected, getAllOrders.rejected, handleSearch.rejected), (state) => {
        state.loadingOrder = false;
      });
  },
});

export const { ordersEditSuccess, clearAllOrder, clearEditOrder, addOrder, updateOrderState } = orders.actions;

export default orders.reducer;
