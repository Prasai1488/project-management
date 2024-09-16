import axiosInstance from "../../../Utils/axios";

const userModURL = "/api/v1/auth-app/users";

//obtaining the paginated data
export const getUser = (postsPerPage, page) => axiosInstance.get(`${userModURL}?limit=${postsPerPage}&page=${page}`);

//obtaining all data
export const getAllUser = () => axiosInstance.get(`${userModURL}`);

export const getCurrentUser = (decoded) => axiosInstance.get(`${userModURL}/${decoded.user_id}`);
//obtaining the previous page data from paginated data
export const getPrevious = (previous) => axiosInstance.get(previous);

//obtaining the next page data from paginated data
export const getNext = (next) => axiosInstance.get(next);

//obtaining the particular page data from paginated data
export const getPageUser = (number, postsPerPage) =>
  axiosInstance.get(`${userModURL}/list?offset=${(number - 1) * postsPerPage}&limit=${postsPerPage}&ordering=-id`);

//creating function
export const createUser = (body) =>
  axiosInstance.post(`/api/v1/auth-app/register`, body, {
    "Content-Type": "multipart/form-data",
  });

//deleting function
export const deleteUser = (id) => axiosInstance.delete(`${userModURL}/${id}`);

//update function
export const updateUser = (id, body) =>
  axiosInstance.patch(`/api/v1/auth-app/users/${id}`, body, {
    "Content-Type": "multipart/form-data",
  });

// get specific user
export const getSpecificUser = (id) => axiosInstance.get(`auth/user/${id}`);
//searching function
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(`${userModURL}/list?offset=0&limit=${postsPerPage}&search=${search}`);

// checking the redundant data
export const checkRedundantData = (e, cancelToken) =>
  axiosInstance.get(`${userModURL}/list?user_name=${e.target.value.trim()}`, {
    cancelToken: cancelToken.token,
  });
//deleting the image
export const deletePhoto = (id, body) => axiosInstance.patch(`${userModURL}/${id}`, body);
//change password
export const changePassword = (id, body) => axiosInstance.get(`api/v1/user-app/change-password/${id}`, body);
