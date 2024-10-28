import axiosInstance from "./axios";

export const loadOptionsItem = async (search, loadOptions) => {
  const data = await axiosInstance(`api/v1/item-app/item`);

  return {
    options: data?.data.items,
    additional: {
      limit: 10,
    },
  };
};
export const loadOptionsCategory = async (search, loadOptions) => {
  const data = await axiosInstance(`api/v1/product/category/`);

  return {
    options: data?.data.data,
    additional: {
      limit: 10,
    },
  };
};

export const loadOptionsSubCategory = async (search, loadOptions) => {
  const data = await axiosInstance(`api/v1/product/sub-category/`);

  return {
    options: data?.data.data,
    additional: {
      limit: 10,
    },
  };
};

export const loadOptionsClient = async (search, loadOptions) => {
  const data = await axiosInstance(`api/v1/client-app/client`);

  return {
    options: data?.data.clients,
    additional: {
      limit: 10,
    },
  };
};

export const loadOptionsContactPerson = async (search, loadOptions) => {
  const data = await axiosInstance(`api/v1/contact-person-app/contact-person`);
  return {
    options: data?.data.contactPersons,
    additional: {
      limit: 10,
    },
  };
};

export const loadOptionsIssue = async (search, loadOptions) => {
  const data = await axiosInstance(`api/v1/issue-app/issue`);
  return {
    options: data?.data.issues,
    additional: {
      limit: 10,
    },
  };
};

export const loadOptionsCustomer = async (search, loadOptions, { limit, offset }) => {
  const data = await axiosInstance(`api/v1/customer-app/customer?offset=${offset}&limit=${limit}&search=${search}`);
  return {
    options: data?.data.customers,
    additional: {
      offset: 0,
      limit: 10,
    },
  };
};

export const loadOptionsUser = async (search, loadOptions, { limit, offset }) => {
  const data = await axiosInstance(`/api/v1/auth-app/users?offset=${offset}&limit=${limit}&search=${search}`);
  return {
    options: data?.data.users,
    additional: {
      offset: 0,
      limit: 10,
    },
  };
};

// export const loadCategoryOptions = async (search, loadOptions, { limit, offset }) => {
//   const response = await axiosInstance.get(`/api/v1/product/category/`);
//   console.log(response.data, "data from loadCategoryOptions");
//   return {
//     options: response.data.categories,
//     additional: {
//       offset: offset + limit,
//       limit: limit,
//     },
//   };
// };

// Load categories from API for AsyncSelect
export const loadCategoryOptions = async (inputValue, { limit = 10, offset = 1 }) => {
  try {
    const response = await axiosInstance.get(`/api/v1/product/category/`, {
      params: {
        search: inputValue || "",
        limit: limit, 
        offset: offset, 
      },
    });

    // Extract categories and pagination details from the API response
    const { data: categories, pagination } = response.data;

    return {
      options: categories.map((category) => ({
        value: category.id,
        label: category.name, 
      })),
      hasMore: pagination.currentPage < pagination.totalPages, 
      additional: {
        offset: offset + limit, 
      },
    };
  } catch (error) {
    console.error("Error loading category options:", error);
    return {
      options: [], 
      hasMore: false, 
      additional: {
        offset,
      },
    };
  }
};
