import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import { clearAllContactPerson } from "../Redux/contactPersonSlice";
import { getAllContactPersons, handleSearch } from "../Redux/thunk";
import CreateContactPerson from "./CreateContactPerson";
import "./contactPerson.css";
import ContactPersonListing from "./ContactPersonListing";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "Contact Persons";
const types = "ContactPersons";

const ContactPersons = () => {
  const dispatch = useDispatch();
  const { permissions, isSuperuser } = useSelector((state) => state.auth);
  const loadingContactPerson = useSelector((state) => state.contactPerson.loadingContactPerson);
  const contactPersons = useSelector((state) => state.contactPerson.contactPersons);
  const count = useSelector((state) => state.contactPerson.count);
  const edit = useSelector((state) => state.contactPerson.edit);
  const [showContactPersonModal, setShowContactPersonModal] = useState(false);

  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [page, setPage] = useState(1);

  const [showFilter, setShowFilter] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search === "") {
      dispatch(getAllContactPersons({ postsPerPage, page }));
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
          loading={loadingContactPerson}
          data={contactPersons}
          count={count}
        />

        {loadingContactPerson && <ListingSkeleton />}
        {!loadingContactPerson && (
          <ContactPersonListing
            setPage={setPage}
            setPostsPerPage={setPostsPerPage}
            dispatch={dispatch}
            setContactPersonModal={setShowContactPersonModal}
          />
        )}
      </div>
      <CommonCreateButton
        types={types}
        title={title}
        showModal={showContactPersonModal}
        setShowModal={setShowContactPersonModal}
        createPermission={createPermission}
      />
      {showContactPersonModal && (
        <Suspense fallback={<div></div>}>
          <Modal
            showModal={showContactPersonModal}
            setShowModal={setShowContactPersonModal}
            header={edit ? "Update ContactPerson" : "Add ContactPerson"}
            types={types}
            edit={edit}
            size={"modal-md"}
            clearAction={clearAllContactPerson}
          >
            <CreateContactPerson
              dispatch={dispatch}
              postsPerPage={postsPerPage}
              setShowModal={setShowContactPersonModal}
              type={title}
            />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default ContactPersons;
