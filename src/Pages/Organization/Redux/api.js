import axiosInstance from "../../../Utils/axios";

const BASE_URL = "api/v1/organization-app/organization"; // Adjusted base URL for Organization

// Fetch all organizations with filters (pagination, status, priority, level)
export const getAllOrganizations = (postsPerPage, page, status, priority, level) =>
  axiosInstance.get(
    `${BASE_URL}?limit=${postsPerPage}&page=${page}&status=${status !== undefined ? status : ""}&priority=${
      priority !== undefined ? priority : ""
    }&level=${level !== undefined ? level : ""}`
  );

// Fetch a limited number of organizations for listing
export const getOrganizations = (postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=0&limit=${postsPerPage}&ordering=-id`);

// Create a new organization
export const createOrganization = (body) => axiosInstance.post(`${BASE_URL}`, body);

// Update an existing organization by ID
export const updateOrganization = (id, body) => axiosInstance.patch(`${BASE_URL}/${id}`, body);

// Fetch the previous page of organizations
export const getPreviousOrganization = (previous) => axiosInstance.get(previous);

// Fetch the next page of organizations
export const getNextOrganization = (next) => axiosInstance.get(next);

// Fetch a specific page of organizations
export const getPageOrganizations = (number, postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=${(number - 1) * postsPerPage}&limit=${postsPerPage}&ordering=-id`);

// Handle search for organizations
export const handleOrganizationSearch = (search, postsPerPage) =>
  axiosInstance.get(`${BASE_URL}?offset=0&limit=${postsPerPage}&search=${search}`);

// Fetch a specific organization by ID
export const getSpecificOrganization = (id) => axiosInstance.get(`${BASE_URL}/${id}`);
