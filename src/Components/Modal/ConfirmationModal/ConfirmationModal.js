import "../../Modal/Modal.css";
import React from "react";
import ModalHeader from "../ModalHeader";
import "./ConfirmationModal.css";
const ConfirmationModal = ({
  showModal,
  size,
  id,
  header,
  setShowModal,
  types,
  edit,
  clearAction,
  draftAction,
  details,
  handlePrint,
  ref,
  children,
  yesClick,
  ...props
}) => {
  const modalClass = showModal ? "modal display-block" : "modal display-none";
  return (
    <div
      className={modalClass}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
      id={id}
    >
      <div className={`modal-dialog modal-dialog-centered ${size ? size : ""}`}>
        <div className="modal-content">
          <ModalHeader
            header={header}
            setShowModal={setShowModal}
            types={types}
            edit={edit}
            clearAction={clearAction}
            details={details}
            {...props}
          />
          <div
            className="modal-body text-center d-flex justify-content-center align-items-center flex-column p-2 "
            ref={ref}
          >
            {children}
            <div
              className="confirm-btns d-flex justify-content-center pt-3"
              style={{ gap: "10px" }}
            >
              <button
                className="btn btn-success confirmClick"
                onClick={() => {
                  yesClick();
                }}
              >
                Yes
              </button>
              <button
                className="btn btn-danger cancelClick"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
