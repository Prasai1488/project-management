import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "../TextError";
import "./loginTextField.css";
const LoginTextField = ({
  required,
  formikRequired,
  type,
  className,
  name,
  placeholder,
  label,
  isNotFormik,
  onChange,
  readOnly,
  disabled,
  autoFocus,
  onBlur,
  icon,
}) => {
  return (
    <div>
      <div className="common-textfield-wrapper mt-3">
        {label ? (
          <label htmlFor={label} className="form-label">
            {label}
            {required && <strong className="">*</strong>}
          </label>
        ) : null}
        <div className="border icon-input-container d-flex ">
          {icon && <div className="icon">{icon}</div>}
          <Field
            type={type}
            className={formikRequired ? "required-field form-control  " + className : "form-control  " + className}
            id={label}
            onChange={onChange}
            name={name}
            onBlur={onBlur}
            autoFocus={autoFocus}
            placeholder={placeholder}
            disabled={!disabled ? (disabled ? true : false) : false}
            readOnly={readOnly ? true : false}
          />
        </div>
        {name === "notes" && <i className="text-danger">*Note: Every note should be separated with period(.)</i>}
        {!isNotFormik && <ErrorMessage name={name} component={TextError} />}
      </div>
    </div>
  );
};
export default LoginTextField;
