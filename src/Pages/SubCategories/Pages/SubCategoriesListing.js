import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import { getNextSubCategory, getAllSubCategories, getSpecificSubCategory } from "../Redux/thunk";
import { subCategoriesEditSuccess } from "../Redux/subcategoriesSlice";
import { useInfinteScroll } from "../../../Utils/useInfiniteScroll";
import { getSpecificCategory } from "../../Category/Redux/thunk";

const SubCategoryListing = ({ setShowSubCategoryModal, PostsPerPage, page }) => {
  const dispatch = useDispatch();
  const listRef = useRef(null);

  // Redux selectors to get state
  const next = useSelector((state) => state?.subCategory?.next);
  const loadingNext = useSelector((state) => state?.subCategory?.loadingNext);
  const subCategories = useSelector((state) => state?.subCategory?.subCategories || []);

  // Fetch all subcategories on component mount
  useEffect(() => {
    dispatch(getAllSubCategories({ PostsPerPage, page }));
  }, [dispatch]);

  // Infinite Scroll logic
  const { handleScroll } = useInfinteScroll({
    loadingNext,
    next,
    getNext: getNextSubCategory,
    PostsPerPage,
    page,
  });

  // Handle edit button click
  const handleEdit = async (subCategory) => {
    dispatch(getSpecificSubCategory(subCategory));
    await setShowSubCategoryModal(true);
  };

  return (
    <>
      {subCategories.length > 0 ? (
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
                {subCategories.map((subCategory, index) => {
                  const { id, name, status } = subCategory;
                  return (
                    <tr key={id} style={{ cursor: "pointer" }}>
                      <td>{index + 1}</td>
                      <td>{name || "N/A"}</td>
                      <td>
                        <span className={`status ${status?.toLowerCase() || "unknown"}`}>{status || "N/A"}</span>
                      </td>
                      <td>
                        <DetailActionButton type="edit" onClick={() => handleEdit(id)} />
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

export default SubCategoryListing;