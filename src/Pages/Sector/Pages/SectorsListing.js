import React, { useRef } from "react";
import ColumnResize from "react-table-column-resizer";
import { useSelector } from "react-redux";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import { getNext } from "../Redux/thunk";
import { sectorsEditSuccess } from "../Redux/sectorSlice";
import Status, { purchaseOrderStatus } from "../../../Components/Status";

const SectorsListing = ({ dispatch, setSectorsModal }) => {
  const listRef = useRef(null);

  const next = useSelector((state) => state.sectors.next);
  const loadingNext = useSelector((state) => state.sectors.loadingNext);
  const sectors = useSelector((state) => state.sectors.sectors);
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
    dispatch(sectorsEditSuccess(id));
    setSectorsModal(true);
  };

  return (
    <>
      {sectors?.length > 0 ? (
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

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sectors?.map((member, i) => {
                  const { id, name, description } = member;
                  return (
                    <tr key={id} onDoubleClick={() => handleEdit(id)} style={{ cursor: "pointer" }}>
                      <td>{i + 1}</td>
                      <td className="column_resizer_body" />
                      <td>{name ? name : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>{description ? description : "N/A"}</td>
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

export default SectorsListing;
