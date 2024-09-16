import axiosInstance from "../../../Utils/axios";

const BASE_URL = "api/v1/customer-app/customer";

export const getAllCustomers = () => axiosInstance.get(`${BASE_URL}`);
export const getCustomers = (postsPerPage) => axiosInstance.get(`${BASE_URL}?offset=0&limit=${postsPerPage}&ordering=-id`);
export const createCustomers = (body) => axiosInstance.post(`${BASE_URL}`, body);
export const updateCustomers = (id, body) => axiosInstance.patch(`${BASE_URL}${id}`, body);

export const getPrevious = (previous) => axiosInstance.get(previous);
export const getNext = (next) => axiosInstance.get(next);
export const getPageCustomers = (number, postsPerPage) =>
   axiosInstance.get(`${BASE_URL}?offset=${(number - 1) * postsPerPage}&limit=${postsPerPage}&ordering=-id`);
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=0&limit=${postsPerPage}&search=${search}`);
