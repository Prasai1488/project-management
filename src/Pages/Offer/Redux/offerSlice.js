import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createOffer, getOffers, getNext, handleSearch, updateOffer } from "./thunk";

const initialState = {
  offer: [],
  selectedOffer: null,
  edit: false,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
  loadingOffer: false,
  loadingNext: false,
};

export const offerSlice = createSlice({
  name: "offer",
  initialState,
  reducers: {
    offerEditSuccess: (state, action) => {
      state.edit = true;
      state.selectedOffer = state.offer.find((offer) => offer.id === action.payload);
    },
    clearAllOffers: (state) => {
      state.edit = false;
      state.loading = false;
      state.loadingUpdated = false;
      state.loadingOffer = false;
      state.selectedOffer = null;
    },
    offerReply: (state, action) => {
      state.selectedOffer = state.offer.find((offer) => offer.id === action.payload);
    },
  },
  extraReducers: (builder) => {
    // Handling getNext cases
    builder.addCase(getNext.pending, (state) => {
      state.loadingNext = true;
    });
    builder.addCase(getNext.fulfilled, (state, action) => {
      state.loadingNext = false;
      state.offer = [...state.offer, ...action.payload.results];
      state.next = action.payload.next;
      state.previous = action.payload.previous;
    });
    builder.addCase(getNext.rejected, (state) => {
      state.loadingNext = false;
    });

    // Handling createOffer cases
    builder.addCase(createOffer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createOffer.fulfilled, (state, action) => {
      state.loading = false;
      state.edit = false;
      state.offer = [action.payload, ...state.offer];
    });
    builder.addCase(createOffer.rejected, (state) => {
      state.loading = false;
    });

    // Handling updateOffer cases
    builder.addCase(updateOffer.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(updateOffer.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.edit = false;
      const index = state.offer.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.offer[index] = action.payload;
      }
    });
    builder.addCase(updateOffer.rejected, (state) => {
      state.loadingUpdated = false;
    });

    // Handling getOffers and handleSearch cases
    builder.addMatcher(isAnyOf(getOffers.pending, handleSearch.pending), (state) => {
      state.loadingOffer = true;
    });
    builder.addMatcher(isAnyOf(getOffers.fulfilled, handleSearch.fulfilled), (state, action) => {
      state.loadingOffer = false;
      state.offer = action.payload.results;
      state.count = action.payload.count;
      state.previous = action.payload.previous;
      state.next = action.payload.next;
    });
    builder.addMatcher(isAnyOf(getOffers.rejected, handleSearch.rejected), (state) => {
      state.loadingOffer = false;
    });
  },
});

export const { offerEditSuccess, clearAllOffers, offerReply } = offerSlice.actions;

export default offerSlice.reducer;
