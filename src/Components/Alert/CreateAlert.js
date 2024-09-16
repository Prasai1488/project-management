import React, { useEffect, useRef } from "react";
import "./alert.css";
import { FaTimes } from "react-icons/fa";

const CreateAlert = ({ showAlert, setShowAlert, setSubmit }) => {
  const ref = useRef();

  const modalClass = showAlert ? "modal create-alert-modal display-block" : "modal create-alert-modal display-none";

  const handleNo = () => {
    setSubmit(false);
    setShowAlert(false);
  };

  const handleYes = () => {
    setSubmit(true);
    setShowAlert(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleNo();
      }
    };

    // Attach the event listener when the component mounts
    window.addEventListener("keydown", handleKeyDown);

    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className={modalClass}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className={`modal-dialog modal-dialog-centered modal-sm`}>
        <div className="modal-content">
          <div className="modal-body" ref={ref}>
            <button className="create-close-button" onClick={handleNo}>
              <FaTimes />
            </button>
            <h2>Are you sure ?</h2>
            <div className="d-flex justify-content-center align-items-center buttons">
              <button type="button" className="btn btn-sm yes-button" onClick={handleYes}>
                Yes
              </button>
              <button type="button" className="btn btn-sm no-button" onClick={handleNo}>
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAlert;
