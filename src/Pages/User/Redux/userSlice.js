import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createUser,
  deletePhoto,
  deleteUser,
  getCurrentUser,
  getNext,
  getSpecificUser,
  getUser,
  handleSearch,
  updateUser,
} from "./thunk";

const initialState = {
  users: [],
  edit: false,
  user: null,
  userInfo: null,
  count: null,
  currentPage: 1,
  totalPages: 1,
  next: null,
  previous: null,
  loading: false,
  loadingCurrent: false,
  loadingUser: false,
  loadingUpdated: false,
  loadingSpecific: true,
  loadingNext: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userEditSuccess: (state, action) => {
      state.edit = true;
      state.user = action.payload;
      state.loading = false;
      state.loadingUpdated = false;
    },
    clearEditUser: (state) => {
      state.edit = false;
      state.user = null;
      state.loading = false;
      state.loadingUser = false;
      state.loadingUpdated = false;
    },
  },

  extraReducers: (builder) => {
    // First, handle all individual cases
    builder
      // getNext cases
      .addCase(getNext.pending, (state) => {
        state.loadingNext = true;
      })
      .addCase(getNext.fulfilled, (state, action) => {
        state.loadingNext = false;
        state.users = [...state.users, ...action.payload.results];
        state.count = action.payload.count;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
      })
      .addCase(getNext.rejected, (state) => {
        state.loadingNext = false;
      })

      // getCurrentUser cases
      .addCase(getCurrentUser.pending, (state) => {
        state.loadingCurrent = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loadingCurrent = false;
        state.userInfo = action.payload.data;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.loadingCurrent = false;
      })

      // updateUser cases
      .addCase(updateUser.pending, (state) => {
        state.loadingUpdated = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loadingUpdated = false;
        state.edit = false;

        const updatedUser = action.payload.data; // Adjust based on your actual response structure
        const index = state.users.findIndex((user) => user.id === updatedUser.id);

        if (index !== -1) {
          state.users[index] = updatedUser;
        } else {
          state.users = [updatedUser, ...state.users];
        }
      })
      .addCase(updateUser.rejected, (state) => {
        state.loadingUpdated = false;
      })

      // getSpecificUser cases
      .addCase(getSpecificUser.pending, (state) => {
        state.loadingSpecific = true;
      })
      .addCase(getSpecificUser.fulfilled, (state, action) => {
        state.loadingSpecific = false;
        state.user = action.payload.data;
      })
      .addCase(getSpecificUser.rejected, (state) => {
        state.loadingSpecific = false;
      })

      // deletePhoto cases
      .addCase(deletePhoto.pending, (state) => {
        state.loadingUpdated = true;
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.loadingUpdated = false;
        state.user = action.payload;
      })
      .addCase(deletePhoto.rejected, (state) => {
        state.loadingUpdated = false;
      })

      // createUser cases
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.edit = false;

        const newUser = action.payload.data; // Adjust based on your actual response structure
        if (newUser) {
          state.users = [newUser, ...state.users];
        } else {
          console.error("New user data is invalid:", action.payload);
        }
      })
      .addCase(createUser.rejected, (state) => {
        state.loading = false;
        state.edit = false;
      })

      // deleteUser cases
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.edit = false;
        const deletedUserId = action.meta.arg;
        state.users = state.users.filter((user) => user.id !== deletedUserId);
      })
      .addCase(deleteUser.rejected, (state) => {
        state.loading = false;
        state.edit = false;
      })

      // Then, add all matchers after all cases
      .addMatcher(
        isAnyOf(getUser.pending, handleSearch.pending),
        (state) => {
          state.loadingUser = true;
        }
      )
      .addMatcher(
        isAnyOf(getUser.fulfilled, handleSearch.fulfilled),
        (state, action) => {
          state.loadingUser = false;
          state.users = action.payload.results;
          state.count = action.payload.count;   
          state.currentPage = action.payload.currentPage; 
          state.totalPages = action.payload.totalPages;
          state.previous = action.payload.previous;
          state.next = action.payload.next;  
        }
      )
      .addMatcher(
        isAnyOf(getUser.rejected, handleSearch.rejected),
        (state) => {
          state.loadingUser = false;
        }
      );
  },
});

export const { userEditSuccess, clearEditUser } = userSlice.actions;

export default userSlice.reducer;

