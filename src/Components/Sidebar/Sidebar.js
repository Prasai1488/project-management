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
  const collapseicon = useSelector((state) => state.layout.collapseIcon);
  const username = useSelector((state) => state?.auth?.username);
  const capitalizedUserName = username?.charAt(0)?.toUpperCase() + username?.slice(1);
  const photo = useSelector((state) => state.auth.photo);
  const [open, setOpen] = useState();
  const [childMenuOpen, setChildMenuOpen] = useState();

  const handleOpenSubMenu = (key) => {
    if (open === key) {
      setOpen(undefined);
    } else {
      setOpen(key);
    }
  };

  const handleChildMenuOpen = (key) => {
    if (childMenuOpen === key) {
      setChildMenuOpen(undefined);
    } else {
      setChildMenuOpen(key);
    }
  };

  const handleMenuClick = () => {
    // Disable pointer events
    setDisablePointerEvents(true);
    // Enable pointer events after 750 milliseconds
    setTimeout(() => {
      setDisablePointerEvents(false);
    }, 750);
    // Your existing logic for handling menu click
    // ...userPermissions
  };
  const systemSelected = useSelector((state) => state.systemSelection.systemSelected);
  const dispatch = useDispatch();
  const permissionApi = useSelector((state) => state.auth.permissions);

  const menuItemStyles = {
    root: {
      fontSize: "14px",
      fontWeight: 400,
      transition: "all 0.25s ease-out",
    },
    icon: {
      margin: "0px",
    },

    SubMenuExpandIcon: {
      color: "#b6b7b9",
    },

    button: ({ level, active, disabled }) => {
      if (level === 0)
        return {
          padding: "0px 10px 0 0 ",
          "&:hover": {
            backgroundColor: "var(--blue-primary)",
            color: "white !important",
            borderRadius: "10px",
            transition: "all 0.25s ease-in",
          },
        };
      if (level === 1)
        return {
          color: "rgba(36, 34, 32, 0.86)",
          height: "max-content",
          "&:hover": {
            backgroundColor: "var(--blue-primary)",
            color: "white !important",
            marginLeft: collapsed ? "0px" : "20px",
            borderRadius: collapsed ? "5px" : "10px",
            transition: "all 0.25s ease-in",
          },
        };
      if (level === 2)
        return {
          color: "rgba(36, 34, 32, 0.56)",
          marginLeft: "10px",
          height: "50px",
          "&:hover": {
            backgroundColor: "var(--blue-primary)",
            color: "white !important",
            marginLeft: collapsed ? "0px" : "20px",
            borderRadius: collapsed ? "5px" : "10px",
            transition: "all 0.25s ease-in",
          },
        };
    },

    label: ({ open, level }) => {
      if (level === 0)
        return {
          padding: "15px",
        };
      if (level === 1)
        return {
          padding: collapsed ? "10px 5px" : " 10px 20px",
          "&:hover": {
            padding: collapsed ? "10px 0px" : "10px 0px",
          },
        };
    },
  };
  return (
    <>
      <div className="d-flex flex-column" style={{ position: "relative", height: "100vh" }}>
        <div className="sidebar-header d-flex justify-content-between align-items-center">
          {!collapsed && (
            <Link to="/">
              {collapsed ? null : (
                <div className="logo-container">
                  <img alt="logo" src={logo} />
                </div>
              )}
            </Link>
          )}
          {collapseicon && (
            <button
              type="button"
              className={"collapse-btn"}
              disabled={showModal}
              onClick={() => {
                dispatch(setCollapsed());
              }}
            >
              {collapsed ? <IoIosArrowDroprightCircle /> : <IoIosArrowDropleftCircle />}
            </button>
          )}
        </div>
        {!collapsed && (
          <Sidebar
            collapsedWidth="45px"
            className="sidebar h-100"
            collapsed={collapsed}
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
            <div className="d-flex flex-column h-100 justify-content-between ">
              <div>
                <div className={`sidebar-section-title ${collapsed ? "text-center" : "text-left"}`}>Main</div>
                <Menu menuItemStyles={menuItemStyles} onClick={handleMenuClick} transitionDuration={750}>
                  {products?.map((side, i) => {
                    const { menu, sub_menu, icon, link, permission } = side;
                    const showMenu = permission?.some((element) => permissionApi?.indexOf(element) !== -1);
                    return (
                      <div key={i}>
                        <>
                          {sub_menu || isSuperuser ? (
                            <>
                              {
                                <SubMenu
                                  onClick={() => handleOpenSubMenu("products")}
                                  open={open === "products"}
                                  key={i + 1}
                                  label={menu}
                                  icon={icon}
                                >
                                  {sub_menu.map((sub, j) => {
                                    const { link, name, permissions, child_menu, key } = sub;
                                    const showSubMenu = permissions?.some(
                                      (element) => permissionApi?.indexOf(element) !== -1
                                    );
                                    const productsPermission = showSubMenu || isSuperuser;
                                    return child_menu
                                      ? productsPermission && (
                                          <SubMenu
                                            onClick={() => handleChildMenuOpen(key)}
                                            open={childMenuOpen === key}
                                            label={name}
                                            key={j + 1}
                                          >
                                            {child_menu.map((child, k) => {
                                              const { link, name, permissions } = child;
                                              const showChildMenu = permissions?.some(
                                                (element) => permissionApi?.indexOf(element) !== -1
                                              );
                                              return showChildMenu || isSuperuser ? (
                                                <MenuItem
                                                  active={location?.pathname === link}
                                                  component={<Link to={link} />}
                                                  key={k}
                                                >
                                                  {name}
                                                </MenuItem>
                                              ) : null;
                                            })}
                                          </SubMenu>
                                        )
                                      : productsPermission && (
                                          <MenuItem
                                            active={location?.pathname === link}
                                            component={<Link to={link} />}
                                            key={j + 1}
                                          >
                                            {name}
                                          </MenuItem>
                                        );
                                  })}
                                </SubMenu>
                              }
                            </>
                          ) : showMenu || isSuperuser ? (
                            <MenuItem
                              active={location?.pathname === link}
                              component={<Link to={link} />}
                              key={menu}
                              icon={icon}
                            >
                              {menu}
                            </MenuItem>
                          ) : null}
                        </>
                      </div>
                    );
                  })}
                </Menu>

                <Menu menuItemStyles={menuItemStyles} onClick={handleMenuClick} transitionDuration={750}>
                  {orders?.map((side, i) => {
                    const { menu, sub_menu, icon, link, permission } = side;
                    const showMenu = permission?.some((element) => permissionApi?.indexOf(element) !== -1);
                    return (
                      <div key={i}>
                        <>
                          {sub_menu || isSuperuser ? (
                            <>
                              {
                                <SubMenu
                                  onClick={() => handleOpenSubMenu("orders")}
                                  open={open === "orders"}
                                  key={i + 1}
                                  label={menu}
                                  icon={icon}
                                >
                                  {sub_menu.map((sub, j) => {
                                    const { link, name, permissions, child_menu, key } = sub;
                                    const showSubMenu = permissions?.some(
                                      (element) => permissionApi?.indexOf(element) !== -1
                                    );
                                    const ordersPermission = showSubMenu || isSuperuser;
                                    return child_menu
                                      ? ordersPermission && (
                                          <SubMenu
                                            onClick={() => handleChildMenuOpen(key)}
                                            open={childMenuOpen === key}
                                            label={name}
                                            key={j + 1}
                                          >
                                            {child_menu.map((child, k) => {
                                              const { link, name, permissions } = child;
                                              const showChildMenu = permissions?.some(
                                                (element) => permissionApi?.indexOf(element) !== -1
                                              );
                                              return showChildMenu || isSuperuser ? (
                                                <MenuItem
                                                  active={location?.pathname === link}
                                                  component={<Link to={link} />}
                                                  key={k}
                                                >
                                                  {name}
                                                </MenuItem>
                                              ) : null;
                                            })}
                                          </SubMenu>
                                        )
                                      : ordersPermission && (
                                          <MenuItem
                                            active={location?.pathname === link}
                                            component={<Link to={link} />}
                                            key={j + 1}
                                          >
                                            {name}
                                          </MenuItem>
                                        );
                                  })}
                                </SubMenu>
                              }
                            </>
                          ) : showMenu || isSuperuser ? (
                            <MenuItem
                              active={location?.pathname === link}
                              component={<Link to={link} />}
                              key={menu}
                              icon={icon}
                            >
                              {menu}
                            </MenuItem>
                          ) : null}
                        </>
                      </div>
                    );
                  })}
                </Menu>
                 <Menu menuItemStyles={menuItemStyles} transitionDuration={750}>
                  {sidebarData?.map((side) => {
                    const { menu, sub_menu, icon, link, permissions, key } = side;
                    const showMenu = permissions?.some((element) => permissionApi?.indexOf(element) !== -1);

                    return sub_menu ? (
                      <SubMenu
                        key={menu}
                        label={menu}
                        icon={icon}
                        onClick={() => handleOpenSubMenu(key)}
                        open={open === key}
                      >
                        {sub_menu.map((sub) => {
                          const { link, name, permissions } = sub;
                          const showMenu = permissions?.some((element) => permissionApi?.indexOf(element) !== -1);
                          return showMenu || isSuperuser ? (
                            <MenuItem active={location?.pathname === link} component={<Link to={link} />} key={name}>
                              {name}
                            </MenuItem>
                          ) : null;
                        })}
                      </SubMenu>
                    ) : showMenu || isSuperuser ? (
                      <MenuItem
                        active={location?.pathname === link}
                        component={<Link to={link} />}
                        key={menu}
                        icon={icon}
                      >
                        {menu}
                      </MenuItem>
                    ) : null;
                  })}
                </Menu>
              </div>

              <div>
                <div className="password-logout-container">
                  <div
                    style={{
                      pointerEvents: disablePointerEvents ? "none" : "auto",
                    }}
                    active={location?.pathname === "/change-password"}
                    onClick={() => history.push("/change-password")}
                  >
                    <Button
                      btnType="submit"
                      className="passwordchange-button"
                      title={"Change Password"}
                      content={"Save"}
                    />
                  </div>
                  <div
                    style={{
                      pointerEvents: disablePointerEvents ? "none" : "auto",
                    }}
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
                    <Button btnType="submit" className="logout-button" title={"Logout"} content={"Save"} />
                  </div>
                </div>
              </div>
            </div>
          </Sidebar>
        )}
      </div>
    </>
  );
};

export default CrmSidebar;
