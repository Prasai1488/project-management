import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import { clearEditCategory } from "../Redux/categorySlice"; // Adjust action to match Category slice
import CreateCategory from "./CreateCategory";
import "./category.css";
import CategoryListing from "./CategoryListing";
import { getAllCategories, handleCategorySearch } from "../Redux/thunk";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "Category";
const types = "Category";

const Category = () => {
  const dispatch = useDispatch();
  const { permissions, isSuperuser } = useSelector((state) => state.auth);
  const loadingCategory = useSelector((state) => state.category.loadingCategory);
  const categories = useSelector((state) => state.category.categories);
  const count = useSelector((state) => state.category.count);
  const edit = useSelector((state) => state.category.edit);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);



  useEffect(() => {
    if (debouncedSearch === "") {
      dispatch(getAllCategories({ postsPerPage, page }));
    } else {
      dispatch(handleCategorySearch({ page, postsPerPage, search: debouncedSearch }));
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
          loading={loadingCategory}
          data={categories}
          count={count}
          types={types}
        />

        {loadingCategory && <ListingSkeleton />}
        {!loadingCategory && (
          <CategoryListing
            dispatch={dispatch}
            setShowCategoryModal={setShowCategoryModal}
            postsPerPage={postsPerPage}
          />
        )}
      </div>
      <CommonCreateButton
        types={types}
        title={title}
        showModal={showCategoryModal}
        setShowModal={setShowCategoryModal}
        createPermission={createPermission}
      />
      {showCategoryModal && (
        <Suspense fallback={<div></div>}>
          <Modal
            showModal={showCategoryModal}
            setShowModal={setShowCategoryModal}
            header={edit ? "Update Category" : "Category"}
            types={types}
            edit={edit}
            size={"modal-md"}
            clearAction={clearEditCategory}
          >
            <CreateCategory dispatch={dispatch} postsPerPage={postsPerPage} setShowModal={setShowCategoryModal} />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default Category;
