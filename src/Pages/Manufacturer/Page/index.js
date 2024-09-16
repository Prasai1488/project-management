import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import { clearAllManufacturer } from "../Redux/manufacturerSlice";
import { getAllManufacturers, handleSearch } from "../Redux/thunk";
import CreateManufacturer from "./CreateManufacturer";
import "./manufacturer.css";
import ManufacturerListing from "./ManufacturerListing";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "Manufacturers";
const types = "Manufacturers";

const Manufacturers = () => {
  const dispatch = useDispatch();
  const { permissions, isSuperuser } = useSelector((state) => state.auth);
  const loadingManufacturer = useSelector((state) => state.manufacturer.loadingManufacturer);
  const manufacturers = useSelector((state) => state.manufacturer.manufacturers);
  const count = useSelector((state) => state.manufacturer.count);
  const edit = useSelector((state) => state.manufacturer.edit);
  const [showManufacturerModal, setShowManufacturerModal] = useState(false);

  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [page, setPage] = useState(1);

  const [showFilter, setShowFilter] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search === "") {
      dispatch(getAllManufacturers({ postsPerPage, page }));
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
          loading={loadingManufacturer}
          data={manufacturers}
          count={count}
        />

        {loadingManufacturer && <ListingSkeleton />}
        {!loadingManufacturer && (
          <ManufacturerListing
            setPage={setPage}
            setPostsPerPage={setPostsPerPage}
            dispatch={dispatch}
            setManufacturerModal={setShowManufacturerModal}
          />
        )}
      </div>
      <CommonCreateButton
        types={types}
        title={title}
        showModal={showManufacturerModal}
        setShowModal={setShowManufacturerModal}
        createPermission={createPermission}
      />
      {showManufacturerModal && (
        <Suspense fallback={<div></div>}>
          <Modal
            showModal={showManufacturerModal}
            setShowModal={setShowManufacturerModal}
            header={edit ? "Update Manufacturer" : "Add Manufacturer"}
            types={types}
            edit={edit}
            size={"modal-md"}
            clearAction={clearAllManufacturer}
          >
            <CreateManufacturer
              dispatch={dispatch}
              postsPerPage={postsPerPage}
              setShowModal={setShowManufacturerModal}
            />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default Manufacturers;
