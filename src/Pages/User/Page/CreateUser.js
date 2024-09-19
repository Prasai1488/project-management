import { Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
import CreateAlert from "../../../Components/Alert/CreateAlert";
import Button from "../../../Components/Buttons/Button";
import Dropzone from "../../../Components/CommonDropzone/Dropzone";
import Loader from "../../../Components/Loader";
import TextField from "../../../Components/TextField/TextField";
import Thumb from "../../../Components/Thumb";
import axiosInstance from "../../../Utils/axios";
import { SUPPORTED_FORMATS } from "../../../Utils/image";
import { createUser, deletePhoto, getUser, updateUser } from "../Redux/thunk";
import { renderSelectField, renderTextField } from "../../../Utils/customFields";
import "./user.css";
const CreateUser = ({ dispatch, setShowModal, postsPerPage }) => {
  const formRef = useRef();
  const user = useSelector((state) => state.user.user);
  const newRole = useSelector((state) => state.role.role);
  const loading = useSelector((state) => state.user.loading);
  const loadingUpdated = useSelector((state) => state.user.loadingUpdated);
  const edit = useSelector((state) => state.user.edit);
  const [lock, setLock] = useState(false);
  const [data, setData] = useState(null);
  const [img, setImg] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const organizationType = [
    { id: 1, name: "ORG 1" },
    { id: 2, name: "ORG 2" },
    { id: 3, name: "ORG 3" },
  ];

  const initialState = {
    firstName: data !== null ? data?.firstName : edit ? user?.firstName : "",
    middleName: data !== null ? data?.middleName : edit ? user?.middleName : "",
    lastName: data !== null ? data?.lastName : edit ? user?.lastName : "",
    email: data !== null ? data.email : edit ? user?.email : "",
    phone: data !== null ? data.phone : edit ? user?.phoneNo : "",
    photo: "",
    organization: "",
  };
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("Required")
      .min(2, "First Name  must be at least 2 characters.")
      .max(50, "First Name  should be 50 characters.")
      .matches(/(?=.*^[A-Za-z]\w).*$/, "firstName  should only contain alphabet."),
    middleName: Yup.string().min(2).max(100),
    lastName: Yup.string().min(2).max(100).required("Last name is required"),
    email: Yup.string().email("@ is required").lowercase().required("Required."),
    photo: Yup.mixed()
      .test(
        "fileSize",
        "File Size is too large, max file size is 500 KB.",
        (file) => !file || (file && file.size <= 500 * 1024)
      )
      .test("fileType", "Unsupported File Format.", (file) => !file || (file && SUPPORTED_FORMATS.includes(file.type))),
    phone: Yup.string().matches(/^[9]\d{9}$/, "Phone number should start with 98 and should be 10 digits."),
    organization: Yup.object().required(" Required"),
  });

  const onSubmit = (values) => {
    if (!submit) {
      setShowAlert(true);
    } else {
      const { firstName, middleName, lastName, email, phone, photo } = values;

      const capitalFirstName = firstName?.charAt(0).toUpperCase() + firstName?.slice(1);
      const capitalMiddleName = middleName?.charAt(0).toUpperCase() + middleName?.slice(1);
      const capitalLastName = lastName?.charAt(0).toUpperCase() + lastName?.slice(1);

      if (edit) {
        const id = user?._id;
        let data = {
          id,
          values: {
            firstName: capitalFirstName,
            middleName: capitalMiddleName,
            lastName: capitalLastName,
            email,
            phone,
          },
        };

        dispatch(updateUser(data))
          .unwrap()
          .then(() => {
            successFunction("User updated successfully.");
            dispatch(getUser(postsPerPage));
            setData(null);
            setShowModal(false);
          })
          .catch((error) => {
            setSubmit(false);
            setShowAlert(false);
            errorFunction(error);
          });
      } else {
        let data = {
          firstName: capitalFirstName,
          middleName: capitalMiddleName,
          lastName: capitalLastName,
          email,
          phone,
        };
        dispatch(createUser(data))
          .unwrap()
          .then(() => {
            successFunction("User created successfully.");
            dispatch(getUser(postsPerPage));
            setShowModal(false);
            setData(null);
          })
          .catch((error) => {
            setSubmit(false);
            setShowAlert(false);
            errorFunction(error);
          });
      }
    }
  };
  const handleDelete = () => {
    dispatch(deletePhoto(user.id));
  };

  // const loadOptionsGroups = async (search, loadOptions, { limit, offset }) => {
  //   const { data } = await axiosInstance(`/api/v1/role-app/role?search=${search}&page=${offset}&limit=${limit}`);
  //   return {
  //     options: data.roles,
  //     hasMore: data.next ? true : false,
  //     additional: {
  //       offset: data.count > offset ? offset + 10 : offset,
  //       limit: 10,
  //     },
  //   };
  // };

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
                  <div className="row">
                    <div className="col-2">
                      <Dropzone
                        name="photo"
                        label="Photo"
                        removePhoto={() => {
                          if (edit) {
                            handleDelete();
                          } else {
                            formik.setFieldValue("photo", "");
                            setImg(null);
                          }
                        }}
                        onChange={(event) => {
                          formik.setFieldValue("photo", event.target.files[0]);
                          let reader = new FileReader();
                          reader.readAsDataURL(event.target.files[0]);

                          reader.onloadend = () => setImg([reader.result]);
                        }}
                        displayImage={
                          img ? <Thumb thumb={img} /> : user && user.photo && !img ? <Thumb thumb={user.photo} /> : ""
                        }
                        error={formik.errors.photo}
                      />
                    </div>
                    <div className="col-10">
                      <div className="row">
                        {renderTextField(formik, 4, "firstName", "text", "First Name", true)}
                        {renderTextField(formik, 4, "middleName", "text", "Middle Name", true)}
                        {renderTextField(formik, 4, "lastName", "text", "Last Name", true)}
                        {renderTextField(formik, 4, "email", "text", "Email", true)}
                        {renderTextField(formik, 4, "phone", "text", "Mobile Number", true)}
                        {renderSelectField(
                          formik,
                          4,
                          "organization",
                          "Organization",
                          organizationType,
                          true,
                          formik?.values?.organization
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" d-flex justify-content-end align-items-center">
                  <Button
                    btnType="submit"
                    className="btn create-button"
                    createButton={true}
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
