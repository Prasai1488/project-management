import React, { useRef } from "react";
import { useSelector } from "react-redux";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import CommonTableLayout, { TableData } from "../../../Components/Table/CommonTableLayout";

import { customersEditSuccess } from "../Redux/customerSlice";
import { getNext } from "../Redux/thunk";
import { useInfinteScroll } from "../../../Utils/useInfiniteScroll";

const TableHeaders = ["SN", "Name", "Email", "Phone", "Contact Person", "Contact Person Phone", "Action"];

const CustomerListing = ({ dispatch,setCustomerModal,setPostsPerPage,setPage }) => {
  const listRef = useRef(null);

  const customers = useSelector((state) => state?.customer?.customers);
  const next = useSelector((state) => state.customer.next);
  const {loadingNext,loadingCustomer} = useSelector((state) => state.customer);
  const { handleScroll } = useInfinteScroll({
    loadingNext: loadingNext,
    next,
    getNext,
    setPostsPerPage,
    setPage,
  });

  const handleEdit = (id) => {
    dispatch(customersEditSuccess(id));
    setCustomerModal(true);
  };

  return (
    <>
      {customers && customers.length > 0 ? (
        <CommonTableLayout
          listRef={listRef}
          TableHeaders={TableHeaders}
          onscroll={handleScroll}
          loadingNext={loadingNext}
        >
          {customers &&
            customers.map((customer, i) => {
              const { _id, name, email, phoneNo, contactPerson, contactPersonPhoneNo } = customer;
              return (
                <tr key={_id} style={{ cursor: "pointer" }}>
                  <td>{i + 1}</td>
                  <TableData data={name} />
                  <TableData data={email} />
                  <TableData data={phoneNo} />
                  <TableData data={contactPerson} />
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

export default CustomerListing;
