import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import { clearAllMembers } from "../Redux/membersSlice";
import { getMembers, handleSearch } from "../Redux/thunk";
import CreateMember from "./CreateMember";
import "./members.css";
import MembersListing from "./MembersListing";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "Members";
const types = "Members";

const Members = () => {
  const dispatch = useDispatch();
  const { permissions, isSuperuser } = useSelector((state) => state.auth);
  const loadingMembers = useSelector((state) => state.members?.loadingMembers);
  const members = useSelector((state) => state.members?.members);
  const count = useSelector((state) => state.members?.count);
  const edit = useSelector((state) => state.members?.edit);
  const [showMembersModal, setShowMembersModal] = useState(false);

  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);

  const [showFilter, setShowFilter] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search === "") {
      dispatch(getMembers(postsPerPage));
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
          loading={loadingMembers}
          data={members}
          count={count}
        />

        {loadingMembers && <ListingSkeleton />}
        {!loadingMembers && <MembersListing dispatch={dispatch} setMembersModal={setShowMembersModal} />}
      </div>
      <CommonCreateButton
        types={types}
        title={title}
        showModal={showMembersModal}
        setShowModal={setShowMembersModal}
        createPermission={createPermission}
      />
      {showMembersModal && (
        <Suspense fallback={<div></div>}>
          <Modal
            showModal={showMembersModal}
            setShowModal={setShowMembersModal}
            header={edit ? "Update Member" : "Add Member"}
            types={types}
            edit={edit}
            size={"modal-lg"}
            clearAction={clearAllMembers}
          >
            <CreateMember dispatch={dispatch} postsPerPage={postsPerPage} setShowModal={setShowMembersModal} />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default Members;
