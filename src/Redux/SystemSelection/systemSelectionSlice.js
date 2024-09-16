import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  systemSelected: "",
};

export const systemSelectionSlice = createSlice({
  name: "systemSelection",
  initialState,
  reducers: {
    setSystemSelected: (state, action) => {
      state.systemSelected = action.payload;
    },
  },
});

export const { setSystemSelected } = systemSelectionSlice.actions;
export default systemSelectionSlice.reducer;
