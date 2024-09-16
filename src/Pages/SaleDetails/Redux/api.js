import axiosInstance from "../../../Utils/axios";

const BASE_URL = "api/v1/sale-detail-app/sale-detail";

export const getAllSalesDetails = (postsPerPage, page) => axiosInstance.get(`${BASE_URL}`);
export const getSalesDetails = (postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=0&limit=${postsPerPage}&ordering=-id`);
export const createSalesDetails = (body) => axiosInstance.post(`${BASE_URL}`, body);
export const updateSalesDetails = (id, body) => axiosInstance.patch(`${BASE_URL}/${id}`, body);
export const getPrevious = (previous) => axiosInstance.get(previous);
export const getNext = (next) => axiosInstance.get(next);
export const getPageSalesDetails = (number, postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=${(number - 1) * postsPerPage}&limit=${postsPerPage}&ordering=-id`);
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=0&limit=${postsPerPage}&search=${search}`);
export const getSpecificSalesDetails = ({ postsPerPage, saleId, page }) =>
  axiosInstance.get(`${BASE_URL}?limit=${postsPerPage}&page=${page}&saleId=${saleId}`);
