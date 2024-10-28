import axiosInstance from "../../../Utils/axios";

const RANGER_URL = "/api/v1/product/order-admin";

export const getAllOrders = (status) => axiosInstance.get(`${RANGER_URL}/`);
export const getOrders = (postsPerPage) =>
  axiosInstance.get(`${RANGER_URL}/?offset=0&limit=${postsPerPage}&ordering=-id`);
export const createOrders = (body) => axiosInstance.patch(`${RANGER_URL}/`, body);
export const updateOrders = (orderId, body) => axiosInstance.patch(`${RANGER_URL}/${orderId}/`, body);
export const getPrevious = (previous) => axiosInstance.get(previous);
export const getNext = (next) => axiosInstance.get(next);
export const getPageOrders = (number, postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=${(number - 1) * postsPerPage}&limit=${postsPerPage}&ordering=-id`);
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=0&limit=${postsPerPage}&search=${search}`);

export const getSpecificOrders = (id) => axiosInstance.get(`${RANGER_URL}/${id}/`);

export const getStatus = (status) => axiosInstance.get(`${RANGER_URL}/status=${status}`);
