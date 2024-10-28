import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createProduct as apiCreateProduct,
  updateProduct as apiUpdateProduct,
  getProducts,
  getAllProducts,
  getNextProductPage,
  handleProductSearch,
  getSpecificProduct,
} from "./thunk";

const initialState = {
  products: [], 
  product: null, 
  edit: false,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
  loadingProduct: false,
  loadingNext: false,
};

export const products = createSlice({
  name: "product",
  initialState,
  reducers: {
    productsEditSuccess: (state, action) => {
      // state.product = action.payload;
      state.edit = true;
    },
    clearAllProduct: (state) => {
      Object.assign(state, initialState);
    },
    clearEditProduct: (state) => {
      state.edit = false;
      state.product = null;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProductState: (state, action) => {
      const index = state.products.findIndex((product) => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...action.payload.updatedProduct };
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Create product
      .addCase(apiCreateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(apiCreateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.edit = false;
        state.products.push(action.payload);
      })
      .addCase(apiCreateProduct.rejected, (state) => {
        state.loading = false;
      })

      // Get specific product
      .addCase(getSpecificProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSpecificProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
      })
      .addCase(getSpecificProduct.rejected, (state) => {
        state.loading = false;
      })

      // Update product
      .addCase(apiUpdateProduct.pending, (state) => {
        state.loadingUpdated = true;
        console.log("Update product pending...");
      })
      .addCase(apiUpdateProduct.fulfilled, (state, action) => {
        state.loadingUpdated = false;
        state.edit = false;

        console.log("Update product fulfilled:", action.payload);
        const index = state.products.findIndex((product) => product.id === action.payload.id);

        console.log("Looking for product with ID:", action.payload.id);

        if (index !== -1) {
          console.log("Product found at index:", index);
          state.products[index] = { ...state.products[index], ...action.payload };
          console.log("Updated product:", state.products[index]);
        } else {
          console.log("Product not found for ID:", action.payload.id);
        }
      })
      .addCase(apiUpdateProduct.rejected, (state, action) => {
        state.loadingUpdated = false;
        console.error("Update product failed:", action.error);
      });

    // Use addMatcher for handling multiple actions with similar logic
    builder
      .addMatcher(isAnyOf(getProducts.pending, handleProductSearch.pending), (state) => {
        state.loadingProduct = true;
      })
      .addMatcher(
        isAnyOf(getProducts.fulfilled, getAllProducts.fulfilled, handleProductSearch.fulfilled),
        (state, action) => {
          state.loadingProduct = false;
          state.products = action.payload?.data || [];
          state.count = action.payload?.totalCount || 0;
          state.previous = action.payload?.previous || null;
          state.next = action.payload?.next || null;
        }
      )
      .addMatcher(isAnyOf(getProducts.rejected, getAllProducts.rejected, handleProductSearch.rejected), (state) => {
        state.loadingProduct = false;
      });
  },
});

export const { productsEditSuccess, clearAllProduct, clearEditProduct, addProduct, updateProductState, deleteProduct } =
  products.actions;

export default products.reducer;
