import React, { useState, useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrganization, handleSearch } from "../Redux/thunk";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import Organization from "./Organization";
import CreateOrganization from "./CreateOrganization";
import "./organization.css";
import { setShowModal } from "../../../Redux/Layout/layoutSlice.js";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton.js";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "Organization";
const types = "organization";

const OrganizationListing = () => {
  const dispatch = useDispatch();
  const { permissions, isSuperuser } = useSelector((state) => state.auth);
  const { loadingOrganization, count, organizations, edit } = useSelector((state) => state.organization);

  const { showModal } = useSelector((state) => state.layout);
  const [showUserSetupModal, setShowUserSetupModal] = useState(false);

  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [showFilter, setShowFilter] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search === "") {
      dispatch(getOrganization(postsPerPage));
    } else {
      dispatch(handleSearch({ search, postsPerPage }));
    }
  }, [postsPerPage, debouncedSearch]);
  const createPermission = isSuperuser || permissions?.includes("add_organization_setup");
  return (
    <>
      <div className="organization-wrapper">
        <CommonPageHeader
          title={title}
          showModal={showModal}
          types={types}
          search={search}
          setSearch={setSearch}
          loading={loadingOrganization}
          data={organizations}
          count={count}
        />

        {loadingOrganization && <ListingSkeleton />}
        {!loadingOrganization && (
          <Organization
            dispatch={dispatch}
            showModal={showModal}
            setPostsPerPage={setPostsPerPage}
            setShowUserSetupModal={setShowUserSetupModal}
          />
        )}
      </div>
      <CommonCreateButton
        types={types}
        showModal={showUserSetupModal}
        setShowModal={setShowUserSetupModal}
        createPermission={createPermission}
      />
      {showUserSetupModal && (
        <Suspense fallback={<div></div>}>
          <Modal
            dispatch={setShowModal}
            showModal={showUserSetupModal}
            setShowModal={setShowUserSetupModal}
            header={edit ? "Update Organization" : "Add Organization"}
            types={types}
            edit={edit}
            size={"modal-xl"}
          >
            <CreateOrganization
              dispatch={dispatch}
              showModal={showUserSetupModal}
              postsPerPage={postsPerPage}
              setShowUserSetupModal={setShowUserSetupModal}
            />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default OrganizationListing;
