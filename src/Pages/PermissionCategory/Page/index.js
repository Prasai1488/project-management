import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import { clearAllPermissionCategory } from "../Redux/permissionCategorySlice";
import { getAllPermissionCategorys, handleSearch } from "../Redux/thunk";
import CreatePermissionCategory from "./CreatePermissionCategory";
import "./permissionCategory.css";
import PermissionCategoryListing from "./PermissionCategoryListing";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "PermissionCategory";
const types = "PermissionCategorys";

const PermissionCategorys = () => {
  const dispatch = useDispatch();
  const { permissions, isSuperuser } = useSelector((state) => state.auth);
  const loadingPermissionCategory = useSelector((state) => state.permissionCategory.loadingPermissionCategory);
  const permissionCategorys = useSelector((state) => state.permissionCategory.permissionCategorys);
  const count = useSelector((state) => state.permissionCategory.count);
  const edit = useSelector((state) => state.permissionCategory.edit);
  const [showPermissionCategoryModal, setShowPermissionCategoryModal] = useState(false);

  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [page, setPage] = useState("1");

  const [showFilter, setShowFilter] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search === "") {
      dispatch(getAllPermissionCategorys({ postsPerPage, page }));
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
          loading={loadingPermissionCategory}
          data={permissionCategorys}
          count={count}
        />

        {loadingPermissionCategory && <ListingSkeleton />}
        {!loadingPermissionCategory && (
          <PermissionCategoryListing
            dispatch={dispatch}
            setPermissionCategoryModal={setShowPermissionCategoryModal}
            setPage={setPage}
            setPostsPerPage={setPostsPerPage}
          />
        )}
      </div>
      <CommonCreateButton
        types={types}
        title={title}
        showModal={showPermissionCategoryModal}
        setShowModal={setShowPermissionCategoryModal}
        createPermission={createPermission}
      />
      {showPermissionCategoryModal && (
        <Suspense fallback={<div></div>}>
          <Modal
            showModal={showPermissionCategoryModal}
            setShowModal={setShowPermissionCategoryModal}
            header={edit ? "Update PermissionCategory" : "Add PermissionCategory"}
            types={types}
            edit={edit}
            size={"modal-lg"}
            clearAction={clearAllPermissionCategory}
          >
            <CreatePermissionCategory
              dispatch={dispatch}
              postsPerPage={postsPerPage}
              setShowModal={setShowPermissionCategoryModal}
            />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default PermissionCategorys;
