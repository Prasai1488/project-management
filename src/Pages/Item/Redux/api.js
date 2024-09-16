import axiosInstance from "../../../Utils/axios";

const BASE_URL = "api/v1/item-app/item";

export const getAllItems = ({ postsPerPage, page, itemType, minPrice, maxPrice }) =>
  axiosInstance.get(
    `${BASE_URL}?limit=${postsPerPage}&page=${page}&itemType=${itemType !== undefined ? itemType : ""}&maxPrice=${
      maxPrice || ""
    }&minPrice=${minPrice || ""}`
  );
export const getItems = (postsPerPage) => axiosInstance.get(`${BASE_URL}?offset=0&limit=${postsPerPage}&ordering=-id`);
export const createItems = (body) => axiosInstance.post(`${BASE_URL}`, body);
export const updateItems = (id, body) => axiosInstance.patch(`${BASE_URL}/${id}`, body);
export const getPrevious = (previous) => axiosInstance.get(previous);
export const getNext = (next) => axiosInstance.get(next);
export const getPageItems = (number, postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=${(number - 1) * postsPerPage}&limit=${postsPerPage}&ordering=-id`);
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=0&limit=${postsPerPage}&search=${search}`);
