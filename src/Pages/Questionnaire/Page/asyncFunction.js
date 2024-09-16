import axiosInstance from "../../../Utils/axios";

export const loadOptionsItem = async (search, loadOptions) => {
  const data = await axiosInstance(`api/v1/item-app/item`);

  return {
    options: data?.data.items,
    additional: {
      limit: 10,
    },
  };
};

export const loadOptionsPermissionCategory = async (search, loadOptions) => {
  const data = await axiosInstance(`api/v1/permission-category-app/permission-category`);

  return {
    options: data.data.permissionCategories,
    additional: {
      limit: 10,
    },
  };
};
