import React, { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useSelector } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import PageNotFound from "../Components/PageNotFound";
import Products from "../Pages/Products/Pages";
import ContactPersons from "../Pages/ContactPerson/Page";
import Issues from "../Pages/Issue/Page";
import Items from "../Pages/Item/Page";
import Permissions from "../Pages/Permission/Page";
import PermissionCategorys from "../Pages/PermissionCategory/Page";
import Questionnaires from "../Pages/Questionnaire/Page";
import Sectors from "../Pages/Sector/Pages";
import Tickets from "../Pages/Tickets/Pages/";
import ProtectedRoute from "./ProtectedRoute";
import Clients from "../Pages/Client/Page";
import Customers from "../Pages/Customer/Page";
import Manufacturers from "../Pages/Manufacturer/Page";
import Units from "../Pages/Unit/Page";
import Sales from "../Pages/Sales/Pages";
import Orders from "../Pages/Orders/Pages";
const lazyWithReload = (componentImport) =>
  lazy(async () => {
    const pageHasAlreadyBeenForceRefreshed = JSON.parse(
      window.localStorage.getItem("page-has-been-force-refreshed") || "false"
    );
    try {
      const component = await componentImport();
      window.localStorage.setItem("page-has-been-force-refreshed", "false");
      return component;
    } catch (error) {
      if (!pageHasAlreadyBeenForceRefreshed) {
        // Assuming that the user is not on the latest version of the application.
        // Let's refresh the page immediately.
        window.localStorage.setItem("page-has-been-force-refreshed", "true");
        return window.location.reload();
      }
      // The page has already been reloaded
      // Assuming that user is already using the latest version of the application.
      throw error;
    }
  });

const OrganizationSetupAlert = lazyWithReload(() => import("../Components/Alert/OrganizationSetupAlert"));

// core app
const FiscalSessionAD = lazyWithReload(() => import("../Pages/FiscalSessionAD/Page"));
const FiscalSessionBS = lazyWithReload(() => import("../Pages/FiscalSessionBS/Page"));
const Country = lazyWithReload(() => import("../Pages/Country/Page"));
const Organization = lazyWithReload(() => import("../Pages/Organization/Page"));
const Dashboard = lazyWithReload(() => import("../Pages/Dashboard/Pages"));
const CoreSetupTabs = lazy(() => import("../Components/Tab/CoreSetupTab"));

// Routes
const UserListing = lazyWithReload(() => import("../Pages/User/Page"));
const RoleListing = lazyWithReload(() => import("../Pages/Roles/Page"));
const ChangePassword = lazyWithReload(() => import("../Pages/User/ResetPassword/ChangePassword"));

// const Members = lazyWithReload(() => import("../Pages/Members/Pages"));
const OfficeActivities = lazyWithReload(() => import("../Pages/OfficeActivities/Pages"));
const OtherActivities = lazyWithReload(() => import("../Pages/OtherActivities/Pages"));

const PrivateRoute = () => {
  const { isSetupDone } = useSelector((state) => state.auth);

  const ErrorFallback = ({ error }) => {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{ color: "red" }}>{error.message}</pre>
      </div>
    );
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={""}>
        {isSetupDone ? (
          <Switch>
            {/* <ProtectedRoute exact path="/" component={Dashboard} permission={""} /> */}
            <ProtectedRoute exact path="/change-password" component={ChangePassword} permission={""} />

            {/* <ProtectedRoute exact path="/core-setup" component={CoreSetupTabs} permission={permission?.coreSetup} />
            <ProtectedRoute exact path="/user-setup" component={UserTabs} permission={permission?.userSetup} />*/}
            <ProtectedRoute exact path="/change-password" component={ChangePassword} permission={""} />

            {/* system setup */}
            {/* <ProtectedRoute path="/fiscalSessionBS" component={FiscalSessionBS} permission={""} />
            <ProtectedRoute path="/fiscalSessionAD" component={FiscalSessionAD} permission={""} /> */}

            {/* <ProtectedRoute path="/country" component={Country} permission={""} /> */}
            <ProtectedRoute path="/organization-setup" component={Organization} permission={""} />
            <ProtectedRoute path="/permissions" component={Permissions} permission={""} />
            <ProtectedRoute path="/permission-categories" component={PermissionCategorys} permission={""} />

            <ProtectedRoute path="/manufacturer" component={Manufacturers} permission={""} />
            {/* user setup */}
            <ProtectedRoute exact path="/user" component={UserListing} permission={""} />
            <ProtectedRoute exact path="/roles" component={RoleListing} permission={""} />

            {/* <ProtectedRoute exact path="/tickets" component={Issues} permission={""} /> */}

            <ProtectedRoute exact path="/product" component={Products} permission={""} />
            <ProtectedRoute exact path="/ticket" component={Tickets} permission={""} />
            <ProtectedRoute exact path="/sales" component={Sales} permission={""} />
            <ProtectedRoute exact path="/items" component={Items} permission={""} />
            <ProtectedRoute exact path="/questionnaire" component={Questionnaires} permission={""} />
            <ProtectedRoute exact path="/issues" component={Issues} permission={""} />
            <ProtectedRoute exact path="/contact-persons" component={ContactPersons} permission={""} />
            <ProtectedRoute exact path="/client" component={Clients} permission={""} />
            <ProtectedRoute exact path="/customer" component={Customers} permission={""} />
            <ProtectedRoute exact path="/unit" component={Units} permission={""} />
            <ProtectedRoute exact path="/orders" component={Orders} permission={""} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        ) : (
          // <OrganizationSetupAlert />
          <Switch>
            <ProtectedRoute path="/organization-setup" component={Organization} permission={""} />
            <Route path="*" component={OrganizationSetupAlert} />
          </Switch>
        )}
      </Suspense>
    </ErrorBoundary>
  );
};

export default withRouter(PrivateRoute);
