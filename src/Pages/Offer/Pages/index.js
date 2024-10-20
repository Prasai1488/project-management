import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import OfferListing from "./OfferListing";
import CreateOffer from "./CreateOffer";
import "./offer.css";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "Offer";
const types = "Offer";

const Offer = () => {
  const dispatch = useDispatch();
  const { permissions, isSuperuser } = useSelector((state) => state.auth);
  const [showOfferModal, setShowOfferModal] = useState(false);

  const [status, setStatus] = useState([]);
  const [priority, setPriority] = useState([]);
  const [level, setLevel] = useState([]);

  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [page, setPage] = useState(1);

  const [showFilter, setShowFilter] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  const createPermission = isSuperuser || permissions?.includes("") || true;

  return (
    <>
      <div className="listing-wrapper">
        <CommonPageHeader title={title} dispatch={dispatch} search={search} setSearch={setSearch} data={Offer} />

        <OfferListing
          dispatch={dispatch}
          setShowOfferModal={setShowOfferModal}
          setPostsPerPage={setPostsPerPage}
          setPage={setPage}
          postsPerPage={postsPerPage}
          page={page}
        />
      </div>
      <CommonCreateButton
        types={types}
        title={title}
        showModal={showOfferModal}
        setShowModal={setShowOfferModal}
        createPermission={createPermission}
      />
      <Suspense fallback={<div></div>}>
        <Modal
          showModal={showOfferModal}
          setShowModal={setShowOfferModal}
          header={"Add Offer"}
          types={types}
          size={"modal-md"}
        >
          <CreateOffer dispatch={dispatch} postsPerPage={postsPerPage} setShowModal={setShowOfferModal} />
        </Modal>
      </Suspense>
    </>
  );
};

export default Offer;
