import axiosInstance from "../../../Utils/axios";

const BASE_URL = "http://192.168.1.91:8000/api/v1/product/"; 

export const getAllProducts = () => axiosInstance.get(`${BASE_URL}`);

