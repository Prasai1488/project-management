import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";

function IconForCreatingModule({ setShowOtherModule, setData, types, permissions }) {
  return (
    <div
      style={{
        fontSize: 30,
        cursor: "pointer",
        // opacity: permissions ? 1 : 0.5,
      }}
    >
      <AiFillPlusCircle
        className="common-add-icon"
        onClick={() => {
          if (types === "user") {
            setData();
          }
          setShowOtherModule(true);
        }}
      />
    </div>
  );
}

export default IconForCreatingModule;
