import React, { useRef, useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Button from "../../../Components/Buttons/Button";
import Loader from "../../../Components/Loader";
import Dropzone from "../../../Components/CommonDropzone/Dropzone";
import Thumb from "../../../Components/Thumb"; // For image preview
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

  const [imgPreview, setImgPreview] = useState(edit ? currentCategory?.image : null);

  // Form initial state
  const initialState = {
    name: edit ? currentCategory?.name : "",
    image: null,
  };

  // Validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    image: Yup.mixed()
      .test("fileSize", "File must be less than 500kb", (value) => !value || value.size <= 500 * 1024)
      .nullable(),
  });

  // Form submission logic
  const onSubmit = (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("name", values.name);
    if (values.image) {
      formData.append("image", values.image); // Add image file to FormData
    }

    const action = edit ? updateCategory({ id: currentCategory?.id, values: formData }) : createCategory(formData);

    dispatch(action)
      .unwrap()
      .then(() => {
        successFunction(edit ? "Category updated successfully." : "Category created successfully.");
        dispatch(getAllCategories({ postsPerPage }));
        setShowModal(false);
        resetForm();
        setImgPreview(null);
      })
      .catch((error) => {
        errorFunction(error);
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
                <Dropzone
                  name="image"
                  label="Category Image"
                  removePhoto={() => {
                    formik.setFieldValue("image", null);
                    setImgPreview(null);
                  }}
                  onChange={(event) => {
                    const file = event.target.files[0];
                    formik.setFieldValue("image", file);
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => setImgPreview(reader.result); // Set image preview
                  }}
                  displayImage={imgPreview ? <Thumb thumb={imgPreview} /> : ""}
                  error={formik.errors.image && formik.touched.image ? formik.errors.image : ""}
                />
              </div>
              <div className="form-group">{renderTextField(formik, 12, "name", "text", "Name", true)}</div>
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
