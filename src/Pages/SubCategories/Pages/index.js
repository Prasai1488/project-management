import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import { clearEditSubCategory } from "../Redux/subcategoriesSlice"; //
import { getAllSubCategories, handleSubCategorySearch } from "../Redux/thunk";
// import "./subcategory.css";
import SubCategoryListing from "./SubCategoriesListing";
import CreateSubCategory from "./CreateSubCategories";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "SubCategory";
const types = "SubCategory";

const SubCategory = () => {
  const dispatch = useDispatch();
  const { permissions, isSuperuser } = useSelector((state) => state.auth);
  const loadingSubCategory = useSelector((state) => state.subCategory.loadingSubCategory);
  const subCategories = useSelector((state) => state.subCategory.subCategories);
  const count = useSelector((state) => state.subCategory.count);
  const edit = useSelector((state) => state.subCategory.edit);
  const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);

  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [page, setPage] = useState(2);

  const debouncedSearch = useDebounce(search, 500);
  useEffect(() => {
    if (debouncedSearch === "") {
      dispatch(getAllSubCategories({ postsPerPage, page }));
    } else {
      dispatch(handleSubCategorySearch({ page, postsPerPage, search: debouncedSearch }));
    }
  }, [postsPerPage, debouncedSearch, page, dispatch]);

  const createPermission = isSuperuser || permissions?.includes("") || true;

  return (
    <>
      <div className="listing-wrapper">
        <CommonPageHeader
          title={title}
          dispatch={dispatch}
          search={search}
          setSearch={setSearch}
          loading={loadingSubCategory}
          data={subCategories}
          count={count}
          types={types}
        />

        {loadingSubCategory && <ListingSkeleton />}
        {!loadingSubCategory && (
          <SubCategoryListing
            dispatch={dispatch}
            setShowSubCategoryModal={setShowSubCategoryModal}
            postsPerPage={postsPerPage}
          />
        )}
      </div>
      <CommonCreateButton
        types={types}
        title={title}
        showModal={showSubCategoryModal}
        setShowModal={setShowSubCategoryModal}
        createPermission={createPermission}
      />
      {showSubCategoryModal && (
        <Suspense fallback={<div></div>}>
          <Modal
            showModal={showSubCategoryModal}
            setShowModal={setShowSubCategoryModal}
            header={edit ? "Update SubCategory" : "SubCategory"}
            types={types}
            edit={edit}
            size={"modal-lx"}
            clearAction={clearEditSubCategory}
          >
            <CreateSubCategory dispatch={dispatch} postsPerPage={postsPerPage} setShowModal={setShowSubCategoryModal} />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default SubCategory;
