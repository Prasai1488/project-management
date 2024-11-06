import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createProduct,
  deletePhoto,
  deleteProduct,
  getCurrentProduct,
  getNext,
  getSpecificProduct,
  getProduct,
  handleSearch,
  updateProduct,
} from "./thunk";

const initialState = {
  products: [],
  edit: false,
  product: null,
  productInfo: null,
  count: null,
  currentPage: 1,
  totalPages: 1,
  next: null,
  previous: null,
  loading: false,
  loadingCurrent: false,
  loadingProduct: false,
  loadingUpdated: false,
  loadingSpecific: true,
  loadingNext: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productEditSuccess: (state, action) => {
      state.edit = true;
      state.product = action.payload;
      state.loading = false;
      state.loadingUpdated = false;
    },
    clearEditProduct: (state) => {
      state.edit = false;
      state.product = null;
      state.loading = false;
      state.loadingProduct = false;
      state.loadingUpdated = false;
    },
  },

  extraReducers: (builder) => {
    // First, handle all individual cases
    builder
      // getNext cases
      .addCase(getNext.pending, (state) => {
        state.loadingNext = true;
      })
      .addCase(getNext.fulfilled, (state, action) => {
        state.loadingNext = false;
        state.products = [...state.products, ...action.payload.results];
        state.count = action.payload.count;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
      })
      .addCase(getNext.rejected, (state) => {
        state.loadingNext = false;
      })

      // getCurrentProduct cases
      .addCase(getCurrentProduct.pending, (state) => {
        state.loadingCurrent = true;
      })
      .addCase(getCurrentProduct.fulfilled, (state, action) => {
        state.loadingCurrent = false;
        state.productInfo = action.payload.data;
      })
      .addCase(getCurrentProduct.rejected, (state) => {
        state.loadingCurrent = false;
      })

      // updateProduct cases
      .addCase(updateProduct.pending, (state) => {
        state.loadingUpdated = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loadingUpdated = false;
        state.edit = false;

        const updatedProduct = action.payload.data;
        const index = state.products.findIndex((product) => product.id === updatedProduct.id);

        if (index !== -1) {
          state.products[index] = updatedProduct;
        } else {
          state.products = [updatedProduct, ...state.products];
        }
      })
      .addCase(updateProduct.rejected, (state) => {
        state.loadingUpdated = false;
      })

      // getSpecificProduct cases
      .addCase(getSpecificProduct.pending, (state) => {
        state.loadingSpecific = true;
      })
      .addCase(getSpecificProduct.fulfilled, (state, action) => {
        state.loadingSpecific = false;
        state.product = action.payload.data;
      })
      .addCase(getSpecificProduct.rejected, (state) => {
        state.loadingSpecific = false;
      })

      // deletePhoto cases
      .addCase(deletePhoto.pending, (state) => {
        state.loadingUpdated = true;
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.loadingUpdated = false;
        state.product = action.payload;
      })
      .addCase(deletePhoto.rejected, (state) => {
        state.loadingUpdated = false;
      })

      // createProduct cases
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.edit = false;

        const newProduct = action.payload.data;
        if (newProduct) {
          state.products = [newProduct, ...state.products];
        } else {
          console.error("New product data is invalid:", action.payload);
        }
      })
      .addCase(createProduct.rejected, (state) => {
        state.loading = false;
        state.edit = false;
      })

      // deleteProduct cases
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.edit = false;
        const deletedProductId = action.meta.arg;
        state.products = state.products.filter((product) => product.id !== deletedProductId);
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.loading = false;
        state.edit = false;
      })

      // Then, add all matchers after all cases
      .addMatcher(isAnyOf(getProduct.pending, handleSearch.pending), (state) => {
        state.loadingProduct = true;
      })
      .addMatcher(isAnyOf(getProduct.fulfilled, handleSearch.fulfilled), (state, action) => {
        state.loadingProduct = false;
        state.products = action.payload.results;
        state.count = action.payload.count;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.previous = action.payload.previous;
        state.next = action.payload.next;
      })
      .addMatcher(isAnyOf(getProduct.rejected, handleSearch.rejected), (state) => {
        state.loadingProduct = false;
      });
  },
});

export const { productEditSuccess, clearEditProduct } = productSlice.actions;

export default productSlice.reducer;
