import axiosInstance from "../../../Utils/axios";

export const loadOptionsManufacturer = async (search, loadOptions) => {
  const data = await axiosInstance(`api/v1/manufacturer-app/manufacturer`);

  return {
    options: data?.data.manufacturers,
    additional: {
      limit: 10,
    },
  };
};

// loadOptionsUnits
export const loadOptionsUnits = async (search, loadOptions) => {
  const data = await axiosInstance(`api/v1/unit-app/unit`);

  return {
    options: data?.data.units,
    additional: {
      limit: 10,
    },
  };
};
