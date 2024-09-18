import { ErrorMessage } from "formik";
import React, { lazy } from "react";
import TextError from "../TextError";
import "./select.css";
const Select = lazy(() => import("react-select"));

// custom styles for react-select
const customStyles = (numSelected) => ({
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isDisabled ? "#edf1fb" : "#ffffff",
    maxHeight: "60px",
    overflowY: numSelected > 1 ? "scroll" : "hidden", // Enable vertical scrolling conditionally
  }),
});

const SelectField = ({
  label,
  required,
  formikRequired,
  value,
  name,
  className,
  options,
  onChange,
  autoFocus,
  isNotFormik,
  isDisabled,
  getOptionLabel,
  getOptionValue,
  placeholder,
  isMulti,
  onBlur,
}) => {
  const isScrollable = value && value.length > 2;

  return (
    <div className="select-field-wrapper">
      <label htmlFor={label} className="form-label">
        {label} {required && <strong className="text-danger"></strong>}
      </label>
      <Select
        value={value}
        styles={customStyles(value?.length)}
        isClearable="true"
        isSearchable="true"
        placeholder={placeholder ? placeholder : ""}
        isMulti={isMulti}
        name={name}
        className={formikRequired ? "required-field  select-field  " + className : "select-field  " + className}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        options={options}
        onChange={onChange}
        autoFocus={autoFocus}
        isDisabled={isDisabled ? true : false}
        onBlur={onBlur}
      />
      {!isNotFormik && <ErrorMessage name={name} component={TextError} />}
    </div>
  );
};

export default SelectField;
