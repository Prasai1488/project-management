// import { Form, Formik } from "formik";
// import React, { useEffect, useRef, useState } from "react";
// import "react-datepicker/dist/react-datepicker.css";
// import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
// import { useSelector } from "react-redux";
// import * as Yup from "yup";
// import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
// import CreateAlert from "../../../Components/Alert/CreateAlert";
// import Button from "../../../Components/Buttons/Button";
// import Dropzone from "../../../Components/CommonDropzone/Dropzone";
// import Loader from "../../../Components/Loader";
// import TextField from "../../../Components/TextField/TextField";
// import Thumb from "../../../Components/Thumb";
// import axiosInstance from "../../../Utils/axios";
// import { SUPPORTED_FORMATS } from "../../../Utils/image";
// import { createUser, deletePhoto, getUser, updateUser } from "../Redux/thunk";
// import { renderSelectField, renderTextField } from "../../../Utils/customFields";
// import "./user.css";
// const CreateUser = ({ dispatch, setShowModal, postsPerPage }) => {
//   const formRef = useRef();
//   const user = useSelector((state) => state.user.user);
//   const newRole = useSelector((state) => state.role.role);
//   const loading = useSelector((state) => state.user.loading);
//   const loadingUpdated = useSelector((state) => state.user.loadingUpdated);
//   const edit = useSelector((state) => state.user.edit);
//   const [lock, setLock] = useState(false);
//   const [data, setData] = useState(null);
//   const [img, setImg] = useState(null);
//   const [submit, setSubmit] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);

//   const organizationType = [
//     { id: 1, name: "ORG 1" },
//     { id: 2, name: "ORG 2" },
//     { id: 3, name: "ORG 3" },
//   ];

//   const initialState = {
//     firstName: data !== null ? data?.firstName : edit ? user?.firstName : "",
//     middleName: data !== null ? data?.middleName : edit ? user?.middleName : "",
//     lastName: data !== null ? data?.lastName : edit ? user?.lastName : "",
//     email: data !== null ? data.email : edit ? user?.email : "",
//     phone: data !== null ? data.phone : edit ? user?.phoneNo : "",
//     photo: "",
//     organization: "",
//   };
//   const validationSchema = Yup.object().shape({
//     firstName: Yup.string()
//       .required("Required")
//       .min(2, "First Name  must be at least 2 characters.")
//       .max(50, "First Name  should be 50 characters.")
//       .matches(/(?=.*^[A-Za-z]\w).*$/, "firstName  should only contain alphabet."),
//     middleName: Yup.string().min(2).max(100),
//     lastName: Yup.string().min(2).max(100).required("Last name is required"),
//     email: Yup.string().email("@ is required").lowercase().required("Required."),
//     photo: Yup.mixed()
//       .test(
//         "fileSize",
//         "File Size is too large, max file size is 500 KB.",
//         (file) => !file || (file && file.size <= 500 * 1024)
//       )
//       .test("fileType", "Unsupported File Format.", (file) => !file || (file && SUPPORTED_FORMATS.includes(file.type))),
//     phone: Yup.string().matches(/^[9]\d{9}$/, "Phone number should start with 98 and should be 10 digits."),
//     organization: Yup.object().required(" Required"),
//   });

//   const onSubmit = (values) => {
//     if (!submit) {
//       setShowAlert(true);
//     } else {
//       const { firstName, middleName, lastName, email, phone, photo } = values;

//       const capitalFirstName = firstName?.charAt(0).toUpperCase() + firstName?.slice(1);
//       const capitalMiddleName = middleName?.charAt(0).toUpperCase() + middleName?.slice(1);
//       const capitalLastName = lastName?.charAt(0).toUpperCase() + lastName?.slice(1);

//       if (edit) {
//         const id = user?._id;
//         let data = {
//           id,
//           values: {
//             firstName: capitalFirstName,
//             middleName: capitalMiddleName,
//             lastName: capitalLastName,
//             email,
//             phone,
//           },
//         };

//         dispatch(updateUser(data))
//           .unwrap()
//           .then(() => {
//             successFunction("User updated successfully.");
//             dispatch(getUser(postsPerPage));
//             setData(null);
//             setShowModal(false);
//           })
//           .catch((error) => {
//             setSubmit(false);
//             setShowAlert(false);
//             errorFunction(error);
//           });
//       } else {
//         let data = {
//           firstName: capitalFirstName,
//           middleName: capitalMiddleName,
//           lastName: capitalLastName,
//           email,
//           phone,
//         };
//         dispatch(createUser(data))
//           .unwrap()
//           .then(() => {
//             successFunction("User created successfully.");
//             dispatch(getUser(postsPerPage));
//             setShowModal(false);
//             setData(null);
//           })
//           .catch((error) => {
//             setSubmit(false);
//             setShowAlert(false);
//             errorFunction(error);
//           });
//       }
//     }
//   };
//   const handleDelete = () => {
//     dispatch(deletePhoto(user.id));
//   };

//   useEffect(() => {
//     if (submit && formRef.current) {
//       formRef.current.submitForm();
//     }
//   }, [submit]);

//   return (
//     <>
//       {(loading || loadingUpdated) && <Loader />}
//       <div className="create-userdetail-wrapper">
//         <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={onSubmit} innerRef={formRef}>
//           {(formik) => {
//             return (
//               <Form autoComplete="off">
//                 <div className="create-department-wrapper">
//                   <div className="form-part ">
//                     <div className="">
//                       <Dropzone
//                         name="photo"
//                         label="Photo"
//                         removePhoto={() => {
//                           if (edit) {
//                             handleDelete();
//                           } else {
//                             formik.setFieldValue("photo", "");
//                             setImg(null);
//                           }
//                         }}
//                         onChange={(event) => {
//                           formik.setFieldValue("photo", event.target.files[0]);
//                           let reader = new FileReader();
//                           reader.readAsDataURL(event.target.files[0]);

