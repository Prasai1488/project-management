import axiosInstance from "../../../Utils/axios";

// obtaining the paginated data
export const getFiscalSessionBS = (postsPerPage) =>
  axiosInstance.get(
    `api/v1/core-app/fiscal-session-bs?offset=0&limit=${postsPerPage}&ordering=-id`
  );

//obtaining all data
export const getAllFiscalSessionBS = () =>
  axiosInstance.get(`api/v1/core-app/fiscal-session-bs?ordering=-id`);

//obtaining the previous page data from paginated data
export const getPrevious = (previous) => axiosInstance.get(previous);

//obtaining the next page data from paginated data
export const getNext = (next) => axiosInstance.get(next);

//obtaining the particular page data from paginated data
export const getPageFiscalSessionBS = (number, postsPerPage) =>
  axiosInstance.get(
    `api/v1/core-app/fiscal-session-bs?offset=${
      (number - 1) * postsPerPage
    }&limit=${postsPerPage}&ordering=-id`
  );

//creating function
export const createFiscalSessionBS = (body) =>
  axiosInstance.post(`api/v1/core-app/fiscal-session-bs`, body);
//searching function
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(
    `api/v1/core-app/fiscal-session-bs?offset=0&limit=${postsPerPage}&search=${search}`
  );

// checking the redundant data
export const checkRedundantDataFullBS = (e, cancelToken) =>
  axiosInstance.get(
    `api/v1/core-app/fiscal-session-bs?session_full=${e.target.value.trim()}`,
    {
      cancelToken: cancelToken.token,
    }
  );
export const checkRedundantDataShortBS = (e, cancelToken) =>
  axiosInstance.get(
    `api/v1/core-app/fiscal-session-bs?session_short=${e.target.value.trim()}`,
    {
      cancelToken: cancelToken.token,
    }
  );
