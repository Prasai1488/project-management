import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../Components/Buttons/Button";
import Dropzone from "../../../Components/CommonDropzone/Dropzone";
import Thumb from "../../../Components/Thumb";
import AsyncSelect from "../../../Components/CommonAsyncSelectField/AsyncSelect";
import { loadCategoryOptions } from "../../../Utils/asyncFunction";
import TextField from "../../../Components/TextField/TextField";
import { createProduct, updateProduct, getAllProducts } from "../Redux/thunk";
import Loader from "../../../Components/Loader";
import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
import "./product.css";

const CreateProduct = ({ setShowModal, postsPerPage = 10 }) => {
  const dispatch = useDispatch();
  const [img, setImg] = useState(null);
  const specificProduct = useSelector((state) => state?.product?.product || null);
  console.log(specificProduct, "specific product");
  const loadingProduct = useSelector((state) => state.product.loading);
  const loadingUpdated = useSelector((state) => state.product.loadingUpdated);

  // Set the image preview if a product photo is available
  useEffect(() => {
    if (specificProduct && specificProduct.image) {
      setImg(specificProduct.image);
    } else {
      setImg(null);
    }
  }, [specificProduct]);

  // Initial values setup based on whether it's an update or create mode
  const initialState = {
    name: specificProduct ? specificProduct.name : "",
    category: specificProduct ? { label: specificProduct.category?.name, value: specificProduct.category?.id } : null,
    capacity: specificProduct ? specificProduct.capacity : "",
    price: specificProduct ? specificProduct.price : "",
    photo: specificProduct ? specificProduct.image : null,
  };

  console.log(initialState, "initialState");

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    category: Yup.object().required("Category is required"),
    capacity: Yup.string().required("Capacity is required"),
    price: Yup.number().required("Price is required").typeError("Price must be a number"),
    photo: Yup.mixed().test("fileSize", "File must be less than 500KB", (value) => !value || value.size <= 500 * 1024),
  });

  // Form submission handler
  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const productData = new FormData();
    productData.append("name", values.name);
    productData.append("category", values.category.value);
    productData.append("capacity", values.capacity);
    productData.append("price", values.price);

    if (values.photo) {
      productData.append("image", values.photo);
    }

    console.log("Submitting Product Data:", productData); // Debugging Log

    if (specificProduct) {
      // Update mode
      dispatch(updateProduct({ id: specificProduct.id, values: productData }))
        .unwrap()
        .then(() => {
          successFunction("Product updated successfully.");
          dispatch(getAllProducts(postsPerPage));
          setShowModal(false);
          resetForm();
        })
        .catch((error) => errorFunction(error))
        .finally(() => setSubmitting(false));
    } else {
      // Create mode
      dispatch(createProduct(productData))
        .unwrap()
        .then(() => {
          successFunction("Product created successfully.");
          dispatch(getAllProducts(postsPerPage));
          setShowModal(false);
          resetForm();
        })
        .catch((error) => errorFunction(error))
        .finally(() => setSubmitting(false));
    }
  };

  return (
    <>
      {(loadingProduct || loadingUpdated) && <Loader />}
      <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
        {(formik) => (
          <Form autoComplete="off">
            <div className="create-product-wrapper p-3">
              <div className="row" style={{ justifyContent: "space-between" }}>
                <div className="col-4">
                  <Dropzone
                    name="photo"
                    label="Photo"
                    removePhoto={() => {
                      formik.setFieldValue("photo", null);
                      setImg(null);
                    }}
                    onChange={(event) => {
                      const file = event.target.files[0];
                      formik.setFieldValue("photo", file);
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onloadend = () => setImg(reader.result);
                    }}
                    displayImage={img ? <Thumb thumb={img} /> : ""}
                    error={formik.errors.photo && formik.touched.photo ? formik.errors.photo : ""}
                  />
                </div>
                <div className="col-8">
                  <div className="row">
                    <div className="col-12 mb-3 p-0">
                      <TextField
                        label="Name"
                        name="name"
                        type="text"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.name && formik.touched.name ? formik.errors.name : ""}
                      />
                    </div>
                    <div className="col-12 mb-3 p-0">
                      <AsyncSelect
                        label="Category"
                        name="category"
                        cacheOptions
                        defaultOptions
                        loadOptions={loadCategoryOptions}
                        onChange={(selectedOption) => formik.setFieldValue("category", selectedOption)}
                        value={formik.values.category}
                        getOptionLabel={(option) => option.label}
                        getOptionValue={(option) => option.value}
                      />
                      {formik.touched.category && formik.errors.category && (
                        <div className="invalid-feedback">
                          {formik.errors.category?.label || formik.errors.category}
                        </div>
                      )}
                    </div>
                    <div className="col-6 mb-2 pl-0">
                      <TextField
                        label="Price"
                        name="price"
                        type="text"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.price && formik.touched.price ? formik.errors.price : ""}
                      />
                    </div>
                    <div className="col-6 pr-0">
                      <TextField
                        label="Capacity"
                        name="capacity"
                        type="text"
                        value={formik.values.capacity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.capacity && formik.touched.capacity ? formik.errors.capacity : ""}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end align-items-center mt-3">
              <Button
                btnType="submit"
                className="btn create-button"
                title={specificProduct ? "Update" : "Save"}
                content={specificProduct ? "Update" : "Save"}
                disabled={formik.isSubmitting || loadingProduct || loadingUpdated}
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateProduct;
