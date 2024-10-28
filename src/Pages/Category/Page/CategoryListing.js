import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import { getNextCategory, getAllCategories } from "../Redux/thunk";
import { categoriesEditSuccess } from "../Redux/categorySlice";
import { useInfinteScroll } from "../../../Utils/useInfiniteScroll";

const CategoryListing = ({ setShowCategoryModal, PostsPerPage, page }) => {
  const dispatch = useDispatch();
  const listRef = useRef(null);
  // Redux selectors to get state
  const next = useSelector((state) => state?.category?.next);
  const loadingNext = useSelector((state) => state?.category?.loadingNext);
  const categories = useSelector((state) => state?.category?.categories || []);
  const [postsPerPage, setPostsPerPage] = useState(20);

  // Fetch all categories on component mount
  useEffect(() => {
    dispatch(getAllCategories({ postsPerPage, offset }));
  }, [dispatch, postsPerPage, offset]);

  // Infinite Scroll logic
  const { handleScroll } = useInfinteScroll({
    loadingNext,
    next,
    getNext: getNextCategory,
    postsPerPage,
    setPage,
  });

  // Handle edit button click
  const handleEdit = (category) => {
    dispatch(categoriesEditSuccess(category));
    setShowCategoryModal(true);
  };

  return (
    <>
      {categories?.length > 0 ? (
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
                  const { id, name, status } = category;
                  return (
                    <tr key={id} style={{ cursor: "pointer" }}>
                      <td>{index + 1}</td>
                      <td>{name || "N/A"}</td>
                      <td>
                        <span className={`status ${status?.toLowerCase() || "unknown"}`}>{status || "N/A"}</span>
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
