import React, { useRef } from "react";
import ColumnResize from "react-table-column-resizer";
import { useSelector } from "react-redux";
import { unitEditSuccess } from "../Redux/unitSlice";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import { getNext } from "../Redux/thunk";

const Unit = ({ dispatch, setUnitModal }) => {
  const listRef = useRef(null);

  const next = useSelector((state) => state.unit.next);
  const loadingNext = useSelector((state) => state.unit.loadingNext);
  const units = useSelector((state) => state.unit.units);
  const scrollToEnd = (next) => {
    dispatch(getNext(next));
  };

  const handleScroll = (event) => {
    if (event.currentTarget.scrollTop + event.currentTarget.offsetHeight === event.currentTarget.scrollHeight) {
      if (!loadingNext && next !== null) {
        scrollToEnd(next);
      }
    }
  };

  const handleEdit = (id) => {
    dispatch(unitEditSuccess(id));
    setUnitModal(true);
  };

  return (
    <>
      {units?.length > 0 ? (
        <div className="row">
          <div className="col-12 table-scrollable" onScroll={handleScroll} ref={listRef}>
            <table className="listing-table">
              <thead>
                <tr>
                  <th>SN</th>
                  <ColumnResize id={1} className="columnResizer" />
                  <th>Name</th>
                  <ColumnResize id={2} className="columnResizer" minWidth={120} />
                  <th>Description</th>
                  <ColumnResize id={3} className="columnResizer" minWidth={120} />
                  <th>Created At</th>
                  <ColumnResize id={4} className="columnResizer" minWidth={120} />
                  <th>Created By</th>
                  <ColumnResize id={5} className="columnResizer" minWidth={120} />
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {units?.map((unit, i) => {
                  const { id, name, description, createdAt, createdBy } = unit;
                  return (
                    <tr key={id} onDoubleClick={() => handleEdit(id)} style={{ cursor: "pointer" }}>
                      <td>{i + 1}</td>
                      <td className="column_resizer_body" />
                      <td>{name ? name : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>{description ? description : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>{createdAt.substring(0, 10)}</td>
                      <td className="column_resizer_body" />
                      <td>{createdBy ? createdBy.username : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>
                        <DetailActionButton type={"edit"} onClick={() => handleEdit(id)} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
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
      ) : (
        <NoData />
      )}
    </>
  );
};

export default Unit;
