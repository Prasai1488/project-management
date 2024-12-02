import { Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
import CreateAlert from "../../../Components/Alert/CreateAlert";
import Button from "../../../Components/Buttons/Button";
import Loader from "../../../Components/Loader";
import { createUser, updateUser, getUser } from "../Redux/thunk";
import {
  renderAsyncSelectField,
  renderPasswordField,
  renderSelectField,
  renderTextField,
} from "../../../Utils/customFields";

const CreateUser = ({ dispatch, setShowModal, postsPerPage }) => {
  const formRef = useRef();
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);
  const loadingUpdated = useSelector((state) => state.user.loadingUpdated);
  const edit = useSelector((state) => state.user.edit);
  const [submit, setSubmit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [type, setType] = useState(false);

  const initialState = {
    firstName: edit ? user?.userProfile?.firstName : "",
    middleName: edit ? user?.userProfile?.middleName : "",
    lastName: edit ? user?.userProfile?.lastName : "",
    email: edit ? user?.email : "",
    phone: edit ? user?.userProfile?.phone : "",
    password: "",
    role: edit ? user?.userType : "",
    active: edit ? user?.active === true : false,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First name is required")
      .min(2, "Must be at least 2 characters")
      .max(50, "Must be less than 50 characters")
      .matches(/^[A-Za-z\s]+$/, "Should only contain letters and spaces"),
    middleName: Yup.string()
      .max(50, "Must be less than 50 characters")
      .matches(/^[A-Za-z\s]*$/, "Should only contain letters and spaces"),
    lastName: Yup.string()
      .required("Last name is required")
      .min(2, "Must be at least 2 characters")
      .max(50, "Must be less than 50 characters")
      .matches(/^[A-Za-z\s]+$/, "Should only contain letters and spaces"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[9]\d{9}$/, "Phone number should start with 9 and be 10 digits"),
    password: edit
      ? Yup.string()
      : Yup.string()
          .required("Password is required")
          .min(8, "Password must be at least 8 characters")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must include uppercase, lowercase, number, and special character"
          ),
    role: Yup.string().required("Role is required"),
    active: Yup.boolean(),
  });

  const onSubmit = async (values) => {
    if (!submit) {
      setShowAlert(true);
      return;
    }

    const { firstName, middleName, lastName, email, phone, password, role } = values;

    const userData = {
      email,
      firstName: firstName.trim(),
      middleName: middleName ? middleName.trim() : undefined,
      lastName: lastName.trim(),
      userType: role,
      phone,
      ...(password && { password }),
    };

    try {
      if (edit) {
        // Update user logic
        const id = user?.id;
        await dispatch(updateUser({ id, values: userData })).unwrap();
        successFunction("User updated successfully.");
      } else {
        // Create user logic
        await dispatch(createUser(userData)).unwrap();
        successFunction("User created successfully.");
      }

      // Common actions after success
      await dispatch(getUser({ postsPerPage: postsPerPage, page: 1 }));
      setShowModal(false);
    } catch (error) {
      // Error handling
      setSubmit(false);
      setShowAlert(false);
      errorFunction(error);
    }
  };

  useEffect(() => {
    if (submit && formRef.current) {
      formRef.current.submitForm();
    }
  }, [submit]);

  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
    { value: "manager", label: "Manager" },
    { value: "editor", label: "Editor" },
  ];

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
                        {renderTextField(formik, 4, "firstName", "text", "First Name", true)}
                        {renderTextField(formik, 4, "lastName", "text", "Last Name", true)}
                        {renderTextField(formik, 4, "email", "email", "Email", true)}
                        {renderTextField(formik, 4, "phone", "text", "Mobile Number", true)}
                        {renderPasswordField(formik, 4, "password", "password", "Password", type, setType, true)}
                        {renderSelectField(formik, 4, "role", "Role", roleOptions, true, formik.values.role)}
                        <div className=" d-flex  items-center">
                          <input
                            type="checkbox"
                            id="active"
                            name="active"
                            onChange={formik.handleChange}
                            checked={formik.values.active}
                          />
                          <label htmlFor="status" className="p-2 custom-margin">
                            Active
                          </label>
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
