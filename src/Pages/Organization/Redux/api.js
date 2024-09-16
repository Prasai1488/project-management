import axiosInstance from "../../../Utils/axios";

//obtaining the paginated data
export const getOrganization = (postsPerPage) =>
  axiosInstance.get(
    `api/v1/organization/organization-setup?offset=0&limit=${postsPerPage}&ordering=-id`
  );

//obtaining all fiscal sessions
export const getAllOrganization = () =>
  axiosInstance.get(`api/v1/organization/organization-setup?ordering=-id`);

//obtaining the previous page data from paginated data
export const getPrevious = (previous) => axiosInstance.get(previous);

//obtaining the next page data from paginated data
export const getNext = (next) => axiosInstance.get(next);

//obtaining the particular page data from paginated data
export const getPageOrganization = (number, postsPerPage) =>
  axiosInstance.get(
    `api/v1/organization/organization-setup?offset=${
      (number - 1) * postsPerPage
    }&limit=${postsPerPage}&ordering=-id`
  );

//creating function
export const createOrganization = (body) =>
  axiosInstance.post(`api/v1/organization/organization-setup`, body, {
    "Content-Type": "multipart/form-data",
  });
//updating function
export const updateOrganization = (id, body) =>
  axiosInstance.patch(`api/v1/organization/organization-setup/${id}`, body, {
    "Content-Type": "multipart/form-data",
  });

//searching function
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(
    `api/v1/organization/organization-setup?offset=0&limit=${postsPerPage}&search=${search}`
  );
