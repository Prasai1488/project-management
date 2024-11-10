import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

// // Get categories
// export const getCategories = createAsyncThunk("category/getCategories", async (value, { rejectWithValue }) => {
//   const { postsPerPage } = value;
//   try {
//     const { data } = await API.getCategories(postsPerPage);
//     return data;
//   } catch (error) {
//     return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
//   }
// });

// Get specific category
export const getSpecificCategory = createAsyncThunk("category/getSpecificCategory", async (id, { rejectWithValue }) => {
  try {
    const { data } = await API.getSpecificCategory(id);
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
  }
});

// Get all categories
// export const getAllCategories = createAsyncThunk(
//   "category/getAllCategories",
//   async ({ postsPerPage,search, }, { rejectWithValue }) => {
//     try {
//       const { data } = await API.getAllCategories({postsPerPage, search});
//       console.log(data, "this is product categoried data");
//       return data;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
//     }
//   }
// );

// export const getAllCategories = createAsyncThunk(
//   "category/getAllCategories",
//   async ({ limit = 20, offset = 1, order_by }, { rejectWithValue }) => {
//     try {
//       const { data } = await API.getAllCategories(limit, offset, order_by);
//       return data;
//     } catch (error) {
//       // Handle error
//       return rejectWithValue(error?.response?.data || error.message);
//     }
//   }
// );

export const getAllCategories = createAsyncThunk(
  "category/getCategory",
  async ({ postsPerPage, page }, { rejectWithValue }) => {
    console.log(postsPerPage, page,"pcateg");
    try {
      const response = await API.getAllCategories(postsPerPage, page);
      const data = response.data;
      const categoriesArray = data.data || [];
      return {
        results: categoriesArray,
        count: data.pagination.count,
        currentPage: data.pagination.currentPage,
        totalPages: data.pagination.totalPages,
        next: data.pagination.next,
        previous: data.pagination.previous,
      };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "An error occurred while fetching categories.");
    }
  }
);

// Fetch all categories with limit, offset, and ordering
// export const getAllCategories = createAsyncThunk(
//   "category/getAllCategories",
//   async ({ limit, offset, order_by }, { rejectWithValue }) => {
//     try {
//       // Call the API method
//       const { data } = await API.getAllCategories(limit, offset, order_by);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data || error.message);
//     }
//   }
// );

// Get previous category
export const getPreviousCategory = createAsyncThunk(
  "category/getPreviousCategory",
  async (previous, { rejectWithValue }) => {
    try {
      const { data } = await API.getPreviousCategory(previous);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
    }
  }
);

// Get next category
export const getNextCategory = createAsyncThunk("category/getNextCategory", async (next, { rejectWithValue }) => {
  try {
    const { data } = await API.getNextCategory(next);
    console.log(data, "this is next category data");
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
  }
});

// Get page of categories
export const getPageCategories = createAsyncThunk(
  "category/getPageCategories",
  async ({ number, postsPerPage }, { rejectWithValue }) => {
    try {
      const { data } = await API.getPageCategories(number, postsPerPage);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
    }
  }
);

// Create category
export const createCategory = createAsyncThunk("category/createCategory", async (data, { rejectWithValue }) => {
  try {
    const { data: responseData } = await API.createCategory(data);
    return responseData;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.errors?.[0]?.error || error.message);
  }
});

// Update category thunk
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      console.log("Updating category with ID:", id);
      console.log("Values being sent:", values);
      const { data } = await API.updateCategory(id, values);
      return data;
    } catch (error) {
      console.error("Error updating category:", error.response.data);
      const errorMessage = error?.response?.data?.errors?.[0]?.error || error.message || "Something went wrong";
      return rejectWithValue(errorMessage);
    }
  }
);

// Handle search for categories
export const handleCategorySearch = createAsyncThunk(
  "product/handleSearch",
  async ({ search, postsPerPage, page }, { rejectWithValue }) => {
    try {
      const response = await API.handleCategorySearch(search, postsPerPage, page);
      const data = response.data;

      const categoriesArray = data.data || [];
      return {
        results: categoriesArray,
        count: data.pagination.count,
        currentPage: data.pagination.currentPage,
        totalPages: data.pagination.totalPages,
        next: data.pagination.next,
        previous: data.pagination.previous,
      };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "An error occurred while searching categories.");
    }
  }
);
