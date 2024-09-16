import axiosInstance from "../../../Utils/axios";

const BASE_URL = "api/v1/permission-app/permission";

export const getAllPermissions = (permissionCategory) =>
  axiosInstance.get(`${BASE_URL}?permissionCategory=${permissionCategory !== undefined ? permissionCategory : ""}`);
export const getPermissions = (postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=0&limit=${postsPerPage}&ordering=-id`);
export const createPermissions = (body) => axiosInstance.post(`${BASE_URL}`, body);
export const updatePermissions = (id, body) => axiosInstance.patch(`${BASE_URL}/${id}`, body);
export const getPrevious = (previous) => axiosInstance.get(previous);
export const getNext = (next) => axiosInstance.get(next);
export const getPagePermissions = (number, postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=${(number - 1) * postsPerPage}&limit=${postsPerPage}&ordering=-id`);
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=0&limit=${postsPerPage}&search=${search}`);
