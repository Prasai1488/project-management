import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaKey } from "react-icons/fa";

const NoPermissionsFound = ({ haveAnyPermission, isSuperuser }) => {
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (isSuperuser) {
      setRender(false);
    } else if (!isSuperuser) {
      if (haveAnyPermission?.some((permi) => permi === true)) {
        setRender(false);
      } else {
        setRender(true);
      }
    }
  }, [haveAnyPermission, isSuperuser]);
  return (
    <>
      {render && (
        <div className="text-center justify-content-center no-data py-2">
          <FaKey className="text-danger mb-2" style={{ fontSize: 28 }} />
          <h5 className="font-weight-normal mb-1">No Permissions Found</h5>
        </div>
      )}
    </>
  );
};

export default NoPermissionsFound;
