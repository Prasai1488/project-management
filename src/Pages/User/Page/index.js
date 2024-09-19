import React, { useState, useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearEditUser } from "../Redux/userSlice";
import { getUser, handleSearch } from "../Redux/thunk";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import User from "./User";
import CreateUser from "./CreateUser";
import "./user.css";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import { setShowModal } from "../../../Redux/Layout/layoutSlice";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "User";
const types = "user";

const UserListing = () => {
  const dispatch = useDispatch();
  const loadingUser = useSelector((state) => state.user.loadingUser);

  const { permissions, isSuperuser, users } = useSelector((state) => state.auth);
  const count = useSelector((state) => state.user.count);
  const edit = useSelector((state) => state.user.edit);
  const { showModal } = useSelector((state) => state.layout);
  const [showUserModal, setShowUserModal] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(20);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search === "") {
      dispatch(getUser({ postsPerPage, page }));
    } else {
      dispatch(handleSearch({ search, postsPerPage, page }));
    }
    // eslint-disable-next-line
  }, [postsPerPage, debouncedSearch]);
  const createPermission = isSuperuser || permissions?.includes("add_user") || true;
  return (
    <>
      <div className="listing-wrapper">
        <CommonPageHeader
          title={title}
          dispatch={dispatch}
          showModal={showModal}
          search={search}
          setSearch={setSearch}
          loading={loadingUser}
          data={users}
          count={count}
        />

        {loadingUser && <ListingSkeleton />}
        {!loadingUser && <User dispatch={dispatch} setShowUserModal={setShowUserModal} />}
        <CommonCreateButton
          types={types}
          showModal={showUserModal}
          setShowModal={setShowUserModal}
          createPermission={createPermission}
        />
      </div>
      {showUserModal && (
        <Suspense fallback={<div></div>}>
          <Modal
            dispatch={setShowModal}
            showModal={showUserModal}
            setShowModal={setShowUserModal}
            header={edit ? "Update User Details" : "User Details"}
            types={types}
            edit={edit}
            size={"modal-lg"}
            clearAction={clearEditUser}
          >
            <CreateUser dispatch={dispatch} setShowModal={setShowUserModal} postsPerPage={postsPerPage} />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default UserListing;
