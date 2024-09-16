import { Formik } from "formik";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
import FormWrapper from "../../../Components/FormWrapper/FormWrapper";
import Loader from "../../../Components/Loader";
import { renderTextField } from "../../../Utils/customFields";
import { createIssues, getAllIssues, updateIssues } from "../Redux/thunk";
import Checkbox from "../../../Components/CommonCheckbox/Checkbox";

const CreateIssue = ({ dispatch, postsPerPage = 10, setShowModal, type }) => {
  const formRef = useRef();
  const issue = useSelector((state) => state.issue.issue);
  const loading = useSelector((state) => state.issue.loading);
  const loadingUpdated = useSelector((state) => state.issue.loadingUpdated);
  const edit = useSelector((state) => state.issue.edit);
  const initialState = {
    name: edit ? issue?.name : "",
    isActive: edit ? issue?.isActive : true,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required!"),

    isActive: Yup.boolean().required("Required!"),
  });

  const onSubmit = (values) => {
    
    const action = edit ? updateIssues({ id: issue?._id, values }) : createIssues(values);
    const successMessage = edit ? `${type} Updated successfully` : `${type} Created successfully`;

    dispatch(action)
      .unwrap()
      .then(() => {
        successFunction(successMessage);
        dispatch(getAllIssues(postsPerPage));
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
              {renderTextField(formik, 12, "name", "text", "Name", true)}
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

export default CreateIssue;
