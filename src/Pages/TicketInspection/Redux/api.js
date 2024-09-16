import axiosInstance from "../../../Utils/axios";

const BASE_URL = "api/v1/ticket-inspection-app/ticketInspection";

export const getAllTicketsInspection = () => axiosInstance.get(`${BASE_URL}?limit=${postsPerPage}&page=${page}`);
export const getTicketsInspectionById = ({ ticketId, postsPerPage, page }) =>
  axiosInstance.get(`${BASE_URL}?limit=${postsPerPage}&page=${page}&ticketId=${ticketId}`);

export const getTicketsInspection = (postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=0&limit=${postsPerPage}&ordering=-id`);

export const createTicketsInspection = (body) => axiosInstance.post(`${BASE_URL}`, body);

export const updateTicketsInspection = (id, body) => axiosInstance.patch(`${BASE_URL}/${id}`, body);
export const getPreviousTicketsInspection = (previous) => axiosInstance.get(previous);
export const getNextTicketsInspection = (next) => axiosInstance.get(next);
export const getPageTicketsInspection = (number, postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=${(number - 1) * postsPerPage}&limit=${postsPerPage}&ordering=-id`);
export const handleSearchTicketsInspection = (search, postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=0&limit=${postsPerPage}&search=${search}`);

export const getSpecificTicketInspection = (id) => axiosInstance.get(`${BASE_URL}/${id}`);

export const getAnswerQuestionByItemId = (itemId) =>
  axiosInstance.get(`api/v1/questionnaire-app/questionnaire?itemId=${itemId}`);
// export const getAnswerQuestionPagination = (itemId, Page, postsPerPage) =>
//   axiosInstance.get(`api/v1/questionnaire-app/questionnaire?itemId=${itemId}&page=${Page}&limit=${postsPerPage}`);
// export const getNextQuestion = (next) => axiosInstance.get(next);
