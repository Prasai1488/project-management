import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { MdLockOutline, MdMailOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { errorFunction, successFunction } from "../../Components/Alert/Alert";
import LoginTextField from "../../Components/TextField/LoginTextField";
import Checkbox from "../../Components/CommonCheckbox/Checkbox";
import "./login.css";
import main from "../../assets/main.png";
import mlogo from "../../assets/mlogo.png";

const Login = () => {
  const [type, setType] = useState("password");
  const remember = localStorage.getItem("rememberMe");
  const user = localStorage.getItem("username");

  // Initial form values
  const initialValues = {
    username: user || "",
    password: "",
    rememberMe: remember === "true",
  };

  // Form validation schema
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Required!")
      .min(3, "Username must be at least 3 characters.")
      .matches(/^[A-Za-z_]\w.*$/, "Username should begin with _ or alphabet."),
    password: Yup.string().required("Required!").min(4, "Password should be at least 4 characters."),
    rememberMe: Yup.bool(),
  });

  // Handle form submission
  const onSubmit = (values) => {
    const { rememberMe, username, password } = values;
    localStorage.setItem("rememberMe", rememberMe);
    localStorage.setItem("username", rememberMe ? username : "");

    // Here you can dispatch login action or API call
    successFunction("Logged in successfully.");
  };

  // Toggle password visibility
  const togglePassword = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  // Icon style for consistent look
  const iconStyle = { color: "red" };

  return (
    <div className="login-wrapper">
      <img src={mlogo} alt="logo" className="main-logo" />
      <div className="login-section">
        <div className="login-container">
          <h2>Login</h2>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {(formik) => (
              <Form className="login-form">
                <LoginTextField
                  type="text"
                  name="username"
                  placeholder="E-mail ID"
                  icon={<MdMailOutline size={25} style={iconStyle} />}
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  formikRequired={formik.touched.username && formik.errors.username}
                />
                <div className="password-field">
                  <LoginTextField
                    type={type}
                    name="password"
                    placeholder="Password"
                    icon={<MdLockOutline size={25} style={iconStyle} />}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    formikRequired={formik.touched.password && formik.errors.password}
                  />
                  <span className="toggle-password" onClick={togglePassword}>
                    {type === "password" ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                  </span>
                </div>
                <div className="form-options">
                  <div className="d-flex justify-content-start align-items-center text-md-start">
                    <Checkbox name="rememberMe" label={<span className="fs-4">Remember me</span>} />
                  </div>
                  <Link to="/forget-password" className="forget-password">
                    Forget Password?
                  </Link>
                </div>
                <button type="submit" className="login-btn">
                  Login
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="image-section">
        <img src={main} alt="Background" className="background-image" />
      </div>
    </div>
  );
};

export default Login;
