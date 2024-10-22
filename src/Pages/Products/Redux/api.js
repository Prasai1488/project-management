import axiosInstance from "../../../Utils/axios";

const BASE_URL = "api/v1/product/";

export const getAllProducts = () => axiosInstance.get(`${BASE_URL}`);

export const createProduct = (productData) => {
  const formData = new FormData();

  // Append all product fields
  formData.append("name", productData.name);
  formData.append("category", productData.category);
  formData.append("price", productData.price);
  formData.append("capacity", productData.capacity);

  // Append the image if it exists
  if (productData.image) {
    formData.append("image", productData.image);
  }

  // Send multipart/form-data request
  return axiosInstance.post(`${BASE_URL}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Update an existing product
export const updateProduct = (productId, productData) => {
  const formData = new FormData();

  // Append all product fields (conditionally if needed)
  formData.append("name", productData.name);
  formData.append("category", productData.category);
  formData.append("price", productData.price);
  formData.append("capacity", productData.capacity);

  // Append the image if it exists and has been changed
  if (productData.image) {
    formData.append("image", productData.image);
  }

  // Send multipart/form-data request
  return axiosInstance.patch(`${BASE_URL}${productId}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
