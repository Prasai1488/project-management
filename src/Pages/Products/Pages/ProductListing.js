import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import { FaEllipsisH } from "react-icons/fa";
import NoData from "../../../Components/NoData/NoData";
import Modal from "../../../Components/Modal/Modal";
import { useInfinteScroll } from "../../../Utils/useInfiniteScroll";

// Sample Products Data
const products = [
  {
    serial: "123456789",
    itemCode: "ABC123",
    productName: "SuperWidget",
    category: "Electronics",
    capacity: "500GB",
    image: "https://example.com/images/superwidget.jpg",
    imageName: "superwidget.jpg",
  },
  {
    serial: "123456789",
    itemCode: "ABC123",
    productName: "SuperWidget",
    category: "Electronics",
    capacity: "500GB",
    image: "https://example.com/images/superwidget.jpg",
    imageName: "superwidget.jpg",
  },
  {
    serial: "123456789",
    itemCode: "ABC123",
    productName: "SuperWidget",
    category: "Electronics",
    capacity: "500GB",
    image: "https://example.com/images/superwidget.jpg",
    imageName: "superwidget.jpg",
  },
  {
    serial: "123456789",
    itemCode: "ABC123",
    productName: "SuperWidget",
    category: "Electronics",
    capacity: "500GB",
    image: "https://example.com/images/superwidget.jpg",
    imageName: "superwidget.jpg",
  },
];

const ProductListing = ({ setShowProductModal, setPostsPerPage, setPage, page, postsPerPage }) => {
  const dispatch = useDispatch();
  const [showTicketModal, setShowTicketModal] = useState(false);

  const listRef = useRef(null);

  const loadingNext = useSelector((state) => state.ticket?.loadingNext);

  const { handleScroll } = useInfinteScroll({
    loadingNext: loadingNext,
    // Define other necessary parameters or functions for infinite scroll
  });

  const handleEdit = async () => {
    setShowTicketModal(true);
  };

  return (
    <>
      {products && products.length > 0 ? (
        <div className="row">
          <div className="col-12 table-scrollable" ref={listRef}>
            <div className="table-responsive">
              <table className="listing-table">
                <thead>
                  <tr>
                    <th>Item Code</th>
                    <th>Product</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Capacity</th>
                    <th>Action</th> 
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, i) => {
                    const { itemCode, productName, category, capacity, image } = product;
                    return (
                      <tr key={i} style={{ cursor: "pointer" }}>
                        <td>{itemCode || "N/A"}</td>
                        <td>
                          <img
                            src={image}
                            alt={productName}
                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                          />
                        </td>
                        <td>{productName || "N/A"}</td>
                        <td>{category || "N/A"}</td>
                        <td>{capacity || "N/A"}</td>
                        <td>
                          <FaEllipsisH  type={"spread"} onClick={handleEdit} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {loadingNext && (
              <div className="w-100 d-flex justify-content-center align-items-center py-4">
                <div className="spinner-border text-danger" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
          </div>
          {showTicketModal && (
            <Modal
              showModal={showTicketModal}
              setShowModal={setShowTicketModal}
              header={"Ticket Inspection"}
              size={"modal-xl"}
            >
              {/* Add the content for the modal here */}
            </Modal>
          )}
        </div>
      ) : (
        <NoData />
      )}
    </>
  );
};

export default ProductListing;
