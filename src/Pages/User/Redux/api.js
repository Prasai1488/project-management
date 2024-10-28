import axiosInstance from "../../../Utils/axios";

const userModURL = "https://da4a-45-123-222-20.ngrok-free.app/auth/list-user/";

// Obtaining the paginated data
export const getUser = (postsPerPage, page) => axiosInstance.get(`${userModURL}?limit=${postsPerPage}&page=${page}`);

// Obtaining all data
export const getAllUser = () => axiosInstance.get(`${userModURL}`);

// Get current user
export const getCurrentUser = (decoded) => axiosInstance.get(`${userModURL}/${decoded.user_id}`);

// Obtaining the previous page data from paginated data
export const getPrevious = (previous) => axiosInstance.get(previous);

// Obtaining the next page data from paginated data
export const getNext = (next) => axiosInstance.get(next);

// Obtaining the particular page data from paginated data
export const getPageUser = (number, postsPerPage) =>
  axiosInstance.get(`${userModURL}?offset=${(number - 1) * postsPerPage}&limit=${postsPerPage}`);

// Creating function
export const createUser = (body) => axiosInstance.post(`auth/signup/`, body);

// Deleting function
export const deleteUser = (id) => axiosInstance.delete(`${userModURL}/${id}`);

// Update function
export const updateUser = (id, body) => axiosInstance.patch(`auth/user/${id}/`, body);
// Get specific user
export const getSpecificUser = (id) => axiosInstance.get(`auth/user/${id}`);

// **Adjusted** Searching function
export const handleSearch = (searchTerm, postsPerPage, page) =>
  axiosInstance.get(`${userModURL}?search=${encodeURIComponent(searchTerm)}&limit=${postsPerPage}&page=${page}`);
// Checking redundant data
export const checkRedundantData = (e, cancelToken) =>
  axiosInstance.get(`${userModURL}?user_name=${e.target.value.trim()}`, {
    cancelToken: cancelToken.token,
  });

// Deleting the image
export const deletePhoto = (id, body) => axiosInstance.patch(`${userModURL}/${id}`, body);

// Change password
export const changePassword = (id, body) => axiosInstance.post(`api/v1/user-app/change-password/${id}`, body);
