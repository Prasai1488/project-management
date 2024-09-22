import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import { getNextOrganization } from "../Redux/thunk";
import { organizationEditSuccess } from "../Redux/organizationSlice";
import { useInfinteScroll } from "../../../Utils/useInfiniteScroll";

const OrganizationListing = ({ setShowOrganizationModal, setPostsPerPage, setPage, page, postsPerPage }) => {
  const dispatch = useDispatch();
  const listRef = useRef(null);
  const next = useSelector((state) => state.organization.next);
  const loadingNext = useSelector((state) => state.organization?.loadingNext);
  const organizations = useSelector((state) => state?.organization?.organizations);

  const { handleScroll } = useInfinteScroll({
    loadingNext: loadingNext,
    next,
    getNext: getNextOrganization,
    setPostsPerPage,
    setPage,
  });

  const handleEdit = async (organization) => {
    dispatch(organizationEditSuccess(organization));
    setShowOrganizationModal(true);
  };

  return (
    <>
      {organizations && organizations.length > 0 ? (
        <div className="row">
          <div className="col-12 table-scrollable" onScroll={handleScroll} ref={listRef}>
            <table className="listing-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>NAME</th>
                  <th>ADDRESS</th>
                  <th>TYPE</th>
                  <th>PHONE</th>
                  <th>EMAIL</th>
                  <th>STATUS</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {organizations.map((organization, i) => {
                  const { id, name, address, type, phone, email, status } = organization;
                  return (
                    <tr key={id} style={{ cursor: "pointer" }}>
                      <td>{i + 1}</td>
                      <td>{name || "N/A"}</td>
                      <td>{address || "N/A"}</td>
                      <td>{type || "N/A"}</td>
                      <td>{phone || "N/A"}</td>
                      <td>{email || "N/A"}</td>
                      <td>
                        <span className={`status ${status?.toLowerCase()}`}>{status || "N/A"}</span>
                      </td>
                      <td>
                        <DetailActionButton type={"edit"} onClick={() => handleEdit(organization)} />
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

export default OrganizationListing;
