import React, { useRef } from "react";
import { useSelector } from "react-redux";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import CommonTableLayout, { TableData } from "../../../Components/Table/CommonTableLayout";
import { issuesEditSuccess } from "../Redux/issueSlice";
import { getNext, getSpecificIssue } from "../Redux/thunk";
import { useInfinteScroll } from "../../../Utils/useInfiniteScroll";

const TableHeaders = ["SN", "Issue", "Action"];

const IssueListing = ({ dispatch, setIssueModal, setPostsPerPage, setPage }) => {
  const listRef = useRef(null);
  const issues = useSelector((state) => state?.issue?.issues);
  const next = useSelector((state) => state.issue.next);
  const { loadingNext, loadingIssue } = useSelector((state) => state.issue);
  const { handleScroll } = useInfinteScroll({ loadingNext, next, getNext, setPostsPerPage, setPage });

  const handleEdit = (id) => {
    setIssueModal(true);
    dispatch(issuesEditSuccess(id));
  };

  return (
    <>
      {issues && issues.length > 0 ? (
        <CommonTableLayout
          listRef={listRef}
          TableHeaders={TableHeaders}
          onscroll={handleScroll}
          loadingNext={loadingNext}
        >
          {issues &&
            issues.map((issue, i) => {
              const { _id, name } = issue;
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

export default IssueListing;
