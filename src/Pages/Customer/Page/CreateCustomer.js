import { Formik } from "formik";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
import FormWrapper from "../../../Components/FormWrapper/FormWrapper";
import Loader from "../../../Components/Loader";
import { renderTextField } from "../../../Utils/customFields";
import { createCustomers, getAllCustomers, updateCustomers } from "../Redux/thunk";

const CreateCustomer = ({ dispatch, postsPerPage = 10, setShowModal, type }) => {
  const formRef = useRef();
  const customer = useSelector((state) => state.customer.customer);
  const loading = useSelector((state) => state.customer.loading);
  const loadingUpdated = useSelector((state) => state.customer.loadingUpdated);
  const edit = useSelector((state) => state.customer.edit);

  const initialState = {
    name: edit ? customer?.name : "",
    email: edit ? customer?.email : "",
    phone: edit ? customer?.phone : "",
    address: edit ? customer?.address : "",
    pan: edit ? customer?.pan : "",
    contactPerson: edit ? customer?.contactPerson : "",
    contactPersonPhoneNo: edit ? customer?.contactPersonPhoneNo : "",
    isActive: edit ? customer?.isActive : true,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required!"),
    email: Yup.string().email("Invalid email!").required("Required!"),
    phone: Yup.number().max(9999999999, "Invalid length!").required("Required!"),
    address: Yup.string().required("Required!"),
    pan: Yup.string().required("Required!"),
    contactPerson: Yup.string().required("Required!"),
    contactPersonPhoneNo: Yup.number().max(9999999999, "Invalid length!").required("Required!"),
    isActive: Yup.boolean().required("Required!"),
  });

  const onSubmit = (values) => {
    const action = edit ? updateCustomers({ id: customer?._id, values: values }) : createCustomers(values);
    const successMessage = edit ? `${type} Updated successfully` : `${type} Created successfully`;

    dispatch(action)
      .unwrap()
      .then(() => {
        successFunction(successMessage);
        dispatch(getAllCustomers(postsPerPage));
        setShowModal(false);
      })
      .catch(errorFunction);
  };

  return (
    <>
      {(loading || loadingUpdated) && <Loader />}
      <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={onSubmit} innerRef={formRef}>
        {(formik) => {
          return (
            <FormWrapper>
              {renderTextField(formik, 6, "name", "text", "Name", true)}
              {renderTextField(formik, 6, "email", "email", "Email", true)}
              {renderTextField(formik, 6, "phone", "number", "Phone", true)}
              {renderTextField(formik, 6, "address", "text", "Address", true)}
              {renderTextField(formik, 6, "pan", "text", "PAN", true)}
              {renderTextField(formik, 6, "contactPerson", "text", "Contact Person", true)}
              {renderTextField(formik, 6, "contactPersonPhoneNo", "number", "Contact Person Phone No", true)}
            </FormWrapper>
          );
        }}
      </Formik>
    </>
  );
};

export default CreateCustomer;
