import { Formik } from "formik";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
import FormWrapper from "../../../Components/FormWrapper/FormWrapper";
import Loader from "../../../Components/Loader";
import { renderTextField } from "../../../Utils/customFields";
import { createManufacturers, getAllManufacturers, updateManufacturers } from "../Redux/thunk";
import Checkbox from "../../../Components/CommonCheckbox/Checkbox";

const CreateManufacturer = ({ dispatch, postsPerPage = 10, setShowModal, type }) => {
  const formRef = useRef();
  const manufacturer = useSelector((state) => state.manufacturer.manufacturer);
  const loading = useSelector((state) => state.manufacturer.loading);
  const loadingUpdated = useSelector((state) => state.manufacturer.loadingUpdated);
  const edit = useSelector((state) => state.manufacturer.edit);

  const initialState = {
    name: edit ? manufacturer?.name : "",

    isActive: edit ? manufacturer?.isActive : true,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required!"),

    isActive: Yup.boolean().required("Required!"),
  });

  const onSubmit = (values) => {
    const action = edit ? updateManufacturers({ id: manufacturer?._id, values: values }) : createManufacturers(values);
    const successMessage = edit ? `${type} Updated successfully` : `${type} Created successfully`;

    dispatch(action)
      .unwrap()
      .then(() => {
        successFunction(successMessage);
        dispatch(getAllManufacturers(postsPerPage));
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
              {renderTextField(formik, 12, "name", "text", "Name", true)}{" "}
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

export default CreateManufacturer;
