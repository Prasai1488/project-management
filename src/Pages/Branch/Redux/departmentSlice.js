import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getDepartment,
  getAllDepartment,
  getNext,
  getPrevious,
  getPageDepartment,
  createDepartment,
  handleSearch,
} from "./thunk";

const initialState = {
  departments: [],
  edit: false,
  department: null,
  count: null,
  next: null,
  previous: null,
  loading: false,
};

export const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDepartment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDepartment.fulfilled, (state, action) => {
      state.loading = false;
      state.edit = false;
      state.departments = action.payload.results;
      state.count = action.payload.count;
      state.previous = action.payload.previous;
      state.next = action.payload.next;
    });
    builder.addCase(getDepartment.rejected, (state) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(createDepartment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createDepartment.fulfilled, (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(createDepartment.rejected, (state) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addMatcher(
      isAnyOf(
        getAllDepartment.pending,
        getPrevious.pending,
        getNext.pending,
        getPageDepartment.pending,
        handleSearch.pending
      ),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(
        getAllDepartment.fulfilled,
        getPrevious.fulfilled,
        getNext.fulfilled,
        getPageDepartment.fulfilled,
        handleSearch.fulfilled
      ),
      (state, action) => {
        state.loading = false;
        state.departments = action.payload.results;
        state.count = action.payload.count;
        state.previous = action.payload.previous;
        state.next = action.payload.next;
      }
    );
    builder.addMatcher(
      isAnyOf(
        getAllDepartment.rejected,
        getPrevious.rejected,
        getNext.rejected,
        getPageDepartment.rejected,
        handleSearch.rejected
      ),
      (state) => {
        state.loading = false;
      }
    );
  },
});

export default departmentSlice.reducer;
