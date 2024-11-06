import React from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import "./button.css";
import { IoMdAdd } from "react-icons/io";

const Button = ({ btnType, className, disabled, title, onClick, createButton, loading, style }) => {
  return (
    <div className="button-container ">
      <button onClick={onClick} type={btnType} className={`${className}`} disabled={disabled} style={style}>
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            &nbsp;
            {title}
          </>
        ) : (
          <>
            {createButton && <IoMdAdd />}
            {title}
          </>
        )}
      </button>
    </div>
  );
};

export default Button;
