import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, permission, location, ...rest }) => {
  //   // props
  const permissions = useSelector((state) => state.auth.permissions);
  const isSuperuser = useSelector((state) => state.auth.isSuperuser);

  const hasPermission = isSuperuser || permission === "" || permissions.some((perm) => permission.includes(perm));

  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          hasPermission ? (
            <Component {...props} />
          ) : (
            <Redirect to={"/access-denied"} />
            // <Redirect to={{ pathname: "/", state: { from: location } }} />
          )
        }
      />
    </>
  );
};

export default React.memo(ProtectedRoute);
