import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "../TextError";
import "./TextField.css";

const TextField = ({
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
  value,
}) => {
  console.log(readOnly);
  return (
    <div>
      <div className="common-textfield-wrapper">
        {label ? (
          <label htmlFor={label} className="form-label">
            {label}
            {required && <strong className="text-danger"></strong>}
          </label>
        ) : null}
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
        {name === "notes" && <i className="text-danger">*Note: Every note should be separated with period(.)</i>}
        {!isNotFormik && <ErrorMessage name={name} component={TextError} />}
      </div>
    </div>
  );
};

export default TextField;
