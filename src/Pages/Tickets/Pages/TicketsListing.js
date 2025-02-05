import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ColumnResize from "react-table-column-resizer";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import { getAnswerQuestionByItemId, getTicketsInspectionById } from "../../TicketInspection/Redux/thunk";
import { getNext, getSpecificTicket } from "../Redux/thunk";
import { ticketsEditSuccess } from "../Redux/ticketSlice";

import Modal from "../../../Components/Modal/Modal";
import { useInfinteScroll } from "../../../Utils/useInfiniteScroll";
import { getItems } from "../../Item/Redux/thunk";
import NewTicketInspection from "../../TicketInspection/pages/NewTicketInspection";
import TicketInspectionListing from "../../TicketInspection/pages/TicketInspectionListing";

const TicketListing = ({ setShowTicketModal, setPostsPerPage, setPage, page, postsPerPage }) => {
  const dispatch = useDispatch();
  const [showTicketInspectionModal, setShowTicketInspectionModal] = useState(false);
  const [selectItemId, setSelectedItemId] = useState("");
  const [selectedTicketId, setSelectedTicketId] = useState("");
  const [ticketInspectionModal, setTicketIspectionModal] = useState(false);

  const listRef = useRef(null);

  const next = useSelector((state) => state.ticket.next);
  const loadingNext = useSelector((state) => state.ticket?.loadingNext);
  const tickets = useSelector((state) => state?.ticket?.tickets);

  const { handleScroll } = useInfinteScroll({
    loadingNext: loadingNext,
    next,
    getNext,
    setPostsPerPage,
    setPage,
  });

  const handleEdit = async (ticket) => {
    dispatch(ticketsEditSuccess(ticket));
    setShowTicketModal(true);
  };

  const handleInspection = async (ticket) => {
    await dispatch(getTicketsInspectionById({ ticketId: ticket?._id, postsPerPage: 10, page }));
    setSelectedTicketId(ticket._id);
    setSelectedItemId(ticket.item?._id);
    setShowTicketInspectionModal(true);
  };

  return (
    <>
      {tickets && tickets?.length > 0 ? (
        <div className="row">
          <div className="col-12 table-scrollable" onScroll={handleScroll} ref={listRef}>
            <table className="listing-table">
              <thead>
                <tr>
                  <th>SN</th>
                  <ColumnResize id={1} className="columnResizer" />
                  <th>Customer</th>
                  <ColumnResize id={2} className="columnResizer" minWidth={120} />
                  <th>Reported By</th>
                  <ColumnResize id={3} className="columnResizer" />
                  <th>Description</th>
                  <ColumnResize id={3} className="columnResizer" />
                  <th>Priority</th>
                  <ColumnResize id={3} className="columnResizer" />
                  <th>Item</th>
                  <ColumnResize id={3} className="columnResizer" />
                  <th>Level</th>
                  <ColumnResize id={3} className="columnResizer" />
                  <th>Medium</th>
                  <ColumnResize id={3} className="columnResizer" />
                  <th>Assigner</th>
                  <ColumnResize id={3} className="columnResizer" />
                  <th>Status</th>
                  <ColumnResize id={3} className="columnResizer" />
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket, i) => {
                  const { _id, customer, reportedBy, description, priority, item, level, medium, assignedTo, status } =
                    ticket;
                  return (
                    <tr key={_id} onDoubleClick={() => handleInspection(ticket)} style={{ cursor: "pointer" }}>
                      <td>{i + 1}</td>
                      <td className="column_resizer_body" />
                      <td>{customer ? customer.name : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>{reportedBy ? reportedBy : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>{description ? description : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>{priority ? priority : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>{item ? item.name : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>{level ? level : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>{medium ? medium : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>{assignedTo ? assignedTo.name : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>{status ? status : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>
                        <DetailActionButton type={"edit"} onClick={() => handleEdit(ticket)} />
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
          {showTicketInspectionModal && (
            <Modal
              showModal={showTicketInspectionModal}
              setShowModal={setShowTicketInspectionModal}
              header={"Ticket Inspection"}
              size={"modal-xl"}
            >
              <NewTicketInspection
                selectedTicketId={selectedTicketId}
                itemId={selectItemId}
                setPage={setPage}
                setPostsPerPage={setPostsPerPage}
              />
            </Modal>
          )}
        </div>
      ) : (
        <NoData />
      )}
      {ticketInspectionModal && (
        <Modal
          showModal={ticketInspectionModal}
          setShowModal={setTicketIspectionModal}
          header={"Ticket Inspection"}
          size={"modal-xl"}
        >
          <TicketInspectionListing dispatch={dispatch} setShowModal={setTicketIspectionModal} onScroll={handleScroll} />
        </Modal>
      )}
    </>
  );
};

export default TicketListing;
