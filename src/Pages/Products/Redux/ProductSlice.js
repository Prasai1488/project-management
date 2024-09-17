import { createSlice, isAnyOf } from "@reduxjs/toolkit";
// import {
//   createProduct,
//   deletePhoto,
//   deleteProduct,
//   getCurrentProduct,
//   getNext,
//   getSpecificProduct,
//   getProduct,
//   handleSearch,
//   updateProduct,
// } from "./thunk";

// initialState
const initialState = {
  products: [],
  edit: false,
  product: null,
  ProductInfo: null,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingCurrent: false,
  loadingProduct: false,
  loadingUpdated: false,
  loadingSpecific: true,
  loadingNext: false,
};

//
export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    ProductEditSuccess: (state, action) => {
      state.edit = true;
      state.Product = action.payload;
      state.loading = false;
      state.loadingUpdated = false;
    },
    clearEditProduct: (state) => {
      state.edit = false;
      state.Product = null;
      state.loading = false;
      state.loadingProduct = false;
      state.loadingUpdated = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getNext.pending, (state) => {
      state.loadingNext = true;
    });
    builder.addCase(getNext.fulfilled, (state, action) => {
      state.loadingNext = false;
      state.Products = [...state.Products, ...action.payload.results];
      state.next = action.payload.hasNextPage;
    });
    builder.addCase(getNext.rejected, (state) => {
      state.loadingNext = false;
    });

    builder.addCase(getCurrentProduct.pending, (state) => {
      state.loadingCurrent = true;
    });
    builder.addCase(getCurrentProduct.fulfilled, (state, action) => {
      state.loadingCurrent = false;
      state.ProductInfo = action.payload.results;
    });
    builder.addCase(getCurrentProduct.rejected, (state) => {
      state.loadingCurrent = false;
    });
    builder.addCase(updateProduct.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.edit = false;
    });
    builder.addCase(updateProduct.rejected, (state) => {
      state.loadingUpdated = false;
    });
    builder.addCase(getSpecificProduct.pending, (state) => {
      state.loadingSpecific = true;
    });
    builder.addCase(getSpecificProduct.fulfilled, (state, action) => {
      state.loadingSpecific = false;
      state.Product = action.payload.data;
    });
    builder.addCase(getSpecificProduct.rejected, (state) => {
      state.loadingSpecific = false;
    });
    builder.addCase(deletePhoto.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(deletePhoto.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.Product = action.payload;
    });
    builder.addCase(deletePhoto.rejected, (state) => {
      state.loadingUpdated = false;
    });
    builder.addMatcher(isAnyOf(getProduct.pending, handleSearch.pending), (state) => {
      state.loadingProduct = true;
    });
    builder.addMatcher(isAnyOf(getProduct.fulfilled, handleSearch.fulfilled), (state, action) => {
      state.loadingProduct = false;
      state.Products = action.payload.results;
      state.count = action.payload.totalCount;
      state.previous = action.payload.previous;
      state.next = action.payload.hasNextPage;
    });
    builder.addMatcher(isAnyOf(getProduct.rejected, handleSearch.rejected), (state) => {
      state.loadingProduct = false;
    });
    builder.addMatcher(isAnyOf(createProduct.pending, deleteProduct.pending), (state) => {
      state.loading = true;
    });
    builder.addMatcher(isAnyOf(createProduct.fulfilled, deleteProduct.fulfilled), (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addMatcher(isAnyOf(createProduct.rejected, deleteProduct.rejected), (state) => {
      state.loading = false;
      state.edit = false;
    });
  },
});

export const { ProductEditSuccess, clearEditProduct } = ProductSlice.actions;

export default productSlice.reducer;