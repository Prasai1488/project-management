import React, { useRef } from "react";
import { useSelector } from "react-redux";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import CommonTableLayout, { TableData } from "../../../Components/Table/CommonTableLayout";
import { permissionsEditSuccess } from "../Redux/permissionSlice";
import { getNext } from "../Redux/thunk";
import { useInfinteScroll } from "../../../Utils/useInfiniteScroll";

const TableHeaders = ["SN", "Name", "Code Name", "Action"];

const PermissionListing = ({ dispatch, setPermissionModal }) => {
  const listRef = useRef(null);

  const permissions = useSelector((state) => state?.permission?.permissions);
  const next = useSelector((state) => state.permission.next);
  const loadingNext = useSelector((state) => state.permission?.loadingNext);
  const { handleScroll } = useInfinteScroll({ loadingNext, next, getNext });

  const handleEdit = (id) => {
    dispatch(permissionsEditSuccess(id));
    setPermissionModal(true);
  };

  return (
    <>
      {permissions && permissions.length > 0 ? (
        <CommonTableLayout
          listRef={listRef}
          TableHeaders={TableHeaders}
          onscroll={handleScroll}
          loadingNext={loadingNext}
        >
          {permissions &&
            permissions.map((permission, i) => {
              const { _id, name, codename } = permission;
              return (
                <tr key={_id} style={{ cursor: "pointer" }}>
                  <td>{i + 1}</td>
                  <TableData data={name} />
                  <TableData data={codename} />

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

export default PermissionListing;
