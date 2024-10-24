import { createSlice } from "@reduxjs/toolkit";
import { getProducts, createProduct, updateProduct } from "./thunk";

// initialState
const initialState = {
  products: [],
  count: null,
  next: null,
  previous: null,
  currentPage: null, // Add current page for tracking
  totalPages: null, // Add total pages for tracking
  loading: false,
  error: null,
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle getProducts thunk states
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      console.log("Payload from API:", action.payload);
      state.loading = false;

      // Store products and pagination info
      state.products = action.payload.products; // The product list
      state.count = action.payload.pagination?.count || 0; // Total product count
      state.next = action.payload.pagination.next; // Next page link
      state.previous = action.payload.pagination.previous; // Previous page link
      state.currentPage = action.payload.pagination.currentPage; // Current page number
      state.totalPages = action.payload.pagination.totalPages; // Total number of pages

      state.error = null;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message || "Failed to fetch products";
    });

    // Handle createProduct thunk states
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products.push(action.payload);
      state.error = null;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to create product";
    });

    // Handle updateProduct thunk states
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      const updatedProduct = action.payload;

      // Find the index of the product being updated and replace it
      const index = state.products.findIndex((product) => product.id === updatedProduct.id);
      if (index !== -1) {
        state.products[index] = updatedProduct; // Update product details in the list
      }
      state.error = null;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to update product";
    });
  },
});

export default ProductSlice.reducer;
