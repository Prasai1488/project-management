// import { createSlice, isAnyOf } from "@reduxjs/toolkit";
// import { getProducts } from "./thunk";

// // initialState
// const initialState = {
//   products: [],
//   edit: false,
//   product: null,
//   ProductInfo: null,
//   count: null,
//   next: null,
//   previous: null,
//   loading: false,
//   loadingCurrent: false,
//   loadingProduct: false,
//   loadingUpdated: false,
//   loadingSpecific: true,
//   loadingNext: false,
// };

// export const ProductSlice = createSlice({
//   name: "product",
//   initialState,
//   reducers: {
//     ProductEditSuccess: (state, action) => {
//       state.edit = true;
//       state.product = action.payload;
//       state.loading = false;
//       state.loadingUpdated = false;
//     },
//     clearEditProduct: (state) => {
//       state.edit = false;
//       state.product = null;
//       state.loading = false;
//       state.loadingProduct = false;
//       state.loadingUpdated = false;
//     },
//   },

//   extraReducers: (builder) => {
//     // Handle getProducts thunk states
//     builder.addCase(getProducts.pending, (state) => {
//       state.loading = true; // Set loading state when fetching products
//     });
//     builder.addCase(getProducts.fulfilled, (state, action) => {
//       state.loading = false; // Clear loading state once products are fetched
//       state.products = action.payload.results; // Store fetched products in state
//       state.count = action.payload.totalCount; // Save the total count of products
//       state.next = action.payload.next; // Save pagination data (next)
//       state.previous = action.payload.previous; // Save pagination data (previous)
//     });
//     builder.addCase(getProducts.rejected, (state) => {
//       state.loading = false; // Clear loading state when request fails
//     });

//     // Other existing reducers for other thunks
//     builder.addCase(getNext.pending, (state) => {
//       state.loadingNext = true;
//     });
//     builder.addCase(getNext.fulfilled, (state, action) => {
//       state.loadingNext = false;
//       state.products = [...state.products, ...action.payload.results];
//       state.next = action.payload.hasNextPage;
//     });
//     builder.addCase(getNext.rejected, (state) => {
//       state.loadingNext = false;
//     });

//     builder.addCase(getCurrentProduct.pending, (state) => {
//       state.loadingCurrent = true;
//     });
//     builder.addCase(getCurrentProduct.fulfilled, (state, action) => {
//       state.loadingCurrent = false;
//       state.ProductInfo = action.payload.results;
//     });
//     builder.addCase(getCurrentProduct.rejected, (state) => {
//       state.loadingCurrent = false;
//     });
//     builder.addCase(updateProduct.pending, (state) => {
//       state.loadingUpdated = true;
//     });
//     builder.addCase(updateProduct.fulfilled, (state, action) => {
//       state.loadingUpdated = false;
//       state.edit = false;
//     });
//     builder.addCase(updateProduct.rejected, (state) => {
//       state.loadingUpdated = false;
//     });
//     builder.addCase(getSpecificProduct.pending, (state) => {
//       state.loadingSpecific = true;
//     });
//     builder.addCase(getSpecificProduct.fulfilled, (state, action) => {
//       state.loadingSpecific = false;
//       state.product = action.payload.data;
//     });
//     builder.addCase(getSpecificProduct.rejected, (state) => {
//       state.loadingSpecific = false;
//     });
//     builder.addCase(deletePhoto.pending, (state) => {
//       state.loadingUpdated = true;
//     });
//     builder.addCase(deletePhoto.fulfilled, (state, action) => {
//       state.loadingUpdated = false;
//       state.product = action.payload;
//     });
//     builder.addCase(deletePhoto.rejected, (state) => {
//       state.loadingUpdated = false;
//     });
//     builder.addMatcher(isAnyOf(getProduct.pending, handleSearch.pending), (state) => {
//       state.loadingProduct = true;
//     });
//     builder.addMatcher(isAnyOf(getProduct.fulfilled, handleSearch.fulfilled), (state, action) => {
//       state.loadingProduct = false;
//       state.products = action.payload.results;
//       state.count = action.payload.totalCount;
//       state.previous = action.payload.previous;
//       state.next = action.payload.hasNextPage;
//     });
//     builder.addMatcher(isAnyOf(getProduct.rejected, handleSearch.rejected), (state) => {
//       state.loadingProduct = false;
//     });
//     builder.addMatcher(isAnyOf(createProduct.pending, deleteProduct.pending), (state) => {
//       state.loading = true;
//     });
//     builder.addMatcher(isAnyOf(createProduct.fulfilled, deleteProduct.fulfilled), (state) => {
//       state.loading = false;
//       state.edit = false;
//     });
//     builder.addMatcher(isAnyOf(createProduct.rejected, deleteProduct.rejected), (state) => {
//       state.loading = false;
//       state.edit = false;
//     });
//   },
// });

// export const { ProductEditSuccess, clearEditProduct } = ProductSlice.actions;

// export default ProductSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { getProducts, createProduct,updateProduct } from "./thunk";

// initialState
const initialState = {
  products: [],
  count: null,
  next: null,
  previous: null,
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
      state.loading = false; // Clear loading state once products are fetched
      state.products = action.payload.data; // Store fetched products in state
      state.count = action.payload.totalCount; // Save the total count of products
      state.next = action.payload.next; // Save pagination data (next)
      state.previous = action.payload.previous; // Save pagination data (previous)
      state.error = null;
    });
    builder.addCase(getProducts.rejected, (state) => {
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
