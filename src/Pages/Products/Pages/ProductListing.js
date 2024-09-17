import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ColumnResize from "react-table-column-resizer";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
// import { getAnswerQuestionByItemId, getTicketsInspectionById } from "../../TicketInspection/Redux/thunk";
// import { getNext, getSpecificTicket } from "../Redux/thunk";
// import { ticketsEditSuccess } from "../Redux/ticketSlice";

import Modal from "../../../Components/Modal/Modal";
import { useInfinteScroll } from "../../../Utils/useInfiniteScroll";
import Products from ".";
// import { getItems } from "../../Item/Redux/thunk";
// import NewTicketInspection from "../../TicketInspection/pages/NewTicketInspection";
// import TicketInspectionListing from "../../TicketInspection/pages/TicketInspectionListing";

const ProductListing = ({ setShowProductModal, setPostsPerPage, setPage, page, postsPerPage }) => {
  const dispatch = useDispatch();
    const [showTicketInspectionModal, setShowTicketInspectionModal] = useState(false);
  //   const [selectItemId, setSelectedItemId] = useState("");
  //   const [selectedTicketId, setSelectedTicketId] = useState("");
    const [ticketInspectionModal, setTicketIspectionModal] = useState(false);

  const listRef = useRef(null);

  //   const next = useSelector((state) => state.ticket.next);
    const loadingNext = useSelector((state) => state.ticket?.loadingNext);
  //   const tickets = useSelector((state) => state?.ticket?.tickets);

  // const { handleScroll } = useInfinteScroll({
  //   loadingNext: loadingNext,
  //   next,
  //   getNext,
  //   setPostsPerPage,
  //   setPage,
  // });

  const Products = [
    {
      serial: "123456789",
      itemCode: "ABC123",
      productName: "SuperWidget",
      category: "Electronics",
      capacity: "500GB",
      image: "https://example.com/images/superwidget.jpg",
      imageName: "superwidget.jpg",
    },
    {
      serial: "987654321",
      itemCode: "XYZ987",
      productName: "MegaGadget",
      category: "Gadgets",
      capacity: "1TB",
      image: "https://example.com/images/megagadget.jpg",
      imageName: "megagadget.jpg",
    },
    {
      serial: "456123789",
      itemCode: "LMN456",
      productName: "UltraDevice",
      category: "Devices",
      capacity: "256GB",
      image: "https://example.com/images/ultradevice.jpg",
      imageName: "ultradevice.jpg",
    },
    {
      serial: "321654987",
      itemCode: "PQR321",
      productName: "HyperTool",
      category: "Tools",
      capacity: "128GB",
      image: "https://example.com/images/hypertool.jpg",
      imageName: "hypertool.jpg",
    },
    {
      serial: "654987321",
      itemCode: "STU654",
      productName: "NanoGizmo",
      category: "Gizmos",
      capacity: "64GB",
      image: "https://example.com/images/nanogizmo.jpg",
      imageName: "nanogizmo.jpg",
    },
  ];

  //   const handleEdit = async (ticket) => {
  //     dispatch(ticketsEditSuccess(ticket));
  //     setShowTicketModal(true);
  //   };

  return (
    <>
      {Products && Products?.length > 0 ? (
        <div className="row">
          <div className="col-12 table-scrollable"  ref={listRef}>
            <table className="listing-table">
              <thead>
                {/* <tr>
                  <th>SN</th>
                  <ColumnResize id={1} className="columnResizer" />
                  <th>Customer</th>
                  <ColumnResize id={2} className="columnResizer" minWidth={120} />
                  <th>Reported By</th>
                  <ColumnResize id={3} className="columnResizer" />
                  <th>Description</th>
                  <ColumnResize id={3} className="columnResizer" />
                  <th>Priority</th>
                  <ColumnResize id={3} className="columnResizer" />
                  <th>Item</th>
                  <ColumnResize id={3} className="columnResizer" />
                  <th>Level</th>
                  <ColumnResize id={3} className="columnResizer" />
                  <th>Medium</th>
                  <ColumnResize id={3} className="columnResizer" />
                  <th>Assigner</th>
                  <ColumnResize id={3} className="columnResizer" />
                  <th>Status</th>
                  <ColumnResize id={3} className="columnResizer" />
                  <th>Action</th>
                </tr> */}
              </thead>
              <tbody>
                {Products.map((product, i) => {
                  const { serial, itemCode, productName, category, capacity, image, imageName } = product;
                  return (
                    <></>
                    // <tr key={_id} onDoubleClick={() => handleInspection(ticket)} style={{ cursor: "pointer" }}>
                    //   <td>{i + 1}</td>
                    //   <td className="column_resizer_body" />
                    //   <td>{serial ? customer.name : "N/A"}</td>
                    //   <td className="column_resizer_body" />
                    //   <td>{itemCode ? reportedBy : "N/A"}</td>
                    //   <td className="column_resizer_body" />
                    //   <td>{productName ? description : "N/A"}</td>
                    //   <td className="column_resizer_body" />
                    //   <td>{category ? priority : "N/A"}</td>
                    //   <td className="column_resizer_body" />
                    //   <td>{capacity ? item.name : "N/A"}</td>
                    //   <td className="column_resizer_body" />
                    //   <td>{image ? level : "N/A"}</td>
                    //   <td className="column_resizer_body" />
                    //   <td>{imageName ? medium : "N/A"}</td>
                    //   <td>
                    //     <DetailActionButton type={"edit"} onClick={() => handleEdit(ticket)} />
                    //   </td>
                    // </tr>
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
          {showTicketInspectionModal && (
            <Modal
              showModal={showTicketInspectionModal}
              setShowModal={setShowTicketInspectionModal}
              header={"Ticket Inspection"}
              size={"modal-sm"}
            >
              <NewTicketInspection
                selectedTicketId={selectedTicketId}
                itemId={selectItemId}
                setPage={setPage}
                setPostsPerPage={setPostsPerPage}
              />
            </Modal>
          )}
        </div>
      ) : (
        <NoData />
      )}
      {ticketInspectionModal && (
        <Modal
          showModal={ticketInspectionModal}
          setShowModal={setTicketIspectionModal}
          header={"Ticket Inspection"}
          size={"modal-xl"}
        >
          <TicketInspectionListing dispatch={dispatch} setShowModal={setTicketIspectionModal} onScroll={handleScroll} />
        </Modal>
      )}
    </>
  );
};

export default ProductListing;
