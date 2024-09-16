import React, { useRef } from "react";
import { useSelector } from "react-redux";
import ColumnResize from "react-table-column-resizer";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import Status from "../../../Components/Status";
import { roleEditSuccess } from "../Redux/roleSlice";
import { getNext } from "../Redux/thunk";

const Roles = ({ dispatch, setShowRoleModal }) => {
  const listRef = useRef(null);
  const next = useSelector((state) => state.role.next);
  const loadingNext = useSelector((state) => state.role.loadingNext);
  const roles = useSelector((state) => state.role.roles);
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

  const handleEdit = (role) => {
    dispatch(roleEditSuccess(role));
    setShowRoleModal(true);
  };

  return (
    <>
      {roles?.length > 0 ? (
        <div className="row">
          <div className="col-12 table-scrollable" onScroll={handleScroll} ref={listRef}>
            <table className="listing-table">
              <thead>
                <tr>
                  <th>SN</th>
                  <ColumnResize id={1} className="columnResizer" />
                  <th>Role</th>
                  <ColumnResize id={2} className="columnResizer" minWidth={120} />
                  <th>Status</th>
                  <ColumnResize id={5} className="columnResizer" minWidth={120} />
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {roles?.map((role, i) => {
                  const { _id, name, isActive } = role;

                  return (
                    <tr key={_id} onDoubleClick={() => handleEdit(role)} style={{ cursor: "pointer" }}>
                      <td>{i + 1}</td>
                      <td className="column_resizer_body" />
                      <td>{name ? name : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>
                        <Status active={isActive} />
                      </td>
                      <td className="column_resizer_body" />
                      <td>
                        <DetailActionButton type={"edit"} onClick={() => handleEdit(role)} />
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

export default Roles;
