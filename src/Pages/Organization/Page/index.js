import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import { clearEditOrganization } from "../Redux/organizationSlice";
import { getAllOrganizations, handleOrganizationSearch } from "../Redux/thunk";
import CreateOrganization from "./CreateOrganization";
import "./organization.css";
import OrganizationListing from "./OrganizationListing";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "Organization";
const types = "Organization";

const Organization = () => {
  const dispatch = useDispatch();
  const { permissions, isSuperuser } = useSelector((state) => state.auth);
  const loadingOrganization = useSelector((state) => state.organization.loadingOrganization);
  const organizations = useSelector((state) => state.organization.organizations);
  const count = useSelector((state) => state.organization.count);
  const edit = useSelector((state) => state.organization.edit);
  const [showOrganizationModal, setShowOrganizationModal] = useState(false);

  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search === "") {
      dispatch(
        getAllOrganizations({
          postsPerPage,
          page,
        })
      );
    } else {
      dispatch(handleOrganizationSearch({ search, postsPerPage }));
    }
  }, [postsPerPage, debouncedSearch, page, dispatch]);

  const createPermission = isSuperuser || permissions?.includes("create_organization") || true;

  return (
    <>
      <div className="listing-wrapper">
        <CommonPageHeader
          title={title}
          dispatch={dispatch}
          search={search}
          setSearch={setSearch}
          loading={loadingOrganization}
          data={organizations}
          count={count}
          types={types}
        />

        {loadingOrganization && <ListingSkeleton />}
        {!loadingOrganization && (
          <OrganizationListing
            dispatch={dispatch}
            setShowOrganizationModal={setShowOrganizationModal}
            setPostsPerPage={setPostsPerPage}
            setPage={setPage}
            postsPerPage={postsPerPage}
            page={page}
          />
        )}
      </div>
      <CommonCreateButton
        types={types}
        title={title}
        showModal={showOrganizationModal}
        setShowModal={setShowOrganizationModal}
        createPermission={createPermission}
      />
      {showOrganizationModal && (
        <Suspense fallback={<div></div>}>
          <Modal
            showModal={showOrganizationModal}
            setShowModal={setShowOrganizationModal}
            header={edit ? "Update Organization" : "Organization Setup"}
            types={types}
            edit={edit}
            size={"modal-lg"}
            clearAction={clearEditOrganization}
          >
            <CreateOrganization
              dispatch={dispatch}
              postsPerPage={postsPerPage}
              setShowModal={setShowOrganizationModal}
            />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default Organization;
