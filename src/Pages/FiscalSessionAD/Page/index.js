import React, { useState, useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiscalSessionAD, handleSearch } from "../Redux/thunk";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import FiscalSessionAD from "./FiscalSessionAD";
import CreateFiscalSessionAD from "./CreateFiscalSessionAD";
import "./fiscalSessionAD.css";
import { setShowModal } from "../../../Redux/Layout/layoutSlice.js";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton.js";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "Fiscal Session AD";
const types = "fiscalSessionAD";

const FiscalSessionADListing = () => {
  const dispatch = useDispatch();
  const loadingFiscalSessionAD = useSelector((state) => state.ad.loadingFiscalSessionAD);
  const fiscalSessionsAD = useSelector((state) => state.ad.fiscalSessionsAD);
  const count = useSelector((state) => state.ad.count);
  const { showModal } = useSelector((state) => state.layout);
  const [showFiscalSessionModal, setShowFiscalSessionModal] = useState(false);

  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);

  const [showFilter, setShowFilter] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search === "") {
      dispatch(getFiscalSessionAD(postsPerPage));
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
          loading={loadingFiscalSessionAD}
          data={fiscalSessionsAD}
          count={count}
        />

        {loadingFiscalSessionAD && <ListingSkeleton />}
        {!loadingFiscalSessionAD && (
          <FiscalSessionAD
            dispatch={dispatch}
            showModal={showModal}
            setPostsPerPage={setPostsPerPage}
          />
        )}
        <CommonCreateButton
          types={types}
          showModal={showFiscalSessionModal}
          setShowModal={setShowFiscalSessionModal}
        />
      </div>
      {showFiscalSessionModal && (
        <Suspense fallback={<div></div>}>
          <Modal
            dispatch={setShowModal}
            showModal={showFiscalSessionModal}
            setShowModal={setShowFiscalSessionModal}
            header={"Add Fiscal Session AD"}
            types={types}
            size={"modal-md"}
          >
            <CreateFiscalSessionAD
              dispatch={dispatch}
              showModal={showFiscalSessionModal}
              setShowModal={setShowFiscalSessionModal}
              postsPerPage={postsPerPage}
            />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default FiscalSessionADListing;
