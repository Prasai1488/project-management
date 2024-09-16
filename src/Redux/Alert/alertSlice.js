import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alertMessage: "",
  showDraftAlert: false,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.alertMessage = action.payload;
    },
    hideAlert: (state) => {
      state.alertMessage = "";
    },
    setShowDraftAlert: (state, action) => {
      state.showDraftAlert = action.payload;
    },
  },
});
// export actions that does not involve api calls
export const { showAlert, hideAlert, setShowDraftAlert } = alertSlice.actions;
// export reducer
export default alertSlice.reducer;
