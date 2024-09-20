import React, { lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Suspense } from "react";

const Login = lazy(() => import("../Pages/Login"));
const ForgetPassword = lazy(() => import("../Pages/ForgetPassword"));
const ResetPassword = lazy(() => import("../Pages/ForgetPassword/ResetPassword"));
const OtpPage = lazy(() => import("../Pages/ForgetPassword/OtpPage"));

const PublicRoute = () => {
  return (
    <>
      <Suspense fallback={""}>
        <Switch>
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="/forget-password" component={ForgetPassword} />
          <Route exact path="/" component={Login} />
        <Route exact path = "/otp-page" component={OtpPage}/>
          <Redirect from="*" to="/" />
        </Switch>
      </Suspense>
    </>
  );
};

export default PublicRoute;
