import axiosInstance from "../../../Utils/axios";

const BASE_URL = "api/v1/questionnaire-app/questionnaire";

export const getAllQuestionnaires = ({ item, postsPerPage }) =>
  axiosInstance.get(
    `${BASE_URL}?limit=${postsPerPage}?itemId=${item ? (item._id === undefined ? " " : item._id) : ""}`
  );
export const getQuestionnaires = (postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=0&limit=${postsPerPage}&ordering=-id`);
export const createQuestionnaires = (body) => axiosInstance.post(`${BASE_URL}`, body);
export const updateQuestionnaires = (id, body) => axiosInstance.patch(`${BASE_URL}/${id}`, body);
export const getPrevious = (previous) => axiosInstance.get(previous);
export const getNext = (next) => axiosInstance.get(next);
export const getPageQuestionnaires = (number, postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=${(number - 1) * postsPerPage}&limit=${postsPerPage}&ordering=-id`);
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=0&limit=${postsPerPage}&search=${search}`);
