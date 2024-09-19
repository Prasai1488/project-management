import "./Dropzone.css";
import React from "react";
import { ErrorMessage } from "formik";
import { FaTrashAlt } from "react-icons/fa";
import TextError from "../TextError";
import image from "../../assets/Vector.png";
import { errorFunction } from "../Alert/Alert";

const Dropzone = ({ name, label, onChange, removePhoto, displayImage, isNotFormik, text, error, type }) => {
  let deleteButtonClass = displayImage ? "delete-button show" : "delete-button";
  const handleClick = () => {
    removePhoto();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const acceptedExtensions = ["jpeg", "jpg", "png"];

    if (file) {
      const extension = file.name.split(".").pop().toLowerCase();
      if (!acceptedExtensions.includes(extension)) {
        errorFunction(`File extension of "jpeg", "jpg", "png" are only accepted`);
        return;
      }
    }

    onChange(event);
  };

  return (
    <div className="common-dropzone-wrapper">
      <label className="form-label m-0">{label}</label>
      <br />
      <label
        className="custom-dropzone"
        htmlFor={name}
        onClick={() => (document.getElementById(`${name}`).value = null)}
      >
        {displayImage !== "" ? (
          displayImage
        ) : (
          <>
            <img src={image} alt="image-logo" />
            {/* <p>Select {label}</p> */}
          </>
        )}
      </label>

      {type != "lead" && (
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
