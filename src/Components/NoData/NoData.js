import React from "react";
import { FaInfoCircle } from "react-icons/fa";

const NoData = () => {
  return (
    <div className="text-center justify-content-center no-data py-2">
      <FaInfoCircle className="text-warning mb-2" style={{ fontSize: 28 }} />
      <h5 className="font-weight-normal mb-1">No data to Display</h5>
    </div>
  );
};

export default NoData;
