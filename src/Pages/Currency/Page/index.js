import React, { useState, useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllCurrency } from "../Redux/currencySlice";
import { getCurrency, handleSearch } from "../Redux/thunk";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import Currency from "./Currency";
import CreateCurrency from "./CreateCurrency";
import "./currency.css";
import { setShowModal } from "../../../Redux/Layout/layoutSlice.js";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton.js";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "Currency";
const types = "currency";

const CurrencyListing = () => {
  const dispatch = useDispatch();
  const loadingCurrency = useSelector((state) => state.currency.loadingCurrency);
  const currencies = useSelector((state) => state.currency.currencies);
  const count = useSelector((state) => state.currency.count);
  const edit = useSelector((state) => state.currency.edit);
  const { showModal } = useSelector((state) => state.layout);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search === "") {
      dispatch(getCurrency(postsPerPage));
    } else {
      dispatch(handleSearch({ search, postsPerPage }));
    }
  }, [postsPerPage, debouncedSearch]);

  return (
    <>
      <div className="listing-wrapper">
        <CommonPageHeader
          title={title}
          dispatch={dispatch}
          showModal={showModal}
          search={search}
          setSearch={setSearch}
          loading={loadingCurrency}
          data={currencies}
          count={count}
        />

        {loadingCurrency && <ListingSkeleton />}
        {!loadingCurrency && (
          <Currency
            setShowCountryModal={setShowCountryModal}
            dispatch={dispatch}
            showModal={showModal}
            setPostsPerPage={setPostsPerPage}
          />
        )}
        <CommonCreateButton types={types} showModal={showCountryModal} setShowModal={setShowCountryModal} />
      </div>
      {showCountryModal && (
        <Suspense fallback={<div></div>}>
          <Modal
            dispatch={setShowModal}
            showModal={showCountryModal}
            setShowModal={setShowCountryModal}
            header={edit ? "Update Currency" : "Add Currency"}
            types={types}
            edit={edit}
            size={"modal-md"}
            clearAction={clearAllCurrency}
          >
            <CreateCurrency
              dispatch={dispatch}
              showModal={showCountryModal}
              postsPerPage={postsPerPage}
              setShowCountryModal={setShowCountryModal}
            />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default CurrencyListing;
