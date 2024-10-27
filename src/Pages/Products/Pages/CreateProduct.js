import { Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
import CreateAlert from "../../../Components/Alert/CreateAlert";
import Button from "../../../Components/Buttons/Button";
import Loader from "../../../Components/Loader";
import { createProduct, updateProduct, getProduct } from "../Redux/thunk";
import { renderTextField } from "../../../Utils/customFields";
import Dropzone from "../../../Components/CommonDropzone/Dropzone";
import { renderAsyncSelectField } from "../../../Utils/customFields";

import { loadOptionsCategory } from "../../../Utils/asyncFunction";

const CreateProduct = ({ dispatch, setShowModal, postsPerPage }) => {
  const formRef = useRef();
  const product = useSelector((state) => state.product.product);
 
  const loading = useSelector((state) => state.product.loading);
  const loadingUpdated = useSelector((state) => state.product.loadingUpdated);
  const edit = useSelector((state) => state.product.edit);
  const [submit, setSubmit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [imagePreview, setImagePreview] = useState(edit && product?.image ? product.image : "");

  const initialState = {
    name: edit ? product?.name : "",

    price: edit ? product?.price : "",
    category: edit ? product?.category : "",
    image: edit && product?.image ? product.image : null, // Set initial image for edit mode
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Product name is required")
      .min(2, "Must be at least 2 characters")
      .max(100, "Must be less than 100 characters"),

    price: Yup.number().required("Price is required").positive("Price must be a positive number"),
    category: Yup.mixed().required("Category is required"),
    image: Yup.mixed().test("image", "Product image is required", function (value) {
      // Only require image if in create mode or if no existing image is present
      return edit ? Boolean(imagePreview || value) : Boolean(value);
    }),
  });

  const onSubmit = (values) => {
    if (!submit) {
      setShowAlert(true);
    } else {
      const { name,  price, category, image } = values;

      // Create a FormData object to handle multipart/form-data
      const formData = new FormData();
      formData.append("name", name);

      formData.append("price", price);
      formData.append("category", category?.id);

      // Only append image if it's a new file (not an existing URL)
      if (image instanceof File) {
        formData.append("image", image);
      }

      if (edit) {
        const id = product?.id;
        dispatch(updateProduct({ id, formData }))
          .unwrap()
          .then(() => {
            successFunction("Product updated successfully.");
            dispatch(getProduct({ postsPerPage, page: 1 }));
            setShowModal(false);
          })
          .catch((error) => {
            setSubmit(false);
            setShowAlert(false);
            errorFunction(error?.response?.data?.message || "An error occurred while updating the product.");
          });
      } else {
        dispatch(createProduct(formData))
          .unwrap()
          .then(() => {
            successFunction("Product created successfully.");
            dispatch(getProduct({ postsPerPage, page: 1 }));
            setShowModal(false);
          })
          .catch((error) => {
            setSubmit(false);
            setShowAlert(false);
            errorFunction(error?.response?.data?.message || "An error occurred while creating the product.");
          });
      }
    }
  };

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

  useEffect(() => {
    if (submit && formRef.current) {
      formRef.current.submitForm();
    }
  }, [submit]);

  return (
    <>
      {(loading || loadingUpdated) && <Loader />}
      <div className="create-product-wrapper">
        <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={onSubmit} innerRef={formRef}>
          {(formik) => (
            <Form autoComplete="off">
              <div className="create-department-wrapper">
                <div className="row">
                  {/* Left column with image upload - matches first component */}
                  <div className="col-4">
                    <Dropzone
                      name="image"
                      label="Product Image"
                      onChange={handleImageChange}
                      removePhoto={removeImage}
                      displayImage={imagePreview}
                      text="Select an image file"
                    />
                    {formik.touched.image && formik.errors.image ? (
                      <div className="invalid-feedback">{formik.errors.image}</div>
                    ) : null}
                  </div>

                  {/* Right column with form fields - matches first component */}
                  <div className="col-8">
                    <div className="row">
                      {/* Product Name */}
                      <div className="col-12 mb-2">
                        {renderTextField(formik, 12, "name", "text", "Product Name", true)}
                      </div>

                      

                      {/* Category and Price in same row */}
                      <div className="col-6">
                        {renderAsyncSelectField(formik, 12, "category", "Category", loadOptionsCategory, true, false)}
                      </div>

                      <div className="col-6">{renderTextField(formik, 12, "price", "number", "Price", true)}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end align-items-center">
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
      </div>
      {showAlert && <CreateAlert showAlert={showAlert} setShowAlert={setShowAlert} setSubmit={setSubmit} />}
    </>
  );
};

export default CreateProduct;





