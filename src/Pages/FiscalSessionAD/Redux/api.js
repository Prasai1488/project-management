import axiosInstance from "../../../Utils/axios";

// obtaining the paginated data
export const getFiscalSessionAD = (postsPerPage) =>
  axiosInstance.get(
    `api/v1/core-app/fiscal-session-ad?offset=0&limit=${postsPerPage}&ordering=-id`
  );

//obtaining all data
export const getAllFiscalSessionAD = () =>
  axiosInstance.get(`api/v1/core-app/fiscal-session-ad?ordering=-id`);

//obtaining the previous page data from paginated data
export const getPrevious = (previous) => axiosInstance.get(previous);

//obtaining the next page data from paginated data
export const getNext = (next) => axiosInstance.get(next);

//obtaining the particular page data from paginated data
export const getPageFiscalSessionAD = (number, postsPerPage) =>
  axiosInstance.get(
    `api/v1/core-app/fiscal-session-ad?offset=${
      (number - 1) * postsPerPage
    }&limit=${postsPerPage}&ordering=-id`
  );

//creating function
export const createFiscalSessionAD = (body) =>
  axiosInstance.post(`api/v1/core-app/fiscal-session-ad`, body);
//searching function
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(
    `api/v1/core-app/fiscal-session-ad?offset=0&limit=${postsPerPage}&search=${search}`
  );

// checking the redundant data
export const checkRedundantDataFullAD = (e, cancelToken) =>
  axiosInstance.get(
    `api/v1/core-app/fiscal-session-ad?session_full=${e.target.value.trim()}`,
    {
      cancelToken: cancelToken.token,
    }
  );
export const checkRedundantDataShortAD = (e, cancelToken) =>
  axiosInstance.get(
    `api/v1/core-app/fiscal-session-ad?session_short=${e.target.value.trim()}`,
    {
      cancelToken: cancelToken.token,
    }
  );
