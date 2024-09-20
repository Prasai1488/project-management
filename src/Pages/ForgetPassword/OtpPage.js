import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import mlogo from "../../assets/mlogo.png";
import Button from "../../Components/Buttons/Button";
import TextField from "../../Components/TextField/TextField";
// import { verifyOtp } from "../../Redux/Auth/thunk";
import "./OtpPage.css";
const OtpPage = (props) => {
  let history = useHistory();
  //   const loading = useSelector((state) => state.auth.loading);
  //   const dispatch = useDispatch();

  // Initial values for the form
  const initialValues = {
    otp: "",
  };

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .required("Please enter the OTP")
      .matches(/^\d{6}$/, "OTP must be exactly 6 digits"),
  });

  //   Submit handler for OTP form
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="otp-page">
      <div className="otp-content">
        <div className="otp-box">
          <div className="logo-container">
            <img src={mlogo} alt="logo" className="main-logo" />
          </div>
          <h2 className="form-title">OTP Code</h2>

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {(formik) => (
              <Form autoComplete="off" className="form-horizontal">
                <div className="mb-4 otp-field">
                  <TextField
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    className="otp-input"
                    required
                    formikRequired={formik?.errors?.otp && formik?.touched?.otp}
                    onChange={(e) => formik.setFieldValue("otp", e.target.value)}
                  />
                </div>

                <p className="instructions">
                  We have sent an OTP to your email. Please enter it above to reset your password.
                </p>

                <div className="d-flex justify-content-center align-items-center">
                  <Button
                    btnType="submit"
                    className="btn otp-button"
                    createButton={false}
                    title="Verify OTP"
                    content="Verify OTP"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="copyright">
        <span>Copyright © 2024</span>
        <br />
        <strong>Ranger Wholesale</strong>
      </div>
    </div>
  );
};

export default OtpPage;
