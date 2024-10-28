import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import { getNextProductPage, getAllProducts, getSpecificProduct } from "../Redux/thunk"; // Assuming you have thunks for products
import { clearEditProduct, productsEditSuccess } from "../Redux/ProductSlice";
import { useInfinteScroll } from "../../../Utils/useInfiniteScroll";

const ProductListing = ({ setShowProductModal, setPage }) => {
  const dispatch = useDispatch();
  const listRef = useRef(null);

  // Redux selectors to get state
  const next = useSelector((state) => state?.product?.next);
  const loadingNext = useSelector((state) => state?.product?.loadingNext);
  const products = useSelector((state) => state?.product?.products || []);
  console.log(products, "this is products");

  const [postsPerPage, setPostsPerPage] = useState(20);
  const [offset, setOffset] = useState(1);
  const [orderBy, setOrderBy] = useState("-id");

  // Fetch all products on component mount
  useEffect(() => {
    dispatch(getAllProducts({ limit: postsPerPage, offset }));
  }, [dispatch, postsPerPage, offset]);

  // Infinite Scroll logic
  const { handleScroll } = useInfinteScroll({
    loadingNext,
    next,
    getNext: getNextProductPage,
    setPostsPerPage,
    setPage,
  });

  // Handle edit button click
  // const handleEdit = async (product) => {
  //   dispatch(productsEditSuccess(product));
  //   await setShowProductModal(true);
  // };

  const handleEdit = async (product) => {
    dispatch(productsEditSuccess());
    dispatch(getSpecificProduct(product));
    await setShowProductModal(true);
  };

  return (
    <>
      {products?.length > 0 ? (
        <div className="row">
          <div className="col-12 table-scrollable" onScroll={handleScroll} ref={listRef}>
            <table className="listing-table">
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>NAME</th>
                  <th>CATEGORY</th>
                  <th>PRICE</th>
                  <th>STATUS</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => {
                  const { id, name, category, price, status } = product;
                  return (
                    <tr key={id} style={{ cursor: "pointer" }}>
                      <td>{index + 1}</td>
                      <td>{name || "N/A"}</td>
                      <td>{category?.name || "N/A"}</td>
                      <td>{price ? `$${price}` : "N/A"}</td>
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

export default ProductListing;
