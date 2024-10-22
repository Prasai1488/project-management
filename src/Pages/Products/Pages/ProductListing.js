
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEllipsisH } from "react-icons/fa";
import NoData from "../../../Components/NoData/NoData";
import Modal from "../../../Components/Modal/Modal";
import { useInfinteScroll } from "../../../Utils/useInfiniteScroll";
import CreateProduct from "./CreateProduct";

import { getProducts } from "../Redux/thunk"; // Import the getProducts thunk

const ProductListing = ({ setPostsPerPage, setPage, page, postsPerPage }) => {
  const dispatch = useDispatch();
  const [showProductModal, setShowProductModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null); // State to store the product to edit or create a new one

  const listRef = useRef(null);

  // Get products and loading states from Redux
  const products = useSelector((state) => state.product?.products); // Access products from Redux state
  const loadingNext = useSelector((state) => state.product?.loadingNext); // Updated state selector
  const loading = useSelector((state) => state.product?.loading); // Loading state for initial fetch

  const { handleScroll } = useInfinteScroll({
    loadingNext: loadingNext,
    // Define other necessary parameters or functions for infinite scroll
  });

  // Fetch products when component mounts
  useEffect(() => {
    dispatch(getProducts()); // Fetch the products from the backend
  }, [dispatch]);

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
      {loading ? (
        <div className="spinner-border text-danger" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : products && products.length > 0 ? (
        <div className="row">
          <div className="col-12 table-scrollable" ref={listRef} onScroll={handleScroll}>
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
                    const { name, category, image } = product; // Adjusted to match API response structure
                    const productImage = image ? `http://192.168.1.91:8000${image}` : null; // Fix relative image path

                    return (
                      <tr key={i} style={{ cursor: "pointer" }}>
                        <td>N/A</td> {/* itemCode is missing in API response, leaving as N/A */}
                        <td>
                          {productImage ? (
                            <img
                              src={productImage}
                              alt={name}
                              style={{ width: "50px", height: "50px", objectFit: "cover" }}
                            />
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td>{name || "N/A"}</td> {/* Product Name */}
                        <td>{category?.name || "N/A"}</td> {/* Category Name */}
                        <td>N/A</td> {/* Capacity is missing in API response, leaving as N/A */}
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
    </>
  );
};

export default ProductListing;
