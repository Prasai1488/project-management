import React, { Suspense, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ColumnResize from "react-table-column-resizer";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import Modal from "../../../Components/Modal/Modal";
import NoData from "../../../Components/NoData/NoData";
import { purchaseOrderStatus } from "../../../Components/Status";
import { getNext, getReplies } from "../Redux/thunk";
import { clearAllTicketIssues, setIssue, ticketIssuesEditSuccess } from "../Redux/ticketIssuesSlice";
import IssueReplies from "./IssueReplies";

const TicketIssuesListing = ({ dispatch, setTicketIssuesModal, postsPerPage }) => {
  const listRef = useRef(null);
  const [ticketIssueReplyModal, setTicketIssueReplyModal] = useState(false);

  const next = useSelector((state) => state.ticketIssues.next);
  const loadingNext = useSelector((state) => state.ticketIssues.loadingNext);
  const ticketIssues = useSelector((state) => state.ticketIssues.ticketIssues);
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
    dispatch(ticketIssuesEditSuccess(id));
    setTicketIssuesModal(true);
  };

  const handleReply = (issue) => {
    dispatch(getReplies(issue.id));
    dispatch(setIssue(issue));
    setTicketIssueReplyModal(true);
  };

  return (
    <>
      {ticketIssues && ticketIssues?.length > 0 ? (
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
                {ticketIssues && ticketIssues?.map((issue, i) => {
                  const { id, title, sector, status, createdAt, createdBy } = issue;
                  return (
                    <tr key={id} onDoubleClick={() => handleReply(issue)} style={{ cursor: "pointer" }}>
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

      {ticketIssueReplyModal && (
        <Suspense fallback={<div></div>}>
          <Modal
            showModal={ticketIssueReplyModal}
            setShowModal={setTicketIssueReplyModal}
            header={"Issues"}
            size={"modal-lg"}
            clearAction={clearAllTicketIssues}
          >
            <IssueReplies dispatch={dispatch} postsPerPage={postsPerPage} setShowModal={setTicketIssueReplyModal} />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default TicketIssuesListing;
