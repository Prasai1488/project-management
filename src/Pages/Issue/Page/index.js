import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import { clearAllIssue } from "../Redux/issueSlice";
import { getAllIssues, handleSearch } from "../Redux/thunk";
import CreateIssue from "./CreateIssue";
import "./issue.css";
import IssueListing from "./IssueListing";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "Issues";
const types = "Issues";

const Issues = () => {
  const dispatch = useDispatch();
  const { permissions, isSuperuser } = useSelector((state) => state.auth);
  const loadingIssue = useSelector((state) => state.issue.loadingIssue);
  const issues = useSelector((state) => state.issue.issues);
  const count = useSelector((state) => state.issue.count);
  const edit = useSelector((state) => state.issue.edit);
  const [showIssueModal, setShowIssueModal] = useState(false);

  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [page, setPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search === "") {
      dispatch(getAllIssues({ postsPerPage, page }));
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
          loading={loadingIssue}
          data={issues}
          count={count}
        />

        {loadingIssue && <ListingSkeleton />}
        {!loadingIssue && (
          <IssueListing
            dispatch={dispatch}
            setIssueModal={setShowIssueModal}
            setPage={setPage}
            setPostsPerPage={setPostsPerPage}
          />
        )}
      </div>
      <CommonCreateButton
        types={types}
        title={title}
        showModal={showIssueModal}
        setShowModal={setShowIssueModal}
        createPermission={createPermission}
      />
      {showIssueModal && (
        <Suspense fallback={<div></div>}>
          <Modal
            showModal={showIssueModal}
            setShowModal={setShowIssueModal}
            header={edit ? "Update Issue" : "Add Issue"}
            types={types}
            edit={edit}
            size={"modal-md"}
            clearAction={clearAllIssue}
          >
            <CreateIssue
              dispatch={dispatch}
              postsPerPage={postsPerPage}
              setShowModal={setShowIssueModal}
              type={title}
            />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default Issues;
