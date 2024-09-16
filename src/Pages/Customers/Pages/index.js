import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import { clearAllCustomer } from "../Redux/customerSlice";
import { getAllCustomers, handleSearch } from "../Redux/thunk";
import CreateCustomer from "./CreateCustomer";
import "./customer.css";
import CustomerListing from "./CustomerListing";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "Customers";
const types = "Customers";

const Customers = () => {
  const dispatch = useDispatch();
  const { permissions, isSuperuser } = useSelector((state) => state.auth);
  const loadingCustomer = useSelector((state) => state.customer.loadingCustomer);
  const customers = useSelector((state) => state.customer.customers);
  const count = useSelector((state) => state.customer.count);
  const edit = useSelector((state) => state.customer.edit);
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);

  const [showFilter, setShowFilter] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search === "") {
      dispatch(getAllCustomers(postsPerPage));
    } else {
      dispatch(handleSearch({ search, postsPerPage }));
    }
  }, [postsPerPage, debouncedSearch]);

  const createPermission = isSuperuser || permissions?.includes("") || true;

  return (
    <>
      <div className="listing-wrapper">
        <CommonPageHeader
          title={title}
          dispatch={dispatch}
          search={search}
          setSearch={setSearch}
          loading={loadingCustomer}
          data={customers}
          count={count}
        />

        {loadingCustomer && <ListingSkeleton />}
        {!loadingCustomer && <CustomerListing dispatch={dispatch} setCustomerModal={setShowCustomerModal} />}
      </div>
      <CommonCreateButton
        types={types}
        title={title}
        showModal={showCustomerModal}
        setShowModal={setShowCustomerModal}
        createPermission={createPermission}
      />
      {showCustomerModal && (
        <Suspense fallback={<div></div>}>
          <Modal
            showModal={showCustomerModal}
            setShowModal={setShowCustomerModal}
            header={edit ? "Update Customer" : "Add Customer"}
            types={types}
            edit={edit}
            size={"modal-lg"}
            clearAction={clearAllCustomer}
          >
            <CreateCustomer dispatch={dispatch} postsPerPage={postsPerPage} setShowModal={setShowCustomerModal} />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default Customers;
