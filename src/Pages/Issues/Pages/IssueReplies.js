import { Suspense, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { GrAttachment } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../Components/Modal/Modal";
import { clearAllTicketIssues, setIssue } from "../Redux/ticketIssuesSlice";
import CreateReply from "./CreateReply";
const IssueReplies = () => {
  const [showReplyIssueModal, setShowReplyIssueModal] = useState(false);

  const dispatch = useDispatch();

  const replies = useSelector((state) => state.ticketIssues.replies);
  const issue = useSelector((state) => state.ticketIssues.ticketIssue);

  const handleReply = () => {
    setShowReplyIssueModal(true);
  };
  return (
    <>
      <div className="row p-2">
        <div className="col-12">
          <button className="btn reply-btn" onClick={handleReply}>
            <FaPlus /> Add Reply
          </button>
        </div>
        {replies &&
          replies.map((reply) => (
            <div className=" user-desc">
              <div className="d-flex justify-content-between align-items-start my-3 ">
                <div className="name-email">
                  <p className="username text-capitalize font-weight-bold">{reply.createdBy.username || "N/A"}</p>
                  <small>{reply.createdAt.substring(0, 10)}</small>
                </div>
                <button className="btn operator-btn">Operator</button>
              </div>
              <div className="border description-box">{reply.message}</div>
              <div className="attachments col-12">
                <a href={reply.file} download target="_blank" rel="noreferrer">
                  <button className="btn attachment-btn">
                    <GrAttachment /> {reply.documentName}
                  </button>
                </a>
              </div>
            </div>
          ))}
        <div className=" user-desc">
          <div className="d-flex justify-content-between align-items-start my-3 ">
            <div className="name-email">
              <p className="username text-capitalize font-weight-bold">{issue?.createdBy?.username || "N/A"}</p>
              <small>{issue?.createdAt.substring(0, 10)}</small>
            </div>
            <button className="btn issuer-btn">Issuer</button>
          </div>
          <div className="border description-box">{issue.description || "No description provided."}</div>
          <div className="attachments col-12">
            <a href={issue.file} download target="_blank" rel="noreferrer">
              <button className="btn attachment-btn">
                <GrAttachment /> {issue.documentName}
              </button>
            </a>
          </div>
        </div>
      </div>

      {showReplyIssueModal && (
        <Suspense fallback={<div></div>}>
          <Modal
            showModal={showReplyIssueModal}
            setShowModal={setShowReplyIssueModal}
            header={"Reply Issue"}
            size={"modal-lg"}
            clearAction={clearAllTicketIssues}
          >
            <CreateReply dispatch={dispatch} setShowModal={setShowReplyIssueModal} />
          </Modal>
        </Suspense>
      )}
    </>
  );
};
export default IssueReplies;
