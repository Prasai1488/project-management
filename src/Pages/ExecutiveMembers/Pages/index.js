import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import { getExecutiveMembers, handleSearch } from "../Redux/thunk";
import { clearAllExecutiveMembers } from "../Redux/executiveMemberSlice";
import CreateExecutiveMember from "./CreateExecutiveMember";
import "./executiveMembers.css";
import ExecutiveMembersListing from "./ExecutiveMemberListing";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "ExecutiveMembers";
const types = "ExecutiveMembers";

const ExecutiveExecutiveMembers = () => {
  const dispatch = useDispatch();
  const { permissions, isSuperuser } = useSelector((state) => state.auth);
  const loadingExecutiveMembers = useSelector((state) => state.executiveMembers.loadingExecutiveMembers);
  const executiveMembers = useSelector((state) => state.executiveMembers.executiveMembers);
  const count = useSelector((state) => state.executiveMembers.count);
  const edit = useSelector((state) => state.executiveMembers.edit);
  const [showExecutiveMembersModal, setShowExecutiveMembersModal] = useState(false);

  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);

  const [showFilter, setShowFilter] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search === "") {
      dispatch(getExecutiveMembers(postsPerPage));
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
          loading={loadingExecutiveMembers}
          data={executiveMembers}
          count={count}
        />

        {loadingExecutiveMembers && <ListingSkeleton />}
        {!loadingExecutiveMembers && <ExecutiveMembersListing dispatch={dispatch} setExecutiveMembersModal={setShowExecutiveMembersModal} />}
      </div>
      <CommonCreateButton
        types={types}
        title={title}
        showModal={showExecutiveMembersModal}
        setShowModal={setShowExecutiveMembersModal}
        createPermission={createPermission}
      />
      {showExecutiveMembersModal && (
        <Suspense fallback={<div></div>}>
          <Modal
            showModal={showExecutiveMembersModal}
            setShowModal={setShowExecutiveMembersModal}
            header={edit ? "Update Member" : "Add Member"}
            types={types}
            edit={edit}
            size={"modal-lg"}
            clearAction={clearAllExecutiveMembers}
          >
            <CreateExecutiveMember dispatch={dispatch} postsPerPage={postsPerPage} setShowModal={setShowExecutiveMembersModal} />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default ExecutiveExecutiveMembers;
