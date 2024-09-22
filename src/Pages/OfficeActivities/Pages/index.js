import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import { getOfficeActivities, handleSearch } from "../Redux/thunk";
import { clearAllOfficeActivities } from "../Redux/officeActivitiesSlice";
import CreateOfficeActivities from "./CreateOfficeActivities";
import "./officeActivities.css";
import OfficeActivitiesListing from "./OfficeActivitiesListing";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "OfficeActivities";
const types = "OfficeActivities";

const OfficeActivities = () => {
  const dispatch = useDispatch();
  const { permissions, isSuperuser } = useSelector((state) => state.auth);
  const loadingOfficeActivities = useSelector((state) => state.officeActivities.loadingOfficeActivities);
  const officeActivitiess = useSelector((state) => state.officeActivities.officeActivities);
  const count = useSelector((state) => state.officeActivities.count);
  const edit = useSelector((state) => state.officeActivities.edit);
  const [showOfficeActivitiesModal, setShowOfficeActivitiesModal] = useState(false);

  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);

  const [showFilter, setShowFilter] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search === "") {
      dispatch(getOfficeActivities(postsPerPage));
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
          loading={loadingOfficeActivities}
          data={officeActivitiess}
          count={count}
        />

        {loadingOfficeActivities && <ListingSkeleton />}
        {!loadingOfficeActivities && (
          <OfficeActivitiesListing dispatch={dispatch} setOfficeActivitiesModal={setShowOfficeActivitiesModal} />
        )}
      </div>
      <CommonCreateButton
        types={types}
        title={title}
        showModal={showOfficeActivitiesModal}
        setShowModal={setShowOfficeActivitiesModal}
        createPermission={createPermission}
      />
      {showOfficeActivitiesModal && (
        <Suspense fallback={<div></div>}>
          <Modal
            showModal={showOfficeActivitiesModal}
            setShowModal={setShowOfficeActivitiesModal}
            header={edit ? "Update OfficeActivities" : "Add OfficeActivities"}
            types={types}
            edit={edit}
            size={"modal-lg"}
            clearAction={clearAllOfficeActivities}
          >
            <CreateOfficeActivities
              dispatch={dispatch}
              postsPerPage={postsPerPage}
              setShowModal={setShowOfficeActivitiesModal}
            />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default OfficeActivities;
