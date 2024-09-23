import React from "react";
import "./resetPassword.css";
import { useHistory, Link } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { MdMailOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../Redux/Auth/thunk";
import { errorFunction } from "../../Components/Alert/Alert";
import LoginTextField from "../../Components/TextField/LoginTextField";
import mlogo from "../../assets/mlogo.png"; // Import the logo

const ForgetPassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
  });

  const onSubmit = (values) => {
    dispatch(forgetPassword(values.email))
      .unwrap()
      .then(() => {
        history.push("/reset-password");
      })
      .catch(() => {
        errorFunction("There is no active user associated with this e-mail address. Password cannot be changed");
      });
  };

  return (
    <div className="forgot-password-wrapper">
      <div className="forgot-password-logo-container">
        <img src={mlogo} alt="Logo" className="main-logo" />
      </div>
      <div className="forgot-password-content-wrapper">
        <h1 className="forgot-password-title">Forgot Your Password?</h1>
        <p className="forgot-password-description">Reset your password through email</p>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form className="w-100">
              <LoginTextField
                type="email"
                name="email"
                placeholder="Email"
                icon={<MdMailOutline size={25} color="#333" style={{ opacity: "0.3" }} />}
                required
                value={formik.values.email}
                formikRequired={formik.errors.email && formik.touched.email}
                onChange={(e) => {
                  formik.setFieldValue("email", e.target.value);
                }}
              />
              <button type="submit" className="submit-btn">
                Reset
              </button>
              <div className="text-center mt-3">
                <Link to="/">Back to Login</Link>
              </div>
            </Form>
          )}
        </Formik>
        <div className="forgot-password-developer-content text-center mt-4">
          <p>Developed and Maintained By Soori Solutions</p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
