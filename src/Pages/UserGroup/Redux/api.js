import axiosInstance from "../../../Utils/axios";

//obtaining the paginated data
export const getUserGroup = (postsPerPage) =>
  axiosInstance.get(`auth/groups?offset=0&limit=${postsPerPage}&ordering=-id`);

//obtaining all data
export const getAllUserGroup = () => axiosInstance.get(`auth/groups`);

//obtaining the previous page data from paginated data
export const getPrevious = (previous) => axiosInstance.get(previous);

//obtaining the next page data from paginated data
export const getNext = (next) => axiosInstance.get(next);

//obtaining the particular page data from paginated data
export const getPageUserGroup = (number, postsPerPage) =>
  axiosInstance.get(`auth/groups?offset=${(number - 1) * postsPerPage}&limit=${postsPerPage}&ordering=-id`);

//creating function
export const createUserGroup = (body) => axiosInstance.post(`auth/group/create`, body);

//deleting function
export const deleteUserGroup = (id) => axiosInstance.delete(`auth/groups/${id}`);

//update function
export const updateUserGroup = (id, body) => axiosInstance.patch(`auth/groups/${id}`, body);

//searching function
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(`auth/groups?offset=0&limit=${postsPerPage}&search=${search}`);
// checking the redundant data
export const checkRedundantDataUserGroup = (e, cancelToken) =>
  axiosInstance.get(`auth/groups?name=${e.target.value}`, {
    cancelToken: cancelToken.token,
  });
//get All Permission
export const getAllPermission = () => {
  return axiosInstance.get(`auth/permissions?limit=0`);
};
//get all models
export const getAllPermissionCategory = () => {
  return axiosInstance.get(`auth/permission-categories?ordering=-id`);
};
export const getSpecificPermissions = (id) => axiosInstance.get(`auth/permissions?category=${id}&limit=0`);
