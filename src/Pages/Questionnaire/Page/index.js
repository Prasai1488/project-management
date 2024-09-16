import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import { clearAllQuestionnaire } from "../Redux/questionnaireSlice";
import { getAllQuestionnaires, handleSearch } from "../Redux/thunk";
import CreateQuestionnaire from "./CreateQuestionnaire";
import "./questionnaire.css";
import QuestionnaireListing from "./QuestionnaireListing";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "Questionnaires";
const types = "Questionnaires";

const Questionnaires = () => {
  const dispatch = useDispatch();
  const { permissions, isSuperuser } = useSelector((state) => state.auth);
  const loadingQuestionnaire = useSelector((state) => state.questionnaire.loadingQuestionnaire);
  const questionnaires = useSelector((state) => state.questionnaire.questionnaires);
  const count = useSelector((state) => state.questionnaire.count);
  const edit = useSelector((state) => state.questionnaire.edit);
  const [showQuestionnaireModal, setShowQuestionnaireModal] = useState(false);
  const [item, setItem] = useState([]);
  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [page, setPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search === "") {
      dispatch(getAllQuestionnaires({ postsPerPage, page, item }));
    } else {
      dispatch(handleSearch({ search, postsPerPage, item }));
    }
  }, [postsPerPage, debouncedSearch, item, page]);

  const createPermission = isSuperuser || permissions?.includes("") || true;

  return (
    <>
      <div className="listing-wrapper">
        <CommonPageHeader
          title={title}
          dispatch={dispatch}
          search={search}
          setSearch={setSearch}
          loading={loadingQuestionnaire}
          data={questionnaires}
          count={count}
          types={types}
          item={item}
          setItem={setItem}
        />

        {loadingQuestionnaire && <ListingSkeleton />}
        {!loadingQuestionnaire && (
          <QuestionnaireListing
            dispatch={dispatch}
            setShowQuestionnaireModal={setShowQuestionnaireModal}
            setPage={setPage}
            setPostsPerPage={setPostsPerPage}
          />
        )}
      </div>
      <CommonCreateButton
        types={types}
        title={title}
        showModal={showQuestionnaireModal}
        setShowModal={setShowQuestionnaireModal}
        createPermission={createPermission}
      />
      {showQuestionnaireModal && (
        <Suspense fallback={<div></div>}>
          <Modal
            showModal={showQuestionnaireModal}
            setShowModal={setShowQuestionnaireModal}
            header={edit ? "Update Questionnaire" : "Add Questionnaire"}
            types={types}
            edit={edit}
            size={"modal-lg"}
            clearAction={clearAllQuestionnaire}
          >
            <CreateQuestionnaire
              dispatch={dispatch}
              postsPerPage={postsPerPage}
              setShowModal={setShowQuestionnaireModal}
              type={title}
            />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default Questionnaires;
