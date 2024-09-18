import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Dropzone from "../../../Components/CommonDropzone/Dropzone";
import Button from "../../../Components/Buttons/Button";
import TextField from "../../../Components/TextField/TextField";
import Loader from "../../../Components/Loader";
import Thumb from "../../../Components/Thumb";
import "../Pages/product.css";

// Validation schema using Yup for form validation
const CreateProductSchema = Yup.object().shape({
  Name: Yup.string().required("Name is required"),
  barcode: Yup.string().required("Barcode is required"),
  category: Yup.string().required("Category is required"),
  capacity: Yup.string().required("Capacity is required"),
  photo: Yup.mixed()
    .required("A product image is required")
    .test(
      "fileSize",
      "File size is too large",
      (value) => value?.size <= 500 * 1024 // Ensure file is less than 500kb
    ),
});

const CreateProduct = ({ dispatch, edit, setShowModal }) => {
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState(null);

  const initialValues = {
    Name: edit?.ProductName || "",
    barcode: edit?.barcode || "",
    category: edit?.category || "",
    capacity: edit?.capacity || "",
    photo: null,
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      if (edit) {
        // await dispatch(updateProduct({ id: edit.id, ...values }));
      } else {
        // await dispatch(createProduct(values));
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error creating/updating product", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="create-product-wrapper">
        <Formik initialValues={initialValues} validationSchema={CreateProductSchema} onSubmit={handleSubmit}>
          {(formik) => (
            <Form autoComplete="off">
              <div className="my-2 col-12">
                <div className="row">
                  {/* Dropzone Container */}
                  <div className="col-3 dropzone-container mr-4 ml-2">
                    <Dropzone
                      name="photo"
                      label="Upload Image"
                      removePhoto={() => {
                        formik.setFieldValue("photo", "");
                        setImg(null);
                      }}
                      onChange={(event) => {
                        formik.setFieldValue("photo", event.target.files[0]);
                        let reader = new FileReader();
                        reader.readAsDataURL(event.target.files[0]);
                        reader.onloadend = () => setImg([reader.result]);
                      }}
                      displayImage={img ? <Thumb thumb={img} /> : ""}
                      error={formik.errors.photo}
                      // text={"File must be less than 500kb"}
                    />
                  </div>

                  {/* Form Fields */}
                  <div className="col-8">
                    <div className="row">
                      <div className="col-md-12 mb-2">
                        <TextField
                          type="text"
                          name="Name"
                          label="Name"
                          required
                          formikRequired={formik.errors.Name && formik.touched.Name}
                          placeholder="Product Name"
                          onChange={formik.handleChange}
                          value={formik.values.Name}
                          autoFocus
                        />
                      </div>
                      <div className="col-md-12 mb-3">
                        <TextField
                          type="text"
                          name="barcode"
                          label="Barcode"
                          required
                          formikRequired={formik.errors.barcode && formik.touched.barcode}
                          placeholder="Barcode"
                          onChange={formik.handleChange}
                          value={formik.values.barcode}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <TextField
                          type="text"
                          name="category"
                          label="Category"
                          required
                          formikRequired={formik.errors.category && formik.touched.category}
                          placeholder="Category"
                          onChange={formik.handleChange}
                          value={formik.values.category}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <TextField
                          type="text"
                          name="capacity"
                          label="Capacity"
                          required
                          formikRequired={formik.errors.capacity && formik.touched.capacity}
                          placeholder="Capacity"
                          onChange={formik.handleChange}
                          value={formik.values.capacity}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
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
