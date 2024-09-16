import React from "react";
import { MdOutlineAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { clearEditRole } from "../../Pages/Roles/Redux/roleSlice";
import { clearEditUser } from "../../Pages/User/Redux/userSlice";
import { excludeCreateBtn, hideButton } from "../../Utils/constants";

import { clearAllCountry } from "../../Pages/Country/Redux/countrySlice";
import { clearAllSalesDetail } from "../../Pages/SaleDetails/Redux/salesDetailsSlice";

const CommonCreateButton = ({ types, showModal, setShowModal, title, createPermission }) => {
  const organizations = useSelector((state) => state.organization.organizations);

  const dispatch = useDispatch();

  return (
    <div>
      {hideButton.includes(types) && organizations?.length > 0 ? null : (
        <div className="d-flex justify-content-end" style={{ minWidth: "200px" }} title={title}>
          {!excludeCreateBtn.includes(types) && createPermission && (
            <button
              className={showModal ? "create-btn d-none" : "create-btn"}
              onClick={() => {
                setShowModal(true);
                if (types === "user") {
                  dispatch(clearEditUser());
                } else if (types === "role") {
                  dispatch(clearEditRole());
                } else if (types === "country") {
                  dispatch(clearAllCountry());
                } else if (types === "Sales") {
                  dispatch(clearAllSalesDetail());
                }
              }}
              type="button"
            >
              <MdOutlineAdd size={36} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CommonCreateButton;
