import axiosInstance from "../../../Utils/axios";

const RANGER_URL = "api/v1/product/category/";

// export const getAllCategories = () => axiosInstance.get(`${RANGER_URL}/api/v1/product/category/`);

// export const getAllCategories = (postsPerPage, search) => {
//   return axiosInstance.get(`${RANGER_URL}/api/v1/product/category/?limit=${postsPerPage}&offset=0&order_by=id`);
// };

// export const getCategories = (postsPerPage, page) =>
//   axiosInstance.get(`${RANGER_URL}/category/?limit=${postsPerPage}&orderby=-id`);

export const createCategory = (body) => axiosInstance.post(`${RANGER_URL}/category/`, body);

// API function for updating a category
export const updateCategory = (id, body) => axiosInstance.patch(`${RANGER_URL}/category/${id}/`, body);

export const getPreviousCategory = (previous) => axiosInstance.get(previous);

export const getNextCategory = (next) => axiosInstance.get(next);

export const getPageCategories = (number, postsPerPage) =>
  axiosInstance.get(`${RANGER_URL}/category/?limit=${postsPerPage}&ordering=-id`);

export const handleCategorySearch = (searchTerm, postsPerPage, page) =>
  axiosInstance.get(`${RANGER_URL}?search=${encodeURIComponent(searchTerm)}&limit=${postsPerPage}&page=${page}`);

export const getSpecificCategory = (id) => axiosInstance.get(`${RANGER_URL}category/${id}/`);

export const getAllCategories = (page, postsPerPage) => {
  return axiosInstance.get(`api/v1/product/category/?limit=${postsPerPage}&page=${page}`);
};

// Search categories
export const searchCategories = (postsPerPage, search) => {
  return axiosInstance.get(`${RANGER_URL}/category/?limit=${postsPerPage}&order_by=${order_by}&search=${search}`);
};
