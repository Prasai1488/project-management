import axiosInstance from "../../../Utils/axios";
import axios from "axios";

const RANGER_URL = "api/v1/product";

// Get all subcategories
export const getAllSubCategories = (page, postsPerPage) =>
  axiosInstance.get(`${RANGER_URL}/sub-category/?offset=${page - 1}&limit=${postsPerPage}&orderby=-id`);

export const getSpecificSubCategory = (id) => axiosInstance.get(`${RANGER_URL}/sub-category/${id}/`);

// Get subcategories with pagination and optional search
export const getSubCategories = (postsPerPage, search = "") =>
  axiosInstance.get(
    `${RANGER_URL}/api/v1/product/sub-category/?offset=0&limit=${postsPerPage}&orderby=id&search=${search}`
  );

// Create a new subcategory
export const createSubCategory = (body) => axiosInstance.post(`${RANGER_URL}/sub-category/`, body);

// Update an existing subcategory
export const updateSubCategory = (id, body) => axiosInstance.patch(`${RANGER_URL}/sub-category/${id}/`, body);

// Get the previous page of subcategories
export const getPreviousSubCategory = (previous) => axiosInstance.get(previous);

// Get the next page of subcategories
export const getNextSubCategory = (next) => axiosInstance.get(next);

// Get paginated subcategories
export const getPageSubCategories = (page, postsPerPage) =>
  axiosInstance.get(
    `${RANGER_URL}/api/v1/product/sub-category/?offset=${
      (page - 1) * postsPerPage
    }&limit=${postsPerPage}&ordering=-id`
  );

// Search subcategories with pagination
export const handleSubCategorySearch = (page, postsPerPage, search) =>
  axiosInstance.get(`${RANGER_URL}/api/v1/product/sub-category/?offset=${page-1}&limit=${postsPerPage}&search=${search}`);