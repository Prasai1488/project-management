import React, { useRef } from "react";
import { useSelector } from "react-redux";
import NoData from "../../../Components/NoData/NoData";
import { customersEditSuccess } from "../Redux/customerSlice";
import { getNext } from "../Redux/thunk";
import CommonTableLayout from "../../../Components/Table/CommonTableLayout";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import { useInfinteScroll } from "./useInfiniteScroll";

const TableHeaders = ["SN", "Name", "Email", "Phone", "Contact Person", "Contact Person Phone", "Action"];

const TicketIssuesListing = ({ dispatch }) => {
  const listRef = useRef(null);

  const customers = useSelector((state) => state?.customer?.customers);
  const next = useSelector((state) => state.customer.next);
  const loadingNext = useSelector((state) => state.customer?.loadingNext);
  const { handleScroll } = useInfinteScroll(loadingNext, next, getNext);

  const handleEdit = (id) => {
    dispatch(customersEditSuccess(id));
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
          <tbody>
            {customers &&
              customers.map((customer, i) => {
                const { _id, name, email, phoneNo, contactPerson, contactPersonPhoneNo } = customer;
                return (
                  <tr key={_id} style={{ cursor: "pointer" }}>
                    <td>{i + 1}</td>
                    <td className="column_resizer_body" />
                    <td>{name ? name : "N/A"}</td>
                    <td className="column_resizer_body" />
                    <td>{email ? email : "N/A"}</td>
                    <td className="column_resizer_body" />
                    <td>{phoneNo ? phoneNo : "N/A"}</td>
                    <td className="column_resizer_body" />
                    <td>{contactPerson ? contactPerson : "N/A"}</td>
                    <td className="column_resizer_body" />
                    <td>{contactPersonPhoneNo ? contactPersonPhoneNo : "N/A"}</td>
                    <td className="column_resizer_body" />

                    <td>
                      <DetailActionButton type={"edit"} onClick={() => handleEdit(_id)} />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTableLayout>
      ) : (
        <NoData />
      )}
    </>
  );
};

export default TicketIssuesListing;
