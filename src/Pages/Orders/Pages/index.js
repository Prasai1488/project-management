import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import { clearEditProduct, productsEditSuccess } from "../Redux/productSlice";
import { getAllProducts, handleSearch } from "../Redux/thunk";
import OrdersListing from "./OrdersListing";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "Orders";
const types = "Orders";

const Orders = () => {
  const dispatch = useDispatch();
  const { permissions, isSuperuser } = useSelector((state) => state.auth);
  const loadingOrder = useSelector((state) => state.product.loadingOrder);
  const orders = useSelector((state) => state.product.orders);
  const count = useSelector((state) => state.product.count);
  const edit = useSelector((state) => state.product.edit);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [page, setPage] = useState(1);

  const [showFilter, setShowFilter] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search === "") {
      dispatch(
        getAllProducts({
          postsPerPage,
          page,
        })
      );
    } else {
      dispatch(handleSearch({ search, postsPerPage }));
    }
  }, [postsPerPage, debouncedSearch, page]);

  const createPermission = isSuperuser || permissions?.includes("") || true;

  return (
    <>
      <div className="listing-wrapper">
        <CommonPageHeader
          title={title}
          dispatch={dispatch}
          search={search}
          setSearch={setSearch}
          loading={loadingOrder}
          data={orders}
          count={count}
          types={types}
        />

        {loadingOrder && <ListingSkeleton />}
        {!loadingOrder && (
          <OrdersListing
            dispatch={dispatch}
            setShowOrderModal={setShowOrderModal}
            setPostsPerPage={setPostsPerPage}
            setPage={setPage}
            showOrderModal={showOrderModal}
            postsPerPage={postsPerPage}
            page={page}
          />
        )}
      </div>
    </>
  );
};

export default Orders;
