import axiosInstance from "../../../Utils/axios";

const BASE_URL = "api/v1/sales-app/sales";

export const getAllSales = ({ postsPerPage, page, startDate, endDate }) =>
  axiosInstance.get(
    `${BASE_URL}?limit=${postsPerPage}&page=${page}&startDate=${startDate || ""}&endDate=${endDate || ""}`
  );
export const getSales = (postsPerPage) => axiosInstance.get(`${BASE_URL}?offset=0&limit=${postsPerPage}&ordering=-id`);
export const createSales = (body) => axiosInstance.post(`${BASE_URL}`, body);
export const updateSales = (id, body) => axiosInstance.patch(`${BASE_URL}/${id}`, body);
export const getPrevious = (previous) => axiosInstance.get(previous);
export const getNext = (next) => axiosInstance.get(next);
export const getPageSales = (number, postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=${(number - 1) * postsPerPage}&limit=${postsPerPage}&ordering=-id`);
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=0&limit=${postsPerPage}&search=${search}`);
export const getSpecificSale = (id) => axiosInstance.get(`${BASE_URL}/${id}`);
