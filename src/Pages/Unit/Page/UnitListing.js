import React, { useRef } from "react";
import { useSelector } from "react-redux";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import CommonTableLayout, { TableData } from "../../../Components/Table/CommonTableLayout";
import { getNext } from "../Redux/thunk";
import { useInfinteScroll } from "../../../Utils/useInfiniteScroll";
import { unitsEditSuccess } from "../Redux/unitSlice";

const TableHeaders = ["SN", "Name", "Action"];

const UnitListing = ({ dispatch, setUnitModal, setPostsPerPage, setPage }) => {
  const listRef = useRef(null);

  const units = useSelector((state) => state?.unit?.units);
  const next = useSelector((state) => state.unit.next);
  const { loadingNext, loadingUnit } = useSelector((state) => state.unit);
  const { handleScroll } = useInfinteScroll({
    loadingNext,
    next,
    getNext,
    setPostsPerPage,
    setPage,
  });

  const handleEdit = (id) => {
    dispatch(unitsEditSuccess(id));
    setUnitModal(true);
  };

  return (
    <>
      {units && units.length > 0 ? (
        <CommonTableLayout
          listRef={listRef}
          TableHeaders={TableHeaders}
          onscroll={handleScroll}
          loadingNext={loadingNext}
        >
          {units &&
            units.map((unit, i) => {
              const { _id, name, email, phoneNo, contactPerson, contactPersonPhoneNo } = unit;
              return (
                <tr key={_id} style={{ cursor: "pointer" }}>
                  <td>{i + 1}</td>
                  <TableData data={name} />

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

export default UnitListing;
