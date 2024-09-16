import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import { clearAllItem } from "../Redux/itemSlice";
import { getAllItems, handleSearch } from "../Redux/thunk";
import CreateItem from "./CreateItem";
import "./item.css";
import ItemListing from "./ItemListing";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "Items";
const types = "Items";

const Items = () => {
  const dispatch = useDispatch();
  const { permissions, isSuperuser } = useSelector((state) => state.auth);
  const loadingItem = useSelector((state) => state.item.loadingItem);
  const items = useSelector((state) => state.item.items);
  const count = useSelector((state) => state.item.count);
  const edit = useSelector((state) => state.item.edit);
  const [showItemModal, setShowItemModal] = useState(false);

  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [page, setPage] = useState(1);
  const [itemType, setItemType] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search === "") {
      dispatch(getAllItems({ postsPerPage, page, itemType: itemType?.value, maxPrice: maxPrice, minPrice: minPrice }));
    } else {
      dispatch(handleSearch({ search, postsPerPage, minPrice, maxPrice }));
    }
  }, [postsPerPage, debouncedSearch, page, itemType, minPrice, maxPrice]);

  const createPermission = isSuperuser || permissions?.includes("") || true;

  return (
    <>
      <div className="listing-wrapper">
        <CommonPageHeader
          title={title}
          dispatch={dispatch}
          search={search}
          setSearch={setSearch}
          loading={loadingItem}
          data={items}
          count={count}
          types={types}
          setItemType={setItemType}
          itemType={itemType}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />

        {loadingItem && <ListingSkeleton />}
        {!loadingItem && (
          <ItemListing
            setPage={setPage}
            dispatch={dispatch}
            setItemModal={setShowItemModal}
            setPostsPerPage={setPostsPerPage}
          />
        )}
      </div>
      <CommonCreateButton
        types={types}
        title={title}
        showModal={showItemModal}
        setShowModal={setShowItemModal}
        createPermission={createPermission}
      />
      {showItemModal && (
        <Suspense fallback={<div></div>}>
          <Modal
            showModal={showItemModal}
            setShowModal={setShowItemModal}
            header={edit ? "Update Item" : "Add Item"}
            types={types}
            edit={edit}
            size={"modal-lg"}
            clearAction={clearAllItem}
          >
            <CreateItem dispatch={dispatch} postsPerPage={postsPerPage} setShowModal={setShowItemModal} type={title} />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default Items;
