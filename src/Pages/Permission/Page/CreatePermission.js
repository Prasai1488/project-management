import { Formik } from "formik";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
import Checkbox from "../../../Components/CommonCheckbox/Checkbox";
import FormWrapper from "../../../Components/FormWrapper/FormWrapper";
import Loader from "../../../Components/Loader";
import { renderAsyncSelectField, renderTextField } from "../../../Utils/customFields";
import { loadOptionsPermissionCategory } from "../../Questionnaire/Page/asyncFunction";
import { createPermissions, getAllPermissions, updatePermissions } from "../Redux/thunk";

const CreatePermission = ({ dispatch, postsPerPage = 10, setShowModal, type }) => {
  const formRef = useRef();
  const permission = useSelector((state) => state.permission.permission);
  const loading = useSelector((state) => state.permission.loading);
  const loadingUpdated = useSelector((state) => state.permission.loadingUpdated);
  const edit = useSelector((state) => state.permission.edit);

  const initialState = {
    name: edit ? permission?.name : "",
    codename: edit ? permission?.codename : "",
    permissionCategory: edit ? permission.permissionCategory : null,
    isActive: edit ? permission?.isActive : true,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required!"),
    codename: Yup.string().required("Required!"),
    permissionCategory: Yup.object().required("Required!"),

    isActive: Yup.boolean().required("Required!"),
  });

  const onSubmit = (values) => {
    const createData = {
      ...values,
      permissionCategory: values.permissionCategory?._id,
    };
    const action = edit
      ? updatePermissions({ id: permission?._id, values: createData })
      : createPermissions(createData);
    const successMessage = edit ? `${type} Updated successfully` : `${type} Created successfully`;

    dispatch(action)
      .unwrap()
      .then(() => {
        successFunction(successMessage);
        dispatch(getAllPermissions(postsPerPage));
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
              {renderTextField(formik, 6, "codename", "text", "Code Name", true)}
              {renderAsyncSelectField(
                formik,
                12,
                "permissionCategory",
                "Permission Category",
                loadOptionsPermissionCategory,
                true
              )}
              <div className="my-2 col-12 d-flex justify-content-center align-items-center">
                <Checkbox name="isActive" label="Active" edit={edit} />
              </div>
            </FormWrapper>
          );
        }}
      </Formik>
    </>
  );
};

export default CreatePermission;
