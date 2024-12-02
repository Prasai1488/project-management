

import { useState } from "react";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { logout } from "../../Redux/Auth/thunk";
import { setCollapsed } from "../../Redux/Layout/layoutSlice";
import { setSystemSelected } from "../../Redux/SystemSelection/systemSelectionSlice";
import getCookie from "../../Utils/Cookies/getCookie";
import logo from "../../assets/logo.png";
import soori from "../../assets/soori-logo.png"
import { errorFunction, successFunction } from "../Alert/Alert";
import { products, sidebarData, orders } from "./SidebarData";
import "./sidebar.css";
import Button from "../Buttons/Button";

const CrmSidebar = () => {
  const history = useHistory();
  const location = useLocation();
  const isSuperuser = useSelector((state) => state.auth.isSuperuser);
  const { collapsed, showModal } = useSelector((state) => state.layout);
  const [toggled, setToggled] = useState(false);
  const [disablePointerEvents, setDisablePointerEvents] = useState(false);
  const collapseIcon = useSelector((state) => state.layout.collapseIcon);
  const username = useSelector((state) => state?.auth?.username);
  const capitalizedUserName = username?.charAt(0)?.toUpperCase() + username?.slice(1);
  const photo = useSelector((state) => state.auth.photo);
  const [openMenu, setOpenMenu] = useState(null);
  const [openChildMenu, setOpenChildMenu] = useState(null);

  const systemSelected = useSelector((state) => state.systemSelection.systemSelected);
  const permissionApi = useSelector((state) => state.auth.permissions);
  const dispatch = useDispatch();

  const handleOpenSubMenu = (key) => {
    setOpenMenu(openMenu === key ? null : key);
  };

  // const handleChildMenuOpen = (key) => {
  //   setOpenChildMenu(openChildMenu === key ? null : key);
  // };

  const handleMenuClick = () => {
    setDisablePointerEvents(true);
    setTimeout(() => setDisablePointerEvents(false), 750);
  };

  const menuItemStyles = {
    root: { fontSize: "14px", fontWeight: 400, transition: "all 0.25s ease-out" },
    icon: { margin: "0px" },
    SubMenuExpandIcon: { color: "#b6b7b9" },
    button: ({ level }) => {
      const baseStyle = {
        "&:hover": {
          backgroundColor: "var(--blue-primary)",
          color: "white !important",
          transition: "all 0.25s ease-in",
        },
      };
      switch (level) {
        case 0:
          return { ...baseStyle, padding: "0px 10px 0 0" };
        case 1:
          return {
            ...baseStyle,
            color: "rgba(36, 34, 32, 0.86)",
            height: "max-content",
            marginLeft: collapsed ? "0px" : "20px",
          };
        case 2:
          return {
            ...baseStyle,
            color: "rgba(36, 34, 32, 0.56)",
            marginLeft: "10px",
            height: "50px",
          };
        default:
          return {};
      }
    },
    label: ({ level }) => {
      if (level === 0) return { padding: "15px" };
      if (level === 1) return { padding: collapsed ? "10px 5px" : "10px 20px" };
    },
  };

  const renderMenuItems = (items, parentKey) => {
    return items.map((item, index) => {
      const { menu, sub_menu, icon, link } = item;
      const currentKey = parentKey + "_" + index;
      const isSubMenuOpen = openMenu === currentKey;

      return Array.isArray(sub_menu) && sub_menu.length > 0 ? (
        <SubMenu
          key={currentKey}
          label={menu}
          icon={icon}
          open={isSubMenuOpen}
          onClick={() => handleOpenSubMenu(currentKey)}
        >
          {sub_menu.map((subItem, subIndex) => (
            <MenuItem
              key={`${currentKey}_${subIndex}`}
              active={location.pathname === subItem.link}
              component={<Link to={subItem.link} />}
            >
              {subItem.name}
            </MenuItem>
          ))}
        </SubMenu>
      ) : (
        <MenuItem key={currentKey} active={location.pathname === link} component={<Link to={link} />} icon={icon}>
          {menu}
        </MenuItem>
      );
    });
  };

  const handleLogout = () => {
    const token = getCookie("refreshToken");
    if (token) {
      dispatch(logout(token))
        .unwrap()
        .then(() => {
          successFunction("Logged out successfully.");
          dispatch(setSystemSelected(""));
          history.push("/");
        })
        .catch(() => errorFunction("Failed to logout."));
    }
  };

  return (
    <div className="d-flex flex-column" style={{ height: "100vh" }}>
      <div className="sidebar-header d-flex justify-content-between align-items-center">
        {!collapsed && (
          <Link to="/">
            <div className="logo-container">
              <img alt="logo" src={soori} />
            </div>
          </Link>
        )}
        {collapseIcon && (
          <button type="button" className="collapse-btn" disabled={showModal} onClick={() => dispatch(setCollapsed())}>
            {collapsed ? <IoIosArrowDroprightCircle /> : <IoIosArrowDropleftCircle />}
          </button>
        )}
      </div>
      {!collapsed && (
        <Sidebar
          className="sidebar h-100"
          collapsedWidth="45px"
          toggled={toggled}
          breakPoint="md"
          transitionDuration={250}
          rootStyles={{
            overflow: "auto",
            padding: "10px",
            backgroundColor: "white",
            [`.ps-sidebar-container`]: {
              backgroundColor: "white",
            },
          }}
        >
          <div className="d-flex flex-column h-100 justify-content-between">
            <Menu menuItemStyles={menuItemStyles} onClick={handleMenuClick} transitionDuration={750}>
             
              {renderMenuItems(sidebarData, "additional")}
            </Menu>
            <div className="container-logout">
              <div
                className="password-logout-container"
                style={{ pointerEvents: disablePointerEvents ? "none" : "auto" }}
                onClick={() => history.push("/change-password")}
              >
                <Button
                  btnType="submit"
                  className="passwordchange-button d-flex justify-content-center align-items-center ml-0"
                  title="Change Password"
                />
              </div>
              <div style={{ pointerEvents: disablePointerEvents ? "none" : "auto" }} onClick={handleLogout}>
                <Button btnType="submit" className="logout-button" title="Logout" />
              </div>
            </div>
          </div>
        </Sidebar>
      )}
    </div>
  );
};

export default CrmSidebar;
