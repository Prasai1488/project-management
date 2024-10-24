import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { MdLockOutline, MdMailOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { errorFunction, successFunction } from "../../Components/Alert/Alert";
import LoginTextField from "../../Components/TextField/LoginTextField";
import Checkbox from "../../Components/CommonCheckbox/Checkbox";
import { login, checkSetup } from "../../Redux/Auth/thunk";
import "./login.css";
import main from "../../assets/main.png";
import mlogo from "../../assets/mlogo.png";

const Login = () => {
  const [type, setType] = useState("password");

  const remember = localStorage.getItem("rememberMe") === "true";
  const email = localStorage.getItem("email") || "";
  const dispatch = useDispatch();

  const initialValues = {
    email,
    password: "",
    rememberMe: remember,
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Required!").email("Invalid email format."),
    password: Yup.string().required("Required!").min(4, "Password should be at least 4 characters."),
    rememberMe: Yup.bool(),
  });

  const onSubmit = (values) => {
    const { rememberMe, email, password } = values;
    localStorage.setItem("rememberMe", rememberMe);
    localStorage.setItem("email", rememberMe ? email : "");
    const credentials = { email, password };
    dispatch(login(credentials))
      .unwrap()
      .then(() => {
        successFunction("Logged in successfully.");
      })
      .catch(() => {
        errorFunction("Failed to log in.");
      });
  };

  const togglePassword = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  const iconStyle = { color: "red" };

  return (
    <div className="login-wrapper">
      <img src={mlogo} alt="logo" className="main-logo" />
      <div className="login-section">
        <div className="login-container">
          <h2>Login</h2>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ handleChange, values, touched, errors }) => (
              <Form className="login-form">
                <LoginTextField
                  type="text"
                  name="email"
                  placeholder="E-mail ID"
                  icon={<MdMailOutline size={25} style={iconStyle} />}
                  value={values.email}
                  onChange={handleChange}
                  formikRequired={touched.email && errors.email}
                />
                <div className="password-field">
                  <LoginTextField
                    type={type}
                    name="password"
                    placeholder="Password"
                    icon={<MdLockOutline size={25} style={iconStyle} />}
                    value={values.password}
                    onChange={handleChange}
                    formikRequired={touched.password && errors.password}
                  />
                  <span className="mt-2 toggle-password" onClick={togglePassword}>
                    {type === "password" ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                  </span>
                </div>
                <div className="form-options">

                  <div className="d-flex justify-content-start align-items-center text-md-start">
                    <Checkbox name="rememberMe" label={<span className="fs-4">Remember me</span>} />

                  <div className="remember-me">
                    <Checkbox name="rememberMe" label={<span>Remember me</span>} />

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
