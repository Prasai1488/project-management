import React, { useState, lazy, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userPermission } from "../../Utils/tabPermissions";
import { setUserTabValue } from "../../Redux/TabsValue/tabsValueSlice";
import NoPermissionsFound from "../NoData/NoPermissionsFound";
import "./pageTabs.css";

const UserListing = lazy(() => import("../../Pages/User/Page"));
const UserGroupListing = lazy(() => import("../../Pages/UserGroup/Page"));

const CoreSetupTabs = () => {
  let haveAnyPermission = [];
  const dispatch = useDispatch();
  const permissions = useSelector((state) => state.auth.permissions);
  const isSuperuser = useSelector((state) => state.auth.isSuperuser);
  const userTabValue = useSelector((state) => state.tabsValue.userTabValue);
  function TabPanel(props) {
    const { children, value, index, tab, ...other } = props;
    return (
      <div className="tab-pane show active" id={tab} role="tabpanel" aria-labelledby={`${tab}-tab`} {...other}>
        {value === index && <>{children}</>}
      </div>
    );
  }

  const returnChildren = (ordering) => {
    if (ordering === 0) {
      return <UserListing />;
    } else {
      return <UserGroupListing />;
    }
  };

  return (
    <div className="header-section-tab-wrapper">
      <div className="row d-flex justify-content-center">
        <ul className="nav nav-tabs" id="saleTab" role="tablist">
          {userPermission?.map((side, i) => {
            const { permissionList, tabName, keyWord, ordering } = side;
            haveAnyPermission.push(permissions?.some((element) => permissionList?.indexOf(element) !== -1));
            const showMenu = permissions?.some((element) => permissionList?.indexOf(element) !== -1);
            if (isSuperuser || showMenu) {
              return (
                <React.Fragment key={i + 1}>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${userTabValue === ordering ? "active" : ""}`}
                      id={`${keyWord}-tab`}
                      onClick={(e) => {
                        dispatch(setUserTabValue(ordering));
                      }}
                      data-toggle="tab"
                      data-target={`#${keyWord}`}
                      type="button"
                      role="tab"
                      aria-controls={`${keyWord}`}
                      aria-selected="true"
                    >
                      {tabName}
                    </button>
                  </li>
                </React.Fragment>
              );
            }
          })}
        </ul>
      </div>
      <div className="tab-content" id="saleTabContent">
        {userPermission?.map((side, i) => {
          const { permissionList, keyWord, ordering } = side;

          const showMenu = permissions?.some((element) => permissionList?.indexOf(element) !== -1);
          if (isSuperuser || showMenu) {
            return (
              <React.Fragment key={i + 1}>
                <TabPanel value={userTabValue} index={ordering} tab={keyWord}>
                  {returnChildren(ordering)}
                </TabPanel>
              </React.Fragment>
            );
          }
        })}
      </div>
      <NoPermissionsFound haveAnyPermission={haveAnyPermission} isSuperuser={isSuperuser} />
    </div>
  );
};

export default CoreSetupTabs;
