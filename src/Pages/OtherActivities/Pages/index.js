import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import { clearAllOtherActivities } from "../Redux/otherActivitiesSlice";
import { getOtherActivities, handleSearch } from "../Redux/thunk";
import CreateOtherActivities from "./CreateOtherActivities";
import "./otherActivities.css";
import OtherActivitiesListing from "./OtherActivitiesListing";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "OtherActivities";
const types = "OtherActivities";

const OtherActivities = () => {
  const dispatch = useDispatch();
  const { permissions, isSuperuser } = useSelector((state) => state.auth);
  const loadingOtherActivities = useSelector((state) => state.otherActivities.loadingOtherActivities);
  const otherActivities = useSelector((state) => state.otherActivities.OtherActivities);
  const count = useSelector((state) => state.otherActivities.count);
  const edit = useSelector((state) => state.otherActivities.edit);
  const [showOtherActivitiesModal, setShowOtherActivitiesModal] = useState(false);

  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);

  const [showFilter, setShowFilter] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search === "") {
      dispatch(getOtherActivities(postsPerPage));
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
          loading={loadingOtherActivities}
          data={otherActivities}
          count={count}
        />

        {loadingOtherActivities && <ListingSkeleton />}
        {!loadingOtherActivities && (
          <OtherActivitiesListing dispatch={dispatch} setOtherActivitiesModal={setShowOtherActivitiesModal} />
        )}
      </div>
      <CommonCreateButton
        types={types}
        title={title}
        showModal={showOtherActivitiesModal}
        setShowModal={setShowOtherActivitiesModal}
        createPermission={createPermission}
      />
      {showOtherActivitiesModal && (
        <Suspense fallback={<div></div>}>
          <Modal
            showModal={showOtherActivitiesModal}
            setShowModal={setShowOtherActivitiesModal}
            header={edit ? "Update OtherActivities" : "Add OtherActivities"}
            types={types}
            edit={edit}
            size={"modal-lg"}
            clearAction={clearAllOtherActivities}
          >
            <CreateOtherActivities
              dispatch={dispatch}
              postsPerPage={postsPerPage}
              setShowModal={setShowOtherActivitiesModal}
            />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default OtherActivities;
