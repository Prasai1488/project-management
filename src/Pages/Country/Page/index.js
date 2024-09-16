import React, { useState, useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllCountry } from "../Redux/countrySlice";
import { getCountry, handleSearch } from "../Redux/thunk";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import Country from "./Country";
import CreateCountry from "./CreateCountry";
import "./country.css";
import { setShowModal } from "../../../Redux/Layout/layoutSlice.js";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton.js";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "Country";
const types = "country";

const CountryListing = () => {
  const dispatch = useDispatch();
  const loadingCountry = useSelector((state) => state.country.loadingCountry);
  const countries = useSelector((state) => state.country.countries);
  const count = useSelector((state) => state.country.count);
  const edit = useSelector((state) => state.country.edit);
  const { showModal } = useSelector((state) => state.layout);
  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [showCountryModal, setShowCountryModal] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search === "") {
      dispatch(getCountry(postsPerPage));
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
          loading={loadingCountry}
          data={countries}
          count={count}
        />

        {loadingCountry && <ListingSkeleton />}
        {!loadingCountry && (
          <Country
            dispatch={dispatch}
            setShowModal={setShowCountryModal}
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
            header={edit ? "Update Country" : "Add Country"}
            types={types}
            edit={edit}
            size={"modal-md"}
            clearAction={clearAllCountry}
          >
            <CreateCountry
              dispatch={dispatch}
              showModal={showCountryModal}
              postsPerPage={postsPerPage}
              setShowModal={setShowCountryModal}
            />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default CountryListing;
