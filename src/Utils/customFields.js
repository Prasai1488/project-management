import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import AsyncSelect from "../Components/CommonAsyncSelectField/AsyncSelect";
import SelectField from "../Components/CommonSelectField/Select";
import TextField from "../Components/TextField/TextField";
import { useState } from "react";

const togglePassword = (type, setType) => {
  if (type === "password") {
    setType("text");
  } else {
    setType("password");
  }
};
export const renderTextField = (formik, colWidth, name, type, label, placeholder, required) => {
  return (
    <div className={`col-${colWidth}`} key={name}>
      <div className="my-1">
        <TextField
          type={type || "text"}
          name={name}
          label={label}
          required={required ? required : false}
          formikRequired={formik?.errors?.name && formik?.touched?.name}
          placeholder={placeholder}
          onChange={(e) => formik.setFieldValue(name, e.target.value)}
        />
      </div>
    </div>
  );
};

export const renderPasswordField = (formik, colWidth, name, label, required, type, setType) => {
  return (
    <div className={`col-${colWidth} password-field-inside`} key={name}>
      <div className="my-1">
        <TextField
          className={""}
          type={type}
          name={name}
          label={label}
          required={required ? required : false}
          formikRequired={formik?.errors?.name && formik?.touched?.name}
          placeholder={label}
          onChange={(e) => formik.setFieldValue(name, e.target.value)}
        />
      </div>
      <span className="fa-eye-button" onClick={() => togglePassword(type, setType)}>
        {type === "password" ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
      </span>
    </div>
  );
};
export const renderSelectField = (formik, colWidth, name, label, loadOptions, required, value) => (
  <div className={`col-${colWidth}`} key={name}>
    <div className="my-1">
      <SelectField
        label={label}
        name={name}
        value={value}
        required={required || false}
        formikrequired={formik?.errors?.name && formik?.touched?.name}
        getOptionLabel={(option) => `${option?.name}`}
        getOptionValue={(option) => `${option?.id}`}
        onChange={(selected) => {
          formik.setFieldValue(name, selected ? selected : null);
        }}
        options={loadOptions}
      />
    </div>
  </div>
);

export const renderAsyncSelectField = (formik, colWidth, name, label, loadOptions, required, isMulti) => (
  <div className={`col-${colWidth}`} key={name}>
    <div className="my-1">
      <AsyncSelect
        name={name}
        label={label}
        isMulti={isMulti || false}
        required={required || false}
        getOptionLabel={(option) => option?.name}
        getOptionValue={(option) => option._id}
        value={formik.values[name]}
        formikrequired={formik?.errors?.name && formik?.touched?.name}
        onChange={(select) => {
          formik.setFieldValue(name, select);
        }}
        loadOptions={loadOptions}
      />
    </div>
  </div>
);
