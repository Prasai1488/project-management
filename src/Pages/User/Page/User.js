




import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import ColumnResize from "react-table-column-resizer";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import Status from "../../../Components/Status"; // Import Status component
import { getNext, getSpecificUser } from "../Redux/thunk";
import { userEditSuccess } from "../Redux/userSlice";

const UserListing = ({ dispatch, setShowUserModal }) => {
  const [page, setPage] = useState(1);
  const listRef = useRef(null);
  const next = useSelector((state) => state.user.next);
  const loadingNext = useSelector((state) => state.user.loadingNext);
  const users = useSelector((state) => state.user.users);

  const scrollToEnd = () => {
    setPage((prevPage) => prevPage + 1);
    dispatch(getNext({ postsPerPage, page: page + 1 }));
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
                  <th>Name</th>
                  <ColumnResize id={2} className="columnResizer" minWidth={120} />
                  <th>Email</th>
                  <ColumnResize id={3} className="columnResizer" minWidth={120} />
                  <th>User Type</th>
                  <ColumnResize id={4} className="columnResizer" minWidth={120} />
                  <th>Phone</th>
                  <ColumnResize id={5} className="columnResizer" minWidth={120} />
                  <th>Status</th>
                  <ColumnResize id={6} className="columnResizer" minWidth={120} />
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {users?.map((user, i) => {
                  const { id, email, userType, isActive, userProfile } = user;
                  const fullName = userProfile?.fullName || "N/A";
                  const phone = userProfile?.phone || "N/A";

                  return (
                    <tr key={id} onDoubleClick={() => handleEdit(user)} style={{ cursor: "pointer" }}>
                      {/* SN */}
                      <td>{i + 1}</td>
                      <td className="column_resizer_body" />

                      {/* Name */}
                      <td>{fullName}</td>
                      <td className="column_resizer_body" />

                      {/* Email */}
                      <td>{email}</td>
                      <td className="column_resizer_body" />

                      {/* User Type */}
                      <td>{userType || "N/A"}</td>
                      <td className="column_resizer_body" />

                      {/* Phone */}
                      <td>{phone}</td>
                      <td className="column_resizer_body" />

                      {/* Status */}
                      <td><Status active={isActive} /></td> {/* Updated status cell */}
                      <td className="column_resizer_body" />

                      {/* Action Button */}
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

export default UserListing;
