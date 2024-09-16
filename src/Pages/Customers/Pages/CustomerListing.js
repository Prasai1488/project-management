import React, { useRef } from "react";
import { useSelector } from "react-redux";
import ColumnResize from "react-table-column-resizer";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import { customersEditSuccess } from "../Redux/customerSlice";
import { getNext } from "../Redux/thunk";

const TableHeaders = ["SN", "Name", "Email", "Phone", "Contact Person", "Contact Person Phone", "Action"];
const TableVariables = ["_id", "name", "email", "phoneNo", "contactPerson", "contactPersonPhoneNo"];

const TicketIssuesListing = ({ dispatch }) => {
  const listRef = useRef(null);

  const next = useSelector((state) => state.customer.next);
  const loadingNext = useSelector((state) => state.customer?.loadingNext);
  const customers = useSelector((state) => state?.customer?.customers);

  const scrollToEnd = (next) => {
    dispatch(getNext(next));
  };

  const handleScroll = (event) => {
    if (event.currentTarget.scrollTop + event.currentTarget.offsetHeight === event.currentTarget.scrollHeight) {
      if (!loadingNext && next !== null) {
        scrollToEnd(next);
      }
    }
  };

  const handleEdit = (id) => {
    dispatch(customersEditSuccess(id));
  };

  return (
    <>
      {customers && customers?.length > 0 ? (
        <div className="row">
          <div className="col-12 table-scrollable" onScroll={handleScroll} ref={listRef}>
            <table className="listing-table">
              <thead>
                <tr>
                  {TableHeaders.map((header, i) => {
                    return (
                      <th key={i}>
                        {header}
                        <ColumnResize id={i + 1} className="columnResizer" />
                      </th>
                    );
                  })}
                </tr>
              </thead>
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
            </table>
            {loadingNext && (
              <div className="w-100 d-flex justify-content-center align-items-center py-4">
                <div className="spinner-border text-danger" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <NoData />
      )}
    </>
  );
};

export default TicketIssuesListing;
