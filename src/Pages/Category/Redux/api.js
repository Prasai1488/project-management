import axiosInstance from "../../../Utils/axios";

const RANGER_URL = "api/v1/product/category/";


export const createCategory = (body) => axiosInstance.post(`${RANGER_URL}`, body);

// API function for updating a category
export const updateCategory = (id, body) => axiosInstance.patch(`${RANGER_URL}${id}/`, body);

export const getPreviousCategory = (previous) => axiosInstance.get(previous);

export const getNextCategory = (next) => axiosInstance.get(next);

export const getPageCategories = (number, postsPerPage) =>
  axiosInstance.get(`${RANGER_URL}/category/?limit=${postsPerPage}&ordering=-id`);

export const handleCategorySearch = (searchTerm, postsPerPage, page) =>
  axiosInstance.get(`${RANGER_URL}?search=${encodeURIComponent(searchTerm)}&limit=${postsPerPage}&page=${page}`);

export const getSpecificCategory = (id) => axiosInstance.get(`${RANGER_URL}category/${id}/`);

export const getAllCategories = (postsPerPage, page) => {
  return axiosInstance.get(`api/v1/product/category/?limit=${postsPerPage}&page=${page}`);
};

// Search categories
export const searchCategories = (postsPerPage, search) => {
  return axiosInstance.get(`${RANGER_URL}/category/?limit=${postsPerPage}&order_by=${order_by}&search=${search}`);
};
