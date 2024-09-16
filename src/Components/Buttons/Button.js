import React from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import "./button.css";

const Button = ({ btnType, className, disabled, title, onClick, createButton, loading }) => {
  return (
    <div className="button-container ">
      <button onClick={onClick} type={btnType} className={`${className}`} disabled={disabled}>
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            &nbsp;
            {title}
          </>
        ) : (
          <>
            {createButton && <BsPlusCircleFill />}
            {title}
          </>
        )}
      </button>
    </div>
  );
};

export default Button;
