import { Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
import CreateAlert from "../../../Components/Alert/CreateAlert";
import Button from "../../../Components/Buttons/Button";
import Loader from "../../../Components/Loader";
import TextField from "../../../Components/TextField/TextField";
import axiosInstance from "../../../Utils/axios";
import { createCustomers, getAllCustomers, updateCustomers } from "../Redux/thunk";

const Fields = [
  { id: 1, name: "name", type: "text", required: true, placeholder: "Name", label: "Name" },
  { id: 2, name: "email", type: "email", required: true, placeholder: "Email", label: "Email" },
  { id: 3, name: "phone", type: "number", required: true, placeholder: "Phone", label: "Phone" },
  { id: 4, name: "address", type: "text", required: true, placeholder: "Address", label: "Address" },
  { id: 5, name: "pan", type: "text", required: true, placeholder: "PAN", label: "PAN" },
  {
    id: 6,
    name: "contactPerson",
    type: "text",
    required: true,
    placeholder: "Contact Person",
    label: "Contact Person",
  },
  {
    id: 7,
    name: "contactPersonPhoneNo",
    type: "number",
    required: true,
    placeholder: "Contact Person Phone No",
    label: "Contact Person Phone No",
  },
  { id: 8, name: "isActive", type: "checkbox", required: true, placeholder: "Is Active", label: "Is Active" },
];

const CreateCustomer = ({ dispatch, postsPerPage = 10, setShowModal }) => {
  const formRef = useRef();
  const customer = useSelector((state) => state.customer.customer);
  const loading = useSelector((state) => state.customer.loading);
  const loadingUpdated = useSelector((state) => state.customer.loadingUpdated);
  const edit = useSelector((state) => state.customer.edit);

  const [lock, setLock] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const loadOptionsSector = async (search, loadOptions, { limit, offset }) => {
    const { data } = await axiosInstance(`api/v1/user/sector?offset=0&limit=${postsPerPage}&search=${search}`);
    return {
      options: data.results,
      hasMore: data.next ? true : false,
      additional: {
        offset: data.count > offset ? offset + 10 : offset,
        limit: 10,
      },
    };
  };

  const statusOptions = [
    { id: 1, name: "PENDING" },
    { id: 2, name: "IN_PROGRESS" },
    { id: 3, name: "RESOLVED" },
    { id: 4, name: "CANCELLED" },
  ];

  const initialState = Fields.reduce((acc, field) => {
    acc[field.name] = edit ? customer?.[field.name] : "";
    return acc;
  }, {});

  // const initialState = {
  //   name: edit ? customer?.name : "",
  //   email: edit ? customer?.email : "",
  //   phone: edit ? customer?.phone : "",
  //   address: edit ? customer?.address : "",
  //   pan: edit ? customer?.pan : "",
  //   contactPerson: edit ? customer?.contactPerson : "",
  //   contactPersonPhoneNo: edit ? customer?.contactPersonPhoneNo : "",
  //   isActive: edit ? customer?.isActive : true,
  // };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required!"),
    email: Yup.string().email("Invalid email!").required("Required!"),
    phone: Yup.number().max(9999999999, "Invalid length!").required("Required!"),
    address: Yup.string().required("Required!"),
    pan: Yup.string().required("Required!"),
    contactPerson: Yup.string().required("Required!"),
    contactPersonPhoneNo: Yup.number().max(9999999999, "Invalid length!").required("Required!"),
    isActive: Yup.bool().required("Required!"),
  });

  const onSubmit = (values) => {
    if (!submit) {
      setShowAlert(true);
    } else {
      if (!edit) {
        dispatch(createCustomers(values))
          .unwrap()
          .then(() => {
            successFunction("Issue created successfully.");
            dispatch(getAllCustomers(postsPerPage));
            setShowModal(false);
          })
          .catch((error) => {
            setSubmit(false);
            setShowAlert(false);
            errorFunction(error);
          });
      } else {
        let updateData = {
          id: customer?._id,
          values,
        };
        dispatch(updateCustomers(updateData))
          .unwrap()
          .then(() => {
            successFunction("Issue updated successfully.");
            dispatch(getAllCustomers(postsPerPage));
            setShowModal(false);
          })
          .catch((error) => {
            setSubmit(false);
            setShowAlert(false);
            errorFunction(error);
          });
      }
    }
  };

  useEffect(() => {
    if (submit && formRef.current) {
      formRef.current.submitForm();
    }
  }, [submit]);

  return (
    <>
      {(loading || loadingUpdated) && <Loader />}

      <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={onSubmit} innerRef={formRef}>
        {(formik) => {
          return (
            <Form autoComplete="off">
              <div className="create-customer-wrapper">
                <div className="row">
                  <div className="col-6">
                    <TextField
                      label="Name"
                      name="name"
                      value={formik.values.name}
                      required
                      formikrequired={formik?.errors?.name && formik?.touched?.name}
                      onChange={(e) => formik.setFieldValue("name", e.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      value={formik.values.email}
                      required
                      formikrequired={formik?.errors?.email && formik?.touched?.email}
                      onChange={(e) => formik.setFieldValue("email", e.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      label="Phone"
                      name="phone"
                      type="number"
                      value={formik.values.phone}
                      required
                      formikrequired={formik?.errors?.phone && formik?.touched?.phone}
                      onChange={(e) => formik.setFieldValue("phone", e.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      label="Address"
                      name="address"
                      value={formik.values.address}
                      required
                      formikrequired={formik?.errors?.address && formik?.touched?.address}
                      onChange={(e) => formik.setFieldValue("address", e.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      label="PAN"
                      name="pan"
                      value={formik.values.pan}
                      required
                      formikrequired={formik?.errors?.pan && formik?.touched?.pan}
                      onChange={(e) => formik.setFieldValue("pan", e.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      label="Contact Person"
                      name="contactPerson"
                      value={formik.values.contactPerson}
                      required
                      formikrequired={formik?.errors?.contactPerson && formik?.touched?.contactPerson}
                      onChange={(e) => formik.setFieldValue("contactPerson", e.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      label="Contact Person Phone No"
                      name="contactPersonPhoneNo"
                      type="number"
                      value={formik.values.contactPersonPhoneNo}
                      required
                      formikrequired={formik?.errors?.contactPersonPhoneNo && formik?.touched?.contactPersonPhoneNo}
                      onChange={(e) => formik.setFieldValue("contactPersonPhoneNo", e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 p-0 text-right">
                <div className="mt-3 d-flex justify-content-end align-items-center">
                  <Button
                    btnType="submit"
                    className="btn create-button"
                    createButton={true}
                    disabled={edit ? lock || loadingUpdated : loading || lock}
                    title={"Save"}
                    content={"Save"}
                  />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
      {showAlert && <CreateAlert showAlert={showAlert} setShowAlert={setShowAlert} setSubmit={setSubmit} />}
    </>
  );
};

export default CreateCustomer;
