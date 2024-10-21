import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import { getNextCategory, getAllCategories } from "../Redux/thunk";
import { categoriesEditSuccess } from "../Redux/categorySlice";
import { useInfinteScroll } from "../../../Utils/useInfiniteScroll";

const CategoryListing = ({ setShowCategoryModal, setPostsPerPage, setPage }) => {
  const dispatch = useDispatch();
  const listRef = useRef(null);
  const next = useSelector((state) => state.category.next);
  const loadingNext = useSelector((state) => state.category?.loadingNext);
  const categories = useSelector((state) => state.category?.categories);

  console.log("categories", categories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const { handleScroll } = useInfinteScroll({
    loadingNext,
    next,
    getNext: getNextCategory,
    setPostsPerPage,
    setPage,
  });

  const handleEdit = (category) => {
    dispatch(categoriesEditSuccess(category));
    setShowCategoryModal(true);
  };

  return (
    <>
      {categories && categories.length > 0 ? (
        <div className="row">
          <div className="col-12 table-scrollable" onScroll={handleScroll} ref={listRef}>
            <table className="listing-table">
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>NAME</th>
                  <th>STATUS</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => {
                  const { _id, name, status } = category;
                  return (
                    <tr key={_id} style={{ cursor: "pointer" }}>
                      <td>{index + 1}</td>
                      <td>{name || "N/A"}</td>
                      <td>
                        <span className={`status ${status ? status.toLowerCase() : "unknown"}`}>{status || "N/A"}</span>
                      </td>
                      <td>
                        <DetailActionButton type="edit" onClick={() => handleEdit(category)} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {loadingNext && (
              <div className="w-100 d-flex justify-content-center align-items-center py-4">
                <div className="spinner-border text-danger" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <NoData />
      )}
    </>
  );
};

export default CategoryListing;
