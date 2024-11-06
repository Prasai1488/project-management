

import { Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
import CreateAlert from "../../../Components/Alert/CreateAlert";
import Button from "../../../Components/Buttons/Button";
import Loader from "../../../Components/Loader";
import { createUser, updateUser, getUser } from "../Redux/thunk";
import { renderTextField } from "../../../Utils/customFields";

const CreateUser = ({ dispatch, setShowModal, postsPerPage }) => {
  const formRef = useRef();
  const user = useSelector((state) => state.user.user); // retrieve specific user by id 
  const loading = useSelector((state) => state.user.loading);
  const loadingUpdated = useSelector((state) => state.user.loadingUpdated);
  const edit = useSelector((state) => state.user.edit);
  const [submit, setSubmit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const initialState = {
    fullName: edit ? user?.userProfile?.fullName : "",
    email: edit ? user?.email : "",
    phone: edit ? user?.userProfile?.phone : "",
    userType: edit ? user?.userType : "",
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("Full name is required")
      .min(2, "Must be at least 2 characters")
      .max(100, "Must be less than 100 characters")
      .matches(/^[A-Za-z\s]+$/, "Should only contain letters and spaces"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[9]\d{9}$/, "Phone number should start with 9 and be 10 digits"),
    userType: Yup.string().required("User type is required"),
  });

  const onSubmit = (values) => {
    if (!submit) {
      setShowAlert(true);
    } else {
      const { fullName, email, phone, userType } = values;

      const trimmedFullName = fullName.trim();

      const userData = {
        email,
        fullName: trimmedFullName, // Use 'fullName' as the key, matching backend expectation
        userType,
        phone,
      };

      if (edit) {
        // Handle update user logic
        const id = user?.id;
        dispatch(updateUser({ id, values: userData }))
          .unwrap()
          .then(() => {
            successFunction("User updated successfully.");
            dispatch(getUser({ postsPerPage: postsPerPage, page: 1 }));
            setShowModal(false);
          })
          .catch((error) => {
            setSubmit(false);
            setShowAlert(false);
            errorFunction(error);
          });
      } else {
        // Handle create user logic
        dispatch(createUser(userData))
          .unwrap()
          .then(() => {
            successFunction("User created successfully.");
            dispatch(getUser({ postsPerPage: postsPerPage, page: 1 }));
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
      <div className="create-userdetail-wrapper">
        <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={onSubmit} innerRef={formRef}>
          {(formik) => {
            return (
              <Form autoComplete="off">
                <div className="create-department-wrapper">
                  <div className="form-part">
                    <div className="details-form">
                      <div className="row">
                        {renderTextField(formik, 4, "fullName", "text", "Full Name", true)}
                        {renderTextField(formik, 4, "email", "email", "Email", true)}
                        {renderTextField(formik, 4, "phone", "text", "Mobile Number", true)}
                        {/* User Type Field */}
                        <div className="col-md-4">
                          <label htmlFor="userType">User Type</label>
                          <select
                            name="userType"
                            value={formik.values.userType}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`form-control ${
                              formik.touched.userType && formik.errors.userType ? "is-invalid" : ""
                            }`}
                          >
                            <option value="" label="Select user type" />
                            <option value="admin" label="Admin" />
                            <option value="user" label="User" />
                            {/* Add other user types as needed */}
                          </select>
                          {formik.touched.userType && formik.errors.userType ? (
                            <div className="invalid-feedback">{formik.errors.userType}</div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end align-items-center ">
                  <Button
                    btnType="submit"
                    className="btn create-button"
                    title={edit ? "Update" : "Save"}
                    content={edit ? "Update" : "Save"}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      {showAlert && <CreateAlert showAlert={showAlert} setShowAlert={setShowAlert} setSubmit={setSubmit} />}
    </>
  );
};

export default CreateUser;
