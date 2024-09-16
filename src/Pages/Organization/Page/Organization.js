import React, { useState, lazy, useRef } from "react";
import ColumnResize from "react-table-column-resizer";
import { useDispatch, useSelector } from "react-redux";
import { organizationEditSuccess } from "../Redux/organizationSlice";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";

const DocumentViewModal = lazy(() => import("../../../Components/Modal/DocumentViewModal"));

const Organization = ({ setPostsPerPage, setShowUserSetupModal }) => {
  const listRef = useRef(null);
  const dispatch = useDispatch();
  const next = useSelector((state) => state.organization.next);
  const organizations = useSelector((state) => state.organization.organizations);
  const [viewDocument, setViewDocument] = useState(false);
  const [documentToView, setDocumentToView] = useState(null);

  const scrollToEnd = () => {
    setPostsPerPage((prev) => prev + 20);
  };

  const handleScroll = (event) => {
    if (event.currentTarget.scrollTop + event.currentTarget.offsetHeight === event.currentTarget.scrollHeight) {
      if (next) {
        scrollToEnd();
      }
    }
  };

  const handleEdit = (id) => {
    dispatch(organizationEditSuccess(id));
    setShowUserSetupModal(true);
  };

  const handleView = (flagImage) => {
    setDocumentToView(flagImage);
    setViewDocument(true);
  };

  return (
    <>
      {organizations?.length > 0 ? (
        <div className="row">
          <div className="col-12 table-scrollable" onScroll={handleScroll} ref={listRef}>
            <table className="listing-table">
              <thead>
                <tr>
                  <th>SN</th>
                  <ColumnResize id={1} className="columnResizer" />
                  <th>Name</th>
                  <ColumnResize id={2} className="columnResizer" minWidth={120} />
                  <th>Phone No</th>
                  <ColumnResize id={3} className="columnResizer" minWidth={120} />
                  <th>Email</th>
                  <ColumnResize id={4} className="columnResizer" minWidth={120} />
                  <th>Address</th>
                  <ColumnResize id={4} className="columnResizer" minWidth={120} />
                  <th>Logo</th>
                  <ColumnResize id={8} className="columnResizer" minWidth={120} />
                  <th>Stamp</th>
                  <ColumnResize id={8} className="columnResizer" minWidth={120} />
                  <th>Signature</th>

                  <ColumnResize id={8} className="columnResizer" minWidth={120} />
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {organizations?.map((organization, i) => {
                  const { id, name, phoneNo1, email, address, logo, stamp, signature, active } = organization;

                  return (
                    <tr key={id} onDoubleClick={() => handleEdit(id)} style={{ cursor: "pointer" }}>
                      <td>{i + 1}</td>
                      <td className="column_resizer_body" />
                      <td>{name ? name : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>{phoneNo1 ? phoneNo1 : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>{email ? email : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>{address ? address : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>
                        {logo ? (
                          <button type="button" className="btn btn-sm btn-secondary" onClick={() => handleView(logo)}>
                            View
                          </button>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td className="column_resizer_body" />
                      <td>
                        {stamp ? (
                          <button type="button" className="btn btn-sm btn-secondary" onClick={() => handleView(stamp)}>
                            View
                          </button>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td className="column_resizer_body" />
                      <td>
                        {signature ? (
                          <button
                            type="button"
                            className="btn btn-sm btn-secondary"
                            onClick={() => handleView(signature)}
                          >
                            View
                          </button>
                        ) : (
                          "N/A"
                        )}
                      </td>

                      <td className="column_resizer_body" />
                      <td>
                        <DetailActionButton type={"edit"} onClick={() => handleEdit(id)} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <NoData />
      )}
      {viewDocument && (
        <DocumentViewModal
          documentToView={documentToView}
          showModal={viewDocument}
          setShowModal={setViewDocument}
          size={"modal-md"}
        />
      )}
    </>
  );
};

export default Organization;
