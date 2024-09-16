import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../Redux/Auth/thunk";
import { errorFunction, successFunction } from "./Alert";
import getCookie from "../../Utils/Cookies/getCookie";
import "./alert.css";
const OrganizationSetupAlert = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    const token = getCookie("refreshToken");
    if (token) {
      dispatch(logout(token))
        .unwrap()
        .then(() => {
          successFunction("Logged out successfully.");
        })
        .catch((error) => {
          errorFunction("Failed to logout.");
        });
    }
  };
  return (
    <div className="container">
      <div className="alertContent" id="cookiesPopup">
        <p>As this is your first time, please create Organization Setup</p>

        <div className="alert">
          <div>
            <Link to="/organization-setup">
              <button className="accept">OK</button>
            </Link>
          </div>
          <div>
            <button className="reject" onClick={handleLogout}>
              LOGOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationSetupAlert;
