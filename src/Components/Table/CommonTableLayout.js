import React from "react";
import ColumnResize from "react-table-column-resizer";
import LodingListingSkeleton from "../Skeleton/LodingListingSkeleton";
import ListingSkeleton from "../Skeleton/ListingSkeleton";

export const TableData = ({ data }) => {
  return (
    <>
      <td className="column_resizer_body" />
      <td>{data ? data : "N/A"}</td>
    </>
  );
};

const CommonTableHeader = ({ headers }) => {
  return (
    <thead>
      <tr>
        {headers.map((header, i) => (
          <React.Fragment key={i}>
            <th>{header}</th>
            {headers.length - 1 !== i && <ColumnResize id={`column-${i + 1}`} className="columnResizer" />}
          </React.Fragment>
        ))}
      </tr>
    </thead>
  );
};

const CommonTableLayout = ({ children, listRef, TableHeaders, loadingNext, onscroll }) => {
  return (
    <div className="row">
      <div className="col-12 table-scrollable" ref={listRef} onScroll={onscroll}>
        <table className="listing-table">
          <CommonTableHeader headers={TableHeaders} />
          <tbody>{children}</tbody>
        </table>
        {loadingNext && (
          <div className="w-100 d-flex justify-content-center align-items-center py-4">
            <div className="spinner-border text-danger" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonTableLayout;
