import React, { useRef } from "react";
import { useSelector } from "react-redux";
import ColumnResize from "react-table-column-resizer";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import Status from "../../../Components/Status";
import { getNext, getSpecificUser } from "../Redux/thunk";
import { userEditSuccess } from "../Redux/userSlice";

const User = ({ dispatch, setShowUserModal }) => {
  const listRef = useRef(null);
  const next = useSelector((state) => state.user.next);
  const loadingNext = useSelector((state) => state.user.loadingNext);
  const users = useSelector((state) => state.user.users);
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

  const handleEdit = async (user) => {
    dispatch(userEditSuccess(user));
    setShowUserModal(true);
  };

  return (
    <>
      {users?.length > 0 ? (
        <div className="row">
          <div className="col-12 table-scrollable" onScroll={handleScroll} ref={listRef}>
            <table className="listing-table">
              <thead>
                <tr>
                  <th>SN</th>
                  <ColumnResize id={1} className="columnResizer" />
                  <th>User Name</th>
                  <ColumnResize id={2} className="columnResizer" minWidth={120} />
                  <th>Full Name</th>
                  <ColumnResize id={3} className="columnResizer" minWidth={120} />
                  <th>Email</th>
                  <ColumnResize id={4} className="columnResizer" minWidth={120} />
                  <th>Role</th>
                  <ColumnResize id={4} className="columnResizer" minWidth={120} />
                  <th>Status</th>
                  <ColumnResize id={5} className="columnResizer" minWidth={120} />
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user, i) => {

                  const { _id, username, firstName, middleName,lastName, email, roles, isActive } = user;

                  return (
                    <tr key={_id} onDoubleClick={() => handleEdit(id)} style={{ cursor: "pointer" }}>
                      <td>{i + 1}</td>
                      <td className="column_resizer_body" />
                      <td>{username ? username : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>{`${firstName} ${middleName ? middleName : ""} ${lastName}`}</td>
                      <td className="column_resizer_body" />
                      <td>{email ? email : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>
                        {roles.map((role, i) => (
                          <span key={i}>{role.name}</span>
                        ))}
                      </td>

                      <td className="column_resizer_body" />
                      <td>
                        <Status active={isActive} />
                      </td>
                      <td className="column_resizer_body" />
                      <td>
                        <DetailActionButton type={"edit"} onClick={() => handleEdit(user)} />
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

export default User;
