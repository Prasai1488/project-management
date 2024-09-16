import React, { useState, useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllUnit } from "../Redux/unitSlice";
import { getUnit, handleSearch } from "../Redux/thunk";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import Unit from "./Unit";
import CreateUnit from "./CreateUnit";
import "./unit.css";
import { setShowModal } from "../../../Redux/Layout/layoutSlice";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "Item Unit";
const types = "unit";

const UnitListing = () => {
  const dispatch = useDispatch();
  const { permissions, isSuperuser } = useSelector((state) => state.auth);
  const loadingUnit = useSelector((state) => state.unit.loadingUnit);
  const units = useSelector((state) => state.unit.units);
  const count = useSelector((state) => state.unit.count);
  const edit = useSelector((state) => state.unit.edit);
  const [showUnitModal, setShowUnitModal] = useState(false);

  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);

  const [showFilter, setShowFilter] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search === "") {
      dispatch(getUnit(postsPerPage));
    } else {
      dispatch(handleSearch({ search, postsPerPage }));
    }
  }, [postsPerPage, debouncedSearch]);

  const createPermission = isSuperuser || permissions?.includes("add_unit");

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
        {!loadingUnit && <Unit dispatch={dispatch} setUnitModal={setShowUnitModal} />}
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

export default UnitListing;
