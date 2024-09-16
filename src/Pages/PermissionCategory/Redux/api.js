import axiosInstance from "../../../Utils/axios";

const BASE_URL = "api/v1/permission-category-app/permission-category";

export const getAllPermissionCategorys = ({ postsPerPage, page }) =>
  axiosInstance.get(`${BASE_URL}?limit=${postsPerPage}&page=${page}`);
export const getPermissionCategorys = (postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=0&limit=${postsPerPage}&ordering=-id`);
export const createPermissionCategorys = (body) => axiosInstance.post(`${BASE_URL}`, body);
export const updatePermissionCategorys = (id, body) => axiosInstance.patch(`${BASE_URL}${id}`, body);
export const getPrevious = (previous) => axiosInstance.get(previous);
export const getNext = (next) => axiosInstance.get(next);
export const getPagePermissionCategorys = (number, postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=${(number - 1) * postsPerPage}&limit=${postsPerPage}&ordering=-id`);
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=0&limit=${postsPerPage}&search=${search}`);
