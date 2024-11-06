import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import ColumnResize from "react-table-column-resizer";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import { getNext } from "../Redux/thunk";
import { productEditSuccess } from "../Redux/ProductSlice";
const ProductListing = ({ dispatch, setShowProductModal, postsPerPage }) => {
  const [page, setPage] = useState(1);
  const listRef = useRef(null);
  const next = useSelector((state) => state?.product?.next);
  const loadingNext = useSelector((state) => state?.product?.loadingNext);
  const products = useSelector((state) => state?.product?.products);
  console.log(next, loadingNext);
  const scrollToEnd = () => {
    setPage((prevPage) => prevPage + 1);
    dispatch(getNext({ postsPerPage, page: page + 1 }));
  };
  const handleScroll = (event) => {
    if (event.currentTarget.scrollTop + event.currentTarget.offsetHeight === event.currentTarget.scrollHeight) {
      // if (!loadingNext && next !== null) {
      //   scrollToEnd(next);
      // }
      scrollToEnd(next);
    }
  };
  const handleEdit = async (product) => {
    dispatch(productEditSuccess(product));
    setShowProductModal(true);
  };
  return (
    <>
      {products?.length > 0 ? (
        <div className="row">
          <div className="col-12 table-scrollable" onScroll={handleScroll} ref={listRef}>
            <table className="listing-table">
              <thead>
                <tr>
                  <th>SN</th>
                  <ColumnResize id={1} className="columnResizer" />
                  <th>Image</th>
                  <ColumnResize id={2} className="columnResizer" minWidth={120} />
                  <th>Code</th>
                  <ColumnResize id={3} className="columnResizer" minWidth={120} />
                  <th>Name</th>
                  <ColumnResize id={4} className="columnResizer" minWidth={120} />
                  <th>Category</th>
                  <ColumnResize id={5} className="columnResizer" minWidth={120} />
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product, i) => {
                  const { id, name, code, category, image } = product;
                  const categoryName = category?.name || "N/A";
                  return (
                    <tr key={id} onDoubleClick={() => handleEdit(product)} style={{ cursor: "pointer" }}>
                      <td>{i + 1}</td>
                      <td className="column_resizer_body" />
                      <td>
                        {image ? (
                          <img src={image} alt={name} style={{ objectFit: "contain", width: "50px", height: "50px" }} />
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td className="column_resizer_body" />
                      <td>{code || "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>{name}</td>
                      <td className="column_resizer_body" />
                      <td>{categoryName}</td>
                      <td className="column_resizer_body" />
                      <td>
                        <DetailActionButton type={"edit"} onClick={() => handleEdit(product)} />
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
