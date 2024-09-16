import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import FiscalYearListing from "./FiscalYearListing";
import Modal from "../../../Components/Modal/Modal";
import CreateFiscalYear from "./CreateFiscalYear";
import { setShowModal } from "../../../Redux/Layout/layoutSlice.js";

const FiscalYears = () => {
  const dispatch = useDispatch();
  const [createFiscalYear, setCreateFiscalYear] = useState(false);

  const onClickCreate = () => {
    setCreateFiscalYear(true);
  };

  return (
    <>
      <div className="lead-wrapper">
        <CommonPageHeader title={"FiscalYears"} onClick={onClickCreate} />
        <FiscalYearListing />

        <Modal
          showModal={createFiscalYear}
          setShowModal={setCreateFiscalYear}
          dispatch={setShowModal}
        >
          <CreateFiscalYear />
        </Modal>
      </div>
    </>
  );
};

export default FiscalYears;
