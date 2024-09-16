import React from "react";
import { useState } from "react";
import CustomTableHead from "./CustomTableHead";

const CustomTableBody = ({
  tableList,
  initialVisibleColumns,
  columnsAlwaysDisplayed,
  columnMapping,
  onClick,
  onClickChildren,
  customColumns,
}) => {
  const keyList = tableList[0];
  const keys = keyList ? Object.keys(keyList) : [];
  const visibleKeys = keys.filter((key) => initialVisibleColumns.includes(key));
  const [visibleColumnKeys, setVisibleColumnKeys] = useState(
    initialVisibleColumns
  );
  return (
    <>
      <CustomTableHead
        columnMapping={columnMapping}
        columnsAlwaysDisplayed={columnsAlwaysDisplayed}
        visibleKeys={visibleKeys}
        initialVisibleColumns={initialVisibleColumns}
        visibleColumnKeys={visibleColumnKeys}
        setVisibleColumnKeys={setVisibleColumnKeys}
      />
      <table>
        <thead>
          <tr>
            <th>SN</th>
            {keys.map(
              (key, i) =>
                visibleColumnKeys.includes(key) && (
                  <th key={key}>{columnMapping[key]}</th>
                )
            )}
            {customColumns.map((column) => (
              <th key={column.key}>{column.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableList?.map((value, index) => (
            <tr key={index} onClick={onClick}>
              <td>{index + 1}</td>
              {keys.map(
                (key) =>
                  visibleColumnKeys.includes(key) && (
                    <td key={key}>{value[key]}</td>
                  )
              )}
              {customColumns.map((column) => (
                <td key={column.key} >
                  {column.data}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CustomTableBody;
