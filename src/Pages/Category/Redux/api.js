import axiosInstance from "../../../Utils/axios";

const RANGER_URL = "api/v1/product";

// export const getAllCategories = () => axiosInstance.get(`${RANGER_URL}/api/v1/product/category/`);

// export const getAllCategories = (postsPerPage, search) => {
//   return axiosInstance.get(`${RANGER_URL}/api/v1/product/category/?limit=${postsPerPage}&offset=0&order_by=id`);
// };

// src/your/api/file.js

export const getCategories = (postsPerPage) => axiosInstance.get(`${RANGER_URL}/category/`);

// export const getCategories = (postsPerPage) =>
//   axiosInstance.get(`${RANGER_URL}/api/v1/product/category/?offset=0&limit=${postsPerPage}&orderby=id`);

export const createCategory = (body) => axiosInstance.post(`${RANGER_URL}/category/`, body);

// API function for updating a category
export const updateCategory = (id, body) => axiosInstance.patch(`${RANGER_URL}/category/${id}/`, body);

export const getPreviousCategory = (previous) => axiosInstance.get(previous);

export const getNextCategory = (next) => axiosInstance.get(next);

export const getPageCategories = (number, postsPerPage) =>
  axiosInstance.get(`${RANGER_URL}/category/?limit=${postsPerPage}&ordering=-id`);

export const handleCategorySearch = (postsPerPage, search) =>
  axiosInstance.get(`${RANGER_URL}/category/?limit=${postsPerPage}&search=${search}`);

export const getSpecificCategory = (id) => axiosInstance.get(`${RANGER_URL}category/${id}/`);

// Get all categories without search
// export const getAllCategories = (postsPerPage, order_by) => {
//   return axiosInstance.get(`${RANGER_URL}/category/?limit=${postsPerPage}&offset=1`);
// };

export const getAllCategories = (page, postsPerPage) => {
  return axiosInstance.get(
    `/api/v1/product/category/?limit=${postsPerPage}&orderby=-id`
  );
};

// Search categories
export const searchCategories = (postsPerPage, search) => {
  return axiosInstance.get(
    `${RANGER_URL}/category/?limit=${postsPerPage}&order_by=${order_by}&search=${search}`
  );
};
