import axiosInstance from "../../../Utils/axios";

const BASE_URL = "api/v1/product/";

// export const getPaginatedProducts = () => axiosInstance.get(`${BASE_URL}`);


export const getPaginatedProducts = (page = 1) => {
  const url = `${BASE_URL}?page=${page}`;
  return axiosInstance
    .get(url)
    .then((response) => {
      const { data, pagination } = response.data; // Extract data and pagination from the response
      return { products: data, pagination }; // Return the products as 'data'
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      throw error; // Rethrow the error for rejection
    });
};

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

  // Append all product fields
  formData.append("name", productData.name);
  formData.append("category", productData.category);
  formData.append("price", productData.price);
  formData.append("capacity", productData.capacity);

  // Conditionally append the image if it's a new file (not a string)
  if (productData.image && typeof productData.image !== "string") {
    formData.append("image", productData.image);
  }

  // Send multipart/form-data request via PATCH
  return axiosInstance.patch(`${BASE_URL}${productId}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
