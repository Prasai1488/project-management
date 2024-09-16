import React, { useRef } from "react";
import { useSelector } from "react-redux";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import CommonTableLayout, { TableData } from "../../../Components/Table/CommonTableLayout";
import { itemsEditSuccess } from "../Redux/itemSlice";
import { getNext } from "../Redux/thunk";
import { useInfinteScroll } from "../../../Utils/useInfiniteScroll";

const TableHeaders = ["SN", "Name", "Item Code", "Warranty", "Support Period", "Manufacturer", "Unit", "Action"];

const ItemListing = ({ setItemModal, dispatch, setPostsPerPage, setPage }) => {
  const listRef = useRef(null);
  const items = useSelector((state) => state?.item?.items);
  const next = useSelector((state) => state.item.next);
  const { loadingNext, loadingItem } = useSelector((state) => state.item);

  const { handleScroll } = useInfinteScroll({
    loadingNext: loadingNext,
    next,
    getNext,
    setPostsPerPage,
    setPage,
  });

  const handleEdit = (id) => {
    setItemModal(true);
    dispatch(itemsEditSuccess(id));
  };

  return (
    <>
      {items && items.length > 0 ? (
        <CommonTableLayout
          listRef={listRef}
          TableHeaders={TableHeaders}
          onscroll={handleScroll}
          loadingNext={loadingNext}
        >
          {items &&
            items.map((item, i) => {
              const { _id, name, itemCode, warranty, supportPeriod, manufacturer, unit } = item;
              return (
                <tr key={_id} style={{ cursor: "pointer" }}>
                  <td>{i + 1}</td>
                  <TableData data={name} />
                  <TableData data={itemCode} />
                  <TableData data={warranty} />
                  <TableData data={supportPeriod} />
                  <TableData data={manufacturer?.name} />
                  <TableData data={unit?.name} />
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

export default ItemListing;
