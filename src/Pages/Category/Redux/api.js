import axiosInstance from "../../../Utils/axios";

const RANGER_URL = "http://192.168.1.91:8000";
export const getAllCategories = () => axiosInstance.get(`${RANGER_URL}/api/v1/product/category/`);
export const getCategories = (postsPerPage) =>
  axiosInstance.get(`${RANGER_URL}/api/v1/product-category/?offset=0&limit=${postsPerPage}&ordering=-id`);

export const createCategory = (body) => axiosInstance.post(`${RANGER_URL}/api/v1/product/category/`, body);

// API function for updating a category
export const updateCategory = (id, body) => axiosInstance.patch(`${RANGER_URL}/api/v1/product/category/${id}/`, body);

export const getPreviousCategory = (previous) => axiosInstance.get(previous);

export const getNextCategory = (next) => axiosInstance.get(next);

export const getPageCategories = (number, postsPerPage) =>
  axiosInstance.get(
    `${RANGER_URL}/api/v1/product-category/?offset=${(number - 1) * postsPerPage}&limit=${postsPerPage}&ordering=-id`
  );

export const handleCategorySearch = (search, postsPerPage) =>
  axiosInstance.get(`${RANGER_URL}/api/v1/product-category/?offset=0&limit=${postsPerPage}&search=${search}`);

export const getSpecificCategory = (id) => axiosInstance.get(`${RANGER_URL}/api/v1/product-category/${id}/`);
