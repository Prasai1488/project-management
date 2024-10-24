import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import Button from "../../../Components/Buttons/Button";
import Dropzone from "../../../Components/CommonDropzone/Dropzone";
import Thumb from "../../../Components/Thumb";
import TextField from "../../../Components/TextField/TextField";
import { createProduct, updateProduct, getProducts } from "../Redux/thunk"; // Import both createProduct and updateProduct thunks
import "./product.css";

const CreateProduct = ({ handleClose = () => {}, edit = false }) => {
  const imageUrl = edit.image ? `http://192.168.1.91:8000${edit.image}` : null;
  const dispatch = useDispatch();
  const [img, setImg] = useState(null);

  const initialValues = {
    name: edit ? edit.name : "",
    barcode: edit ? edit.barcode : "",
    category: edit ? edit.category.id : "",
    capacity: edit ? edit.capacity : "",
    price: edit ? edit.price : "",
    photo: edit ? edit.image : "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    barcode: Yup.string().required("Barcode is required"),
    category: Yup.number().required("Category ID is required"),
    capacity: Yup.string().required("Capacity is required"),
    price: Yup.number().required("Price is required"),
    photo: Yup.mixed().test("fileSize", "File must be less than 500kb", (value) => {
      if (!value || typeof value === "string") return true; // If no new file or existing image URL, skip validation
      return value.size <= 500 * 1024;
    }),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const productData = {
      name: values.name,
      barcode: values.barcode,
      category: values.category,
      capacity: values.capacity,
      price: values.price,
      image: values.photo,
    };

    try {
      if (edit) {
        // Update existing product
        const response = await dispatch(updateProduct({ productId: edit.id, productData })).unwrap();
        console.log("Product updated successfully:", response);

        // Close the modal after the update
        handleClose();
      } else {
        // Create a new product
        const response = await dispatch(createProduct(productData)).unwrap();
        console.log("Product created successfully:", response);

        // Close the modal after the creation
        handleClose();
      }

      resetForm(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      setSubmitting(false); // Ensure form is not in a submitting state anymore
    }
  };

  return (
    <>
      <div className="create-product-wrapper">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {(formik) => (
            <Form autoComplete="off">
              <div className="create-department-wrapper">
                <div className="row">
                  <div className="col-4">
                    <Dropzone
                      name="photo"
                      label="Photo"
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
                      displayImage={img ? <Thumb thumb={img} /> : edit.image ? <Thumb thumb={imageUrl} /> : ""}
                      error={formik.errors.photo}
                    />
                  </div>

                  <div className="col-8">
                    <div className="row">
                      <div className="col-12 mb-2">
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

                      <div className="col-12 mb-2">
                        <TextField
                          label="Barcode"
                          name="barcode"
                          type="text"
                          value={formik.values.barcode}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.errors.barcode && formik.touched.barcode ? formik.errors.barcode : ""}
                        />
                      </div>

                      <div className="col-6">
                        <TextField
                          label="Category"
                          name="category"
                          type="number"
                          value={formik.values.category}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.errors.category && formik.touched.category ? formik.errors.category : ""}
                        />
                      </div>

                      <div className="col-6">
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

                      <div className="col-6">
                        <TextField
                          label="Price"
                          name="price"
                          type="number"
                          value={formik.values.price}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.errors.price && formik.touched.price ? formik.errors.price : ""}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end align-items-center">
                <Button
                  btnType="submit"
                  className="btn create-button"
                  title={edit ? "Update" : "Save"} // Change button text depending on mode
                  content={edit ? "Update" : "Save"}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CreateProduct;
