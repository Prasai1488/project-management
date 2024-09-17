import axiosInstance from "../../../Utils/axios";

const BASE_URL = "api/v1/orders-app/orders";
export const getAllOrders = (postsPerPage, page) => axiosInstance.get(`${BASE_URL}?limit=${postsPerPage}&page=${page}`);

export const getOrders = (postsPerPage) => axiosInstance.get(`${BASE_URL}?offset=0&limit=${postsPerPage}&ordering=-id`);
export const createOrders = (body) => axiosInstance.post(`${BASE_URL}`, body);
export const updateOrders = (id, body) => axiosInstance.patch(`${BASE_URL}/${id}`, body);
export const getPrevious = (previous) => axiosInstance.get(previous);
export const getNext = (next) => axiosInstance.get(next);
export const getPageOrders = (number, postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=${(number - 1) * postsPerPage}&limit=${postsPerPage}&ordering=-id`);
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=0&limit=${postsPerPage}&search=${search}`);
export const getSpecificOrders = (id) => axiosInstance.get(`${BASE_URL}/${id}`);
