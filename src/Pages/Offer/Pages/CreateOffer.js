import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import Button from "../../../Components/Buttons/Button";
import Dropzone from "../../../Components/CommonDropzone/Dropzone";
import Thumb from "../../../Components/Thumb";
import TextField from "../../../Components/TextField/TextField";
import SelectField from "../../../Components/CommonSelectField/Select";
import "./offer.css";

const CreateOffer = ({ handleClose, edit = false }) => {
  const dispatch = useDispatch();
  const [img, setImg] = useState(null);

  const statusOptions = [
    { id: "ACTIVE", name: "Active" },
    { id: "InACTIVE", name: "InActive" },
  ];

  const initialValues = {
    offerName: edit?.name || "",
    photo: null,
    status: edit?.status || statusOptions[0]?.id,
  };

  const validationSchema = Yup.object().shape({
    offerName: Yup.string().required("Offer name is required"),
    photo: Yup.mixed()
      .required("Image is required")
      .test("fileSize", "File must be less than 500kb", (value) => {
        if (!value) return true;
        return value.size <= 500 * 1024;
      }),
    status: Yup.string().required("Status is required"),
  });

  const onSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
    handleClose();
  };

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(formik) => (
          <Form autoComplete="off">
            <div className="create-offer-wrapper">
              <div className="row">
                <div className="col-12 d-flex justify-content-center">
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
                      reader.onloadend = () => setImg(reader.result);
                    }}
                    displayImage={img ? <Thumb thumb={img} /> : ""}
                    error={formik.errors.photo}
                  />
                </div>

                <div className="col-12">
                  <div className="row">
                    <div className="col-12">
                      <TextField
                        label="Offer Name"
                        name="offerName"
                        type="text"
                        value={formik.values.offerName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.offerName && formik.touched.offerName ? formik.errors.offerName : ""}
                      />
                    </div>

                    <div className="col-12 mt-3">
                      <SelectField
                        label="Status"
                        name="status"
                        value={statusOptions.find((option) => option.id === formik.values.status)}
                        required
                        options={statusOptions}
                        getOptionLabel={(option) => `${option?.name}`}
                        getOptionValue={(option) => `${option?.id}`}
                        onChange={(selected) => {
                          formik.setFieldValue("status", selected?.id);
                        }}
                        formikrequired={formik.errors.status && formik.touched.status}
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

export default CreateOffer;
