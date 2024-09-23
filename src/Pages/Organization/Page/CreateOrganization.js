import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { renderTextField } from "../../../Utils/customFields";
import Button from "../../../Components/Buttons/Button";
import Dropzone from "../../../Components/CommonDropzone/Dropzone";
import Thumb from "../../../Components/Thumb";

const CreateOrganization = ({ setShowModal, edit = false }) => {
  const dispatch = useDispatch();
  const [img, setImg] = useState(null);

  const initialValues = {
    name: "",
    email: "",
    address: "",
    type: "",
    phoneNo: "",
    remarks: "",
    photo: null,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    address: Yup.string().required("Address is required"),
    type: Yup.string().required("Type is required"),
    phoneNo: Yup.string().required("Phone No. is required"),
    remarks: Yup.string(),
    photo: Yup.mixed().test("fileSize", "File must be less than 500kb", (value) => {
      if (!value) return true; // If no file is selected, it's valid
      return value.size <= 500 * 1024; // 500kb in bytes
    }),
  });

  const onSubmit = (values, { setSubmitting }) => {
    // Handle form submission here
    console.log(values);
    setSubmitting(false);
    setShowModal(false);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {(formik) => (
        <Form className="space-y-4">
          <div className="create-organization-wrapper">
            <div className="photo-part">
              <div className="">
                <Dropzone
                  name="photo"
                  label="Image"
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
              <div className="middle-part">
                <div className="row">
                  {renderTextField(formik, 6, "name", "text", "Name", true)}
                  {renderTextField(formik, 6, "email", "email", "Email", true)}
                  {renderTextField(formik, 12, "address", "text", "Address", true)}
                </div>
              </div>
            </div>
            <div className="last-part">
              <div className="row ">
                {renderTextField(formik, 6, "type", "text", "Type", true)}
                {renderTextField(formik, 6, "phoneNo", "tel", "Phone No.", true)}
                {renderTextField(formik, 12, "remarks", "textarea", "Remarks", false)}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end align-items-center ">
            <Button btnType="submit" className="btn create-button" createButton={true} title="Save" content="Save" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateOrganization;
