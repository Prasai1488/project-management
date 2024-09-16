import React, { useEffect, useState } from "react";
import { MdError } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import "./style.css";

const DocumentViewModal = ({ documentToView, showModal, setShowModal }) => {
  const modalClass = showModal ? "modal display-block" : "modal display-none";
  const [isPdfOrImage, setisPdfOrImage] = useState(false);
  const [documentUrl, setDocumentUrl] = useState(null);
  useEffect(() => {
    if (documentToView) {
      if (typeof documentToView === "object") {
        const objectURL = URL.createObjectURL(documentToView);
        setDocumentUrl(objectURL);
        // Check the file type of the object
        const pattern = /\.(jpg|jpeg|png|gif|pdf)$/i;
        if (pattern.test(documentToView.name)) {
          setisPdfOrImage(true);
        }
      } else {
        const pattern = /\.(jpg|jpeg|png|gif|pdf)$/i;
        if (pattern.test(documentToView)) {
          setisPdfOrImage(true);
          setDocumentUrl(documentToView);
        }
      }
    }
  }, [documentToView]);

  return (
    <>
      <div className={modalClass} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className={`modal-dialog modal-dialog-centered modal-lg`}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="myExtraLargeModalLabel">
                Preview file
              </h5>

              <div className="export-buttons d-flex">
                <button onClick={() => setShowModal(false)} type="button" className="btn btn-close">
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="modal-body">
              {/* <img src="http://192.168.1.72:8000/media/bsir/WIN_20231129_14_58_51_Pro_2.jpg"/> */}
              {isPdfOrImage ? (
                <iframe
                  id="documentPreview"
                  src={documentUrl}
                  width="100%"
                  height="550px"
                  title="Preview Document"
                  className="border border-light rounded"
                ></iframe>
              ) : (
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "400px" }}>
                  <p>
                    Could not preview file. <MdError />
                  </p>

                  <a download href={documentUrl}>
                    <button type="button" className="btn btn-dark">
                      Download
                    </button>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentViewModal;
