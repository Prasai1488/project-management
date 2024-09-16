import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ColumnResize from "react-table-column-resizer";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import { getNext, getSpecificOrders } from "../Redux/thunk";
import { useInfinteScroll } from "../../../Utils/useInfiniteScroll";
import { ordersEditSuccess } from "../Redux/ordersSlice";

const OrdersListing = ({ setShowOrdersModal, setPostsPerPage, setPage, page, postsPerPage }) => {
  const dispatch = useDispatch();
  useState(false);
  const listRef = useRef(null);
  const next = useSelector((state) => state.order.next);
  const loadingNext = useSelector((state) => state.order?.loadingNext);
  const orders = useSelector((state) => state?.order?.orders);

  const { handleScroll } = useInfinteScroll({
    loadingNext: loadingNext,
    next,
    getNext,
    setPostsPerPage,
    setPage,
  });

  const handleEdit = async (order) => {
    dispatch(ordersEditSuccess(order));
    setShowProductModal(true);
  };

  const handleInspection = async () => {
    await dispatch(getSpecificOrders());
    setShowOrdersModal(true);
  };
  return (
    <>
      {orders && orders?.length > 0 ? (
        <div className="row">
          <div className="col-12 table-scrollable" onScroll={handleScroll} ref={listRef}>
            <table className="listing-table">
              <thead>
                <tr>
                  <th>#</th>

                  <th>PRODUCT NAME</th>

                  <th>HS CODE</th>

                  <th>CATERGORY</th>

                  <th>STATUS</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order, i) => {
                  const { status } = order;
                  return (
                    <tr key={Math.random} onDoubleClick={() => handleInspection(order)} style={{ cursor: "pointer" }}>
                      <td>{i + 1}</td>

                      <td>{order ? order.title : "N/A"}</td>
                      <td>{order ? order.price : "N/A"}</td>
                      <td>{order ? order.category : "N/A"}</td>
                      <td>{status ? status : "N/A"}</td>
                      <td>
                        <DetailActionButton type={"edit"} onClick={() => handleEdit(order)} />
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

export default OrdersListing;
