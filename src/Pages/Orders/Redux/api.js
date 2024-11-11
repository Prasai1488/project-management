import axiosInstance from "../../../Utils/axios";

const RANGER_URL = "/api/v1/product/order-admin";
export const getAllOrders = (postsPerPage, page, status) => {
  const statusQuery = status ? `&status=${status}` : "";

  return axiosInstance.get(`${RANGER_URL}/?limit=${postsPerPage}&page=${page}${statusQuery}`);
};
export const getOrders = (postsPerPage, startDate, endDate) =>
  axiosInstance.get(`${RANGER_URL}/?offset=0&limit=${postsPerPage}&startDate=${startDate}&endDate=${endDate}`);
export const createOrders = (body) => axiosInstance.patch(`${RANGER_URL}/`, body);
export const updateOrders = (orderId, body) => axiosInstance.patch(`${RANGER_URL}/${orderId}/`, body);
export const getPrevious = (previous) => axiosInstance.get(previous);
export const getNext = (next) => axiosInstance.get(next);
export const getPageOrders = (number, postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=${(number - 1) * postsPerPage}&limit=${postsPerPage}&ordering=-id`);
export const handleSearch = (search, postsPerPage, startDate, endDate) => {
  const statusQuery = status ? `&status=${status}` : "";
  axiosInstance.get(`${RANGER_URL}/?limit=${postsPerPage}&search=${search}${statusQuery}`);
};

export const getSpecificOrders = (id) => axiosInstance.get(`${RANGER_URL}/${id}/`);

export const getStatus = (status) => axiosInstance.get(`${RANGER_URL}/status=${status}`);

export const updateOrderByStatus = (orderId, body) => axiosInstance.patch(`${RANGER_URL}/${orderId}/`, body);
