import axiosInstance from "../../../Utils/axios";

const BASE_URL = "api/v1/category-app/category"; 
export const getAllCategories = (postsPerPage, page, status, priority, level) =>
  axiosInstance.get(
    `${BASE_URL}?limit=${postsPerPage}&page=${page}&status=${status !== undefined ? status : ""}&priority=${
      priority !== undefined ? priority : ""
    }&level=${level !== undefined ? level : ""}`
  );

export const getCategories = (postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=0&limit=${postsPerPage}&ordering=-id`);

export const createCategory = (body) => axiosInstance.post(`${BASE_URL}`, body);

export const updateCategory = (id, body) => axiosInstance.patch(`${BASE_URL}/${id}`, body);

export const getPreviousCategory = (previous) => axiosInstance.get(previous);

export const getNextCategory = (next) => axiosInstance.get(next);

export const getPageCategories = (number, postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=${(number - 1) * postsPerPage}&limit=${postsPerPage}&ordering=-id`);

export const handleCategorySearch = (search, postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=0&limit=${postsPerPage}&search=${search}`);

export const getSpecificCategory = (id) => axiosInstance.get(`${BASE_URL}/${id}`);
