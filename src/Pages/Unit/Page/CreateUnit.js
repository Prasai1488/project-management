import { Formik } from "formik";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
import FormWrapper from "../../../Components/FormWrapper/FormWrapper";
import Loader from "../../../Components/Loader";
import { renderTextField } from "../../../Utils/customFields";
import { createUnits, getAllUnits, updateUnits } from "../Redux/thunk";
import Checkbox from "../../../Components/CommonCheckbox/Checkbox";

const CreateUnit = ({ dispatch, postsPerPage = 20, setShowModal, type, page = 1 }) => {
  const formRef = useRef();
  const unit = useSelector((state) => state.unit.unit);
  const loading = useSelector((state) => state.unit.loading);
  const loadingUpdated = useSelector((state) => state.unit.loadingUpdated);
  const edit = useSelector((state) => state.unit.edit);

  const initialState = {
    name: edit ? unit?.name : "",
    isActive: edit ? unit?.isActive : true,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required!"),
    isActive: Yup.boolean().required("Required!"),
  });

  const onSubmit = (values) => {
    const action = edit ? updateUnits({ id: unit?._id, values: values }) : createUnits(values);
    const successMessage = edit ? `${type} Updated successfully` : `${type} Created successfully`;

    dispatch(action)
      .unwrap()
      .then(() => {
        successFunction(successMessage);

        dispatch(getAllUnits({ postsPerPage, page }));
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

export default CreateUnit;
