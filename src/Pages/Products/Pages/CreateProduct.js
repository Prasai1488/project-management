import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import Button from "../../../Components/Buttons/Button";
import Dropzone from "../../../Components/CommonDropzone/Dropzone";
import Thumb from "../../../Components/Thumb";
import TextField from "../../../Components/TextField/TextField"; // Import custom TextField component

const CreateProduct = ({ handleClose, edit = false }) => {
  const dispatch = useDispatch();
  const [img, setImg] = useState(null);

  const initialValues = {
    name: edit?.name || "",
    barcode: edit?.barcode || "",
    category: edit?.category || "",
    capacity: edit?.capacity || "",
    photo: null,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    barcode: Yup.string().required("Barcode is required"),
    category: Yup.string().required("Category is required"),
    capacity: Yup.string().required("Capacity is required"),
    photo: Yup.mixed().test("fileSize", "File must be less than 500kb", (value) => {
      if (!value) return true;
      return value.size <= 500 * 1024;
    }),
  });

  const onSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
    handleClose();
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {(formik) => (
        <Form className="form">
          <div className="create-product-wrapper ">
            <div className="row p-4">
              <div className="col-md-4">
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
                  displayImage={img ? <Thumb thumb={img} /> : ""}
                  error={formik.errors.photo}
                />
              </div>

              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-12 mb-3">
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

                  <div className="col-md-12 mb-3">
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

                  <div className="col-md-6 ">
                    <TextField
                      label="Category"
                      name="category"
                      type="text"
                      value={formik.values.category}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.errors.category && formik.touched.category ? formik.errors.category : ""}
                    />
                  </div>

                  {/* Capacity Field */}
                  <div className="col-md-6">
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
          <div className="flex justify-end">
            <Button btnType="submit" className="btn create-button" title="Save" content="Save" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateProduct;
