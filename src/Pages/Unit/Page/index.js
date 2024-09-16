import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import { clearAllUnit } from "../Redux/unitSlice";
import { getAllUnits, handleSearch } from "../Redux/thunk";
import CreateUnit from "./CreateUnit";
import "./unit.css";
import UnitListing from "./UnitListing";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "Units";
const types = "Units";

const Units = () => {
  const dispatch = useDispatch();
  const { permissions, isSuperuser } = useSelector((state) => state.auth);
  const loadingUnit = useSelector((state) => state.unit.loadingUnit);
  const units = useSelector((state) => state.unit.units);
  const count = useSelector((state) => state.unit.count);
  const edit = useSelector((state) => state.unit.edit);
  const [showUnitModal, setShowUnitModal] = useState(false);

  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [page,setPage]=useState(1);

  const [showFilter, setShowFilter] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search === "") {
      dispatch(getAllUnits({postsPerPage,page}));
    } else {
      dispatch(handleSearch({ search, postsPerPage }));
    }
  }, [postsPerPage, debouncedSearch,page]);

  const createPermission = isSuperuser || permissions?.includes("") || true;

  return (
    <>
      <div className="listing-wrapper">
        <CommonPageHeader
          title={title}
          dispatch={dispatch}
          search={search}
          setSearch={setSearch}
          loading={loadingUnit}
          data={units}
          count={count}
        />

        {loadingUnit && <ListingSkeleton />}
        {!loadingUnit && <UnitListing setPage={setPage} setPostsPerPage={setPostsPerPage} dispatch={dispatch} setUnitModal={setShowUnitModal} />}
      </div>
      <CommonCreateButton
        types={types}
        title={title}
        showModal={showUnitModal}
        setShowModal={setShowUnitModal}
        createPermission={createPermission}
      />
      {showUnitModal && (
        <Suspense fallback={<div></div>}>
          <Modal
            showModal={showUnitModal}
            setShowModal={setShowUnitModal}
            header={edit ? "Update Unit" : "Add Unit"}
            types={types}
            edit={edit}
            size={"modal-md"}
            clearAction={clearAllUnit}
          >
            <CreateUnit dispatch={dispatch} postsPerPage={postsPerPage} setShowModal={setShowUnitModal} />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default Units;
