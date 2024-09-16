import React, { useEffect, useState, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import { getAnswerQuestionByItemId, getSpecificTicketInspection, getNextTicketsInspection } from "../Redux/thunk";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import Modal from "../../../Components/Modal/Modal";
import NewCreateTicketInspection from "./NewCreateTicketInspection";
import { ticketInspectionEditSuccess } from "../Redux/newTicketInspectionSlice";
import { useInfinteScroll } from "../../../Utils/useInfiniteScroll";

const title = "Ticket Inspection";
const types = "Ticket Inspection";

const NewTicketInspection = ({ selectedTicketId, itemId, setPage, setPostsPerPage }) => {
  const ticketId = selectedTicketId;
  const [showTicketInspectionModal, setShowTicketInspectionModal] = useState(false);
  const dispatch = useDispatch();
  const { edit, loading } = useSelector((state) => state.newTicketInspection);

  const ticketInspections = useSelector((state) => state.newTicketInspection.ticketInspections);
  const isSuperuser = useSelector((state) => state.auth.isSuperuser);
  const permissions = useSelector((state) => state.auth.permissions);
  const createPermission = isSuperuser || permissions?.includes("") || true;

  const next = useSelector((state) => state.newTicketInspection?.next);
console.log(next)
  const loadingNext = useSelector((state) => state.newTicketInspection.loadingNext);
  const questions = useSelector((state) => state.newTicketInspection.questions);

  // useEffect(() => {
  //   dispatch(getAnswerQuestionByItemId(itemId));
  // }, [itemId, dispatch]);

  const handleEdit = async (id) => {
    try {
      await dispatch(ticketInspectionEditSuccess(id));
      await dispatch(getSpecificTicketInspection(id));
      setShowTicketInspectionModal(true);
    } catch (error) {
      console.error("Failed to set up edit:", error);
    }
  };

  const { handleScroll } = useInfinteScroll({
    loadingNext: loadingNext,
    next,
    getNext: getNextTicketsInspection,
    setPostsPerPage,
    setPage,
  });

  return (
    <>
      {loading ? (
        <div className="spinner-border text-danger" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : ticketInspections?.length > 0 ? (
        <div className="row">
          <div className="col-12 table-scrollable">
            <table className="listing-table">
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Ticket ID</th>
                  <th>Issue</th>
                  <th>Damage Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {ticketInspections.map((inspection, i) => {
                  const { _id, ticket, issue, damageStatus } = inspection;
                  return (
                    <tr key={_id} style={{ cursor: "pointer" }}>
                      <td>{i + 1}</td>
                      <td>{ticket?.ticketNo || "N/A"}</td>
                      <td>{issue?.name || "N/A"}</td>
                      <td>{damageStatus}</td>
                      <td>
                        <DetailActionButton type="edit" onClick={() => handleEdit(_id)} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {loadingNext && <div className="text-center py-2">Loading more... </div>}
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
            size="modal-lg"
            clearAction={ticketInspectionEditSuccess}
          >
            <NewCreateTicketInspection
              dispatch={dispatch}
              setShowModal={setShowTicketInspectionModal}
              ticketId={ticketId}
              itemId={itemId}
              questions={questions}
            />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default NewTicketInspection;
