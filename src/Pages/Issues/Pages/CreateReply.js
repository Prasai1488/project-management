import { Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
import Button from "../../../Components/Buttons/Button";
import Textarea from "../../../Components/CommonTextarea/Textarea";
import Loader from "../../../Components/Loader";
import TextField from "../../../Components/TextField/TextField";
import { createReply, getReplies, getReply, updateReply } from "../Redux/thunk";
import CreateAlert from "../../../Components/Alert/CreateAlert";

const CreateReply = ({ dispatch, postsPerPage = 10, setShowModal }) => {
  const formRef = useRef();
  const replies = useSelector((state) => state.ticketIssues.replies);
  const reply = useSelector((state) => state.ticketIssues.reply);
  const issue = useSelector((state) => state.ticketIssues.ticketIssue);

  const loading = useSelector((state) => state.ticketIssues.loading);

  const loadingUpdated = useSelector((state) => state.ticketIssues.loadingUpdated);
  const edit = useSelector((state) => state.ticketIssues.edit);

  const [lock, setLock] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const initialState = {
    message: edit ? reply?.message : "",
    documentName: edit ? reply?.documentName : "",
    document: edit ? reply?.document : null,
  };

  const validationSchema = Yup.object().shape({
    message: Yup.string().required("Required!"),
    documentName: Yup.string().required("Required!"),
    document: Yup.mixed().required("Required!"),
  });

  const onSubmit = (values) => {
    if (!submit) {
      setShowAlert(true);
    } else {
      if (!edit) {
        dispatch(createReply({...values, issue: issue?.id}))
          .unwrap()
          .then(() => {
            successFunction("Issue created successfully.");
            dispatch(getReplies(issue?.id));
            setShowModal(false);
          })
          .catch((error) => {
            setSubmit(false);
            setShowAlert(false);
            errorFunction(error);
          });
      } else {
        let updateData = { id: reply?.id, values:{...values, issue: issue?.id} };
        dispatch(updateReply(updateData))
          .unwrap()
          .then(() => {
            successFunction("Issue updated successfully.");
            dispatch(getReplies(issue?.id));
            setShowModal(false);
          })
          .catch((error) => {
            setSubmit(false);
            setShowAlert(false);
            errorFunction(error);
          });
      }
    }
  };

  useEffect(() => {
    if (submit && formRef.current) {
      formRef.current.submitForm();
    }
  }, [submit]);

  return (
    <>
      {(loading || loadingUpdated) && <Loader />}

      <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={onSubmit} innerRef={formRef}>
        {(formik) => {
          return (
            <Form autoComplete="off">
              <div className="create-customer-wrapper">
                <div className="row">
                  <div className="col-12">
                    <Textarea
                      label="Message"
                      name="message"
                      value={formik.values.message}
                      required={true}
                      placeholder={"Enter message"}
                      onChange={(e) => {
                        formik.setFieldValue("message", e.target.value);
                      }}
                    />
                  </div>

                  <div className="col-5">
                    <TextField
                      type="text"
                      name="documentName"
                      placeholder="Document Name"
                      label="Document Name"
                      required
                      formikRequired={formik?.errors?.documentName && formik?.touched?.documentName}
                      onChange={(e) => {
                        formik.setFieldValue("documentName", e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <div>
                      <small htmlFor="file" className="m-0 p-0 form-label ">
                        File
                      </small>
                      <input
                        type="file"
                        name="document"
                        id="file"
                        className="form-control"
                        placeholder="Document"
                        formikRequired={formik?.errors?.document && formik?.touched?.document}
                        onChange={(e) => {
                          formik.setFieldValue("document", e.target.files[0]);
                        }}
                      />
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <button className="btn btn-danger font-weight-bold rounded-circle " style={{ marginTop: "20px" }}>
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-12 p-0 text-right">
                <div className="mt-3 d-flex justify-content-end align-items-center">
                  <Button
                    btnType="submit"
                    className="btn create-button"
                    createButton={true}
                    disabled={edit ? lock || loadingUpdated : loading || lock}
                    title={"Save"}
                    content={"Save"}
                  />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
      {showAlert && <CreateAlert showAlert={showAlert} setShowAlert={setShowAlert} setSubmit={setSubmit} />}
    </>
  );
};

export default CreateReply;
