import { Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
import CreateAlert from "../../../Components/Alert/CreateAlert";
import Button from "../../../Components/Buttons/Button";
import AsyncSelect from "../../../Components/CommonAsyncSelectField/AsyncSelect";
import Checkbox from "../../../Components/CommonCheckbox/Checkbox";
import Dropzone from "../../../Components/CommonDropzone/Dropzone";
import Select from "../../../Components/CommonSelectField/Select";
import Textarea from "../../../Components/CommonTextarea/Textarea";
import Loader from "../../../Components/Loader";
import TextField from "../../../Components/TextField/TextField";
import Thumb from "../../../Components/Thumb";
import axiosInstance from "../../../Utils/axios";
import { genders } from "../../../Utils/constants";
import { SUPPORTED_FORMATS } from "../../../Utils/image";
import { checkRedundantDataUser } from "../../../Utils/RedundantData/User";
import { createUser, deletePhoto, getUser, updateUser } from "../Redux/thunk";

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
  const [password, setPassword] = useState("password");
  const [confirmPassword, setConfirmPassword] = useState("password");

  const userLevels = [
    { id: 1, name: "L1" },
    { id: 2, name: "L2" },
    { id: 3, name: "L3" },
  ];

  const initialState = {
    firstName: data !== null ? data?.firstName : edit ? user?.firstName : "",
    middleName: data !== null ? data?.middleName : edit ? user?.middleName : "",
    lastName: data !== null ? data?.lastName : edit ? user?.lastName : "",
    email: data !== null ? data.email : edit ? user?.email : "",
    username: data !== null ? data.username : edit ? user?.username : "",
    address: data !== null ? data.address : edit ? user?.address : "",
    phone: data !== null ? data.phone : edit ? user?.phoneNo : "",

    gender:
      data !== null
        ? data.gender
        : edit
        ? user?.gender
          ? genders.find((gender) => gender.name === user?.gender)
          : ""
        : "",
    photo: "",
    level: edit ? userLevels.find((level) => level.name === user?.level) : null,

    roles: newRole !== null ? newRole.id : edit ? user?.roles : [],
    password: data !== null ? data.password : edit ? user?.password : "",
    confirmPassword: data !== null ? data.confirmPassword : edit ? user?.confirmPassword : "",
    isActive: edit ? user?.isActive : true,
    remarks: "",
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
    username: Yup.string()
      .required("Required.")
      .lowercase()
      .min(4, "Username must be at least 4 characters.")
      .max(50, "Username should be 50 characters.")
      .matches(/(?=.*^[A-Za-z_]\w).*$/, "Username should begin with _ or alphabet."),
    password: edit
      ? Yup.string()
      : Yup.string()
          .required("Required.")
          .min(6, "Password must be at least 6 characters.")
          .matches(
            /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/,
            "Must Contain 6 Characters, One alphabet and One Number "
          ),
    confirmPassword: edit
      ? Yup.string()
      : Yup.string()
          .required("Required.")
          .oneOf([Yup.ref("password"), null], "Passwords must match."),
    photo: Yup.mixed()
      .test(
        "fileSize",
        "File Size is too large, max file size is 500 KB.",
        (file) => !file || (file && file.size <= 500 * 1024)
      )
      .test("fileType", "Unsupported File Format.", (file) => !file || (file && SUPPORTED_FORMATS.includes(file.type))),
    address: Yup.string().min(3, "Address must be at least 3 characters.").max(50, "Address must be 50 characters."),
    phone: Yup.string().matches(/^[9]\d{9}$/, "Phone number should start with 98 and should be 10 digits."),

    roles: Yup.array().min(1, "User should have minimum one role").required("Required"),
    level: Yup.object().required("Level is required"),
    isActive: Yup.bool(),
    gender: Yup.object().nullable(),
    remarks: edit ? Yup.string().required("Required") : Yup.string(),
  });

  const onSubmit = (values) => {
    if (!submit) {
      setShowAlert(true);
    } else {
      const {
        firstName,
        middleName,
        lastName,
        email,
        username,
        address,
        phone,
        photo,
        roles,
        isActive,
        gender,
        password,
        level,
        confirmPassword,
        remarks,
      } = values;

      const capitalFirstName = firstName?.charAt(0).toUpperCase() + firstName?.slice(1);
      const capitalMiddleName = middleName?.charAt(0).toUpperCase() + middleName?.slice(1);
      const capitalLastName = lastName?.charAt(0).toUpperCase() + lastName?.slice(1);
      const capitalAddress = address?.charAt(0).toUpperCase() + address?.slice(1);
      const updatedGroups = roles.map((data) => data.id);

      if (edit) {
        const id = user?._id;
        let data = {
          id,
          values: {
            firstName: capitalFirstName,
            middleName: capitalMiddleName,
            lastName: capitalLastName,
            email,
            username: username?.charAt(0).toLowerCase() + username?.slice(1),
            gender: gender.name,
            address: capitalAddress,
            isActive,
            phone,
            remarks,
            photo,
            roles: roles.map((role) => role._id),
            level: level.name,
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
          password,
          confirmPassword,
          username: username?.charAt(0).toLowerCase() + username?.slice(1),
          gender: gender.name,
          address: capitalAddress,
          isActive,
          phone,
          photo,
          roles: roles.map((role) => role._id),
          level: level.name,
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
  const handleChange = async (e) => {
    if (edit && e.target.value !== user?.username) {
      if (e.target.value.trim() && e.target.value !== "") {
        const result = await checkRedundantDataUser(e);
        result ? errorFunction("User already exist.") || setLock(true) : setLock(false);
      }
    }
    if (!edit && e.target.value.trim() && e.target.value !== "") {
      const result = await checkRedundantDataUser(e);
      result ? errorFunction("Username already exist.") || setLock(true) : setLock(false);
    }
  };
  // toggle password
  const handlePasswordClick = () => {
    if (password === "password") {
      setPassword("text");
    } else {
      setPassword("password");
    }
  };
  // toggle confirm password
  const handleConfirmClick = () => {
    if (confirmPassword === "password") {
      setConfirmPassword("text");
    } else {
      setConfirmPassword("password");
    }
  };
  const loadOptionsGroups = async (search, loadOptions, { limit, offset }) => {
    const { data } = await axiosInstance(`/api/v1/role-app/role?search=${search}&page=${offset}&limit=${limit}`);
    return {
      options: data.roles,
      hasMore: data.next ? true : false,
      additional: {
        offset: data.count > offset ? offset + 10 : offset,
        limit: 10,
      },
    };
  };

  useEffect(() => {
    if (submit && formRef.current) {
      formRef.current.submitForm();
    }
  }, [submit]);

  return (
    <>
      {(loading || loadingUpdated) && <Loader />}
      <div className="create-user-wrapper">
        <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={onSubmit} innerRef={formRef}>
          {(formik) => {
            return (
              <Form autoComplete="off">
                <div className="my-2">
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
                        text={"File must be less than 500kb"}
                      />
                    </div>
                    <div className="col-10">
                      <div className="row">
                        <div className="col-4">
                          <div className="my-2">
                            <TextField
                              type="text"
                              name="firstName"
                              label="First Name"
                              required
                              formikRequired={formik?.errors?.firstName && formik?.touched?.firstName}
                              placeholder="First Name"
                              onChange={(e) => {
                                formik.setFieldValue("firstName", e.target.value);
                              }}
                              autoFocus={true}
                            />
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="my-2">
                            <TextField
                              type="text"
                              name="middleName"
                              label="Middle Name"
                              required={false}
                              formikRequired={formik?.errors?.middleName && formik?.touched?.middleName}
                              placeholder=" Middle Name"
                              onChange={(e) => {
                                formik.setFieldValue("middleName ", e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="my-2">
                            <TextField
                              type="text"
                              name="lastName"
                              label="Last Name"
                              required
                              formikRequired={formik?.errors?.lastName && formik?.touched?.lastName}
                              placeholder=" Last Name"
                              onChange={(e) => {
                                formik.setFieldValue("lastName", e.target.value);
                              }}
                              autoFocus={true}
                            />
                          </div>
                        </div>
                        {/* user name */}
                        <div className="col-4">
                          <div className="my-2">
                            <TextField
                              type="text"
                              name="username"
                              label="User Name"
                              required
                              formikRequired={formik?.errors?.username && formik?.touched?.username}
                              placeholder=" User Name"
                              onChange={(e) => {
                                const val = (e.target.value || "").replace(/\s+/gi, "");
                                formik.setFieldValue("username", val.trim());
                                handleChange(e);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="my-2">
                            <TextField
                              type="text"
                              name="email"
                              label="Email"
                              required
                              formikRequired={formik?.errors?.email && formik?.touched?.email}
                              placeholder=" Email"
                              onChange={(e) => {
                                formik.setFieldValue("email", e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="my-2">
                            <TextField
                              type="text"
                              name="address"
                              label="Address"
                              placeholder=" Address"
                              onChange={(e) => {
                                formik.setFieldValue("address", e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-4">
                          <div className="my-2">
                            <TextField
                              type="number"
                              name="phone"
                              label="Mobile No"
                              placeholder="Mobile No"
                              required
                              onChange={(e) => {
                                formik.setFieldValue("phone", e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="my-2">
                            <AsyncSelect
                              value={formik.values.roles}
                              name="roles"
                              label="Role(s)"
                              isMulti={true}
                              required={true}
                              formikRequired={formik?.errors?.roles && formik?.touched?.roles}
                              getOptionLabel={(option) => `${option?.name}`}
                              getOptionValue={(option) => `${option?._id}`}
                              onChange={(selected) => {
                                formik.setFieldValue("roles", selected);
                              }}
                              loadOptions={loadOptionsGroups}
                              additional={{
                                offset: 0,
                                limit: 10,
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-4">
                          <div className="my-2">
                            <Select
                              value={formik.values.gender}
                              name="gender"
                              label="Gender"
                              options={genders}
                              required
                              getOptionLabel={(option) => option.name}
                              getOptionValue={(option) => option.id}
                              onChange={(selected) => {
                                formik.setFieldValue("gender", selected);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="my-2">
                            <Select
                              value={formik.values.level}
                              name="level"
                              label="Level"
                              options={userLevels}
                              required
                              getOptionLabel={(option) => option.name}
                              getOptionValue={(option) => option.id}
                              onChange={(selected) => {
                                formik.setFieldValue("level", selected);
                              }}
                            />
                          </div>
                        </div>
                        {!edit && (
                          <>
                            <div className="col-4 password-field">
                              <div className="my-2" style={{ position: "relative" }}>
                                <TextField
                                  type={password}
                                  name="password"
                                  label="Password"
                                  required
                                  formikRequired={formik?.errors?.password && formik?.touched?.password}
                                  placeholder="Password"
                                  onChange={(e) => {
                                    formik.setFieldValue("password", e.target.value);
                                  }}
                                />
                                <span className="fa-eye-button" onClick={handlePasswordClick}>
                                  {password === "password" ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                                </span>
                              </div>
                            </div>
                            <div className="col-4 password-field">
                              <div className="my-2" style={{ position: "relative" }}>
                                <TextField
                                  type={confirmPassword}
                                  name="confirmPassword"
                                  label="Confirm Password"
                                  required
                                  formikRequired={formik?.errors?.confirmPassword && formik?.touched?.confirmPassword}
                                  placeholder="Confirm Password"
                                  onChange={(e) => {
                                    formik.setFieldValue("confirmPassword", e.target.value);
                                  }}
                                />
                                <span className="fa-eye-button" onClick={handleConfirmClick}>
                                  {confirmPassword === "password" ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                                </span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      {edit && (
                        <div className="col-4 p-0">
                          <div className="my-2">
                            <Textarea
                              name="remarks"
                              label="Remarks"
                              required
                              onChange={(e) => {
                                formik.setFieldValue("remarks", e.target.value.trim());
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="my-2 d-flex justify-content-center align-items-center">
                  <Checkbox name="isActive" label="Active" edit={edit} />
                </div>
                <div className="my-4 d-flex justify-content-end align-items-center">
                  <Button
                    btnType="submit"
                    className="btn create-button"
                    createButton={true}
                    disabled={edit ? lock || loadingUpdated : lock || loading || !formik.dirty}
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
