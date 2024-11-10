import React, { useRef, useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Button from "../../../Components/Buttons/Button";
import Loader from "../../../Components/Loader";
import Dropzone from "../../../Components/CommonDropzone/Dropzone";
import { createCategory, updateCategory, getAllCategories } from "../Redux/thunk";
import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
import { renderTextField } from "../../../Utils/customFields";

const CreateCategory = ({ setShowModal, postsPerPage = 10 }) => {
  const formRef = useRef();
  const dispatch = useDispatch();

  const currentCategory = useSelector((state) => state?.category?.category);
  const loading = useSelector((state) => state?.category?.loading);
  const loadingUpdated = useSelector((state) => state?.category?.loadingUpdated);
  const edit = useSelector((state) => state?.category?.edit);

  const [imagePreview, setImagePreview] = useState(edit && currentCategory?.image ? currentCategory.image : "");

  // Form initial state
  const initialState = {
    name: edit ? currentCategory?.name : "",
    image: edit && currentCategory?.image ? currentCategory.image : null,
  };

  // Validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    image: Yup.mixed().test("image", "Category image is required", function (value) {
      return edit ? Boolean(imagePreview || value) : Boolean(value);
    }),
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      formRef.current.setFieldValue("image", file);
    }
  };

  const removeImage = () => {
    setImagePreview("");
    formRef.current.setFieldValue("image", null);
  };

  // Form submission logic
  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);

    if (values.image instanceof File) {
      formData.append("image", values.image);
    }

    const action = edit ? updateCategory({ id: currentCategory?.id, values: formData }) : createCategory(formData);

    dispatch(action)
      .unwrap()
      .then(() => {
        successFunction(edit ? "Category updated successfully." : "Category created successfully.");
        dispatch(getAllCategories({ postsPerPage }));
        setShowModal(false);
      })
      .catch((error) => {
        errorFunction(error?.response?.data?.message || "An error occurred while saving the category.");
      });
  };

  return (
    <>
      {(loading || loadingUpdated) && <Loader />}
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        innerRef={formRef}
        enableReinitialize
      >
        {(formik) => (
          <Form autoComplete="off">
            <div className="create-category-wrapper">
              <div className="col-12  d-flex justify-content-center">
                <div>
                  <Dropzone
                    name="image"
                    label="Category Image"
                    onChange={handleImageChange}
                    removePhoto={removeImage}
                    displayImage={imagePreview}
                  />
                  {formik.touched.image && formik.errors.image ? (
                    <div className="invalid-feedback">{formik.errors.image}</div>
                  ) : null}
                </div>
              </div>

              {renderTextField(formik, 12, "name", "text", "Name", true)}
            </div>

            <div className="d-flex justify-content-end align-items-center mt-3">
              <Button
                btnType="submit"
                className="btn create-button"
                title={edit ? "Update" : "Save"}
                content={edit ? "Update" : "Save"}
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateCategory;
