import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coreSetupTabValue: 0,
  userTabValue: 0,
  annexures: [],
  notificationTabValue: 0,
};

export const tabsValueSlice = createSlice({
  name: "tabsValue",
  initialState,
  reducers: {
    setCoreSetupTabValue: (state, action) => {
      state.coreSetupTabValue = action.payload;
    },
    setUserTabValue: (state, action) => {
      state.userTabValue = action.payload;
    },
    setNotificationTabValue: (state, action) => {
      state.notificationTabValue = action.payload;
    },
  },
});

// export actions
export const { setCoreSetupTabValue, setUserTabValue, setNotificationTabValue } = tabsValueSlice.actions;

// export reducer
export default tabsValueSlice.reducer;
