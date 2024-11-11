import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import { getNext, getSpecificOrders } from "../Redux/thunk";
import { useInfinteScroll } from "../../../Utils/useInfiniteScroll";
import Modal from "../../../Components/Modal/Modal";
import OrderDetails from "./OrderDetails";

const OrdersListing = ({
  setShowOrderDetailsModal,
  showOrderDetailsModal,
  setPostsPerPage,
  
  postsPerPage,
}) => {
  const dispatch = useDispatch();
  const listRef = useRef(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [page, setPage] = useState(1);

  // Redux state selectors
  const next = useSelector((state) => state?.order?.next);
  console.log("Next URL in component:", next);
  const loadingNext = useSelector((state) => state?.order?.loadingNext);
  const orders = useSelector((state) => state?.order?.orders || []);

  // Infinite scroll hook
  const scrollToEnd = () => {
    console.log("srcoll");
    setPage((prevPage) => prevPage + 1);
    dispatch(getNext({ postsPerPage, page: page + 1 }));
  };
  const handleScroll = (event) => {
    if (event.currentTarget.scrollTop + event.currentTarget.offsetHeight <= event.currentTarget.scrollHeight) {
      if (!loadingNext && next !== null) {
        scrollToEnd(next);
      }
    }
  };

  const handleEdit = async (orders) => {
    dispatch(getSpecificOrders(orders));
    await setShowOrderDetailsModal(true);
  };

  const handleInspection = (order) => {
    if (!order || !order.id) {
      console.error("Invalid order or order ID");
      return;
    }
    handleEdit(order.id);
  };
  function capitalize(str) {
    if (typeof str !== "string") {
      throw new TypeError("Expected a string");
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <>
      {orders.length > 0 ? (
        <div className="row">
          <div className="col-12 table-scrollable" onScroll={handleScroll} ref={listRef}>
            <table className="listing-table">
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Product</th>
                  <th>Net Quantity</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => {
                  const { id, userDetails, price, cartItem, quantity, status, shippingAddress } = order;
                  return (
                    <tr key={id} onDoubleClick={() => handleInspection(order)} style={{ cursor: "pointer" }}>
                      <td>{index + 1}</td>
                      <td>{shippingAddress?.name}</td>
                      <td>{parseFloat(price).toFixed(2)}</td>
                      <td>{cartItem.length}</td>
                      <td>{quantity}</td>
                      <td>
                        <span
                          className={
                            status === "delivered" || status === "self_picked"
                              ? "badge bg-success"
                              : status === "pending"
                              ? "badge bg-warning"
                              : status === "approved"
                              ? "badge bg-primary"
                              : status === "dispatched"
                              ? "badge bg-secondary"
                              : status === "cancelled"
                              ? "badge bg-danger"
                              : "badge bg-dark" // Default for unknown statuses
                          }
                        >
                          {capitalize(status)}
                        </span>
                      </td>
                      <td>
                        <DetailActionButton type="edit" onClick={() => handleEdit(order.id)} />
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
          header="Order Details"
          size="modal-lg"
        >
          <OrderDetails
            order={selectedOrder}
            setShowModal={setShowOrderDetailsModal}
            postsPerPage={postsPerPage}
            page={page}
          />
        </Modal>
      )}
    </>
  );
};

export default OrdersListing;
