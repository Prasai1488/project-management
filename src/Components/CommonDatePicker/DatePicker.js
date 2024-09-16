import "./DatePicker.css";
import "react-datepicker/dist/react-datepicker.css";
import React, { lazy } from "react";
import { ErrorMessage } from "formik";
import TextError from "../TextError/TextError";
// import TextError from "../TextError/TextError";

const DatePicker = lazy(() => import("react-datepicker"));

const CommonDatePicker = ({
  name,
  label,
  required,
  onChange,
  selected,
  isNotFormik,
  className,
  disabled,
  minDate,
  maxDate,
  dateFormat,
  onBlur,
  onCalendarClose,
  readOnly,
  formikRequired,
  placeholder,
}) => {
  return (
    <div className="common-datepicker-wrapper">
      <label htmlFor={name} className="form-label">
        {label} {required && <strong className="text-danger">*</strong>}
      </label>
      <br />
      <DatePicker
        name={name}
        id={name}
        selected={selected}
        showMonthDropdown
        showYearDropdown
        minDate={minDate}
        maxDate={maxDate}
        dropdownMode="select"
        placeholderText={placeholder ? placeholder : "Select..."}
        dateFormat={dateFormat ? dateFormat : "yyyy-MM-dd"}
        className={formikRequired ? "required-field form-control  " : "form-control border "}
        onChange={onChange}
        disabled={disabled ? true : false}
        onBlur={onBlur ? onBlur : () => ""}
        onCalendarClose={onCalendarClose ? onCalendarClose : () => ""}
        tabIndex="0"
        readOnly={readOnly ? true : false}
      />
      {!isNotFormik && <ErrorMessage name={name} component={TextError} />}
    </div>
  );
};

export default CommonDatePicker;
