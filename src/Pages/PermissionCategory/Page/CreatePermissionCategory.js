import { Formik } from "formik";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
import Checkbox from "../../../Components/CommonCheckbox/Checkbox";
import FormWrapper from "../../../Components/FormWrapper/FormWrapper";
import Loader from "../../../Components/Loader";
import { renderTextField } from "../../../Utils/customFields";
import { createPermissionCategorys, getAllPermissionCategorys, updatePermissionCategorys } from "../Redux/thunk";

const CreatePermissionCategory = ({ dispatch, postsPerPage = 10, setShowModal, type }) => {
  const formRef = useRef();
  const permissionCategory = useSelector((state) => state.permissionCategory.permissionCategory);
  const loading = useSelector((state) => state.permissionCategory.loading);
  const loadingUpdated = useSelector((state) => state.permissionCategory.loadingUpdated);
  const edit = useSelector((state) => state.permissionCategory.edit);

  const initialState = {
    name: edit ? permissionCategory?.name : "",
    isActive: edit ? permissionCategory?.isActive : true,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required!"),
    isActive: Yup.boolean().required("Required!"),
  });

  const onSubmit = (values) => {
    const action = edit
      ? updatePermissionCategorys({ id: permissionCategory?._id, values })
      : createPermissionCategorys(values);
    const successMessage = edit ? `${type} Updated successfully` : `${type} Created successfully`;

    dispatch(action)
      .unwrap()
      .then(() => {
        successFunction(successMessage);
        dispatch(getAllPermissionCategorys(postsPerPage));
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
              {renderTextField(formik, 12, "name", "text", "Name", true)}
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

export default CreatePermissionCategory;
