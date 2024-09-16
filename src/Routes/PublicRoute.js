import React, { lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Suspense } from "react";

const Login = lazy(() => import("../Pages/Login"));
const ForgetPassword = lazy(() => import("../Pages/ForgetPassword"));
const ResetPassword = lazy(() =>
  import("../Pages/ForgetPassword/ResetPassword")
);

const PublicRoute = () => {
  return (
    <>
      <Suspense fallback={""}>
        <Switch>
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="/forget-password" component={ForgetPassword} />
          <Route exact path="/" component={Login} />
          <Redirect from="*" to="/" />
        </Switch>
      </Suspense>
    </>
  );
};

export default PublicRoute;
