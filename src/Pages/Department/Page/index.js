import React, { useState, useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllDepartment } from "../Redux/departmentSlice";
import { getDepartment, handleSearch } from "../Redux/thunk";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import Department from "./Department";
import CreateDepartment from "./CreateDepartment";
import "./department.css";
import { setShowModal } from "../../../Redux/Layout/layoutSlice";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "Department";
const types = "department";

const DepartmentListing = () => {
  const dispatch = useDispatch();
  const loadingDepartment = useSelector((state) => state.department.loadingDepartment);
  const departments = useSelector((state) => state.department.departments);
  const count = useSelector((state) => state.department.count);
  const edit = useSelector((state) => state.department.edit);
  const { showModal } = useSelector((state) => state.layout);
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);

  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);

  const [showFilter, setShowFilter] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search === "") {
      dispatch(getDepartment(postsPerPage));
    } else {
      dispatch(handleSearch({ search, postsPerPage }));
    }
  }, [postsPerPage, debouncedSearch]);

  return (
    <>
      <div className="listing-wrapper">
        <CommonPageHeader
          title={title}
          dispatch={dispatch}
          showModal={showModal}
          search={search}
          setSearch={setSearch}
          loading={loadingDepartment}
          data={departments}
          count={count}
        />

        {loadingDepartment && <ListingSkeleton />}
        {!loadingDepartment && (
          <Department
            dispatch={dispatch}
            showModal={showModal}
            setPostsPerPage={setPostsPerPage}
            setDepartmentModal={setShowDepartmentModal}
          />
        )}
      </div>
      <CommonCreateButton types={types} showModal={showDepartmentModal} setShowModal={setShowDepartmentModal} />
      {showDepartmentModal && (
        <Suspense fallback={<div></div>}>
          <Modal
            dispatch={setShowModal}
            showModal={showDepartmentModal}
            setShowModal={setShowDepartmentModal}
            header={edit ? "Update Department" : "Add Department"}
            types={types}
            edit={edit}
            size={"modal-md"}
            clearAction={clearAllDepartment}
          >
            <CreateDepartment
              dispatch={dispatch}
              showModal={showDepartmentModal}
              postsPerPage={postsPerPage}
              setShowModal={setShowDepartmentModal}
            />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default DepartmentListing;
