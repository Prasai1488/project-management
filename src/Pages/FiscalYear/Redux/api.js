import axiosInstance from "../../../Utils/axios";

//obtaining the paginated data
export const getFiscalYear = (postsPerPage) =>
  axiosInstance.get(
    `api/v1/core-app/fiscal-year?offset=0&limit=${postsPerPage}&ordering=-id`
  );

//obtaining all fiscal sessions
export const getAllFiscalYear = () =>
  axiosInstance.get(`api/v1/core-app/fiscal-year?ordering=-id`);

//obtaining the previous page data from paginated data
export const getPrevious = (previous) => axiosInstance.get(previous);

//obtaining the next page data from paginated data
export const getNext = (next) => axiosInstance.get(next);

//obtaining the particular page data from paginated data
export const getPageFiscalYear = (number, postsPerPage) =>
  axiosInstance.get(
    `api/v1/core-app/fiscal-year?offset=${
      (number - 1) * postsPerPage
    }&limit=${postsPerPage}&ordering=-id`
  );

//creating function
export const createFiscalYear = (body) =>
  axiosInstance.post(`api/v1/core-app/fiscal-year`, body);

//searching function
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(
    `api/v1/core-app/fiscal-year?offset=0&limit=${postsPerPage}&search=${search}`
  );

// checking the redundant data
export const checkRedundantDataFull = (e, cancelToken) =>
  axiosInstance.get(
    `api/v1/core-app/fiscal-year?session_full=${e.target.value.trim()}`,
    {
      cancelToken: cancelToken.token,
    }
  );
export const checkRedundantDataShort = (e, cancelToken) =>
  axiosInstance.get(
    `api/v1/core-app/fiscal-year?session_short=${e.target.value.trim()}`,
    {
      cancelToken: cancelToken.token,
    }
  );
