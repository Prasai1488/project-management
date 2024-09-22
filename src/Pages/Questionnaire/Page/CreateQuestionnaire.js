import { Formik } from "formik";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
import Checkbox from "../../../Components/CommonCheckbox/Checkbox";
import FormWrapper from "../../../Components/FormWrapper/FormWrapper";
import Loader from "../../../Components/Loader";
import { renderAsyncSelectField, renderTextField } from "../../../Utils/customFields";
import { createQuestionnaires, getAllQuestionnaires, updateQuestionnaires } from "../Redux/thunk";
import { loadOptionsItem } from "./asyncFunction";

const CreateQuestionnaire = ({ dispatch, postsPerPage = 10, setShowModal, type }) => {
  const formRef = useRef();
  const questionnaire = useSelector((state) => state.questionnaire.questionnaire);
  const loading = useSelector((state) => state.questionnaire.loading);
  const loadingUpdated = useSelector((state) => state.questionnaire.loadingUpdated);
  const edit = useSelector((state) => state.questionnaire.edit);
  const initialState = {
    question: edit ? questionnaire?.question : "",
    item: edit ? questionnaire?.item || [] : [],
    isActive: edit ? questionnaire?.isActive : true,
  };

  const validationSchema = Yup.object().shape({
    question: Yup.string().required("Required!"),
    item: Yup.array().required("Required!"),
    isActive: Yup.boolean(),
  });

  const onSubmit = (values) => {
    const createValues = {
      ...values,
      item: values.item?.map((item) => item._id),
      isActive: true,
    };

    const action = edit
      ? updateQuestionnaires({ id: questionnaire?._id, values: createValues })
      : createQuestionnaires(createValues);
    const successMessage = edit ? `${type} Updated successfully` : `${type} Created successfully`;

    dispatch(action)
      .unwrap()
      .then(() => {
        successFunction(successMessage);
        dispatch(getAllQuestionnaires(postsPerPage));
        setShowModal(false);
      })
      .catch(errorFunction);
  };

  return (
    <>
      {(loading || loadingUpdated) && <Loader />}
      <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={onSubmit} innerRef={formRef}>
        {(formik) => {
          return (
            <FormWrapper>
              {renderTextField(formik, 12, "question", "text", "Question", true)}
              {renderAsyncSelectField(formik, 12, "item", "Item", loadOptionsItem, true, true)}
              <div className="my-2 col-12 d-flex justify-content-center align-items-center">
                <Checkbox name="isActive" label="Active" edit={edit} />
              </div>
            </FormWrapper>
          );
        }}
      </Formik>
    </>
  );
};

export default CreateQuestionnaire;
