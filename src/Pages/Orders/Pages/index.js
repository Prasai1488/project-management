import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import "./order.css";
import { getAllOrders, handleSearch } from "../Redux/thunk";
import OrdersListing from "./OrdersListing";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "Orders";
const types = "Orders";

const Orders = () => {
  const dispatch = useDispatch();
  const loadingOrder = useSelector((state) => state.order.loadingOrder);
  const orders = useSelector((state) => state.order.orders);
  const count = useSelector((state) => state.order.count);
  const edit = useSelector((state) => state.order.edit);
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);

  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [page, setPage] = useState(1);

  const [showFilter, setShowFilter] = useState(false);
  const debouncedSearch = useDebounce(search, 500);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState(null);
  useEffect(() => {
    if (search === "") {
      let value = {
        postsPerPage,
        page,
        startDate,
        endDate,
        status: status === null ? "" : status?.value,
      };
      dispatch(getAllOrders(value));
    } else {
      let value = {
        search: debouncedSearch,
        postsPerPage,
        startDate,
        endDate,
        status,
      };

      dispatch(handleSearch(value));
    }
  }, [dispatch, postsPerPage, debouncedSearch, page, startDate, endDate, status]);

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
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          status={status}
          setStatus={setStatus}
        />

        {loadingOrder && <ListingSkeleton />}
        {!loadingOrder && (
          <OrdersListing
            dispatch={dispatch}
            setShowOrderDetailsModal={setShowOrderDetailsModal}
            setPostsPerPage={setPostsPerPage}
            setPage={setPage}
            showOrderDetailsModal={showOrderDetailsModal}
            postsPerPage={postsPerPage}
            page={page}
          />
        )}
      </div>
    </>
  );
};

export default Orders;
