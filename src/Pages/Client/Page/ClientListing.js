import React, { useRef } from "react";
import { useSelector } from "react-redux";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import CommonTableLayout, { TableData } from "../../../Components/Table/CommonTableLayout";

import { clientsEditSuccess } from "../Redux/clientSlice";
import { getNext } from "../Redux/thunk";
import { useInfinteScroll } from "../../../Utils/useInfiniteScroll";

const TableHeaders = ["SN", "Name", "Email", "Phone", "Contact Person", "Contact Person Phone", "Action"];

const ClientListing = ({ dispatch, setClientModal, setPostsPerPage, setPage }) => {
  const listRef = useRef(null);

  const clients = useSelector((state) => state?.client?.clients);
  const next = useSelector((state) => state.client.next);
  const { loadingNext, loadingClient } = useSelector((state) => state.client);
  const { handleScroll } = useInfinteScroll({
    loadingNext,
    next,
    getNext,
    setPostsPerPage,
    setPage,
  });

  const handleEdit = (id) => {
    dispatch(clientsEditSuccess(id));
    setClientModal(true);
  };

  return (
    <>
      {clients && clients.length > 0 ? (
        <CommonTableLayout
          listRef={listRef}
          TableHeaders={TableHeaders}
          onscroll={handleScroll}
          loadingNext={loadingNext}
        >
          {clients &&
            clients.map((client, i) => {
              const { _id, name, email, phoneNo, contactPerson, contactPersonPhoneNo } = client;
              return (
                <tr key={_id} style={{ cursor: "pointer" }}>
                  <td>{i + 1}</td>
                  <TableData data={name} />
                  <TableData data={email} />
                  <TableData data={phoneNo} />
                  <TableData data={contactPerson?.name} />
                  <TableData data={contactPersonPhoneNo} />
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

export default ClientListing;
