import React from "react";
import ColumnResize from "react-table-column-resizer";

const CommonTableHeader = ({ headers }) => {
  return (
    <thead>
      <tr>
        {headers.map((header, i) => (
          <th key={i}>
            {header}
            <ColumnResize id={i + 1} className="columnResizer" />
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default CommonTableHeader;
