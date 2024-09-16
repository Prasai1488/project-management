import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import { clearAllPermission } from "../Redux/permissionSlice";
import { getAllPermissions, handleSearch } from "../Redux/thunk";
import CreatePermission from "./CreatePermission";
import "./permission.css";
import PermissionListing from "./PermissionListing";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "Permissions";
const types = "Permissions";

const Permissions = () => {
  const dispatch = useDispatch();
  const { permissions, isSuperuser } = useSelector((state) => state.auth);
  const loadingPermission = useSelector((state) => state.permission.loadingPermission);
  const permissionNames = useSelector((state) => state.permission.permissions);
  const count = useSelector((state) => state.permission.count);
  const edit = useSelector((state) => state.permission.edit);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [permissionCategory, setPermissionCategory] = useState([]);

  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);

  const [showFilter, setShowFilter] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search === "") {
      dispatch(getAllPermissions({ postsPerPage, permissionCategory: permissionCategory._id }));
    } else {
      dispatch(handleSearch({ search, postsPerPage }));
    }
  }, [postsPerPage, debouncedSearch, permissionCategory]);

  const createPermission = isSuperuser || permissions?.includes("") || true;

  return (
    <>
      <div className="listing-wrapper">
        <CommonPageHeader
          title={title}
          dispatch={dispatch}
          search={search}
          setSearch={setSearch}
          loading={loadingPermission}
          data={permissionNames}
          count={count}
          permissionCategory={permissionCategory}
          setPermissionCategory={setPermissionCategory}
          types={types}
        />

        {loadingPermission && <ListingSkeleton />}
        {!loadingPermission && <PermissionListing dispatch={dispatch} setPermissionModal={setShowPermissionModal} />}
      </div>
      <CommonCreateButton
        types={types}
        title={title}
        showModal={showPermissionModal}
        setShowModal={setShowPermissionModal}
        createPermission={createPermission}
      />
      {showPermissionModal && (
        <Suspense fallback={<div></div>}>
          <Modal
            showModal={showPermissionModal}
            setShowModal={setShowPermissionModal}
            header={edit ? "Update Permission" : "Add Permission"}
            types={types}
            edit={edit}
            size={"modal-lg"}
            clearAction={clearAllPermission}
          >
            <CreatePermission dispatch={dispatch} postsPerPage={postsPerPage} setShowModal={setShowPermissionModal} />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default Permissions;
