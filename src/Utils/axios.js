import axios from "axios";
import deleteCookie from "./Cookies/deleteCookie";
import getCookie from "./Cookies/getCookie";
import setCookie from "./Cookies/setCookie";
import { store } from "../Store/store";
import { authError } from "../Redux/Auth/authSlice";
import { errorFunction } from "../Components/Alert/Alert";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // appType: 1,
  // deviceType: 2,
});

export const publicAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // appType: 1,
  // deviceType: 2,
});
// interceptor request handler
const abortController = new AbortController();
axiosInstance.interceptors.request.use(
  (config) => {
    if (!window.navigator.onLine) {
      errorFunction(`No Internet Connection !!!`);
    } else if (window.navigator.onLine) {
      // get access token from cookie
      config.headers = {
        Authorization: getCookie("accessToken") ? `Bearer ${getCookie("accessToken")}` : "",
      };

      config.baseURL =
        localStorage.getItem("url") !== null
          ? `https://${localStorage.getItem("url")}`
          : // `http://${localStorage.getItem("url")}:8082`
            process.env.REACT_APP_BASE_URL;

      // config.baseURL = process.env.REACT_APP_BASE_URL;
      config.signal = abortController.signal;
      config.params = config.params || {};

      // sent appType & device type in every request (also checks if payload data is form data or JSON string)
      if (config.data !== undefined) {
        if (typeof config.data === "object") {
          let bodyFormData = config.data;

          config.data = bodyFormData;
        } else if (typeof config.data === "string") {
          console.log("object");
          let bodyData = JSON.parse(config.data);
          config.data = { ...bodyData, appType: 1, deviceType: 2 };
        } else {
          
        }
      }

      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response handling
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    //refresh token
    const originalRequest = error.config;
    //when refresh token is also not valid
    if (error.response.status === 401 && originalRequest.url === `auth/refresh-token`) {
      store.dispatch(authError());
      return errorFunction(`Refresh Token Expired. Please Login.`);
    }
    //accessing new access token from refresh token
    else if (error.response?.data.code === "token_not_valid" && !originalRequest._retry) {
      //call for refresh token

      originalRequest._retry = true;
      try {
        const body = JSON.stringify({
          refresh: getCookie("refreshToken"),
        });
        deleteCookie("accessToken");
        const response = await axiosInstance.post(`auth/refresh-token`, body);
        if (response.status === 200) {
          setCookie("accessToken", response?.data.access);
          originalRequest.headers["Authorization"] = `Bearer ${response?.data.access}`;
          return axiosInstance(originalRequest);
        }
      } catch (error) {
        store.dispatch(authError());
      }
    }

    //server down
    else if (error.message === "Network Error") {
      errorFunction("Internal Server Error. Contact IT manager !!!");
    } else if (error.response?.status === 500) {
      errorFunction("Internal Server Error. Contact IT manager !!!");
    } else if (error.response?.status === 403) {
      errorFunction("Permission Denied. Contact IT manager !!!");
    } else if (error.response?.status === 404) {
      errorFunction("Page Not Found !!!!!");
    }
    //unauthorized user
    else if (error.response?.status === 401 || error.message === "Invalid token specified") {
      store.dispatch(authError());
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
