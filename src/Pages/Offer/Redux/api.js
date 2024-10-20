import axiosInstance from "../../../Utils/axios";

// Obtaining the paginated data
export const getOffers = (postsPerPage) =>
  axiosInstance.get(`api/v1/user/offer?offset=0&limit=${postsPerPage}&ordering=-id`);

export const getAllOffers = (postsPerPage) =>
  axiosInstance.get(`api/v1/user/offer?offset=0&limit=${postsPerPage}&ordering=-id`);

// Obtaining the previous page data from paginated data
export const getPrevious = (previous) => axiosInstance.get(previous);

// Obtaining the next page data from paginated data
export const getNext = (next) => axiosInstance.get(next);

// Obtaining the particular page data from paginated data
export const getOfferPage = (number, postsPerPage) =>
  axiosInstance.get(`api/v1/ticket/issues/?offset=${(number - 1) * postsPerPage}&limit=${postsPerPage}&ordering=-id`);

// Creating function for offer
export const createOffer = (body) => axiosInstance.post(`api/v1/user/register-member`, body);

// Updating function for offer
export const updateOffer = (id, body) => axiosInstance.patch(`api/v1/ticket/issues/${id}`, body);

// Searching function for offer
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(`api/v1/ticket/issues/?offset=0&limit=${postsPerPage}&search=${search}`);
