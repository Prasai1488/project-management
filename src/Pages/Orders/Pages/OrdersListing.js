import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ColumnResize from "react-table-column-resizer";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import { getNext, getSpecificOrders } from "../Redux/thunk";
import { useInfinteScroll } from "../../../Utils/useInfiniteScroll";
import { ordersEditSuccess } from "../Redux/ordersSlice";

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


 const ordersData =[
  {
    sn: "1000",
    order:"order1",
    customer: "Heamant",
    orderno: "OR-001",

    packedon:"2024-09-01",
    approvedno:"AP-001",
    dispatchno:"DP-001",
    status:"Approved"

    
    
  }
 ]

  const handleEdit = async (order) => {
    dispatch(ordersEditSuccess(order));
    setShowProductModal(true);
  };

  const handleInspection = async () => {
    await dispatch(getSpecificOrders());
    setShowOrderDetailsModal(true);
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

                  <th>ORDER</th>

                  <th>CUSTOMER</th>

                  <th>ORDERED NO</th>
                  <th>PACKED NO</th>
                  <th>APPROVED NO</th>
                  <th>DISPATCHED NO</th>
                  <th>STATUS</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {ordersData?.map((order, i) => {
                  const { status } = order;
                  return (
                    <tr key={Math.random} onDoubleClick={() => handleInspection(order)} style={{ cursor: "pointer" }}>
                      <td>{i + 1}</td>

                      <td>{order ? order.order.name : "N/A"}</td>
                      <td>{order ? order.customer : "N/A"}</td>
                      <td>{order ? order.order : "N/A"}</td>
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
      {showOrderDetailsModal && (
        <Modal
          showModal={showOrderDetailsModal}
          setShowModal={setShowOrderDetailsModal}
          header={"Order Details"}
          size={"modal-xl"}
        >
          <OrderDetails dispatch={dispatch} setShowModal={setShowOrderDetailsModal} onScroll={handleScroll} />
        </Modal>
      )}
    </>
  );
};

export default OrdersListing;
