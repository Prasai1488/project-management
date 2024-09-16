import React, { useRef } from "react";
import ColumnResize from "react-table-column-resizer";
import { useDispatch, useSelector } from "react-redux";
import Status from "../../../Components/Status";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";

const FiscalSessionAD = ({ dispatch, setPostsPerPage }) => {
  const listRef = useRef(null);

  const next = useSelector((state) => state.ad.next);
  const fiscalSessionsAD = useSelector((state) => state.ad.fiscalSessionsAD);

  const scrollToEnd = () => {
    setPostsPerPage((prev) => prev + 20);
  };

  const handleScroll = (event) => {
    if (event.currentTarget.scrollTop + event.currentTarget.offsetHeight === event.currentTarget.scrollHeight) {
      if (next) {
        scrollToEnd();
      }
    }
  };

  return (
    <div className="row">
      <div className="col-12 table-scrollable" onScroll={handleScroll} ref={listRef}>
        <table className="listing-table">
          <thead>
            <tr>
              <th>SN</th>
              <ColumnResize id={1} className="columnResizer" />
              <th>Session Full</th>
              <ColumnResize id={2} className="columnResizer" minWidth={120} />
              <th>Short Form</th>
              <ColumnResize id={3} className="columnResizer" minWidth={120} />
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {fiscalSessionsAD?.map((fiscalSessionAd, i) => {
              const { id, sessionFull, sessionShort, active } = fiscalSessionAd;

              return (
                <tr key={id} style={{ cursor: "pointer" }}>
                  <td>{i + 1}</td>
                  <td className="column_resizer_body" />
                  <td>{sessionFull ? sessionFull : "N/A"}</td>
                  <td className="column_resizer_body" />
                  <td>{sessionShort ? sessionShort : "N/A"}</td>
                  <td className="column_resizer_body" />
                  <td>
                    <Status active={active} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FiscalSessionAD;
