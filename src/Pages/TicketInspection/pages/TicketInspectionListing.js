import React, { useEffect, useRef, useState, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import ColumnResize from "react-table-column-resizer";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import { getAllTicketsInspection, getNextTicketsInspection, getTicketsInspectionById } from "../Redux/thunk";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import { ticketInspectionEditSuccess } from "../Redux/ticketInspectionSlice";
import Modal from "../../../Components/Modal/Modal";
import CreateTicketInspection from "./CreateTicketInspection";
import { useInfinteScroll } from "../../../Utils/useInfiniteScroll";

const title = "Ticket Inspection";
const types = "Ticket Inspection";

const TicketInspectionListing = ({ selectedTicketId, selectItemId, setPostsPerPage, setPage }) => {
  const itemId = selectItemId;
  const ticketId = selectedTicketId;

  const [showTicketInspectionModal, setShowTicketInspectionModal] = useState(false);

  const dispatch = useDispatch();
  const { permissions, isSuperuser } = useSelector((state) => state.auth);
  const listRef = useRef(null);
  const edit = useSelector((state) => state.ticketInspection.edit);

  const next = useSelector((state) => state.ticketInspection.next);
  const loadingNext = useSelector((state) => state.ticketInspection.loadingNext);
  const ticketInspections = useSelector((state) => state.ticketInspection.ticketInspections);

  const loadingAll = useSelector((state) => state.ticketInspection.loadingAll);

  const { handleScroll } = useInfinteScroll({
    loadingNext: loadingNext,
    next,
    getNext,
    setPostsPerPage,
    setPage,
  });

  const handleEdit = async (id) => {
    const inspectionToEdit = ticketInspections.find((inspection) => inspection._id === id);
    if (!inspectionToEdit) {
      return;
    }

    setShowTicketInspectionModal(true);
    const editData = { ...inspectionToEdit };
    try {
      dispatch(ticketInspectionEditSuccess({ id, data: editData }));
      console.log("Ticket Update Successfully");
    } catch (error) {
      console.log("Error Updating Ticket Inspection:", error);
    }
  };

  const createPermission = isSuperuser || permissions?.includes("") || true;

  return (
    <>
      {loadingAll ? (
        <div className="spinner-border text-danger" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : ticketInspections?.length > 0 ? (
        <div className="row">
          <div className="col-12 " onScroll={handleScroll} ref={listRef}>
            <table className="listing-table">
              <thead>
                <tr>
                  <th>SN</th>
                  <ColumnResize id={1} className="columnResizer" />
                  <th>Ticket ID</th>
                  <ColumnResize id={2} className="columnResizer" minWidth={120} />
                  <th>Issue</th>
                  <ColumnResize id={3} className="columnResizer" minWidth={120} />
                  <th>Damage Status</th>
                  <ColumnResize id={4} className="columnResizer" minWidth={120} />
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {ticketInspections.length > 0 ? (
                  ticketInspections.map((inspection, i) => {
                    const { _id, ticket, issue, damageStatus } = inspection;
                    return (
                      <tr key={_id} style={{ cursor: "pointer" }}>
                        <td>{i + 1}</td>
                        <td className="column_resizer_body" />
                        <td>{ticket?.ticketNo || "N/A"}</td>
                        <td className="column_resizer_body" />
                        <td>{issue?.name || "N/A"}</td>
                        <td className="column_resizer_body" />
                        <td>{damageStatus}</td>
                        <td className="column_resizer_body" />
                        <td className="row-actions">
                          <DetailActionButton type={"edit"} onClick={() => handleEdit(_id)} />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <NoData />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {loadingNext && <div className="text-center py-2">Loading more...</div>}
          </div>
        </div>
      ) : (
        <NoData />
      )}
      <CommonCreateButton
        types={types}
        title={title}
        showModal={showTicketInspectionModal}
        setShowModal={setShowTicketInspectionModal}
        createPermission={createPermission}
      />

      {showTicketInspectionModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <Modal
            showModal={showTicketInspectionModal}
            setShowModal={setShowTicketInspectionModal}
            header={edit ? "Update Ticket Inspection" : "Add Ticket Inspection"}
            types={types}
            edit={edit}
            size={"modal-lg"}
            clearAction={ticketInspectionEditSuccess}
          >
            <CreateTicketInspection
              dispatch={dispatch}
              setShowModal={setShowTicketInspectionModal}
              ticketId={ticketId}
              itemId={itemId}
            />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default TicketInspectionListing;
