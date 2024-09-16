import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import {
  createSalesDetails,
  getAllSalesDetails,
  getSalesDetails,
  getNext,
  handleSearch,
  updateSalesDetails,
  getSpecificSalesDetails,
} from "./thunk";

const initialState = {
  salesDetails: [],
  salesDetail: null,
  edit: false,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
  loadingSalesDetail: false,
  loadingNext: false,
  itemdetails: [],
  itemdetail: null,
};

export const SalesDetailsSlice = createSlice({
  name: "salesDetail",
  initialState,
  reducers: {
    SalesDetailsSliceEditSuccess: (state, action) => {
      state.edit = true;
      state.salesDetail = state.salesDetails.find((salesDetail) => salesDetail._id === action.payload);
    },
    clearAllSalesDetail: (state) => {
      state.edit = false;
      state.loading = false;
      state.loadingUpdated = false;
      state.loadingSalesDetail = false;
      state.salesDetail = null;
      state.itemdetails = [];
    },
    addItem: (state, action) => {
      state.itemdetails = [...state.itemdetails, action.payload];
    },
    updateSaleDetailItem: (state, action) => {
      state.itemdetail = state.itemdetails.find((saleDetail) => saleDetail === action.payload.updatedValues);
    },
    updateItem: (state, action) => {
      console.log(action.payload, "hello");

      state.itemdetail = state.itemdetails.find((saleDetail) => saleDetail === action.payload.updatedValues);
    },
    deleteItem: (state, action) => {
      state.itemdetails = state.itemdetails.filter((_, i) => i !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSpecificSalesDetails.pending, (state) => {});
    builder.addCase(getSpecificSalesDetails.fulfilled, (state, action) => {
      state.itemdetails = [...state.itemdetails, ...action.payload?.saleDetails];
    });
    builder.addCase(getSpecificSalesDetails.rejected, (state) => {});

    builder.addCase(getNext.pending, (state) => {
      state.loadingNext = true;
    });
    builder.addCase(getNext.fulfilled, (state, action) => {
      state.loadingNext = false;
      state.next = action.payload.nextPageUrl;
    });
    builder.addCase(getNext.rejected, (state) => {
      state.loadingNext = false;
    });
    builder.addCase(createSalesDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createSalesDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(createSalesDetails.rejected, (state) => {
      state.loading = false;
      state.edit = false;
    });

    builder.addCase(updateSalesDetails.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(updateSalesDetails.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.edit = false;
    });
    builder.addCase(updateSalesDetails.rejected, (state) => {
      state.loadingUpdated = false;
    });
    builder.addMatcher(isAnyOf(getSalesDetails.pending, handleSearch.pending), (state) => {
      state.loadingSalesDetail = true;
    });
    builder.addMatcher(
      isAnyOf(getSalesDetails.fulfilled, getAllSalesDetails.fulfilled, handleSearch.fulfilled),
      (state, action) => {
        state.loadingSalesDetail = false;
        state.salesDetails = action.payload?.salesDetails;
        state.count = action.payload;
        state.previous = action.payload?.previous;
        state.next = action.payload?.nextPageUrl;
      }
    );
    builder.addMatcher(
      isAnyOf(getSalesDetails.rejected, getAllSalesDetails.rejected, handleSearch.rejected),
      (state) => {
        state.loadingSalesDetail = false;
      }
    );
  },
});

export const {
  SalesDetailsSliceEditSuccess,
  clearAllSalesDetail,
  addItem,
  deleteItem,
  updateSaleDetailItem,
  updateItem,
} = SalesDetailsSlice.actions;

export default SalesDetailsSlice.reducer;
