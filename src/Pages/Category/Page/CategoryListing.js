import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import { getNextCategory } from "../Redux/thunk";
import { categoriesEditSuccess } from "../Redux/categorySlice";


const CategoryListing = ({ setShowCategoryModal, postsPerPage }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const listRef = useRef(null);

  const next = useSelector((state) => state?.category?.next);
  const loadingNext = useSelector((state) => state?.category?.loadingNext);
  const categories = useSelector((state) => state?.category?.categories || []);


  // Fetch all categories on component mount
  // useEffect(() => {
  //   dispatch(getAllCategories({ postsPerPage, offset }));
  // }, [dispatch, postsPerPage, offset]);

  // Infinite Scroll logic
  const scrollToEnd = () => {
    console.log("srcoll");
    setPage((prevPage) => prevPage + 1);
    dispatch(getNextCategory({ postsPerPage, page: page + 1 }));
  };
  const handleScroll = (event) => {
    if (event.currentTarget.scrollTop + event.currentTarget.offsetHeight <= event.currentTarget.scrollHeight) {
      if (!loadingNext && next !== null) {
        scrollToEnd(next);
      }
    }
  };

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

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, i) => {
                  const { id, name } = category;
                  return (
                    <tr key={id} style={{ cursor: "pointer" }}>
                      <td>{i + 1}</td>
                      <td>{name || "N/A"}</td>

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


