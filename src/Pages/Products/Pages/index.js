import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import { clearAllProduct, clearEditProduct } from "../Redux/ProductSlice";
import { getAllProducts, handleSearch } from "../Redux/thunk";
import ProductListing from "./ProductListing";
import CreateProduct from "./CreateProduct";
import "./product.css";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "Products";
const types = "Products";

const Products = () => {
  const dispatch = useDispatch();
  const { permissions, isSuperuser } = useSelector((state) => state.auth);
  const loadingProduct = useSelector((state) => state.product.loadingProduct);
  const products = useSelector((state) => state.product.products);
  const count = useSelector((state) => state.product.count);
  const edit = useSelector((state) => state.product.edit);
  const [showProductModal, setShowProductModal] = useState(false);

  const handleCloseModal = () => {
    setShowProductModal(false);
  };

  const [status, setStatus] = useState([]);
  const [priority, setPriroity] = useState([]);
  const [level, setLevel] = useState([]);

  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [page, setPage] = useState(1);

  const [showFilter, setShowFilter] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  // useEffect(() => {
  //   if (search === "") {
  //     dispatch(
  //       getAllProducts({ postsPerPage, page, status: status?.value, priroity: priority?.value, level: level?.value })
  //     );
  //   } else {
  //     dispatch(handleSearch({ search, postsPerPage }));
  //   }
  // }, [postsPerPage, debouncedSearch, page, status, priority, level]);

  const createPermission = isSuperuser || permissions?.includes("") || true;

  return (
    <>
      <div className="listing-wrapper">
        <CommonPageHeader
          title={title}
          dispatch={dispatch}
          search={search}
          setSearch={setSearch}
          loading={loadingProduct}
          data={Products}
          count={count}
          types={types}
          setStatus={setStatus}
          // status={status}
          // setPriroity={setPriroity}
          // priority={priority}
          // setLevel={setLevel}
          // level={level}
        />

        {/* {loadingProduct && <ListingSkeleton />}
        {!loadingProduct && ( */}
        <ProductListing
          dispatch={dispatch}
          setShowProductModal={setShowProductModal}
          setPostsPerPage={setPostsPerPage}
          setPage={setPage}
          postsPerPage={postsPerPage}
          page={page}
        />
        {/* )} */}
      </div>
      <CommonCreateButton
        types={types}
        title={title}
        showModal={showProductModal}
        setShowModal={setShowProductModal}
        createPermission={createPermission}
      />
      {/* {showProductModal && */}(
      <Suspense fallback={<div></div>}>
        <Modal
          showModal={showProductModal}
          setShowModal={setShowProductModal}
          header={edit ? "Update Product" : "Add Product"}
          types={types}
          edit={edit}
          size={"modal-md"}
          clearAction={clearEditProduct}
        >
          <CreateProduct dispatch={dispatch} postsPerPage={postsPerPage} handleClose={handleCloseModal} />
        </Modal>
      </Suspense>
      )
    </>
  );
};

export default Products;
