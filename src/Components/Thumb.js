import React from "react";

const Thumb = ({ thumb }) => {
  console.log(thumb,"thumb");
  return <img src={thumb} alt={thumb} className="img-thumbnail" style={{ width: "100%", height: "100%" }} />;
};

export default Thumb;
