import React from "react";

const TextError = (props) => {
  return (
    <p
      style={{
        color: "#bf202f",
        fontSize: "0.8rem",
        padding: 0,
        margin: "0px 0px",
      }}
    >
      {props.children}
    </p>

  );
};

export default TextError;
