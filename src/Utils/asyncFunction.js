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
  const data = await axiosInstance(`api/v1/auth-app/users?offset=${offset}&limit=${limit}&search=${search}`);
  return {
    options: data?.data.users,
    additional: {
      offset: 0,
      limit: 10,
    },
  };
};

