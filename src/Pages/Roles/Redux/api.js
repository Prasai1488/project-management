import axiosInstance from "../../../Utils/axios";

//obtaining the paginated data
export const getRole = (postsPerPage) =>
  axiosInstance.get(`api/v1/role-app/role?offset=0&limit=${postsPerPage}&ordering=-id`);

//obtaining all data
export const getAllRole = () => axiosInstance.get(`api/v1/role-app/role`);

//obtaining the previous page data from paginated data
export const getPrevious = (previous) => axiosInstance.get(previous);

//obtaining the next page data from paginated data
export const getNext = (next) => axiosInstance.get(next);

//obtaining the particular page data from paginated data
export const getPageRole = (number, postsPerPage) =>
  axiosInstance.get(`api/v1/role-app/role?offset=${(number - 1) * postsPerPage}&limit=${postsPerPage}&ordering=-id`);

//creating function
export const createRole = (body) => axiosInstance.post(`auth/group/create`, body);

//deleting function
export const deleteRole = (id) => axiosInstance.delete(`api/v1/role-app/role/${id}`);

//update function
export const updateRole = (id, body) => axiosInstance.patch(`api/v1/role-app/role/${id}`, body);

//searching function
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(`api/v1/role-app/role?offset=0&limit=${postsPerPage}&search=${search}`);
// checking the redundant data
export const checkRedundantDataRole = (e, cancelToken) =>
  axiosInstance.get(`api/v1/role-app/role?name=${e.target.value}`, {
    cancelToken: cancelToken.token,
  });
//get All Permission
export const getAllPermission = () => {
  return axiosInstance.get(`api/v1/permission-app/permission?limit=0`);
};
//get all models
export const getAllPermissionCategory = () => {
  return axiosInstance.get(`api/v1/permission-app/permission?ordering=-id`);
};
export const getSpecificPermissions = (id) =>
  axiosInstance.get(`api/v1/permission-app/permission?permissionCategory=${id}&limit=0`);
