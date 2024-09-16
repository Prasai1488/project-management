import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import { clearAllTicketInspection, ticketInspectionEditSuccess } from "../Redux/ticketInspectionSlice";

import CreateTicketInspection from "./CreateTicketInspection";
import { getTicketsInspectionById, handleSearchTicketsInspection } from "../Redux/thunk";
import TicketInspectionListing from "./TicketInspectionListing";
import NewTicketInspection from "./NewTicketInspection";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "Ticket Inspection";
const types = "Ticket Inspection";

const TicketInspection = () => {
  const dispatch = useDispatch();
  // const { permissions, isSuperuser } = useSelector((state) => state.auth);
  const loadingTicketInspection = useSelector((state) => state.ticketInspection.loadingTicketInspection);
  const ticketInspections = useSelector((state) => state.ticketInspection.ticketInspections);
  const filteredInspections = useSelector((state) => state.ticketInspection.filteredInspections);
  const count = useSelector((state) => state.ticketInspection.count);
  const edit = useSelector((state) => state.ticketInspection.edit);
  const [showTicketInspectionModal, setShowTicketInspectionModal] = useState(false);

  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  // const [showFilter, setShowFilter] = useState(false);
  // const debouncedSearch = useDebounce(search, 500);

  const handleEditClick = () => {
    setShowTicketInspectionModal(true);
  };

  useEffect(() => {
    if (search === "") {
      dispatch(getTicketsInspectionById({ postsPerPage, page }));
    } else {
      dispatch(handleSearchTicketsInspection({ search, postsPerPage }));
    }
  }, [postsPerPage, debouncedSearch, page, dispatch]);

  const createPermission = isSuperuser || permissions?.includes("") || true;

  return (
    <>
      <div className="listing-wrapper">
        <CommonPageHeader
          title={title}
          dispatch={dispatch}
          search={search}
          setSearch={setSearch}
          loading={loadingTicketInspection}
          data={ticketInspections}
          count={count}
        />

        {loadingTicketInspection && <ListingSkeleton />}
        {!loadingTicketInspection && (
          <TicketInspectionListing
            dispatch={dispatch}
            setPostsPerPage={setPostsPerPage}
            setPage={setPage}
            setShowTicketInspectionModal={setShowTicketInspectionModal}
            ticketInspection={ticketInspections}
          />
        )}
        <NewTicketInspection />
      </div>
    </>
  );
};

export default TicketInspection;
