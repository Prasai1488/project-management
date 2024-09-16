import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { successFunction, errorFunction } from "../../../Components/Alert/Alert";
import { createDepartment, updateDepartment, getDepartment } from "../Redux/thunk";
import { checkRedundantDataDepartment } from "../../../Utils/RedundantData/Department";
import Loader from "../../../Components/Loader";
import TextField from "../../../Components/TextField/TextField";
import Button from "../../../Components/Buttons/Button";
import Checkbox from "../../../Components/CommonCheckbox/Checkbox";
import { closeModal } from "../../../Redux/Layout/layoutSlice";

const CreateDepartment = ({ dispatch, postsPerPage, setShowModal }) => {
  const department = useSelector((state) => state.department.department);
  const loading = useSelector((state) => state.department.loading);
  const loadingUpdated = useSelector((state) => state.department.loadingUpdated);
  const edit = useSelector((state) => state.department.edit);

  const [lock, setLock] = useState(false);

  const initialState = {
    name: edit ? department?.name : "",
    code: edit ? department?.code : "",
    email: edit ? department?.email : "",
    active: edit ? department?.active : true,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required!"),
    code: Yup.string().required("Required!"),
    email: Yup.string().email("@ is required.").required("Required!"),
    active: Yup.bool(),
  });

  const onSubmit = (values) => {
    if (!edit) {
      dispatch(createDepartment(values))
        .unwrap()
        .then(() => {
          successFunction("Department created successfully.");
          dispatch(getDepartment(postsPerPage));
          setShowModal(false);
        })
        .catch((error) => {
          errorFunction(error);
        });
    } else {
      let updateData = { id: department?.id, values };
      dispatch(updateDepartment(updateData))
        .unwrap()
        .then(() => {
          successFunction("Department updated successfully.");
          dispatch(getDepartment(postsPerPage));
          setShowModal(false);
        })
        .catch((error) => errorFunction(error));
    }
  };

  const handleCheckName = async (e) => {
    if (edit && e.target.value !== department?.name) {
      if (e.target.value.trim() && e.target.value !== "") {
        const result = await checkRedundantDataDepartment(e, "name");
        result ? errorFunction("Department with this name already exists.") || setLock(true) : setLock(false);
      }
    }
    if (!edit && e.target.value.trim() && e.target.value !== "") {
      const result = await checkRedundantDataDepartment(e, "name");
      result ? errorFunction("Department with this name already exists.") || setLock(true) : setLock(false);
    }
  };
  const handleCheckCode = async (e) => {
    if (edit && e.target.value !== department?.code) {
      if (e.target.value.trim() && e.target.value !== "") {
        const result = await checkRedundantDataDepartment(e, "code");
        result ? errorFunction("Department with this code already exists.") || setLock(true) : setLock(false);
      }
    }
    if (!edit && e.target.value.trim() && e.target.value !== "") {
      const result = await checkRedundantDataDepartment(e, "code");
      result ? errorFunction("Department with this code already exists.") || setLock(true) : setLock(false);
    }
  };
  const handleCheckEmail = async (e) => {
    if (edit && e.target.value !== department?.email) {
      if (e.target.value.trim() && e.target.value !== "") {
        const result = await checkRedundantDataDepartment(e, "email");
        result ? errorFunction("Department with this email already exists.") || setLock(true) : setLock(false);
      }
    }
    if (!edit && e.target.value.trim() && e.target.value !== "") {
      const result = await checkRedundantDataDepartment(e, "email");
      result ? errorFunction("Department with this email already exists.") || setLock(true) : setLock(false);
    }
  };

  return (
    <>
      {(loading || loadingUpdated) && <Loader />}

      <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(formik) => {
          return (
            <Form autoComplete="off">
              <div className="create-department-wrapper">
                <div className="row">
                  <div className="col-12 ">
                    <TextField
                      type="text"
                      name="name"
                      placeholder="Name"
                      label="Name"
                      required
                      formikRequired={formik?.errors?.name && formik?.touched?.name}
                      onChange={(e) => {
                        formik.setFieldValue("name", e.target.value);
                        handleCheckName(e);
                      }}
                    />
                  </div>
                  <div className="col-12">
                    <TextField
                      type="text"
                      name="code"
                      label="Code"
                      required
                      formikRequired={formik?.errors?.code && formik?.touched?.code}
                      onChange={(e) => {
                        formik.setFieldValue("code", e.target.value);
                        handleCheckCode(e);
                      }}
                    />
                  </div>
                  <div className="col-12 ">
                    <TextField
                      type="text"
                      name="email"
                      label="Email"
                      required
                      formikRequired={formik?.errors?.email && formik?.touched?.email}
                      onChange={(e) => {
                        formik.setFieldValue("email", e.target.value);
                        handleCheckEmail(e);
                      }}
                    />
                  </div>
                </div>
                <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                  <Checkbox name="active" label="Active" />
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
    </>
  );
};

export default CreateDepartment;
