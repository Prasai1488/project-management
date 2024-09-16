import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collapsed: false,
  showModal: false,
  collapseIcon: true,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setCollapsed: (state) => {
      state.collapsed = !state.collapsed;
    },
    setShowModal: (state, { payload }) => {
      state.showModal = payload;
    },
    closeModal: (state) => {
      state.showModal = false;
    },
    setCollapseIcon: (state) => {
      state.collapseIcon = !state.collapseIcon;
    },
  },
});
const { actions, reducer } = layoutSlice;
export const { setCollapsed, setShowModal, closeModal, setCollapseIcon } = actions;
export default reducer;
