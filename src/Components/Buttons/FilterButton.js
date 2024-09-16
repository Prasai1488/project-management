import React from "react";
import "./button.css";
const FilterButton = ({ onClick, btnType, className, disabled, filter }) => {
  return (
    <div className="filter-btn">
      <button
        onClick={onClick}
        type={btnType}
        className={`${className} ${filter ? " active-filter-btn" : ""}`}
        disabled={disabled}
      >
        Filter
      </button>
    </div>
  );
};

export default FilterButton;
