import axiosInstance from "../../../Utils/axios";

//obtaining the paginated data
export const getCountry = (postsPerPage) =>
  axiosInstance.get(
    `api/v1/core-app/country?offset=0&limit=${postsPerPage}&ordering=-id`
  );

//obtaining all fiscal sessions
export const getAllCountry = () =>
  axiosInstance.get(`api/v1/core-app/country?ordering=-id`);

//obtaining the previous page data from paginated data
export const getPrevious = (previous) => axiosInstance.get(previous);

//obtaining the next page data from paginated data
export const getNext = (next) => axiosInstance.get(next);

//obtaining the particular page data from paginated data
export const getPageCountry = (number, postsPerPage) =>
  axiosInstance.get(
    `api/v1/core-app/country?offset=${
      (number - 1) * postsPerPage
    }&limit=${postsPerPage}&ordering=-id`
  );

//creating function
export const createCountry = (body) =>
  axiosInstance.post(`api/v1/core-app/country`, body, {
    "Content-Type": "multipart/form-data",
  });
//updating function
export const updateCountry = (id, body) =>
  axiosInstance.patch(`api/v1/core-app/country/${id}`, body, {
    "Content-Type": "multipart/form-data",
  });

//searching function
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(
    `api/v1/core-app/country?offset=0&limit=${postsPerPage}&search=${search}`
  );

//deleting the image
export const deletePhoto = (id, body) =>
  axiosInstance.patch(`api/v1/core-app/country/${id}`, body);
