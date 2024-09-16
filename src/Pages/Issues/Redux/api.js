import axiosInstance from "../../../Utils/axios";

//obtaining the paginated data
export const getTicketIssues = (postsPerPage) =>
  axiosInstance.get(`api/v1/ticket/issues/?offset=0&limit=${postsPerPage}&ordering=-id`);

//obtaining all fiscal sessions
export const getAllTicketIssues = () => axiosInstance.get(`api/v1/ticket/issues/?ordering=-id`);

//obtaining the previous page data from paginated data
export const getPrevious = (previous) => axiosInstance.get(previous);

//obtaining the next page data from paginated data
export const getNext = (next) => axiosInstance.get(next);

//obtaining the particular page data from paginated data
export const getPageTicketIssues = (number, postsPerPage) =>
  axiosInstance.get(`api/v1/ticket/issues/?offset=${(number - 1) * postsPerPage}&limit=${postsPerPage}&ordering=-id`);

//creating function
export const createTicketIssues = (body) => axiosInstance.post(`api/v1/ticket/issues/`, body);
//updating function
export const updateTicketIssues = (id, body) => axiosInstance.patch(`api/v1/ticket/issues/${id}`, body);

export const getReplies = (id) => axiosInstance.get(`api/v1/ticket/reply/?issue__id=${id}&ordering=-created_at`);
export const createReply = (body) => axiosInstance.post(`api/v1/ticket/reply/`, body);
export const getReply = (id) => axiosInstance.get(`api/v1/ticket/reply/${id}`);
export const updateReply = (id, body) => axiosInstance.patch(`api/v1/ticket/reply/${id}`, body);

//searching function
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(`api/v1/ticket/issues/?offset=0&limit=${postsPerPage}&search=${search}`);
