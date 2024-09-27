import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import deleteCookie from "../../Utils/Cookies/deleteCookie";
import setCookie from "../../Utils/Cookies/setCookie";

const initialState = {
  isAuthenticated: true,
  loadingLogin: false,
  loadingLogout: false,
  username: null,
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
      state.username = null;
      state.authError = true;
      state.isSuperuser = false;
    },
    loginSuccess: (state, action) => {
      console.log(action.payload, "actionpayload");
      const permissions = action.payload.permissions;

      const userPermissions = permissions?.map((permission) => {
        return permission?.codeName;
      });
      setCookie("accessToken", action.payload.tokens.accessToken, {
        "max-age": 36000000,
      });
      setCookie("refreshToken", action.payload.tokens.refreshToken, {
        "max-age": 36000000,
      });
      state.isAuthenticated = true;
      state.username = action.payload.username || "";
      state.loadingLogin = false;
      state.authError = false;
      state.userId = action.payload.id || "";
      state.isSuperuser = action.payload.isSuperUser;
      // state.isSetupDone = action.payload.isSetup;

      state.permissions = userPermissions;
      state.photo = action.payload?.user?.userPhoto || "";
    },
    logoutSuccess: (state, action) => {
      storage.removeItem("persist:root");
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      state.isAuthenticated = false;
      state.loadingLogout = false;
      state.username = null;
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
