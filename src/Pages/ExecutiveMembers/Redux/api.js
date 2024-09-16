import axiosInstance from "../../../Utils/axios";

//obtaining the paginated data
export const getExecutiveMembers = (postsPerPage) =>
  axiosInstance.get(`api/v1/user/member?offset=0&limit=${postsPerPage}&ordering=-id`);

//obtaining all fiscal sessions
export const getAllExecutiveMembers = () => axiosInstance.get(`api/v1/ticket/issues/?ordering=-id`);

//obtaining the previous page data from paginated data
export const getPrevious = (previous) => axiosInstance.get(previous);

//obtaining the next page data from paginated data
export const getNext = (next) => axiosInstance.get(next);

//obtaining the particular page data from paginated data
export const getPageExecutiveMembers = (number, postsPerPage) =>
  axiosInstance.get(`api/v1/ticket/issues/?offset=${(number - 1) * postsPerPage}&limit=${postsPerPage}&ordering=-id`);

//creating function
export const createExecutiveMembers = (body) => axiosInstance.post(`api/v1/user/register-member`, body);
//updating function
export const updateExecutiveMembers = (id, body) => axiosInstance.patch(`api/v1/ticket/issues/${id}`, body);

//searching function
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(`api/v1/ticket/issues/?offset=0&limit=${postsPerPage}&search=${search}`);
