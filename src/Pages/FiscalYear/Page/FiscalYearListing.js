import React, { useState, useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import ColumnResize from "react-table-column-resizer";
import { AiOutlineHolder } from "react-icons/ai";

import { getFiscalYears } from "../Redux/thunk";
import { useDispatch } from "react-redux";

import FilterButton from "../../../Components/Buttons/FilterButton";
import "./fiscalYear.css";

const FiscalYearListing = ({}) => {
  const listInnerRef = useRef();
  const [page, setPage] = useState(10);
  const dispatch = useDispatch();
  const { fiscalYears, next, count } = useSelector((state) => state.fiscalYear);
  useEffect(() => {
    dispatch(getFiscalYears(page));
  }, [page]);
  const scrollToEnd = () => {
    setPage(page + 5);
  };

  const handleScroll = (event) => {
    if (
      event.currentTarget.scrollTop + event.currentTarget.offsetHeight ===
      event.currentTarget.scrollHeight
    ) {
      if (next) {
        scrollToEnd();
      }
    }
  };

  const [filter, setFilter] = useState(false);
  const onClick = () => {
    setFilter(!filter);
  };

  return (
    <div className="listing">
      <div className="showing-entries-filter">
        <p>
          Showing {page} of {count} Entries
        </p>

        <div className="d-flex gap-2">
          <input
            style={{ width: "min-content", boxShadow: "none" }}
            type="text"
            // value={search}
            // onChange={(e) => setSearch(e.target.value.trimStart())}
            className="form-control"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="basic-addon1"
          />
          <FilterButton
            filter={filter}
            onClick={onClick}
            className={"border"}
          />
        </div>
      </div>
      {filter && (
        <>
          <div
            className="modal fade bd-example-modal-lg"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">Hello</div>
            </div>
          </div>
        </>
      )}
      <div
        className="table-scrollable"
        style={{ maxHeight: "400px", overflow: "auto" }}
        onScroll={handleScroll}
        ref={listInnerRef}
      >
        <table className="">
          <thead>
            <tr>
              <th>SN</th>
              <ColumnResize id={1} className="columnResizer" />
              <th>FiscalYear No</th>
              <ColumnResize id={2} className="columnResizer" minWidth={120} />
              <th>Title</th>
              <ColumnResize id={3} className="columnResizer" />
              <th>E. Project Valuation</th>
              <ColumnResize
                id={4}
                minWidth={120}
                className="columnResizer"
              ></ColumnResize>
              <th>Contact</th>
              <ColumnResize id={5} className="columnResizer">
                <AiOutlineHolder />
              </ColumnResize>
              <th>In List</th>
              <ColumnResize id={6} className="columnResizer">
                <AiOutlineHolder />
              </ColumnResize>
            </tr>
          </thead>
          <tbody>
            {fiscalYears?.map((fiscalYear, value) => {
              const {
                fiscalYearNo,
                pipelineStatus,
                contact,
                estimatedProjectValue,
                title,
                id,
              } = fiscalYear;

              return (
                <tr key={id}>
                  <td>{value + 1}</td>
                  <td className="column_resizer_body" />
                  <td>{fiscalYearNo}</td>
                  <td className="column_resizer_body" />
                  <td>{title}</td>
                  <td className="column_resizer_body" />
                  <td>{estimatedProjectValue}</td>
                  <td className="column_resizer_body" />
                  <td>{contact}</td>
                  <td className="column_resizer_body" />
                  <td>{pipelineStatus.statusName}</td>
                  <td className="column_resizer_body" />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FiscalYearListing;
