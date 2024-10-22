import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import deleteCookie from "../../Utils/Cookies/deleteCookie";
import setCookie from "../../Utils/Cookies/setCookie";

const initialState = {
  isAuthenticated: false,
  loadingLogin: false,
  loadingLogout: false,
  email: null,
  userId: "",
  authError: false,
  isSuperuser: false,
  isSetupDone: true,
  permissions: [],
  loadingResetPassword: false,
  loadingChangePassword: false,
  message: [],
  photo: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authError: (state) => {
      storage.removeItem("persist:root");
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      state.isAuthenticated = false;
      state.loading = false;
      state.email = null;
      state.authError = true;
      state.isSuperuser = false;
    },


    loginSuccess: (state, action) => {
      console.log("Login action payload:", action.payload);

      const { tokens } = action.payload || {};
      if (tokens && tokens.accessToken && tokens.refreshToken) {
        setCookie("accessToken", tokens.accessToken, { "max-age": 36000000 });
        setCookie("refreshToken", tokens.refreshToken, { "max-age": 36000000 });
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
        state.authError = true;
        return; 
      }

      state.loadingLogin = false;
      state.authError = false;
    },

    logoutSuccess: (state, action) => {
      storage.removeItem("persist:root");
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      state.isAuthenticated = false;
      state.loadingLogout = false;
      state.email = null;
      state.userId = null;
      state.authError = false;
      state.isSuperuser = false;
      state.permissions = [];
      state.groups = [];
      state.img = null;
    },
    forgetPassword: (state, action) => {
      state.loadingResetPassword = false;
      state.message = action.payload;
      state.authError = false;
    },
    resetPassword: (state, action) => {
      state.authError = false;
      state.loadingResetPassword = false;
    },

    checkSetupSuccess: (state, action) => {
      state.isSetupDone = action.payload.isSetup;
    },
  },
});

const { actions, reducer } = authSlice;
export const { authError, loginSuccess, logoutSuccess, forgetPassword, resetPassword, checkSetupSuccess } = actions;
export default reducer;
