// import React, { useState } from "react";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import { useDispatch } from "react-redux";
// import { renderTextField } from "../../../Utils/customFields";
// import Button from "../../../Components/Buttons/Button";
// import Dropzone from "../../../Components/CommonDropzone/Dropzone";
// import Thumb from "../../../Components/Thumb";

// const CreateOrganization = ({ setShowModal, edit = false }) => {
//   const dispatch = useDispatch();
//   const [img, setImg] = useState(null);

//   const initialValues = {
//     name: "",
//     email: "",
//     address: "",
//     type: "",
//     phoneNo: "",
//     remarks: "",
//     photo: null,
//   };

//   const validationSchema = Yup.object().shape({
//     name: Yup.string().required("Name is required"),
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     address: Yup.string().required("Address is required"),
//     type: Yup.string().required("Type is required"),
//     phoneNo: Yup.string().required("Phone No. is required"),
//     remarks: Yup.string(),
//     photo: Yup.mixed().test("fileSize", "File must be less than 500kb", (value) => {
//       if (!value) return true; // If no file is selected, it's valid
//       return value.size <= 500 * 1024; // 500kb in bytes
//     }),
//   });

//   const onSubmit = (values, { setSubmitting }) => {
//     // Handle form submission here
//     console.log(values);
//     setSubmitting(false);
//     setShowModal(false);
//   };

//   return (
//     <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
//       {(formik) => (
//         <Form className="space-y-4">
//           <div className="create-organization-wrapper p-4">
//             <div className="my-2 col-12 ">
//               <div className="row">
//                 <div className="col-3 dropzone-container">
//                   <Dropzone
//                     name="photo"
//                     label="Image"
//                     removePhoto={() => {
//                       formik.setFieldValue("photo", "");
//                       setImg(null);
//                     }}
//                     onChange={(event) => {
//                       formik.setFieldValue("photo", event.target.files[0]);
//                       let reader = new FileReader();
//                       reader.readAsDataURL(event.target.files[0]);
//                       reader.onloadend = () => setImg([reader.result]);
//                     }}
//                     displayImage={img ? <Thumb thumb={img} /> : ""}
//                     error={formik.errors.photo}
//                     // text={"File must be less than 500kb"}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="col-12">
//               <div className="row ">
//                 {renderTextField(formik, 6, "name", "text", "Name", true)}
//                 {renderTextField(formik, 6, "email", "email", "Email", true)}
//                 {renderTextField(formik, 6, "address", "text", "Address", true)}
//                 {renderTextField(formik, 6, "type", "text", "Type", true)}
//                 {renderTextField(formik, 6, "phoneNo", "tel", "Phone No.", true)}
//                 {renderTextField(formik, 6, "remarks", "textarea", "Remarks", false)}
//               </div>
//             </div>
//           </div>
//           <div className="flex justify-end">
//             <Button btnType="submit" className="btn create-button" createButton={true} title="Save" content="Save" />
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default CreateOrganization;

import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Dropzone from "../../../Components/CommonDropzone/Dropzone";
import Button from "../../../Components/Buttons/Button";
import TextField from "../../../Components/TextField/TextField";
import Loader from "../../../Components/Loader";
import Thumb from "../../../Components/Thumb";

const CreateOrganizationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  type: Yup.string().required("Type is required"),
  phoneNo: Yup.string().required("Phone No. is required"),
  remarks: Yup.string(),
  logo: Yup.mixed().required("An organization logo is required"),
});

const CreateOrganization = ({ dispatch, setShowModal }) => {
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState(null);

  const initialValues = {
    name: "",
    address: "",
    email: "",
    type: "",
    phoneNo: "",
    remarks: "",
    logo: null,
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      
      setShowModal(false);
    } catch (error) {
      console.error("Error creating organization", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="create-organization-wrapper">
        <div className="header"></div>
        <Formik initialValues={initialValues} validationSchema={CreateOrganizationSchema} onSubmit={handleSubmit}>
          {(formik) => (
            <Form autoComplete="off">
              <div className="form-layout">
                <div className="image-upload">
                  <Dropzone
                    name="logo"
                    label="Upload Image"
                    removePhoto={() => {
                      formik.setFieldValue("logo", "");
                      setImg(null);
                    }}
                    onChange={(event) => {
                      formik.setFieldValue("logo", event.target.files[0]);
                      let reader = new FileReader();
                      reader.readAsDataURL(event.target.files[0]);
                      reader.onloadend = () => setImg([reader.result]);
                    }}
                    displayImage={img ? <Thumb thumb={img} /> : ""}
                    error={formik.errors.logo}
                   
                  />
                </div>
                <div className="form-fields">
                  <div className="field-row">
                    <TextField
                      type="text"
                      name="name"
                      label="Name"
                      required
                      formikRequired={formik.errors.name && formik.touched.name}
                      placeholder="Name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                    <TextField
                      type="text"
                      name="address"
                      label="Address"
                      required
                      formikRequired={formik.errors.address && formik.touched.address}
                      placeholder="Address"
                      onChange={formik.handleChange}
                      value={formik.values.address}
                    />
                  </div>
                  <TextField
                    type="email"
                    name="email"
                    label="Email"
                    formikRequired={formik.errors.email && formik.touched.email}
                    placeholder="Email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  <div className="field-row">
                    <TextField
                      type="text"
                      name="type"
                      label="Type"
                      formikRequired={formik.errors.type && formik.touched.type}
                      placeholder="Type"
                      onChange={formik.handleChange}
                      value={formik.values.type}
                    />
                    <TextField
                      type="tel"
                      name="phoneNo"
                      label="Phone No."
                      required
                      formikRequired={formik.errors.phoneNo && formik.touched.phoneNo}
                      placeholder="Phone No."
                      onChange={formik.handleChange}
                      value={formik.values.phoneNo}
                    />
                  </div>
                  <TextField
                    type="text"
                    name="remarks"
                    label="Remarks"
                    formikRequired={formik.errors.remarks && formik.touched.remarks}
                    placeholder="Enter Remarks"
                    onChange={formik.handleChange}
                    value={formik.values.remarks}
                  />
                </div>
              </div>
              <div className="form-actions">
                <Button btnType="submit" className="btn save-button" title="Save" content="+ Save" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CreateOrganization;
