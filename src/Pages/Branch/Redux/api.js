import axiosInstance from "../../../Utils/axios";

//obtaining the paginated data
export const getBranch = (postsPerPage) =>
  axiosInstance.get(
    `api/v1/core-app/branch?offset=0&limit=${postsPerPage}&ordering=-id`
  );

//obtaining all fiscal sessions
export const getAllBranch = () =>
  axiosInstance.get(`api/v1/core-app/branch?ordering=-id`);

//obtaining the previous page data from paginated data
export const getPrevious = (previous) => axiosInstance.get(previous);

//obtaining the next page data from paginated data
export const getNext = (next) => axiosInstance.get(next);

//obtaining the particular page data from paginated data
export const getPageBranch = (number, postsPerPage) =>
  axiosInstance.get(
    `api/v1/core-app/branch?offset=${
      (number - 1) * postsPerPage
    }&limit=${postsPerPage}&ordering=-id`
  );

//creating function
export const createBranch = (body) =>
  axiosInstance.post(`api/v1/core-app/branch`, body);
//updating function
export const updateBranch = (id, body) =>
  axiosInstance.patch(`api/v1/core-app/branch/${id}`, body);

//searching function
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(
    `api/v1/core-app/branch?offset=0&limit=${postsPerPage}&search=${search}`
  );

// checking the redundant data
export const checkRedundantDataName = (e, cancelToken) =>
  axiosInstance.get(
    `api/v1/core-app/branch?name=${e.target.value.trim()}`,
    {
      cancelToken: cancelToken.token,
    }
  );
export const checkRedundantDataCode = (e, cancelToken) =>
  axiosInstance.get(
    `api/v1/core-app/branch?code=${e.target.value.trim()}`,
    {
      cancelToken: cancelToken.token,
    }
  );
