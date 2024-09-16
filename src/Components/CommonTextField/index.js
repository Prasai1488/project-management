import React from "react";
import "./commonTextField.css";
import { ErrorMessage, Field } from "formik";
const CommonTextField = ({
  className,
  name,
  onChange,
  disabled,
  placeholder,
  label,
  required,
  type,
  formikRequired,
  readOnly,
  onBlur,
  autoFocus,
  isNotFormik,
  labelClassname,
  value,
}) => {
  return (
    <>
      <div className="common-textfield-wrapper">
        <label htmlFor={label} className={`form-label ${labelClassname}`}>
          {label} {required && <strong className="text-danger">*</strong>}
        </label>
        <Field
          type={type}
          className={
            formikRequired
              ? "required-field form-control " + className
              : "form-control " + className
          }
          id={label}
          value={value && value}
          onChange={onChange}
          name={name}
          onBlur={onBlur}
          autoFocus={autoFocus}
          placeholder={placeholder}
          disabled={!disabled ? (disabled ? true : false) : false}
          readOnly={readOnly ? true : false}
        />
        {name === "notes" && (
          <i className="text-danger">
            *Note: Every note should be separated with period(.)
          </i>
        )}

        {!isNotFormik && (
          <ErrorMessage className="error-message" name={name} component={"p"} />
        )}
      </div>
    </>
  );
};

export default CommonTextField;
