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
  setPage,
  page,
  postsPerPage,
}) => {
  const dispatch = useDispatch();
  const listRef = useRef(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Redux state selectors
  const next = useSelector((state) => state?.order?.next);
  const loadingNext = useSelector((state) => state?.order?.loadingNext);
  const orders = useSelector((state) => state?.order?.orders || []);

  // Infinite scroll hook
  const { handleScroll } = useInfinteScroll({
    loadingNext,
    next,
    getNext,
    setPostsPerPage,
    setPage,
  });

  // Fetch order details and open the modal
  const handleEdit = async (orders) => {
    // if (!orderId) {
    //   console.error("Invalid orderId:", orderId);
    //   return;
    // }

    dispatch(getSpecificOrders(orders));
    await setShowOrderDetailsModal(true);
    // .unwrap()
    // .then((data) => {
    //   setSelectedOrder(data);
    //   setShowOrderDetailsModal(true);
    // })
    // .catch((error) => {
    //   console.error("Error fetching order details:", error);
    // });
  };

  // Double-click handler for inspection
  const handleInspection = (order) => {
    if (!order || !order.id) {
      console.error("Invalid order or order ID");
      return;
    }
    handleEdit(order.id);
  };

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
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => {
                  const { id, userDetails, price, quantity, status, shippingAddress } = order;
                  return (
                    <tr key={id} onDoubleClick={() => handleInspection(order)} style={{ cursor: "pointer" }}>
                      <td>{index + 1}</td>
                      <td>{shippingAddress?.name}</td>
                      <td>{price}</td>
                      <td>{quantity}</td>
                      <td>{status}</td>
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
          <OrderDetails order={selectedOrder} />
        </Modal>
      )}
    </>
  );
};

export default OrdersListing;
