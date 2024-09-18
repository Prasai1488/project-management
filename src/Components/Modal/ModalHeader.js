import "./Modal.css";
import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const ModalHeader = ({ header, dispatch, setShowModal, clearAction }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    // Attach the event listener when the component mounts
    window.addEventListener("keydown", handleKeyDown);

    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleClose = () => {
    if (clearAction) {
      dispatch(clearAction());
      setShowModal(false);
    } else {
      setShowModal(false);
    }
  };
  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title" id="myExtraLargeModalLabel">
          {header}
        </h5>
        <button
          onClick={handleClose}
          type="button"
          className="btn-close d-flex justify-content-center align-items-center"
          style={{ color: "#E62526" }}
        >
          <FaTimes />
        </button>
      </div>
    </>
  );
};

export default ModalHeader;
