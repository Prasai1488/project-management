import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "./layout.css";
import SidebarData from "../Sidebar/Sidebar";
import SystemSelection from "../../Pages/SystemSelection";
import autoAnimate from "@formkit/auto-animate";

const Layout = ({ children }) => {
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);
  const collapsed = useSelector((state) => state.layout.collapsed);
  const systemSelected = useSelector((state) => state.systemSelection.systemSelected);
  return (
    <>
      <div id="layout-wrapper" className="d-flex">
        <SidebarData />
        <div className={`${collapsed ? "main-content collapsed" : "main-content"}`}>
          <div className="page-content">
            <div className="container-fluid p-0" ref={parent}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
