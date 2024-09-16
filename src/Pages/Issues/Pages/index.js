import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import { getTicketIssues, handleSearch } from "../Redux/thunk";
import { clearAllTicketIssues } from "../Redux/ticketIssuesSlice";
import CreateTicketIssues from "./CreateTicketIssues";
import "./ticketIssues.css";
import TicketIssuesListing from "./TicketIssuesListing";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "Issues";
const types = "Issues";

const Issues = () => {
  const dispatch = useDispatch();
  const { permissions, isSuperuser } = useSelector((state) => state.auth);
  const loadingTicketIssues = useSelector((state) => state.ticketIssues.loadingTicketIssues);
  const ticketIssuess = useSelector((state) => state.ticketIssues.ticketIssues);
  const count = useSelector((state) => state.ticketIssues.count);
  const edit = useSelector((state) => state.ticketIssues.edit);
  const [showTicketIssuesModal, setShowTicketIssuesModal] = useState(false);

  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);

  const [showFilter, setShowFilter] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search === "") {
      dispatch(getTicketIssues(postsPerPage));
    } else {
      dispatch(handleSearch({ search, postsPerPage }));
    }
  }, [postsPerPage, debouncedSearch]);

  const createPermission = isSuperuser || permissions?.includes("") || true;

  return (
    <>
      <div className="listing-wrapper">
        <CommonPageHeader
          title={title}
          dispatch={dispatch}
          search={search}
          setSearch={setSearch}
          loading={loadingTicketIssues}
          data={ticketIssuess}
          count={count}
        />

        {loadingTicketIssues && <ListingSkeleton />}
        {!loadingTicketIssues && (
          <TicketIssuesListing dispatch={dispatch} setTicketIssuesModal={setShowTicketIssuesModal} />
        )}
      </div>
      <CommonCreateButton
        types={types}
        title={title}
        showModal={showTicketIssuesModal}
        setShowModal={setShowTicketIssuesModal}
        createPermission={createPermission}
      />
      {showTicketIssuesModal && (
        <Suspense fallback={<div></div>}>
          <Modal
            showModal={showTicketIssuesModal}
            setShowModal={setShowTicketIssuesModal}
            header={edit ? "Update Issue" : "Add Issue"}
            types={types}
            edit={edit}
            size={"modal-lg"}
            clearAction={clearAllTicketIssues}
          >
            <CreateTicketIssues
              dispatch={dispatch}
              postsPerPage={postsPerPage}
              setShowModal={setShowTicketIssuesModal}
            />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default Issues;
