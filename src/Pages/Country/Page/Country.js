import React, { useState, lazy, useRef } from "react";
import ColumnResize from "react-table-column-resizer";
import { useDispatch, useSelector } from "react-redux";
import { countryEditSuccess } from "../Redux/countrySlice";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import Status from "../../../Components/Status";
import { setShowModal } from "../../../Redux/Layout/layoutSlice";

const DocumentViewModal = lazy(() => import("../../../Components/Modal/DocumentViewModal"));

const Country = ({ dispatch, setPostsPerPage, setShowModal }) => {
  const listRef = useRef(null);

  const next = useSelector((state) => state.country.next);
  const countries = useSelector((state) => state.country.countries);
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
    dispatch(countryEditSuccess(id));
    setShowModal(true);
  };

  const handleView = (flagImage) => {
    setDocumentToView(flagImage);
    setViewDocument(true);
  };

  return (
    <>
      <div className="row">
        <div className="col-12 table-scrollable" onScroll={handleScroll} ref={listRef}>
          <table className="listing-table">
            <thead>
              <tr>
                <th>SN</th>
                <ColumnResize id={1} className="columnResizer" />
                <th>Name</th>
                <ColumnResize id={2} className="columnResizer" minWidth={120} />
                <th>Country Code</th>
                <ColumnResize id={3} className="columnResizer" minWidth={120} />
                <th>Phone Code</th>
                <ColumnResize id={4} className="columnResizer" minWidth={120} />
                <th>Flag</th>
                <ColumnResize id={4} className="columnResizer" minWidth={120} />
                <th>Active</th>
                <ColumnResize id={5} className="columnResizer" minWidth={120} />
                <th></th>
              </tr>
            </thead>
            <tbody>
              {countries?.map((country, i) => {
                const { id, name, countryCode, phoneCode, flagImage, active } = country;

                return (
                  <tr key={id} onDoubleClick={() => handleEdit(id)} style={{ cursor: "pointer" }}>
                    <td>{i + 1}</td>
                    <td className="column_resizer_body" />
                    <td>{name ? name : "N/A"}</td>
                    <td className="column_resizer_body" />
                    <td>{countryCode ? countryCode : "N/A"}</td>
                    <td className="column_resizer_body" />
                    <td>{phoneCode ? phoneCode : "N/A"}</td>
                    <td className="column_resizer_body" />
                    <td>
                      {flagImage ? (
                        <button
                          type="button"
                          className="btn btn-sm btn-secondary"
                          onClick={() => handleView(flagImage)}
                        >
                          View
                        </button>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="column_resizer_body" />
                    <td>
                      <Status active={active} />
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
      {viewDocument && (
        <DocumentViewModal
          documentToView={documentToView}
          showModal={viewDocument}
          size={"modal-md"}
          setShowModal={setViewDocument}
        />
      )}
    </>
  );
};

export default Country;
