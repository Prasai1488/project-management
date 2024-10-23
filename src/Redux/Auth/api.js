import axiosInstance, { publicAxiosInstance } from "../../Utils/axios";

const BASE_URL = "http://192.168.1.91:8000";

//for login
export const login = (body) => publicAxiosInstance.post(`${BASE_URL}/auth/login/`, body);
// for checking setup
export const checkSetup = () => axiosInstance.get(`api/v1/organization/issetup`);
//for logout
export const logout = (body) => axiosInstance.post(`${BASE_URL}/auth/logout/`, body);

//for reset password

export const changePassword = (id, body) => axiosInstance.patch(`auth/change-password/${id}`, body);

export const forgetPassword = (body) => publicAxiosInstance.post(`auth/forget-password`, body);

export const resetPassword = (otp, body) => publicAxiosInstance.post(`auth/reset-password/${otp}`, body);
