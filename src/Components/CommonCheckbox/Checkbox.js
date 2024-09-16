import "./Checkbox.css";
import React from "react";
import { Field } from "formik";

const Checkbox = ({ name, label, edit }) => {
  return (
    <div className="common-checkbox-container">
      <Field
        type="checkbox"
        name={name}
        id={name}
        className="common-checkbox"
        disabled={(name === "serializable" || name === "asset" || name === "weighable") && edit ? true : false}
      />
      <label htmlFor={name} className="mx-1">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
