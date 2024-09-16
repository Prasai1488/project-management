import axiosInstance from "../../../Utils/axios";

const BASE_URL = "api/v1/ticket-app/ticket";

export const getAllTickets = ( postsPerPage, page, status, priority, level ) =>
  axiosInstance.get(
    `${BASE_URL}?limit=${postsPerPage}&page=${page}&status=${status !== undefined ? status : ""}&priority=${
      priority !== undefined ? priority : ""
    }&level=${level !== undefined ? level : ""}`
  );

export const getTickets = (postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=0&limit=${postsPerPage}&ordering=-id`);
export const createTickets = (body) => axiosInstance.post(`${BASE_URL}`, body);
export const updateTickets = (id, body) => axiosInstance.patch(`${BASE_URL}/${id}`, body);
export const getPrevious = (previous) => axiosInstance.get(previous);
export const getNext = (next) => axiosInstance.get(next);
export const getPageTickets = (number, postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=${(number - 1) * postsPerPage}&limit=${postsPerPage}&ordering=-id`);
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=0&limit=${postsPerPage}&search=${search}`);
export const getSpecificTicket = (id) => axiosInstance.get(`${BASE_URL}/${id}`);
