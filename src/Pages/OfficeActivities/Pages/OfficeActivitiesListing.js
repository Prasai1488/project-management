import React, { useRef } from "react";
import { useSelector } from "react-redux";
import ColumnResize from "react-table-column-resizer";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import { purchaseOrderStatus } from "../../../Components/Status";
import { officeActivitiesEditSuccess } from "../Redux/officeActivitiesSlice";
import { getNext } from "../Redux/thunk";

const OfficeActivitiesListing = ({ dispatch, setOfficeActivitiesModal, postsPerPage }) => {
  const listRef = useRef(null);

  const next = useSelector((state) => state.officeActivities.next);
  const loadingNext = useSelector((state) => state.officeActivities.loadingNext);
  const officeActivities = useSelector((state) => state.officeActivities.officeActivities);
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
    dispatch(officeActivitiesEditSuccess(id));
    setOfficeActivitiesModal(true);
  };

  

  return (
    <>
      {officeActivities?.length > 0 ? (
        <div className="row">
          <div className="col-12 table-scrollable" onScroll={handleScroll} ref={listRef}>
            <table className="listing-table">
              <thead>
                <tr>
                  <th>SN</th>
                  <ColumnResize id={1} className="columnResizer" />
                  <th>Title</th>
                  <ColumnResize id={2} className="columnResizer" minWidth={120} />
                  <th>Sector</th>
                  <ColumnResize id={3} className="columnResizer" minWidth={120} />
                  <th>Date</th>
                  <ColumnResize id={3} className="columnResizer" minWidth={120} />
                  <th>Issuer</th>
                  <ColumnResize id={3} className="columnResizer" minWidth={120} />
                  <th>Status</th>
                  <ColumnResize id={3} className="columnResizer" minWidth={120} />
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {officeActivities?.map((customer, i) => {
                  const { id, title, sector, status, createdAt, createdBy } = customer;
                  return (
                    <tr key={id} style={{ cursor: "pointer" }}>
                      <td>{i + 1}</td>
                      <td className="column_resizer_body" />
                      <td>{title ? title : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>{sector ? sector.name : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>{createdAt.substring(0, 10)}</td>
                      <td className="column_resizer_body" />
                      <td>{createdBy ? createdBy.username : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>{purchaseOrderStatus(status)}</td>
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

export default OfficeActivitiesListing;
