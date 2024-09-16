import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createItems, getAllItems, getItems, getNext, handleSearch, updateItems } from "./thunk";

const initialState = {
  items: [],
  item: null,
  edit: false,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
  loadingItem: false,
  loadingNext: false,
};

export const itemsSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    itemsEditSuccess: (state, action) => {
      state.edit = true;
      state.item = state.items.find((item) => item._id === action.payload);
    },
    clearAllItem: (state) => {
      state.edit = false;
      state.loading = false;
      state.loadingUpdated = false;
      state.loadingItem = false;
      state.item = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNext.pending, (state) => {
      state.loadingNext = true;
    });
    builder.addCase(getNext.fulfilled, (state, action) => {
      state.loadingNext = false;
      state.items = [...state.items, ...action.payload.items];
      state.next = action.payload.nextPageUrl;
    });
    builder.addCase(getNext.rejected, (state) => {
      state.loadingNext = false;
    });
    builder.addCase(createItems.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createItems.fulfilled, (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(createItems.rejected, (state) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(updateItems.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(updateItems.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.edit = false;
    });
    builder.addCase(updateItems.rejected, (state) => {
      state.loadingUpdated = false;
    });
    builder.addMatcher(isAnyOf(getItems.pending, handleSearch.pending), (state) => {
      state.loadingItem = true;
    });
    builder.addMatcher(isAnyOf(getItems.fulfilled, getAllItems.fulfilled, handleSearch.fulfilled), (state, action) => {
      state.loadingItem = false;
      state.items = action.payload?.items;
      state.count = action.payload.totalCount;
      state.previous = action.payload?.previous;
      state.next = action.payload?.nextPageUrl;
    });
    builder.addMatcher(isAnyOf(getItems.rejected, getAllItems.rejected, handleSearch.rejected), (state) => {
      state.loadingItem = false;
    });
  },
});

export const { itemsEditSuccess, clearAllItem } = itemsSlice.actions;

export default itemsSlice.reducer;
