import React, { useState, useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiscalSessionBS, handleSearch } from "../Redux/thunk";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import FiscalSessionBS from "./FiscalSessionBS";
import CreateFiscalSessionBS from "./CreateFiscalSessionBS";
import "./fiscalSessionBS.css";
import { setShowModal } from "../../../Redux/Layout/layoutSlice.js";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton.js";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "Fiscal Session BS";
const types = "fiscalSessionBS";

const FiscalSessionBSListing = () => {
  const dispatch = useDispatch();
  const loadingFiscalSessionBS = useSelector((state) => state.bs.loadingFiscalSessionBS);
  const fiscalSessionsBS = useSelector((state) => state.bs.fiscalSessionsBS);
  const count = useSelector((state) => state.bs.count);
  const { showModal } = useSelector((state) => state.layout);
  const [showFiscalSessionModal, setShowFiscalSessionModal] = useState(false);

  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [showFilter, setShowFilter] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search === "") {
      dispatch(getFiscalSessionBS(postsPerPage));
    } else {
      dispatch(handleSearch({ search, postsPerPage }));
    }
  }, [postsPerPage, debouncedSearch]);

  return (
    <>
      <div className="fiscal-session-ad-wrapper">
        <CommonPageHeader
          title={title}
          dispatch={dispatch}
          showModal={showModal}
          search={search}
          setSearch={setSearch}
          loading={loadingFiscalSessionBS}
          data={fiscalSessionsBS}
          count={count}
        />

        {loadingFiscalSessionBS && <ListingSkeleton />}
        {!loadingFiscalSessionBS && (
          <FiscalSessionBS dispatch={dispatch} showModal={showModal} setPostsPerPage={setPostsPerPage} />
        )}
        <CommonCreateButton types={types} showModal={showFiscalSessionModal} setShowModal={setShowFiscalSessionModal} />
      </div>
      {showFiscalSessionModal && (
        <Suspense fallback={<div></div>}>
          <Modal
            dispatch={setShowModal}
            showModal={showFiscalSessionModal}
            setShowModal={setShowFiscalSessionModal}
            header={"Add Fiscal Session BS"}
            types={types}
            size={"modal-md"}
          >
            <CreateFiscalSessionBS dispatch={dispatch} showModal={showFiscalSessionModal} postsPerPage={postsPerPage} />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default FiscalSessionBSListing;
