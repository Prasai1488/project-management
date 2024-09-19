import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ColumnResize from "react-table-column-resizer";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import { getNext, getSpecificOrders } from "../Redux/thunk";
import { useInfinteScroll } from "../../../Utils/useInfiniteScroll";
import { ordersEditSuccess } from "../Redux/ordersSlice";
import Modal from "../../../Components/Modal/Modal";
import OrderDetails from "./OrderDetails";

const OrdersListing = ({
  setShowOrderDetailsModal,
  showOrderDetailsModal,
  setPostsPerPage,
  setPage,
  page,
  postsPerPage,
}) => {
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

  const ordersData = [
    {
      order: "order1",
      customer: "Hemant",
      orderno: "2024-09-01",
      packedon: "2024-09-01",
      approvedno: "2024-09-01",
      dispatchno: "2024-09-01",
      status: "Resolved",
    },
  ];

  const handleEdit = async (order) => {
    dispatch(ordersEditSuccess(order));
    setShowOrderDetailsModal(true);
  };

  const handleInspection = async () => {
    await dispatch(getSpecificOrders());
    setShowOrderDetailsModal(true);
  };

  return (
    <>
      {ordersData && ordersData?.length > 0 ? (
        <div className="row">
          <div className="col-12 table-scrollable" onScroll={handleScroll} ref={listRef}>
            <table className="listing-table">
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>ORDER</th>
                  <th>CUSTOMER</th>
                  <th>ORDERED ON</th>
                  <th>PACKED ON</th>
                  <th>APPROVED ON</th>
                  <th>DISPATCHED ON</th>
                  <th>STATUS</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {ordersData.map((order, index) => {
                  return (
                    <tr key={index} onDoubleClick={() => handleInspection(order)} style={{ cursor: "pointer" }}>
                      <td>{index + 1}</td>
                      <td>{order.order}</td>
                      <td>{order.customer}</td>
                      <td>{order.orderno}</td>
                      <td>{order.approvedno}</td>
                      <td>{order.packedon}</td>
                      <td>{order.dispatchno}</td>
                      <td>{order.status}</td>
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
      {showOrderDetailsModal && (
        <Modal
          showModal={showOrderDetailsModal}
          setShowModal={setShowOrderDetailsModal}
          header={"Orders"}
          size={"modal-lg"}
        >
          <OrderDetails dispatch={dispatch} setShowModal={setShowOrderDetailsModal} onScroll={handleScroll} />
        </Modal>
      )}
    </>
  );
};

export default OrdersListing;
