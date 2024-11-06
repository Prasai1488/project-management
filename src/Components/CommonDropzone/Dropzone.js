

import "./Dropzone.css";
import React from "react";
import { ErrorMessage } from "formik";
import { FaTrashAlt } from "react-icons/fa";
import TextError from "../TextError";
import imageIcon from "../../assets/Vector.png";
import { errorFunction } from "../Alert/Alert";

const Dropzone = ({ name, label, onChange, removePhoto, displayImage, isNotFormik, text, error, type }) => {
  const deleteButtonClass = displayImage ? "delete-button show" : "delete-button";

  const handleClick = () => {
    if (removePhoto) {
      removePhoto();
      const inputElement = document.getElementById(name);
      if (inputElement) inputElement.value = null; // Reset the file input
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const acceptedExtensions = ["jpeg", "jpg", "png"];

    if (file) {
      const extension = file.name.split(".").pop().toLowerCase();
      if (!acceptedExtensions.includes(extension)) {
        errorFunction(`Only jpeg, jpg, and png files are accepted.`);
        return;
      }
    }

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className="common-dropzone-wrapper">
      <label className="form-label">{label}</label>
      <br />
      <label
        className="custom-dropzone"
        htmlFor={name}
        onClick={() => {
          const inputElement = document.getElementById(name);
          if (inputElement) inputElement.value = null; // Clear the previous file selection
        }}
      >
        {displayImage ? (
          <img src={displayImage} alt="Selected preview" className="preview-image" />
        ) : (
          <img src={imageIcon} alt="image-logo" />
        )}
      </label>

      {type !== "lead" && (
        <div className={deleteButtonClass} onClick={handleClick}>
          <FaTrashAlt />
        </div>
      )}
      <input type="file" id={name} name={name} className="form-control" onChange={handleFileChange} />
      {!isNotFormik && <ErrorMessage name={name} component={TextError} />}
      {!error && <span>{text}</span>}
    </div>
  );
};

export default Dropzone;
