import { Form, Formik } from "formik";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { getAllUser } from "../Redux/thunk";
import { changePassword } from "../../../Redux/Auth/thunk";
import { useHistory } from "react-router-dom";
import getCookie from "../../../Utils/Cookies/getCookie";
import Button from "../../../Components/Buttons/Button";
import TextField from "../../../Components/CommonTextField";

const ChangePassword = () => {
  const users = useSelector((state) => state.user.users);
  const userid = useSelector((state) => state.auth.userId);

  //   const token = localStorage.getItem("accessToken");
  const token = getCookie("accessToken");
  const decoded = jwt_decode(token);
  const dispatch = useDispatch();
  const userData = users?.find((user) => (user.id === decoded.userId ? user : null));
  let history = useHistory();

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);
  const [type, setType] = useState("password");
  const [type1, setType1] = useState("password");
  const [type2, setType2] = useState("password");

  const initialValues = {
    password: "",
    confirmPassword: "",
    oldPassword: "",
  };
  const user = userData?.password;
  //validation rule for the form field in formik
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old Password  is required"),
    password: Yup.string()
      .required("Please Enter your password")
      .matches(
        /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/,
        "Must Contain 6 Characters, One alphabet and One Number "
      ),
    confirmPassword: Yup.string()
      .required("Confirm Password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  //submit handler for formik
  const onSubmit = (values) => {
    const { password, oldPassword, confirmPassword } = values;
    const value = {
      id: userid,
      password,
      oldPassword,
      confirmPassword,
      history,
    };

    dispatch(changePassword(value));
  };
  // toggle password
  const handleClick = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };
  // toggle confirm password
  const handleClick1 = () => {
    if (type1 === "password") {
      setType1("text");
    } else {
      setType1("password");
    }
  };
  // toggle confirm password
  const handleClick2 = () => {
    if (type2 === "password") {
      setType2("text");
    } else {
      setType2("password");
    }
  };
  return (
    <div className="login-bak">
      <div className="account-pages my-5 reset-container">
        <div className="container">
          <div className="row justify-content-center ">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card overflow-hidden card-reset">
                <div
                  className="bg-soft"
                  style={{
                    backgroundColor: "var(--blue-primary)",
                    color: "#ffffff",
                  }}
                >
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="text-center m-3">
                        <h5>Change Password</h5>
                      </div>
                    </div>
                    {/* #CE5661 */}
                  </div>
                </div>
                <div className="card-body py-4">
                  <div className="">
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                      {(formik) => {
                        return (
                          <Form autoComplete="off" className="form-horizontal ">
                            <div className="mb-2 password-field ">
                              <div style={{ position: "relative" }}>
                                <TextField
                                  type={type}
                                  name="oldPassword"
                                  label="Password"
                                  placeholder="****"
                                  className="login"
                                  required
                                  formikRequired={formik?.errors?.oldPassword && formik?.touched?.oldPassword}
                                  onChange={(e) => formik.setFieldValue("oldPassword", e.target.value)}
                                />
                                <span className="fa-eye-button" onClick={handleClick}>
                                  {type === "password" ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                                </span>
                              </div>
                            </div>
                            <div className="mb-2 password-field">
                              <div style={{ position: "relative" }}>
                                <TextField
                                  type={type1}
                                  name="password"
                                  label="New Password"
                                  placeholder="******"
                                  className="login"
                                  required
                                  formikRequired={formik?.errors?.password && formik?.touched?.password}
                                  onChange={(e) => formik.setFieldValue("password", e.target.value)}
                                />
                                <span className="fa-eye-button" onClick={handleClick1}>
                                  {type1 === "password" ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                                </span>
                              </div>
                            </div>
                            <div className="mb-2 password-field">
                              <div style={{ position: "relative" }}>
                                <TextField
                                  type={type2}
                                  name="confirmPassword"
                                  label="Confirm Password"
                                  placeholder="******"
                                  className="login"
                                  required
                                  formikRequired={formik?.errors?.confirmPassword && formik?.touched?.confirmPassword}
                                  onChange={(e) => formik.setFieldValue("confirmPassword", e.target.value)}
                                />
                                <span className="fa-eye-button" onClick={handleClick2}>
                                  {type2 === "password" ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                                </span>
                              </div>
                            </div>

                            <div className="mt-3 d-flex justify-content-center align-items-center">
                              <Button
                                btnType="submit"
                                className="btn create-button"
                                createButton={true}
                                title="Save"
                                content="Save"
                              />
                            </div>
                          </Form>
                        );
                      }}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
