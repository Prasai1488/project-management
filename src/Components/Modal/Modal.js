import "./Modal.css";
import React, { useEffect, useRef, useState } from "react";
import ModalHeader from "./ModalHeader";
import { initializeUseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { closeModal, setCollapseIcon } from "../../Redux/Layout/layoutSlice";
import autoAnimate from "@formkit/auto-animate";
import { useDispatch } from "react-redux";

const Modal = ({
  children,
  showModal,
  setShowModal,
  header,
  types,
  size,
  id,
  edit,
  clearAction,
  draftAction,
  title,
  fullScreen,
  handlePrint,
  details,
  customSize,
  ...props
}) => {
  const dispatch = useDispatch();
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const modalClass = showModal
    ? fullScreen
      ? "modal display-block modal-fullscreen"
      : "modal display-block"
    : "modal display-none";
  const ref = useRef();

  const handleMouseDown = (e) => {
    if (!fullScreen) {
      setIsDragging(true);
      const rect = ref.current.getBoundingClientRect();
      setOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && ref.current) {
      e.preventDefault();
      const modal = ref.current;
      if (modal) { // Ensure modal is not null before accessing style
        modal.style.left = e.clientX - offset.x + "px";
        modal.style.top = e.clientY - offset.y + "px";
      }
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const closeOtherModal = () => {
    setShowModal(false);
  };

  // Inside your Modal component
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        // setShowModal ?
        closeOtherModal();
        //  : dispatch(closeModal());
      }
    };
    ref.current.addEventListener("keydown", close);

    // Attach mouse event listeners
    ref.current.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    // window.addEventListener("mouseup", handleMouseUp);
  }, [fullScreen, dispatch, setShowModal]);

  return (
    <>
      <div
        className={modalClass}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        id={id}
      >
        <div className={`modal-dialog modal-dialog-centered ${size ? size : ""}`} style={{ maxWidth: customSize }}>
          <div className="modal-content">
            <ModalHeader
              header={header}
              dispatch={dispatch}
              showModal={showModal}
              setShowModal={setShowModal}
              types={types}
              edit={edit}
              clearAction={clearAction}
              draftAction={draftAction}
              handlePrint={handlePrint}
              details={details}
              {...props}
            />
            <div className="modal-body" ref={ref}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;


