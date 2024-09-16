import axiosInstance from "../../../Utils/axios";

//obtaining the paginated data
export const getSectors = (postsPerPage) =>
  axiosInstance.get(`api/v1/user/sector?offset=0&limit=${postsPerPage}&ordering=-id`);

//obtaining all fiscal sessions
export const getAllSectors = () => axiosInstance.get(`api/v1/user/sector?ordering=-id`);

//obtaining the previous page data from paginated data
export const getPrevious = (previous) => axiosInstance.get(previous);

//obtaining the next page data from paginated data
export const getNext = (next) => axiosInstance.get(next);

//obtaining the particular page data from paginated data
export const getPageSectors = (number, postsPerPage) =>
  axiosInstance.get(`api/v1/user/sector?offset=${(number - 1) * postsPerPage}&limit=${postsPerPage}&ordering=-id`);

//creating function
export const createSectors = (body) => axiosInstance.post(`api/v1/user/sector`, body);
//updating function
export const updateSectors = (id, body) => axiosInstance.patch(`api/v1/user/sector/${id}`, body);

//searching function
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(`api/v1/user/sector?offset=0&limit=${postsPerPage}&search=${search}`);
