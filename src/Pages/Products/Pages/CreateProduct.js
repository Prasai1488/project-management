



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
import AsyncSelect from "../../../Components/CommonAsyncSelectField/AsyncSelect";
import { loadCategoryOptions, loadOptionsSubCategory } from "../../../Utils/asyncFunction";

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
    subCategory: edit ? product?.subCategory : "",
    image: edit && product?.image ? product.image : null,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Product name is required")
      .min(2, "Must be at least 2 characters")
      .max(100, "Must be less than 100 characters"),
    price: Yup.number().required("Price is required").positive("Price must be a positive number"),
    category: Yup.mixed().required("Category is required"),
    subCategory: Yup.mixed(),
    image: Yup.mixed().test("image", "Product image is required", function (value) {
      return edit ? Boolean(imagePreview || value) : Boolean(value);
    }),
  });

  const onSubmit = async (values) => {
    if (!submit) {
      setShowAlert(true);
    } else {
      const { name, price, category, image, subCategory } = values;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category?.value);
      formData.append("subCategory", subCategory?.id);
  
      if (image instanceof File) {
        formData.append("image", image);
      }
  
      try {
        if (edit) {
          const id = product?.id;
          await dispatch(updateProduct({ id, formData })).unwrap();
          successFunction("Product updated successfully.");
        } else {
          await dispatch(createProduct(formData)).unwrap();
          successFunction("Product created successfully.");
        }
        dispatch(getProduct({ postsPerPage, page: 1 }));
        setShowModal(false);
      } catch (error) {
        setSubmit(false);
        setShowAlert(false);
        errorFunction(error?.response?.data?.message || "An error occurred while saving the product.");
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
      
        <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={onSubmit} innerRef={formRef}>
          {(formik) => (
            <Form className="space-y-4">
             < div className="create-product-wrapper">
                <div className="photo-part">
               
                  <div>
                    <Dropzone
                      name="image"
                      label="Product Image"
                      onChange={handleImageChange}
                      removePhoto={removeImage}
                      displayImage={imagePreview}
                    />
                    {formik.touched.image && formik.errors.image ? (
                      <div className="invalid-feedback">{formik.errors.image}</div>
                    ) : null}
                  </div>

                  <div className="middle-part">
                    <div className="row">
                      {renderTextField(formik, 12, "name", "text", "Name", true)}
                      {renderTextField(formik, 12, "price", "text", "Price", true)}
                    </div>
                  </div>
                </div>

                <div className="last-part">
                  <div className="row">
                    <div className="col-6">
                      <AsyncSelect
                        label="Category"
                        name="category"
                        cacheOptions
                        defaultOptions
                        loadOptions={loadCategoryOptions}
                        onChange={(selectedOption) => formik.setFieldValue("category", selectedOption)}
                        value={formik?.values?.category}
                        getOptionLabel={(option) => option.label || option.name}
                        getOptionValue={(option) => option.value}
                      />
                      {formik?.touched?.category && formik?.errors?.category && (
                        <div className="invalid-feedback">
                          {formik?.errors?.category?.label || formik?.errors?.category}
                        </div>
                      )}
                    </div>
                    <div className="col-6">
                      <AsyncSelect
                        parent={JSON.stringify(formik?.values?.category)}
                        label="Sub Category"
                        name="subCategory"
                        loadOptions={loadOptionsSubCategory}
                        additional={{
                          offset: 0,
                          limit: 10,
                          category: formik?.values?.category ? formik?.values?.category?.value : null,
                        }}
                        onChange={(selectedOption) => formik?.setFieldValue("subCategory", selectedOption)}
                        value={formik?.values?.subCategory}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.name}
                        disabled={!formik?.values?.category}
                      />
                      {formik.touched.subCategory && formik.errors.subCategory && (
                        <div className="invalid-feedback">
                          {formik?.errors?.subCategory?.name || formik?.errors?.subCategory}
                        </div>
                      )}
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
      
      {showAlert && <CreateAlert showAlert={showAlert} setShowAlert={setShowAlert} setSubmit={setSubmit} />}
    </>
  );
};

export default CreateProduct;