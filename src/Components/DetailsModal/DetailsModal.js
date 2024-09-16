import React, { useEffect } from "react";
import { useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import "./DetailsModal.css";

const DetailsModal = ({ children, showModal, setShowModal, clearAction, size, title }) => {

  const modalClass = showModal ? "modal details-modal display-block" : "modal details-modal display-none";
  const ref = useRef();
  const dispatch = useDispatch();
  const handleClose = () => {
    clearAction && dispatch(clearAction());
    setShowModal(false);
  };

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
  return (
    <>
      <div
        className={modalClass}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className={`modal-dialog modal-dialog-centered ${size ? size : ""} `}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="myExtraLargeModalLabel">
                {title}
              </h5>
              <button onClick={handleClose} type="button" className="btn-close" style={{ color: "#D93F21" }}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body" ref={ref}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsModal;
