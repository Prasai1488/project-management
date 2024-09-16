import React, { useRef } from "react";
import ColumnResize from "react-table-column-resizer";
import { useSelector } from "react-redux";
import Status from "../../../Components/Status";
import { userGroupEditSuccess } from "../Redux/userGroupSlice";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import { getNext } from "../Redux/thunk";

const UserGroup = ({ dispatch, setShowUserGroupModal }) => {
  const listRef = useRef(null);
  const next = useSelector((state) => state.userGroup.next);
  const loadingNext = useSelector((state) => state.userGroup.loadingNext);
  const userGroups = useSelector((state) => state.userGroup.userGroups);
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
    dispatch(userGroupEditSuccess(id));
    setShowUserGroupModal(true);
  };

  return (
    <>
      {userGroups?.length > 0 ? (
        <div className="row">
          <div className="col-12 table-scrollable" onScroll={handleScroll} ref={listRef}>
            <table className="listing-table">
              <thead>
                <tr>
                  <th>SN</th>
                  <ColumnResize id={1} className="columnResizer" />
                  <th>User Group</th>
                  <ColumnResize id={2} className="columnResizer" minWidth={120} />
                  <th>Status</th>
                  <ColumnResize id={5} className="columnResizer" minWidth={120} />
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {userGroups?.map((userGroup, i) => {
                  const { id, name, isActive } = userGroup;

                  return (
                    <tr key={id} onDoubleClick={() => handleEdit(id)} style={{ cursor: "pointer" }}>
                      <td>{i + 1}</td>
                      <td className="column_resizer_body" />
                      <td>{name ? name : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>
                        <Status active={isActive} />
                      </td>
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

export default UserGroup;
