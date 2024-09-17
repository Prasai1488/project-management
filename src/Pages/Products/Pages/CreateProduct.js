import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// Assuming Dropzone, TextField, Thumb, and Loader are custom components you use in your project.
import Dropzone from "../../../Components/CommonDropzone/Dropzone";
import Button from "../../../Components/Buttons/Button";
import TextField from "../../../Components/TextField/TextField";
import Loader from "../../../Components/Loader";
import "../Pages/product.css";

// Validation schema using Yup for form validation
const CreateProductSchema = Yup.object().shape({
  Name: Yup.string().required(" Name is required"),
  barcode: Yup.string().required("Barcode is required"),
  category: Yup.string().required("Category is required"),
  capacity: Yup.string().required("Capacity is required"),
  photo: Yup.mixed()
    .required("A product image is required")
    .test(
      "fileSize",
      "File size is too large",
      (value) => !value || (value && value.size <= 500 * 1024) // Ensure file is less than 500kb
    ),
});

const CreateProduct = ({ dispatch, edit, setShowModal, postsPerPage }) => {
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState(null);

  const initialValues = {
    Name: edit?.ProductName || "",
    barcode: edit?.barcode || "",
    category: edit?.category || "",
    capacity: edit?.capacity || "",
    photo: null,
  };

  const handleSubmit = (values) => {
    setLoading(true);

    if (edit) {
      // dispatch update action if editing an existing product
      // dispatch(updateProduct({ id: edit.id, ...values }));
    } else {
      // dispatch create action if creating a new product
      // dispatch(createProduct(values));
    }

    // Close the modal and reset loading after submission
    setLoading(false);
    setShowModal(false);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="create-product-wrapper">
        <Formik initialValues={initialValues} validationSchema={CreateProductSchema} onSubmit={handleSubmit}>
          {(formik) => (
            <Form autoComplete="off">
              <div className="my-2">
                <div className="row">
                  <div className="col-2">
                    <Dropzone
                      name="photo"
                      label="Photo"
                      removePhoto={() => {
                        if (edit) {
                          // Handle photo removal logic
                        } else {
                          formik.setFieldValue("photo", null);
                          setImg(null);
                        }
                      }}
                      onChange={(event) => {
                        formik.setFieldValue("photo", event.target.files[0]);
                        let reader = new FileReader();
                        reader.readAsDataURL(event.target.files[0]);
                        reader.onloadend = () => setImg([reader.result]);
                      }}
                      error={formik.errors.photo}
                      text={"File must be less than 500kb"}
                    />
                  </div>
                  <div className="col-10">
                    <div className="row">
                      <div className="col-5">
                        <TextField
                          type="text"
                          name="Product Name"
                          label="Name"
                          required
                          formikRequired={formik.errors.firstName && formik.touched.firstName}
                          placeholder="Product Name"
                          onChange={(e) => formik.setFieldValue("Name", e.target.value)}
                          autoFocus
                        />
                      </div>
                      <div className="col-4">
                        <TextField
                          type="text"
                          name="barcode"
                          label="Barcode"
                          required
                          formikRequired={formik.errors.barcode && formik.touched.barcode}
                          placeholder="Barcode"
                          onChange={(e) => formik.setFieldValue("barcode", e.target.value)}
                        />
                      </div>
                      <div className="col-4">
                        <TextField
                          type="text"
                          name="category"
                          label="Category"
                          required
                          formikRequired={formik.errors.category && formik.touched.category}
                          placeholder="Category"
                          onChange={(e) => formik.setFieldValue("category", e.target.value)}
                        />
                      </div>
                      <div className="col-4">
                        <TextField
                          type="text"
                          name="capacity"
                          label="Capacity"
                          required
                          formikRequired={formik.errors.capacity && formik.touched.capacity}
                          placeholder="Capacity"
                          onChange={(e) => formik.setFieldValue("capacity", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 text-right">
                <div className="my-4 d-flex justify-content-end align-items-center">
                  <Button
                    btnType="submit"
                    className="btn create-button"
                    createButton={true}
                    title={edit ? "Update" : "Save"}
                    content={edit ? "Update" : "Save"}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CreateProduct;
