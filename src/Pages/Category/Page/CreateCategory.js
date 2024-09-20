import React, { useRef, useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Button from "../../../Components/Buttons/Button";
import Loader from "../../../Components/Loader";
import { createCategory, updateCategory, getAllCategories } from "../Redux/thunk";
import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
import { renderTextField } from "../../../Utils/customFields";

const CreateCategory = ({ setShowModal, postsPerPage = 10 }) => {
  const formRef = useRef();
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.category);
  const loading = useSelector((state) => state.category.loading);
  const loadingUpdated = useSelector((state) => state.category.loadingUpdated);
  const edit = useSelector((state) => state.category.edit);
  const [submit, setSubmit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const initialState = {
    name: edit ? category?.name : "",
    status: edit ? category?.status === "Active" : false,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    status: Yup.boolean(),
  });

  const onSubmit = (values, { resetForm }) => {
    if (!submit) {
      setShowAlert(true);
    } else {
      const updatedValues = {
        ...values,
        status: values.status ? "Active" : "Inactive",
      };

      if (!edit) {
        dispatch(createCategory(updatedValues))
          .unwrap()
          .then(() => {
            successFunction("Category created successfully.");
            dispatch(getAllCategories(postsPerPage));
            setShowModal(false);
          })
          .catch((error) => {
            setSubmit(false);
            setShowAlert(false);
            errorFunction(error);
          });
      } else {
        const updateData = {
          id: category?._id,
          values: updatedValues,
        };

        dispatch(updateCategory(updateData))
          .unwrap()
          .then(() => {
            successFunction("Category updated successfully.");
            dispatch(getAllCategories(postsPerPage));
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

  return (
    <>
      {(loading || loadingUpdated) && <Loader />}
      <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={onSubmit} innerRef={formRef}>
        {(formik) => (
          <Form autoComplete="off">
            <div className="create-category-wrapper">
              <div className="header d-flex justify-content-between align-items-center"></div>
              <div className="form-group">
                {renderTextField(
                  formik,
                  12, // Full width
                  "name",
                  "text",
                  "Name",
                  true
                )}
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <input
                  type="checkbox"
                  id="status"
                  name="status"
                  onChange={formik.handleChange}
                  checked={formik.values.status}
                />
                <label htmlFor="status" className="p-2">
                  Active
                </label>
              </div>
            </div>
            <div className="d-flex justify-content-end align-items-center">
              <Button
                btnType="submit"
                className="btn create-button"
                createButton={true}
                title={edit ? "Update" : "Save"}
                content={"Save"}
                onClick={() => setSubmit(true)}
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateCategory;
