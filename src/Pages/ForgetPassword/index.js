import React from "react";
import "../Login/login.css";
import { useHistory, Link } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { MdMailOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../Redux/Auth/thunk";
import { errorFunction } from "../../Components/Alert/Alert";
import LoginTextField from "../../Components/TextField/LoginTextField";

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
      .then((data) => {
        history.push("/reset-password");
      })
      .catch((error) => {
        errorFunction("There is no active user associated with this e-mail address. Password cannot be changed");
      });
  };

  return (
    <div className="login-wrapper">
      <div className="image-wrapper">
        <div className="image-text">
          <p>RANGERWHOLESALE</p>
          <a href="https://soorisolutions.com.np/" target="_blank" className="know-more">
            Know More&nbsp;&rarr;
          </a>
        </div>
        <div className="eclipe1"></div>
        <div className="eclipe2"></div>
      </div>
      <div className="content-wrapper">
        <div className="login-container">
          <h1>Forget your password ?</h1>
          <p className="welcome-text-small">Reset your password through email.</p>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form className="w-100">
                  <LoginTextField
                    type="email"
                    name="email"
                    placeholder="Email"
                    icon={<MdMailOutline size={25} color="3333" style={{ opacity: "0.3" }} />}
                    required
                    value={formik.values.email}
                    formikRequired={formik?.errors?.email && formik?.touched?.email}
                    onChange={(e) => {
                      formik.setFieldValue("email", e.target.value);
                    }}
                  />

                  <button className="btn w-100 login-btn mt-3" type="submit">
                    Reset
                  </button>
                  <div className="text-center">
                    <Link to="/">Back To Login</Link>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
        <div className="developer-content text-center ">
          <p>Developed and Maintained By Soori Solutions</p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
