import React from "react";
import detailEyeIcon from "../../assets/detail-eye.svg";
import { FiEdit } from "react-icons/fi";
import "./iconStyles.css";
import { MdDelete, MdHistory, MdEllipsisH } from "react-icons/md";

const DetailActionButton = ({ onClick, type }) => {
  return (
    <button type="button" className="detail-action-button" onClick={onClick}>
      {type === "view" && <img src={detailEyeIcon} />}
      {type === "edit" && <FiEdit className="edit-icon" size={24} />}
      {type === "history" && <MdHistory className="edit-icon" />}
      {type === "delete" && <MdDelete className="delete-icon" />}
    </button>
  );
};

export default DetailActionButton;
