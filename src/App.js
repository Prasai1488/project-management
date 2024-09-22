import { useSelector } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-loading-skeleton/dist/skeleton.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-color-palette/css";
import PublicRoute from "./Routes/PublicRoute";
import PrivateRoute from "./Routes/PrivateRoute";

import "./App.css";
import { Toaster } from "sonner";
import { useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import Layout from "./Components/Layout";

const App = () => {
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const { isAuthenticated } = useSelector((state) => state?.auth);
  return (
    <div ref={parent} style={{ overflow: "hidden" }}>
      {isAuthenticated ? (
        <Layout>
          <PrivateRoute />
        </Layout>
      ) : (
        <PublicRoute />
      )}
      <Toaster
        position="top-right "
        duration={1500}
        invert
        richColors
        closeButton
        expand={true}
        pauseWhenPageIsHidden
        visibleToasts={5}
        toastOptions={{
          classNames: {
            closeButton: "toast-close-btn overflow-hidden",
          },
          className: "toast-sonner",
        }}
      />
    </div>
  );
};

export default App;
