

import React, { useState, useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearEditProduct } from "../Redux/ProductSlice";
import { getProduct, handleSearch } from "../Redux/thunk";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import ProductListing from "./ProductListing";
import CreateProduct from "./CreateProduct";
import "./product.css";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import { setShowModal } from "../../../Redux/Layout/layoutSlice";


const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "Product";
const types = "product";

const Product = () => {
  const dispatch = useDispatch();
  const loadingProduct = useSelector((state) => state.product.loadingProduct);

  // const { permissions, isSuperuser, users } = useSelector((state) => state.auth);
  const products = useSelector((state) => state.product.products);
  const count = useSelector((state) => state.product.count);
  const edit = useSelector((state) => state.product.edit);
  const { showModal } = useSelector((state) => state.layout);
  const [showProductModal, setShowProductModal] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const debouncedSearch = useDebounce(search, 500);

  
  // Handle modal close
  const handleCloseModal = () => {
    setShowProductModal(false);
    dispatch(clearEditProduct()); // Clear edit state when modal is closed
  };

    // Handle create button click
    const handleCreateClick = () => {
      dispatch(clearEditProduct()); // Clear edit state before opening create modal
      setShowProductModal(true);
    };

  useEffect(() => {
    if (debouncedSearch === "") {
      dispatch(getProduct({ postsPerPage, page }));
    } else {
      dispatch(handleSearch({ search: debouncedSearch, postsPerPage, page }));
    }
    // eslint-disable-next-line
  }, [postsPerPage, debouncedSearch, page, dispatch]);

  return (
    <>
      <div className="listing-wrapper">
        <CommonPageHeader
          title={title}
          dispatch={dispatch}
          showModal={showModal}
          search={search}
          setSearch={setSearch}
          loading={loadingProduct}
          data={products}
          count={count}
        />

        {loadingProduct && <ListingSkeleton />}
        {!loadingProduct && <ProductListing dispatch={dispatch}  setShowProductModal={setShowProductModal}  />}

        <CommonCreateButton
          types={types}
          showModal={showProductModal}
          setShowModal={handleCreateClick}
          createPermission={true}
        />
      </div>
       {showProductModal && (
        <Suspense fallback={<div></div>}>
          <Modal
            dispatch={setShowModal}
            showModal={showProductModal}
            setShowModal={handleCloseModal}
            header={edit ? "Update Product" : "Product Details"}
            types={types}
            edit={edit}
            size={"modal-md"}
            clearAction={clearEditProduct}
          >
            <CreateProduct dispatch={dispatch} setShowModal={handleCloseModal} postsPerPage={postsPerPage} />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default Product;
