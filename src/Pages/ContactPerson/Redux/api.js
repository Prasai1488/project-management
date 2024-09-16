import axiosInstance from "../../../Utils/axios";

const BASE_URL = "api/v1/contact-person-app/contact-person";

export const getAllContactPersons = ({ postsPerPage, page }) =>
  axiosInstance.get(`${BASE_URL}?limit=${postsPerPage}&page=${page}`);
export const getContactPersons = (postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=0&limit=${postsPerPage}&ordering=-id`);
export const createContactPersons = (body) => axiosInstance.post(`${BASE_URL}`, body);
export const updateContactPersons = (id, body) => axiosInstance.patch(`${BASE_URL}/${id}`, body);
export const getPrevious = (previous) => axiosInstance.get(previous);
export const getNext = (next) => axiosInstance.get(next);
export const getPageContactPersons = (number, postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=${(number - 1) * postsPerPage}&limit=${postsPerPage}&ordering=-id`);
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=0&limit=${postsPerPage}&search=${search}`);
