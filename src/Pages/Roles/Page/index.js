import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import { setShowModal } from "../../../Redux/Layout/layoutSlice.js";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import { clearEditRole } from "../Redux/roleSlice";
import { getRole, handleSearch } from "../Redux/thunk";
import CreateRole from "./CreateRole";
import "./role.css";
import Role from "./Roles";
const CommonCreateButton = lazy(() => import("../../../Components/CommonCreateButton/CommonCreateButton"));

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "Role";
const types = "role";

const RoleListing = () => {
  const dispatch = useDispatch();
  const { permissions, isSuperuser } = useSelector((state) => state.auth);
  const loadingRole = useSelector((state) => state.role.loadingRole);
  const roles = useSelector((state) => state.role.roles);
  const count = useSelector((state) => state.role.count);
  const edit = useSelector((state) => state.role.edit);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search === "") {
      dispatch(getRole(postsPerPage));
    } else {
      dispatch(handleSearch({ search, postsPerPage }));
    }
    // eslint-disable-next-line
  }, [postsPerPage, debouncedSearch]);
  const createPermission = isSuperuser || permissions?.includes("add_user_group");
  return (
    <>
      <div className="listing-wrapper">
        <CommonPageHeader
          title={title}
          dispatch={dispatch}
          search={search}
          setSearch={setSearch}
          loading={loadingRole}
          data={roles}
          count={count}
        />

        {loadingRole && <ListingSkeleton />}
        {!loadingRole && (
          <>
            <Role dispatch={dispatch} setShowRoleModal={setShowRoleModal} />
            <CommonCreateButton
              types={types}
              showModal={showRoleModal}
              setShowModal={setShowRoleModal}
              tyes={types}
              createPermission={createPermission}
            />
          </>
        )}

        {/* <CommonCreateButton
          types={types}
          showModal={showRoleModal}
          setShowModal={setShowRoleModal}
          tyes={types}
        /> */}
      </div>

      {showRoleModal && (
        <Suspense fallback={<div></div>}>
          <Modal
            dispatch={setShowModal}
            showModal={showRoleModal}
            setShowModal={setShowRoleModal}
            header={edit ? "Update Role" : "Add Role"}
            types={types}
            edit={edit}
            size={"modal-lg"}
            clearAction={clearEditRole}
          >
            <CreateRole dispatch={dispatch} setShowModal={setShowRoleModal} postsPerPage={postsPerPage} />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default RoleListing;
