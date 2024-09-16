import { ErrorMessage, Field, Form, Formik } from "formik";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import * as Yup from "yup";

import { useHistory } from "react-router-dom";

import Button from "../../Components/Buttons/Button";
import TextField from "../../Components/TextField/TextField";
import { resetPassword } from "../../Redux/Auth/thunk";

const ResetPasswordConfirm = (props) => {
  let history = useHistory();
  // props
  const loadingReset = useSelector((state) => state.auth.loadingReset);
  const dispatch = useDispatch();
  const [type, setType] = useState("password");
  const [type1, setType1] = useState("password");

  //initial values of form field in formik
  const initialValues = {
    password: "",
    confirmNewPassword: "",
  };
  //validation rule for the form field in formik
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Please Enter your password")
      .matches(
        /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/,
        "Must Contain 6 Characters, One alphabet and One Number "
      ),
    confirmNewPassword: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  //submit handler for formik
  const onSubmit = (values) => {
    const { password, confirmNewPassword } = values;
    const token = props.match.params.token;

    const value = { password, confirmNewPassword, token, history };
    dispatch(resetPassword(value));
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

  return (
    <div className="login-bak">
      <div className="account-pages my-5 reset-container">
        <div className="container">
          <div className="row justify-content-center ">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card overflow-hidden card-reset">
                <div className="bg-soft" style={{ backgroundColor: "#bf202f", color: "#ffffff" }}>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="text-center m-3">
                        <h5>New Password</h5>
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
                            <div className="mb-2 password-field">
                              <div style={{ position: "relative" }}>
                                <TextField
                                  type={type}
                                  name="password"
                                  label="New Password"
                                  placeholder="******"
                                  className="login"
                                  required
                                  formikRequired={formik?.errors?.password && formik?.touched?.password}
                                  onChange={(e) => formik.setFieldValue("password", e.target.value)}
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
                                  name="confirmNewPassword"
                                  label="Confirm Password"
                                  placeholder="******"
                                  className="login"
                                  required
                                  formikRequired={
                                    formik?.errors?.confirmNewPassword && formik?.touched?.confirmNewPassword
                                  }
                                  onChange={(e) => formik.setFieldValue("confirmNewPassword", e.target.value)}
                                />
                                <span className="fa-eye-button" onClick={handleClick1}>
                                  {type1 === "password" ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
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

export default ResetPasswordConfirm;
