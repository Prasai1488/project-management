import React, { useRef } from "react";
import { useSelector } from "react-redux";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import CommonTableLayout, { TableData } from "../../../Components/Table/CommonTableLayout";
import { contactPersonsEditSuccess } from "../Redux/contactPersonSlice";
import { getNext } from "../Redux/thunk";
import { useInfinteScroll } from "../../../Utils/useInfiniteScroll";

const TableHeaders = ["SN", "Name", "Phone", "Client", "Action"];

const ContactPersonListing = ({ dispatch, setContactPersonModal, setPostsPerPage, setPage }) => {
  const listRef = useRef(null);

  const contactPersons = useSelector((state) => state?.contactPerson?.contactPersons);
  const next = useSelector((state) => state.contactPerson.next);

  const { loadingNext, loadingContactPerson } = useSelector((state) => state.contactPerson);
  const { handleScroll } = useInfinteScroll({
    loadingNext: loadingNext,
    next,
    getNext,
    setPostsPerPage,
    setPage,
  });

  const handleEdit = (id) => {
    dispatch(contactPersonsEditSuccess(id));
    setContactPersonModal(true);
  };
  // const scrollToEnd = () => {
  //   setPostsPerPage((prev) => prev + 10);
  // };

  // const handleScroll = (event) => {
  //   if (event.currentTarget.scrollTop + event.currentTarget.offsetHeight >= event.currentTarget.scrollHeight - 1) {
  //     if (next) {
  //       scrollToEnd();
  //     }
  //   }
  // };
  return (
    <>
      {contactPersons && contactPersons.length > 0 ? (
        <CommonTableLayout
          listRef={listRef}
          TableHeaders={TableHeaders}
          onscroll={handleScroll}
          loadingNext={loadingNext}
        >
          {contactPersons &&
            contactPersons.map((contactperson, i) => {
              const { _id, name, primaryPhoneNo, client } = contactperson;
              return (
                <tr key={_id} style={{ cursor: "pointer" }}>
                  <td>{i + 1}</td>
                  <TableData data={name} />
                  <TableData data={primaryPhoneNo} />
                  <TableData data={client?.name} />

                  <td className="column_resizer_body" />
                  <td>
                    <DetailActionButton type={"edit"} onClick={() => handleEdit(_id)} />
                  </td>
                </tr>
              );
            })}
        </CommonTableLayout>
      ) : (
        <NoData />
      )}
    </>
  );
};

export default ContactPersonListing;
