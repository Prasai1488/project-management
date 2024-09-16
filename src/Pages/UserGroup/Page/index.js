import React, { useState, useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearEditUserGroup } from "../Redux/userGroupSlice";
import { getUserGroup, handleSearch } from "../Redux/thunk";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import UserGroup from "./UserGroup";
import CreateUserGroup from "./CreateUserGroup";
import "./userGroup.css";
import { setShowModal } from "../../../Redux/Layout/layoutSlice.js";
const CommonCreateButton = lazy(() => import("../../../Components/CommonCreateButton/CommonCreateButton"));

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "User Group";
const types = "userGroup";

const UserGroupListing = () => {
  const dispatch = useDispatch();
  const { permissions, isSuperuser } = useSelector((state) => state.auth);
  const loadingUserGroup = useSelector((state) => state.userGroup.loadingUserGroup);
  const userGroups = useSelector((state) => state.userGroup.userGroups);
  const count = useSelector((state) => state.userGroup.count);
  const edit = useSelector((state) => state.userGroup.edit);
  const [showUserGroupModal, setShowUserGroupModal] = useState(false);
  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search === "") {
      dispatch(getUserGroup(postsPerPage));
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
          loading={loadingUserGroup}
          data={userGroups}
          count={count}
        />

        {loadingUserGroup && <ListingSkeleton />}
        {!loadingUserGroup && (
          <>
            <UserGroup dispatch={dispatch} setShowUserGroupModal={setShowUserGroupModal} />
            <CommonCreateButton
              types={types}
              showModal={showUserGroupModal}
              setShowModal={setShowUserGroupModal}
              tyes={types}
              createPermission={createPermission}
            />
          </>
        )}

        {/* <CommonCreateButton
          types={types}
          showModal={showUserGroupModal}
          setShowModal={setShowUserGroupModal}
          tyes={types}
        /> */}
      </div>

      {showUserGroupModal && (
        <Suspense fallback={<div></div>}>
          <Modal
            dispatch={setShowModal}
            showModal={showUserGroupModal}
            setShowModal={setShowUserGroupModal}
            header={edit ? "Update User Group" : "Add User Group"}
            types={types}
            edit={edit}
            size={"modal-lg"}
            clearAction={clearEditUserGroup}
          >
            <CreateUserGroup dispatch={dispatch} setShowModal={setShowUserGroupModal} postsPerPage={postsPerPage} />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default UserGroupListing;
