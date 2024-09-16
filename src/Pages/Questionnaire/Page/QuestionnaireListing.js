import React, { useRef } from "react";
import { useSelector } from "react-redux";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import CommonTableLayout, { TableData } from "../../../Components/Table/CommonTableLayout";
import { questionnairesEditSuccess } from "../Redux/questionnaireSlice";
import { getNext } from "../Redux/thunk";
import { useInfinteScroll } from "../../../Utils/useInfiniteScroll";

const TableHeaders = ["SN", "Question", "Action"];

const QuestionnaireListing = ({ dispatch, setShowQuestionnaireModal, setPostsPerPage, setPage }) => {
  const listRef = useRef(null);
  const questionnaires = useSelector((state) => state?.questionnaire?.questionnaires);
  const next = useSelector((state) => state.questionnaire.next);
  const { loadingNext ,loadingQuestioner} = useSelector((state) => state.questionnaire);
  const { handleScroll } = useInfinteScroll({
    loadingNext: loadingNext,
    next,
    getNext,
    setPostsPerPage,
    setPage,
  });
  const handleEdit = (id) => {
    setShowQuestionnaireModal(true);
    dispatch(questionnairesEditSuccess(id));
  };

  return (
    <>
      {questionnaires && questionnaires.length > 0 ? (
        <CommonTableLayout
          listRef={listRef}
          TableHeaders={TableHeaders}
          onscroll={handleScroll}
          loadingNext={loadingNext}
        >
          {questionnaires &&
            questionnaires.map((questionnaire, i) => {
              const { _id, question } = questionnaire;
              return (
                <tr key={_id} style={{ cursor: "pointer" }}>
                  <td>{i + 1}</td>
                  <TableData data={question} />

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

export default QuestionnaireListing;
