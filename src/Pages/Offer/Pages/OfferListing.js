import React, { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import NoData from "../../../Components/NoData/NoData";
import Modal from "../../../Components/Modal/Modal";
import CreateOffer from "./CreateOffer";

const offers = [
  {
    id: 1,
    name: "Summer Sale",
    image: "https://example.com/images/summer-sale.jpg",
    status: "Active",
  },
  {
    id: 2,
    name: "Winter Clearance",
    image: "https://example.com/images/winter-clearance.jpg",
    status: "Active",
  },
];

const OfferListing = () => {
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [editOffer, setEditOffer] = useState(null);

  const handleEdit = (offer) => {
    setEditOffer(offer);
    setShowOfferModal(true);
  };

  const handleCreate = () => {
    setEditOffer(null);
    setShowOfferModal(true);
  };

  const handleCloseModal = () => {
    setShowOfferModal(false);
    setEditOffer(null);
  };

  return (
    <>
      {offers && offers.length > 0 ? (
        <div className="row">
          <div className="col-12 table-scrollable">
            <div className="table-responsive">
              <table className="listing-table">
                <thead>
                  <tr>
                    <th>Offer Name</th>
                    <th>File</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {offers.map((offer, i) => {
                    const { name, image, status } = offer;
                    return (
                      <tr key={i} style={{ cursor: "pointer" }}>
                        <td>{name || "N/A"}</td>
                        <td>
                          <img src={image} alt={name} style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                        </td>
                        <td>
                          <span
                            style={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              backgroundColor: status === "Active" ? "green" : "red",
                              display: "inline-block",
                              marginRight: "5px",
                            }}
                          />
                          {status}
                        </td>
                        <td>
                          <FaEllipsisH onClick={() => handleEdit(offer)} style={{ cursor: "pointer" }} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {showOfferModal && (
            <Modal
              showModal={showOfferModal}
              setShowModal={setShowOfferModal}
              header={editOffer ? "Edit Offer" : "Add New Offer"}
              size={"modal-md"}
            >
              <CreateOffer handleClose={handleCloseModal} edit={editOffer} />
            </Modal>
          )}
        </div>
      ) : (
        <NoData />
      )}

      <button className="btn btn-primary mt-3" onClick={handleCreate}>
        Add New Offer
      </button>
    </>
  );
};

export default OfferListing;
