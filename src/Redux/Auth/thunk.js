import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";
import getCookie from "../../Utils/Cookies/getCookie";
import { checkSetupSuccess, loginSuccess, logoutSuccess } from "./authSlice";
import { errorFunction, successFunction } from "../../Components/Alert/Alert";

//Login

export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue, dispatch }) => {
  const { email, password } = credentials;
  try {
    const body = { email, password };
    const { data } = await API.login(body);
    console.log("Login data:", data);

    // Check if the required data is present
    if (data && data.access && data.refresh) {
      // Prepare a new structure to pass to loginSuccess
      const loginData = {
        tokens: {
          accessToken: data.access,
          refreshToken: data.refresh,
        },
        message: data.message,
      };
      dispatch(loginSuccess(loginData));
      return data;
    } else {
      // If the response does not have the expected structure, reject with an error
      throw new Error("Invalid login response structure.");
    }
  } catch (error) {
    console.error("Login failed:", error);
    // Reject with a custom error message or the original error message
    return rejectWithValue(error.response?.data?.message || "Failed to log in.");
  }
});

// logout
export const logout = createAsyncThunk("auth/logout", async (token, { rejectWithValue, dispatch }) => {
  try {
    const body = JSON.stringify({ refreshToken: token });
    await API.logout(body);
    dispatch(logoutSuccess());
    return;
  } catch (error) {
    return rejectWithValue(error.response.data.detail);
  }
});

// change password
export const changePassword = createAsyncThunk("auth/changePassword", async (values, { rejectWithValue, dispatch }) => {
  const { id, password, oldPassword, confirmPassword, history } = values;
  try {
    const token = getCookie("refreshToken");
    const body = JSON.stringify({ password, oldPassword, confirmPassword });
    const { data } = await API.changePassword(id, body);
    if (data) {
      await dispatch(logout(token));
      history.push("/");
      return;
    }
  } catch (error) {
    return rejectWithValue("Failed to change password.");
  }
});

// forget password
export const forgetPassword = createAsyncThunk("auth/forgetPassword", async (email, { rejectWithValue }) => {
  try {
    const body = JSON.stringify({ email: email });
    const { data } = await API.forgetPassword(body);
    successFunction("Check your email and click on the link to reset your Password.");

    return data;
  } catch (error) {
    errorFunction(`There is no active user associated with this e-mail address. Password can not be changed `);
    return rejectWithValue("Failed to reset password.");
  }
});
// reset password
export const resetPassword = createAsyncThunk("auth/resetPassword", async (value, { rejectWithValue }) => {
  const { password, history } = value;
  try {
    const body = JSON.stringify({ password });
    const { data } = await API.resetPassword(body);
    history.push("/");
    successFunction("Password Changed");
    return data;
  } catch (error) {
    errorFunction(`Password confirmation failed. `);
    return rejectWithValue("Failed to reset password.");
  }
});

export const checkSetup = createAsyncThunk("auth/checkSetup", async (_, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await API.checkSetup();
    dispatch(checkSetupSuccess(data));
    return data;
  } catch (error) {
    return rejectWithValue("Failed to complete setup.");
  }
});
