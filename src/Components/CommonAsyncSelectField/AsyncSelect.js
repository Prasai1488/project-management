import "./AsyncSelect.css";
import React, { lazy } from "react";
import { ErrorMessage } from "formik";
import TextError from "../TextError";

const AsyncPaginate = lazy(() =>
  import("react-select-async-paginate").then((module) => ({
    default: module.AsyncPaginate,
  }))
);

// custom styles for react-select-async-paginate
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isDisabled ? "#edf1fb" : "#ffffff",
  }),
};

const AsyncSelect = ({
  parent,
  name,
  label,
  required,
  formikRequired,
  isNotFormik,
  value,
  onChange,
  loadOptions,
  className,
  getOptionLabel,
  getOptionValue,
  additional,
  autoFocus,
  disabled,
  isMulti,
  onBlur,
  onMenuOpen,
  cacheUniqs,
  shouldRender,
  placeholder,
  blurInput,
  readOnly,
}) => {
  return (
    <div className="common-async-select-wrapper">
      {label ? (
        <label htmlFor={name} className="form-label" style={{ fontSize: "12px" }}>
          {label} {required && <strong className="text-danger"></strong>}
        </label>
      ) : (
        ""
      )}

      <AsyncPaginate
        blurInputOnSelect={blurInput}
        key={parent ? parent : ""}
        value={value}
        placeholder={placeholder ? placeholder : ""}
        styles={customStyles}
        isClearable="true"
        isSearchable="true"
        name={name}
        isDisabled={disabled}
        isMulti={isMulti}
        className={
          formikRequired
            ? "required-field async-select-field   " + className
            : "async-select-field  border " + className
        }
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        onChange={onChange}
        loadOptions={loadOptions}
        additional={additional}
        autoFocus={autoFocus}
        onBlur={onBlur}
        onMenuOpen={onMenuOpen}
        cacheUniqs={cacheUniqs}
        shouldRender={shouldRender}
      />
      {!isNotFormik && <ErrorMessage name={name} component={TextError} />}
    </div>
  );
};

export default AsyncSelect;
