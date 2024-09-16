import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createSales, getAllSales, getSales, getNext, handleSearch, updateSales, getSpecificSale } from "./thunk";
import { clearAllSalesDetail } from "../../SaleDetails/Redux/salesDetailsSlice";
const initialState = {
  sales: [],
  sale: null,
  edit: false,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
  loadingSale: false,
  loadingNext: false,
};

export const sales = createSlice({
  name: "sale",
  initialState,
  reducers: {
    salesEditSuccess: (state, action) => {
      state.edit = true;
      state.loading = false;
      state.sale = action.payload;
    },

    clearAllSale: (state) => {
      state.edit = false;
      state.loading = false;
      state.loadingUpdated = false;
      state.loadingSale = false;
      state.sale = null;
    },

    clearEditSale: (state) => {
      state.edit = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getNext.pending, (state) => {
      state.loadingNext = true;
    });
    builder.addCase(getNext.fulfilled, (state, action) => {
      state.loadingNext = false;
      state.sales = [...state.sales, ...action.payload?.sales];
      state.next = action.payload.nextPageUrl;
    });
    builder.addCase(getNext.rejected, (state) => {
      state.loadingNext = false;
    });
    builder.addCase(createSales.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createSales.fulfilled, (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(createSales.rejected, (state) => {
      state.loading = false;
      state.edit = false;
    });

    builder.addCase(updateSales.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(updateSales.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.edit = false;
    });
    builder.addCase(updateSales.rejected, (state) => {
      state.loadingUpdated = false;
    });
    builder.addCase(getSpecificSale.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSpecificSale.fulfilled, (state, action) => {
      state.loading = false;

      state.ticket = action.payload;
    });
    builder.addCase(getSpecificSale.rejected, (state) => {
      state.loading = false;
    });

    builder.addMatcher(isAnyOf(getSales.pending, handleSearch.pending), (state) => {
      state.loadingSale = true;
    });
    builder.addMatcher(isAnyOf(getSales.fulfilled, getAllSales.fulfilled, handleSearch.fulfilled), (state, action) => {
      state.loadingSale = false;
      state.sales = action.payload?.sales;
      state.count = action.payload.totalCount;
      state.previous = action.payload?.previous;
      state.next = action.payload?.nextPageUrl;
    });
    builder.addMatcher(isAnyOf(getSales.rejected, getAllSales.rejected, handleSearch.rejected), (state) => {
      state.loadingSale = false;
    });
  },
});

export const { salesEditSuccess, clearAllSale, clearEditSale } = sales.actions;

export default sales.reducer;
