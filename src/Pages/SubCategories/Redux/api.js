import axiosInstance from "../../../Utils/axios";

const RANGER_URL = "http://192.168.1.91:8000";

// Get all subcategories
export const getAllSubCategories = () => axiosInstance.get(`${RANGER_URL}/api/v1/product/sub-category/`);

// Get subcategories with pagination and optional search
export const getSubCategories = (postsPerPage, search = "") =>
  axiosInstance.get(
    `${RANGER_URL}/api/v1/product/sub-category/?offset=0&limit=${postsPerPage}&orderby=id&search=${search}`
  );

// Create a new subcategory
export const createSubCategory = (body) => axiosInstance.post(`${RANGER_URL}/api/v1/product/sub-category/`, body);

// Update an existing subcategory
export const updateSubCategory = (id, body) =>
  axiosInstance.patch(`${RANGER_URL}/api/v1/product/sub-category/${id}/`, body);

// Get the previous page of subcategories
export const getPreviousSubCategory = (previous) => axiosInstance.get(previous);

// Get the next page of subcategories
export const getNextSubCategory = (next) => axiosInstance.get(next);

// Get paginated subcategories
export const getPageSubCategories = (number, postsPerPage) =>
  axiosInstance.get(
    `${RANGER_URL}/api/v1/product/sub-category/?offset=${
      (number - 1) * postsPerPage
    }&limit=${postsPerPage}&ordering=-id`
  );

// Search subcategories with pagination
export const handleSubCategorySearch = (search, postsPerPage) =>
  axiosInstance.get(`${RANGER_URL}/api/v1/product/sub-category/?offset=0&limit=${postsPerPage}&search=${search}`);

// Get a specific subcategory by ID
export const getSpecificSubCategory = (id) => axiosInstance.get(`${RANGER_URL}/api/v1/product/sub-category/${id}/`);
