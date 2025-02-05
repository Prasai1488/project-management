import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import { clearAllTicket, clearEditTicket } from "../Redux/ticketSlice";
import { getAllTickets, handleSearch } from "../Redux/thunk";
import CreateTicket from "./CreateTickets";
import "./ticket.css";
import TicketListing from "./TicketsListing";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "Tickets";
const types = "Tickets";

const Tickets = () => {
  const dispatch = useDispatch();
  const { permissions, isSuperuser } = useSelector((state) => state.auth);
  const loadingTicket = useSelector((state) => state.ticket.loadingTicket);
  const tickets = useSelector((state) => state.ticket.tickets);
  const count = useSelector((state) => state.ticket.count);
  const edit = useSelector((state) => state.ticket.edit);
  const [showTicketModal, setShowTicketModal] = useState(false);

  const [status, setStatus] = useState([]);
  const [priority, setPriroity] = useState([]);
  const [level, setLevel] = useState([]);

  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [page, setPage] = useState(1);

  const [showFilter, setShowFilter] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search === "") {
      dispatch(
        getAllTickets({ postsPerPage, page, status: status?.value, priroity: priority?.value, level: level?.value })
      );
    } else {
      dispatch(handleSearch({ search, postsPerPage }));
    }
  }, [postsPerPage, debouncedSearch, page, status, priority, level]);

  const createPermission = isSuperuser || permissions?.includes("") || true;

  return (
    <>
      <div className="listing-wrapper">
        <CommonPageHeader
          title={title}
          dispatch={dispatch}
          search={search}
          setSearch={setSearch}
          loading={loadingTicket}
          data={products}
          count={count}
          types={types}
          setStatus={setStatus}
          status={status}
          setPriroity={setPriroity}
          priroity={priority}
          setLevel={setLevel}
          level={level}
        />

        {loadingTicket && <ListingSkeleton />}
        {!loadingTicket && (
          <TicketListing
            dispatch={dispatch}
            setShowTicketModal={setShowTicketModal}
            setPostsPerPage={setPostsPerPage}
            setPage={setPage}
            postsPerPage={postsPerPage}
            page={page}
          />
        )}
      </div>
      <CommonCreateButton
        types={types}
        title={title}
        showModal={showTicketModal}
        setShowModal={setShowTicketModal}
        createPermission={createPermission}
      />
      {showTicketModal && (
        <Suspense fallback={<div></div>}>
          <Modal
            showModal={showTicketModal}
            setShowModal={setShowTicketModal}
            header={edit ? "Update Ticket" : "Add Ticket"}
            types={types}
            edit={edit}
            size={"modal-lg"}
            clearAction={clearEditTicket}
          >
            <CreateTicket dispatch={dispatch} postsPerPage={postsPerPage} setShowModal={setShowTicketModal} />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default Tickets;
