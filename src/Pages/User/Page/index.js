import React, { useState, useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearEditUser } from "../Redux/userSlice";
import { getUser, handleSearch } from "../Redux/thunk";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import UserListing from "./User";
import CreateUser from "./CreateUser";
import "./user.css";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import { setShowModal } from "../../../Redux/Layout/layoutSlice";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "User";
const types = "user";

const User = () => {
  const dispatch = useDispatch();
  const loadingUser = useSelector((state) => state.user.loadingUser);

  // const { permissions, isSuperuser, users } = useSelector((state) => state.auth);
  const users = useSelector((state) => state.user.users);
  const count = useSelector((state) => state.user.count);
  const edit = useSelector((state) => state.user.edit);
  const { showModal } = useSelector((state) => state.layout);
  const [showUserModal, setShowUserModal] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(20);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch === "") {
      dispatch(getUser({ postsPerPage, page }));
    } else {
      dispatch(handleSearch({ page, postsPerPage, search: debouncedSearch }));
    }
    // eslint-disable-next-line
  }, [postsPerPage, debouncedSearch, page, dispatch]);
  
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
        {!loadingUser && <UserListing dispatch={dispatch} setShowUserModal={setShowUserModal} postsPerPage={postsPerPage} />}

        <CommonCreateButton
          types={types}
          showModal={showUserModal}
          setShowModal={setShowUserModal}
          createPermission={true}
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

export default User;
