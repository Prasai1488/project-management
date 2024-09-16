import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { BiLogOut } from "react-icons/bi";

import { errorFunction, successFunction } from "../../Components/Alert/Alert";

import getCookie from "../../Utils/Cookies/getCookie";
import { logout } from "../../Redux/Auth/thunk";
import { setSystemSelected } from "../../Redux/SystemSelection/systemSelectionSlice";

import loanSelect from "./../../assets/bankloan.jpg";
import logo from "../../assets/dege-logo.png";
import "./systemSelection.css";

// card component
const Card = ({ title, text, link, dispatch }) => (
  <NavLink className="card-nav" to={link}>
    <div
      onClick={() => {
        dispatch(setSystemSelected(title.toLowerCase()));
      }}
      className="card"
      style={{ width: "16.5rem", cursor: "pointer" }}
    >
      <img className="card-img-top" src={loanSelect} alt="Card cap" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
        {/* <Button className={"login-btn"} title={"Select"} /> */}
      </div>
    </div>
  </NavLink>
);

const SystemSelection = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const permissions = useSelector((state) => state.auth.permissions);
  const isSuperuser = useSelector((state) => state.auth.isSuperuser);

  // card details
  const systems = [
    {
      title: "Lead",
      text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
      link: "/leads",
      permissionsList: [
        "add_system_setup",
        "add_loan_lead",
        "update_loan_lead",
        "view_loan_lead",
        "view_loan_lead",
      ],
    },
    {
      title: "Loan",
      text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
      link: "/loan",
      permissionsList: [
        "add_system_setup",
        "add_loan_lead",
        "update_loan_lead",
        "view_loan_lead",
        "view_loan_lead",
      ],
    },
    {
      title: "Inspection",
      text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
      link: "/inspection",
      permissionsList: ["view_annex"],
    },
    {
      title: "Collection & Recovery",
      text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
      link: "/collection-and-recovery",
      permissionsList: ["view_annex"],
    },
    {
      title: "Customer 360°",
      text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
      link: "/customer-details",
      permissionsList: ["view_annex"],
    },
  ];

  return (
    <>
      <div className="system-selection">
        <div className="system-selecetion-nav">
          <div className="container h-100 d-flex justify-content-between">
            <div className="logo d-flex align-items-center">
              <img
                src={logo}
                style={{ objectFit: "contain", width: "145px" }}
                alt="logo"
              />
            </div>
            <div className="d-flex align-items-center">
              <button
                type="button"
                className="logout "
                onClick={() => {
                  const token = getCookie("refreshToken");
                  if (token) {
                    dispatch(logout(token))
                      .unwrap()
                      .then(() => {
                        successFunction("Logged out successfully.");
                        dispatch(setSystemSelected(""));

                        history.push("/");
                      })
                      .catch((error) => errorFunction("Failed to logout."));
                  }
                }}
              >
                <BiLogOut />
                <div>Logout</div>
              </button>
            </div>
          </div>
        </div>
        <div className="container system-selection-choose">
          {systems.map((system, index) => {
            const { permissionsList } = system;
            const showMenu = permissions?.some(
              (element) => permissionsList?.indexOf(element) !== -1
            );
            if (isSuperuser || showMenu) {
              return <Card key={index} {...system} dispatch={dispatch} />;
            }
            return;
          })}
        </div>
      </div>
    </>
  );
};

export default SystemSelection;
