import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEllipsisH } from "react-icons/fa";
import NoData from "../../../Components/NoData/NoData";
import Modal from "../../../Components/Modal/Modal";
import { useInfinteScroll } from "../../../Utils/useInfiniteScroll";
import CreateProduct from "./CreateProduct";

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
];

const ProductListing = ({ setPostsPerPage, setPage, page, postsPerPage }) => {
  const dispatch = useDispatch();
  const [showProductModal, setShowProductModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null); // State to store the product to edit or create a new one

  const listRef = useRef(null);
  const loadingNext = useSelector((state) => state.product?.loadingNext); // Updated state selector

  const { handleScroll } = useInfinteScroll({
    loadingNext: loadingNext,
    // Define other necessary parameters or functions for infinite scroll
  });

  const handleEdit = (product) => {
    setEditProduct(product); // Set the product to edit
    setShowProductModal(true);
  };

  const handleCreate = () => {
    setEditProduct(null); // Reset to null for new product
    setShowProductModal(true);
  };

  const handleCloseModal = () => {
    setShowProductModal(false);
    setEditProduct(null); // Reset after modal is closed
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
                          <FaEllipsisH onClick={() => handleEdit(product)} />
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

          {/* Modal to Create or Edit Product */}
          {showProductModal && (
            <Modal
              showModal={showProductModal}
              setShowModal={setShowProductModal}
              header={editProduct ? "Edit Product" : "Add New Product"}
              size={"modal-md"}
            >
              <CreateProduct handleClose={handleCloseModal} edit={editProduct} />
            </Modal>
          )}
        </div>
      ) : (
        <NoData />
      )}

      {/* Button to create a new product */}
      <button className="btn btn-primary mt-3" onClick={handleCreate}>
        Add New Product
      </button>
    </>
  );
};

export default ProductListing;
