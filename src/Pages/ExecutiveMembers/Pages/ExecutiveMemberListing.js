import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { executiveMembersEditSuccess } from "../Redux/executiveMemberSlice";
import { getNext } from "../Redux/thunk";
import ColumnResize from "react-table-column-resizer";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";

const MembersListing = ({ dispatch, setMembersModal }) => {
  const listRef = useRef(null);

  const next = useSelector((state) => state.members.next);
  const loadingNext = useSelector((state) => state.members.loadingNext);
  const members = useSelector((state) => state.members.members);
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
    dispatch(executiveMembersEditSuccess(id));
    setMembersModal(true);
  };

  return (
    <>
      {members?.length > 0 ? (
        <div className="row">
          <div className="col-12 table-scrollable" onScroll={handleScroll} ref={listRef}>
            <table className="listing-table">
              <thead>
                <tr>
                  <th>SN</th>
                  <ColumnResize id={1} className="columnResizer" />
                  <th>Organization Name</th>
                  <ColumnResize id={2} className="columnResizer" minWidth={120} />
                  <th>PAN/VAT No.</th>
                  <ColumnResize id={3} className="columnResizer" minWidth={120} />
                  <th>Email</th>
                  <ColumnResize id={3} className="columnResizer" minWidth={120} />
                  <th>Sector</th>
                  <ColumnResize id={3} className="columnResizer" minWidth={120} />
                  <th>Owner</th>
                  <ColumnResize id={3} className="columnResizer" minWidth={120} />
                  <th>Contact</th>
                  <ColumnResize id={3} className="columnResizer" minWidth={120} />
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {members?.map((member, i) => {
                  const { id, organizationName, sector, organizationEmail, panOrVatNo, user, createdBy } = member;

                  return (
                    <tr key={id} onDoubleClick={() => handleEdit(id)} style={{ cursor: "pointer" }}>
                      <td>{i + 1}</td>
                      <td className="column_resizer_body" />
                      <td>{organizationName ? organizationName : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>{panOrVatNo ? panOrVatNo : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>{organizationEmail ? organizationEmail : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>{sector ? sector.name : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>{user ? user.username : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>{user.phone || "N/A"}</td>
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

export default MembersListing;
