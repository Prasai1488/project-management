import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import { clearAllClient } from "../Redux/clientSlice";
import { getAllClients, handleSearch } from "../Redux/thunk";
import CreateClient from "./CreateClient";
import "./client.css";
import ClientListing from "./ClientListing";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "Clients";
const types = "Clients";

const Clients = () => {
  const dispatch = useDispatch();
  const { permissions, isSuperuser } = useSelector((state) => state.auth);
  const loadingClient = useSelector((state) => state.client.loadingClient);
  const clients = useSelector((state) => state.client.clients);
  const count = useSelector((state) => state.client.count);
  const edit = useSelector((state) => state.client.edit);
  const [showClientModal, setShowClientModal] = useState(false);

  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [page, setPage] = useState(1);

  const [showFilter, setShowFilter] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search === "") {
      dispatch(getAllClients({ postsPerPage, page }));
    } else {
      dispatch(handleSearch({ search, postsPerPage }));
    }
  }, [postsPerPage, debouncedSearch, page]);

  const createPermission = isSuperuser || permissions?.includes("") || true;

  return (
    <>
      <div className="listing-wrapper">
        <CommonPageHeader
          title={title}
          dispatch={dispatch}
          search={search}
          setSearch={setSearch}
          loading={loadingClient}
          data={clients}
          count={count}
        />

        {loadingClient && <ListingSkeleton />}
        {!loadingClient && (
          <ClientListing
            setPage={setPage}
            setPostsPerPage={setPostsPerPage}
            dispatch={dispatch}
            setClientModal={setShowClientModal}
          />
        )}
      </div>
      <CommonCreateButton
        types={types}
        title={title}
        showModal={showClientModal}
        setShowModal={setShowClientModal}
        createPermission={createPermission}
      />
      {showClientModal && (
        <Suspense fallback={<div></div>}>
          <Modal
            showModal={showClientModal}
            setShowModal={setShowClientModal}
            header={edit ? "Update Client" : "Add Client"}
            types={types}
            edit={edit}
            size={"modal-lg"}
            clearAction={clearAllClient}
          >
            <CreateClient dispatch={dispatch} postsPerPage={postsPerPage} setShowModal={setShowClientModal} />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default Clients;
