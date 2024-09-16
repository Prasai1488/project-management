import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import { getAllSales, handleSearch } from "../Redux/thunk";
import CreateSale from "./CreateSales";
import "./sale.css";
import SaleListing from "./SalesListing";
import { clearAllSale } from "../Redux/salesSlice";
import { dateFormater } from "../../../Utils/dateFormater";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "Sales";
const types = "Sales";

const Sales = () => {
  const dispatch = useDispatch();
  const { permissions, isSuperuser } = useSelector((state) => state.auth);
  const loadingSale = useSelector((state) => state.sale.loadingSale);
  const sales = useSelector((state) => state.sale.sales);
  const count = useSelector((state) => state.sale.count);
  const edit = useSelector((state) => state.sale.edit);

  const [showSaleModal, setShowSaleModal] = useState(false);
  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  // Convert startDate and endDate to string if they are date objects
  const startDateStr = startDate ? dateFormater(startDate) : "";
  const endDateStr = endDate ? dateFormater(endDate) : "";

  useEffect(() => {
    if (debouncedSearch === "") {
      dispatch(getAllSales({ postsPerPage, page, startDate: startDateStr, endDate: endDateStr }));
    } else {
      dispatch(handleSearch({ search: debouncedSearch, postsPerPage }));
    }
  }, [postsPerPage, debouncedSearch, page, startDateStr, endDateStr, dispatch]);

  const createPermission = isSuperuser || permissions?.includes("") || true;

  return (
    <>
      <div className="listing-wrapper">
        <CommonPageHeader
          title={title}
          dispatch={dispatch}
          search={search}
          setSearch={setSearch}
          loading={loadingSale}
          data={sales}
          count={count}
          types={types}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />

        {loadingSale ? (
          <ListingSkeleton />
        ) : (
          <SaleListing
            dispatch={dispatch}
            setShowSaleModal={setShowSaleModal}
            setPostsPerPage={setPostsPerPage}
            setPage={setPage}
            page={page}
            postsPerPage={postsPerPage}
          />
        )}
      </div>
      <CommonCreateButton
        types={types}
        title={title}
        showModal={showSaleModal}
        setShowModal={setShowSaleModal}
        createPermission={createPermission}
      />
      {showSaleModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <Modal
            showModal={showSaleModal}
            setShowModal={setShowSaleModal}
            header={edit ? "Update Sale" : "Add Sale"}
            types={types}
            edit={edit}
            size="modal-lg"
            clearAction={clearAllSale}
          >
            <CreateSale
              dispatch={dispatch}
              page={page}
              postsPerPage={postsPerPage}
              setPostsPerPage={setPostsPerPage}
              setShowModal={setShowSaleModal}
              setPage={setPage}
              startDate={startDate}
              endDate={endDate}
            />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default Sales;
