import axiosInstance from "../../../Utils/axios";

const RANGER_URL = "api/v1/product";

// Get all products
export const getAllProducts = () => axiosInstance.get(`${RANGER_URL}/`);

// Get a specific product by ID
export const getSpecificProduct = (id) => axiosInstance.get(`${RANGER_URL}/${id}/`);

// Get products with pagination and optional search
export const getProducts = (postsPerPage, search = "") =>
  axiosInstance.get(`${RANGER_URL}/?offset=0&limit=${postsPerPage}&orderby=id&search=${search}`);

// Create a new product
export const createProduct = (body) => axiosInstance.post(`${RANGER_URL}/`, body);

// Update an existing product
export const updateProduct = (id, body) => axiosInstance.patch(`${RANGER_URL}/${id}/`, body);

// Get the previous page of products
export const getPreviousProductPage = (previous) => axiosInstance.get(previous);

// Get the next page of products
export const getNextProductPage = (next) => axiosInstance.get(next);

// Get paginated products
export const getPageProducts = (number, postsPerPage) =>
  axiosInstance.get(`${RANGER_URL}/?offset=${(number - 1) * postsPerPage}&limit=${postsPerPage}&ordering=-id`);

// Search products with pagination
export const handleProductSearch = (search, postsPerPage) =>
  axiosInstance.get(`${RANGER_URL}/?offset=0&limit=${postsPerPage}&search=${search}`);
