import axiosInstance from "../../../Utils/axios";

const BASE_URL = "api/v1/unit-app/unit";

export const getAllUnits = ({ postsPerPage, page }) =>
  axiosInstance.get(`${BASE_URL}?limit=${postsPerPage}&page=${page}`);
export const getUnits = (postsPerPage) => axiosInstance.get(`${BASE_URL}?offset=0&limit=${postsPerPage}&ordering=-id`);
export const createUnits = (body) => axiosInstance.post(`${BASE_URL}`, body);
export const updateUnits = (id, body) => axiosInstance.patch(`${BASE_URL}/${id}`, body);
export const getPrevious = (previous) => axiosInstance.get(previous);
export const getNext = (next) => axiosInstance.get(next);
export const getPageUnits = (number, postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=${(number - 1) * postsPerPage}&limit=${postsPerPage}&ordering=-id`);
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=0&limit=${postsPerPage}&search=${search}`);