//                           reader.onloadend = () => setImg([reader.result]);
//                         }}
//                         displayImage={
//                           img ? <Thumb thumb={img} /> : user && user.photo && !img ? <Thumb thumb={user.photo} /> : ""
//                         }
//                         error={formik.errors.photo}
//                       />
//                     </div>
//                     <div className="details-form">
//                       <div className="row">
//                         {renderTextField(formik, 4, "firstName", "text", "First Name", true)}
//                         {renderTextField(formik, 4, "middleName", "text", "Middle Name", true)}
//                         {renderTextField(formik, 4, "lastName", "text", "Last Name", true)}
//                         {renderTextField(formik, 4, "email", "text", "Email", true)}
//                         {renderTextField(formik, 4, "phone", "text", "Mobile Number", true)}
//                         {renderSelectField(
//                           formik,
//                           4,
//                           "organization",
//                           "Organization",
//                           organizationType,
//                           true,
//                           formik?.values?.organization
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="d-flex justify-content-end align-items-center ">
//                   <Button
//                     btnType="submit"
//                     className="btn create-button"
//                     title={edit ? "Update" : "Save"}
//                     content={edit ? "Update" : "Save"}
//                   />
//                 </div>
//               </Form>
//             );
//           }}
//         </Formik>
//       </div>
//       {showAlert && <CreateAlert showAlert={showAlert} setShowAlert={setShowAlert} setSubmit={setSubmit} />}
//     </>
//   );
// };
// export default CreateUser;

import { Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
import CreateAlert from "../../../Components/Alert/CreateAlert";
import Button from "../../../Components/Buttons/Button";
import Loader from "../../../Components/Loader";
import { createUser, updateUser, getUser } from "../Redux/thunk";
import { renderTextField } from "../../../Utils/customFields";

const CreateUser = ({ dispatch, setShowModal, postsPerPage }) => {
  const formRef = useRef();
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);
  const loadingUpdated = useSelector((state) => state.user.loadingUpdated);
  const edit = useSelector((state) => state.user.edit);
  const [submit, setSubmit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const initialState = {
    fullName: edit ? user?.userProfile?.fullName : "",
    email: edit ? user?.email : "",
    phone: edit ? user?.userProfile?.phone : "",
    userType: edit ? user?.userType : "",
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("Full name is required")
      .min(2, "Must be at least 2 characters")
      .max(100, "Must be less than 100 characters")
      .matches(/^[A-Za-z\s]+$/, "Should only contain letters and spaces"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[9]\d{9}$/, "Phone number should start with 9 and be 10 digits"),
    userType: Yup.string().required("User type is required"),
  });

  const onSubmit = (values) => {
    if (!submit) {
      setShowAlert(true);
    } else {
      const { fullName, email, phone, userType } = values;

      const trimmedFullName = fullName.trim();

      const userData = {
        email,
        fullName: trimmedFullName, // Use 'fullName' as the key, matching backend expectation
        userType,
        phone,
      };

      if (edit) {
        // Handle update user logic
        const id = user?.id;
        dispatch(updateUser({ id, values: userData }))
          .unwrap()
          .then(() => {
            successFunction("User updated successfully.");
            dispatch(getUser({ postsPerPage: postsPerPage, page: 1 }));
            setShowModal(false);
          })
          .catch((error) => {
            setSubmit(false);
            setShowAlert(false);
            errorFunction(error);
          });
      } else {
        // Handle create user logic
        dispatch(createUser(userData))
          .unwrap()
          .then(() => {
            successFunction("User created successfully.");
            dispatch(getUser({ postsPerPage: postsPerPage, page: 1 }));
            setShowModal(false);
          })
          .catch((error) => {
            setSubmit(false);
            setShowAlert(false);
            errorFunction(error);
          });
      }
    }
  };

  useEffect(() => {
    if (submit && formRef.current) {
      formRef.current.submitForm();
    }
  }, [submit]);

  return (
    <>
      {(loading || loadingUpdated) && <Loader />}
      <div className="create-userdetail-wrapper">
        <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={onSubmit} innerRef={formRef}>
          {(formik) => {
            return (
              <Form autoComplete="off">
                <div className="create-department-wrapper">
                  <div className="form-part">
                    <div className="details-form">
                      <div className="row">
                        {renderTextField(formik, 4, "fullName", "text", "Full Name", true)}
                        {renderTextField(formik, 4, "email", "email", "Email", true)}
                        {renderTextField(formik, 4, "phone", "text", "Mobile Number", true)}
                        {/* User Type Field */}
                        <div className="col-md-4">
                          <label htmlFor="userType">User Type</label>
                          <select
                            name="userType"
                            value={formik.values.userType}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`form-control ${
                              formik.touched.userType && formik.errors.userType ? "is-invalid" : ""
                            }`}
                          >
                            <option value="" label="Select user type" />
                            <option value="admin" label="Admin" />
                            <option value="user" label="User" />
                            {/* Add other user types as needed */}
                          </select>
                          {formik.touched.userType && formik.errors.userType ? (
                            <div className="invalid-feedback">{formik.errors.userType}</div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end align-items-center ">
                  <Button
                    btnType="submit"
                    className="btn create-button"
                    title={edit ? "Update" : "Save"}
                    content={edit ? "Update" : "Save"}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      {showAlert && <CreateAlert showAlert={showAlert} setShowAlert={setShowAlert} setSubmit={setSubmit} />}
    </>
  );
};

export default CreateUser;
