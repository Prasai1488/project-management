
import axiosInstance from "../../../Utils/axios";

const ProductModURL = "api/v1/product/";

// Obtaining the paginated data
export const getProduct = (postsPerPage, page) =>
  axiosInstance.get(`${ProductModURL}?limit=${postsPerPage}&page=${page}`);

// Obtaining all data
export const getAllProduct = () => axiosInstance.get(`${ProductModURL}`);

// Get current product
export const getCurrentProduct = (decoded) => axiosInstance.get(`${ProductModURL}/${decoded.product_id}`);

// Obtaining the previous page data from paginated data
export const getPrevious = (previous) => axiosInstance.get(previous);

// Obtaining the next page data from paginated data
export const getNext = (next) => axiosInstance.get(next);

// Obtaining the particular page data from paginated data
export const getPageProduct = (number, postsPerPage) =>
  axiosInstance.get(`${ProductModURL}?offset=${(number - 1) * postsPerPage}&limit=${postsPerPage}`);

// Creating function
export const createProduct = (formData) => {
  return axiosInstance.post("api/v1/product/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Deleting function
export const deleteProduct = (id) => axiosInstance.delete(`${ProductModURL}/${id}`);

// Update function
export const updateProduct = (id, formData) => {
  return axiosInstance.patch(`api/v1/product/${id}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
// Get specific user
export const getSpecificProduct = (id) => axiosInstance.get(`auth/user/${id}`);

//  Searching function
export const handleSearch = (searchTerm, postsPerPage, page) =>
  axiosInstance.get(`${ProductModURL}?search=${encodeURIComponent(searchTerm)}&limit=${postsPerPage}&page=${page}`);
// Checking redundant data
export const checkRedundantData = (e, cancelToken) =>
  axiosInstance.get(`${ModURL}?user_name=${e.target.value.trim()}`, {
    cancelToken: cancelToken.token,
  });

// Deleting the image
export const deletePhoto = (id, body) => axiosInstance.patch(`${ProductModURL}/${id}`, body);





