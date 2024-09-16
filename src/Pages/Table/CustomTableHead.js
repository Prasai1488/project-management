import React from "react";
import { useState } from "react";

const CustomTableHead = ({
  visibleKeys,
  columnsAlwaysDisplayed,
  columnMapping,
  initialVisibleColumns,
  visibleColumnKeys,
  setVisibleColumnKeys
}) => {

  const toggleColumnVisibility = (key) => {
    if (columnsAlwaysDisplayed.includes(key)) {
      return;
    }
    if (visibleColumnKeys.includes(key)) {
      // If the column key is visible, hide it
      setVisibleColumnKeys(
        visibleColumnKeys.filter((colKey) => colKey !== key)
      );
    } else {
      // If the column key is hidden, make it visible
      setVisibleColumnKeys([...visibleColumnKeys, key]);
    }
  };
  return (
    <>
      <div className="column-selector">
        <p>Columns Shown:</p>
        <ul>
          {visibleKeys.map(
            (key) =>
              !columnsAlwaysDisplayed.includes(key) && (
                <div key={key}>
                  <li>
                    {columnMapping[key]}
                    <input
                      type="checkbox"
                      checked={visibleColumnKeys.includes(key)}
                      onChange={() => toggleColumnVisibility(key)}
                    />
                  </li>
                </div>
              )
          )}
        </ul>
      </div>
    </>
  );
};

export default CustomTableHead;
