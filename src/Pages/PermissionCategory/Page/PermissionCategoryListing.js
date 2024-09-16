import React, { useRef } from "react";
import { useSelector } from "react-redux";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import CommonTableLayout, { TableData } from "../../../Components/Table/CommonTableLayout";
import { permissionCategorysEditSuccess } from "../Redux/permissionCategorySlice";
import { getNext } from "../Redux/thunk";
import { useInfinteScroll } from "../../../Utils/useInfiniteScroll";

const TableHeaders = ["SN", "Name", "Action"];

const PermissionCategoryListing = ({ dispatch, setPermissionCategoryModal, setPostsPerPage, setPage }) => {
  const listRef = useRef(null);

  const permissionCategorys = useSelector((state) => state?.permissionCategory?.permissionCategorys);
  const next = useSelector((state) => state.permissionCategory.next);
  const loadingNext = useSelector((state) => state.permissionCategory?.loadingNext);
  const { handleScroll } = useInfinteScroll({ loadingNext, next, getNext, setPostsPerPage, setPage });

  const handleEdit = (id) => {
    dispatch(permissionCategorysEditSuccess(id));
    setPermissionCategoryModal(true);
  };

  return (
    <>
      {permissionCategorys && permissionCategorys.length > 0 ? (
        <CommonTableLayout
          listRef={listRef}
          TableHeaders={TableHeaders}
          onscroll={handleScroll}
          loadingNext={loadingNext}
        >
          {permissionCategorys &&
            permissionCategorys.map((permissioncategory, i) => {
              const { _id, name } = permissioncategory;
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

export default PermissionCategoryListing;
