import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import Button from "../../../Components/Buttons/Button";
import Dropzone from "../../../Components/CommonDropzone/Dropzone";
import Thumb from "../../../Components/Thumb";
import TextField from "../../../Components/TextField/TextField";

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
    <>
      <div className="create-product-wrapper "></div>
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
                    displayImage={img ? <Thumb thumb={img} /> : ""}
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

                    <div className="col-6 ">
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
                  </div>
                </div>
              </div>
            </div>
            <div className=" d-flex justify-content-end align-items-center">
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

export default CreateProduct;
