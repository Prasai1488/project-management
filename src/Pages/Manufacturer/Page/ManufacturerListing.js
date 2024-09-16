import React, { useRef } from "react";
import { useSelector } from "react-redux";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import CommonTableLayout, { TableData } from "../../../Components/Table/CommonTableLayout";
import { manufacturersEditSuccess } from "../Redux/manufacturerSlice";
import { getNext } from "../Redux/thunk";
import { useInfinteScroll } from "../../../Utils/useInfiniteScroll";

const TableHeaders = ["SN", "Name", "Action"];

const ManufacturerListing = ({ dispatch, setManufacturerModal, setPostsPerPage, setPage }) => {
  const listRef = useRef(null);

  const manufacturers = useSelector((state) => state?.manufacturer?.manufacturers);
  const next = useSelector((state) => state.manufacturer.next);
  const { loadingNext, loadingManufacturer } = useSelector((state) => state.manufacturer);
  const { handleScroll } = useInfinteScroll({
    loadingNext,
    next,
    getNext,
    setPostsPerPage,
    setPage,
  });

  const handleEdit = (id) => {
    dispatch(manufacturersEditSuccess(id));
    setManufacturerModal(true);
  };

  return (
    <>
      {manufacturers && manufacturers.length > 0 ? (
        <CommonTableLayout
          listRef={listRef}
          TableHeaders={TableHeaders}
          onscroll={handleScroll}
          loadingNext={loadingNext}
        >
          {manufacturers &&
            manufacturers.map((manufacturer, i) => {
              const { _id, name } = manufacturer;
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

export default ManufacturerListing;
