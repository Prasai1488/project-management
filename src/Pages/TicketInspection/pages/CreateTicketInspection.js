import { Field, Form, Formik } from "formik";
import React, { useRef, useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import CreateAlert from "../../../Components/Alert/CreateAlert";
import Button from "../../../Components/Buttons/Button";
import SelectField from "../../../Components/CommonSelectField/Select";
import Loader from "../../../Components/Loader";
import TextField from "../../../Components/TextField/TextField";
import AsyncSelect from "../../../Components/CommonAsyncSelectField/AsyncSelect";
import {
  createTicketsInspection,
  updateTicketsInspection,
  getAllTicketsInspection,
  getAnswerQuestionByItemId,
  getNextQuestionByItemId,
} from "../Redux/thunk";
import "./TicketInspection.css";

const CreateTicketInspection = ({ setShowModal, edit, inspectionId, ticketId, itemId }) => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const loading = useSelector((state) => state.ticketInspection.loading);
  const loadingUpdated = useSelector((state) => state.ticketInspection.loadingUpdated);
  const inspection = useSelector((state) => state.ticketInspection.ticketInspections);
  const questionAnswers = useSelector((state) => state.ticketInspection.questionnaires) || [];
  const [submit, setSubmit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showSignatureDetails, setShowSignatureDetails] = useState(false);
  const [showQA, setShowQA] = useState(true);

  const initialState = {
    serialNo: "",
    issue: null,
    damageStatus: null,
    description: "",
    image: null,
    questionAnswers: questionAnswers.map((value) => ({
      question: value?.question,
      answer: "",
      description: "",
    })),
    signatureImage: null,
    signatoryName: "",
    signatoryContactNumber: "",
  };

  const handleToggleQA = () => {
    setShowQA(!showQA);
  };

  const damageStatusOptions = [
    { id: "PHYSICAL", name: "PHYSICAL" },
    { id: "SOFTWARE", name: "SOFTWARE" },
  ];

  const validationSchema = Yup.object().shape({
    serialNo: Yup.string().required("Required!"),
    issue: Yup.object()
      .shape({
        _id: Yup.string().required("Required!"),
      })
      .required("Required!"),
    description: Yup.string().required("Required!"),
    damageStatus: Yup.object()
      .shape({
        id: Yup.string().required("Required!"),
      })
      .required("Required!"),
    image: Yup.mixed().required("Required!"),
    questionAnswers: Yup.array().of(
      Yup.object().shape({
        question: Yup.string().required("Required!"),
        answer: Yup.boolean().required("Required!"),
        description: Yup.string().required("Required!"),
      })
    ),
    signatureImage: Yup.mixed().required("Required!"),
    signatoryName: Yup.string().required("Required!"),
    signatoryContactNumber: Yup.string().required("Required!"),
  });
  const onSubmit = (values) => {
    const filteredQuestionAnswers = values.questionAnswers.filter(
      (qa) => qa._id && (qa.answer === true || qa.answer === false) && qa.description
    );

    const createdData = {
      ...values,
      ticket: ticketId,
      issue: values.issue?._id,
      questionAnswers: filteredQuestionAnswers?.map((qa) => ({
        question: qa._id,
        answer: qa.answer,
        description: qa.description,
      })),
      damageStatus: values.damageStatus?.id,
    };

    if (!submit) {
      setShowAlert(true);
    } else {
      if (!edit) {
        dispatch(createTicketsInspection(createdData))
          .unwrap()
          .then(() => {
            successFunction("Ticket inspection created successfully.");
            setShowModal(false);
          })
          .catch((error) => {
            setSubmit(false);
            setShowAlert(false);
            errorFunction(error);
          });
      } else {
        const updateData = {
          id: inspectionId,
          values: { ...values, ticket: ticketId, damageStatus: values.damageStatus?.id },
        };
        dispatch(updateTicketsInspection(updateData))
          .unwrap()
          .then(() => {
            successFunction("Ticket inspection updated successfully.");
            dispatch(getAllTicketsInspection());
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
    if (edit && inspection) {
      formRef.current.setValues({
        serialNo: inspection.serialNo,
        issue: inspection.issue,
        damageStatus: inspection.damageStatus,
        description: inspection.description,
        image: inspection.image,
        questionAnswers: questionAnswers.map((qa) => ({
          question: qa?._id || "",
          answer: qa.answer || true,
          description: qa.description || "",
        })),
        signatureImage: inspection.signatureImage,
        signatoryName: inspection.signatoryName,
        signatoryContactNumber: inspection.signatoryContactNumber,
      });
    } else {
      formRef.current.resetForm();
    }
  }, [edit, inspection, questionAnswers]);

  return (
    <>
      {(loading || loadingUpdated) && <Loader />}
      <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={onSubmit} innerRef={formRef}>
        {(formik) => {
          console.log(formik.errors, "this is formik");
          return (
            <Form autoComplete="off">
              <div className="create-ticket-inspection-wrapper">
                <div className="row">
                  <div className="col-6">
                    <TextField
                      label="Serial No"
                      name="serialNo"
                      value={formik.values.serialNo}
                      required
                      formikrequired={formik.errors.serialNo && formik.touched.serialNo}
                      onChange={(e) => formik.setFieldValue("serialNo", e.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <SelectField
                      label="Damage Status"
                      name="damageStatus"
                      value={formik.values.damageStatus}
                      required
                      options={damageStatusOptions}
                      formikrequired={formik.errors.damageStatus && formik.touched.damageStatus}
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.id}
                      onChange={(selected) => formik.setFieldValue("damageStatus", selected)}
                    />
                  </div>

                  <div className="col-6">
                    <AsyncSelect
                      label="Issue"
                      name="issue"
                      value={formik.values.issue}
                      required
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option._id}
                      formikrequired={formik.errors.issue && formik.touched.issue}
                      onChange={(select) => formik.setFieldValue("issue", select)}
                      loadOptions={loadOptionsIssue}
                      additional={{ offset: 0, limit: 10 }}
                    />
                  </div>

                  <div className="col-6">
                    <TextField
                      label="Description"
                      name="description"
                      value={formik.values.description}
                      required
                      formikrequired={formik.errors.description && formik.touched.description}
                      onChange={(e) => formik.setFieldValue("description", e.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <div className="image-upload-section">
                      <label htmlFor="image">Image</label>
                      <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={(event) => formik.setFieldValue("image", event.currentTarget.files[0])}
                        className={formik.errors.image && formik.touched.image ? "is-invalid" : ""}
                      />
                      {formik.errors.image && formik.touched.image && (
                        <div className="invalid-feedback">{formik.errors.image}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn"
                      type="button"
                      onClick={() => setShowSignatureDetails(!showSignatureDetails)}
                    >
                      Signature Details
                      <FiChevronDown />
                    </button>
                    <div className={`collapse ${showSignatureDetails ? "show" : ""}`}>
                      <div className="card card-body">
                        <div className="row">
                          <div className="col-6">
                            <div className="signature-upload-section">
                              <label htmlFor="signatureImage">Signature Image</label>
                              <input
                                type="file"
                                id="signatureImage"
                                name="signatureImage"
                                accept="image/*"
                                onChange={(event) =>
                                  formik.setFieldValue("signatureImage", event.currentTarget.files[0])
                                }
                                className={
                                  formik.errors.signatureImage && formik.touched.signatureImage ? "is-invalid" : ""
                                }
                              />
                              {formik.errors.signatureImage && formik.touched.signatureImage && (
                                <div className="invalid-feedback">{formik.errors.signatureImage}</div>
                              )}
                            </div>
                          </div>
                          <div className="col-6">
                            <TextField
                              label="Signatory Name"
                              name="signatoryName"
                              value={formik.values.signatoryName}
                              required
                              formikrequired={formik.errors.signatoryName && formik.touched.signatoryName}
                              onChange={(e) => formik.setFieldValue("signatoryName", e.target.value)}
                            />
                          </div>
                          <div className="col-6">
                            <TextField
                              label="Signatory Contact Number"
                              name="signatoryContactNumber"
                              value={formik.values.signatoryContactNumber}
                              required
                              formikrequired={
                                formik.errors.signatoryContactNumber && formik.touched.signatoryContactNumber
                              }
                              onChange={(e) => formik.setFieldValue("signatoryContactNumber", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <button className="btn" type="button" onClick={() => dispatch(getAnswerQuestionByItemId(itemId))}>
                      Question and Answer
                      <FiChevronDown />
                    </button>
                    <div className={`collapse ${showQA ? "show" : ""}`}>
                      <div className="card card-body">
                        {formik.values.questionAnswers.map((value, i) => (
                          <div key={i} className="form-group">
                            <label>{value.question || ""}</label>{" "}
                            <div className="form-check-inline">
                              <Field
                                type="radio"
                                name={`questionAnswers[${i}].answer`}
                                value="true"
                                className="form-check-input"
                                id={`qa-${i}-true`}
                                checked={formik.values.questionAnswers[i]?.answer === true}
                                onChange={() => {
                                  formik.setFieldValue(`questionAnswers[${i}].answer`, true);
                                }}
                              />
                              <label className="form-check-label" htmlFor={`qa-${i}-true`}>
                                True
                              </label>
                            </div>
                            <div className="form-check-inline">
                              <Field
                                type="radio"
                                name={`questionAnswers[${i}].answer`}
                                value="false"
                                className="form-check-input"
                                id={`qa-${i}-false`}
                                checked={formik.values.questionAnswers[i]?.answer === false}
                                onChange={() => {
                                  formik.setFieldValue(`questionAnswers[${i}].answer`, false);
                                }}
                              />
                              <label className="form-check-label" htmlFor={`qa-${i}-false`}>
                                False
                              </label>
                            </div>
                            <TextField
                              label="Answer Description"
                              placeholder="Answer Description"
                              name={`questionAnswers[${i}].description`}
                              value={formik.values.questionAnswers[i]?.description || ""}
                              required
                              formikrequired={
                                formik.errors.questionAnswers?.[i]?.description &&
                                formik.touched.questionAnswers?.[i]?.description
                              }
                              onChange={(e) =>
                                formik.setFieldValue(`questionAnswers[${i}].description`, e.target.value)
                              }
                            />
                            <Field
                              type="hidden"
                              name={`questionAnswers[${i}].question`}
                              value={formik.values.questionAnswers[i]?.question}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 p-0 text-right">
                <div className="mt-3 d-flex justify-content-end align-items-center">
                  <Button
                    btnType="submit"
                    className="btn create-button"
                    createButton={true}
                    disabled={loading || loadingUpdated}
                    title="Save"
                    content="Save"
                    onClick={() => setShowAlert(true)}
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

export default CreateTicketInspection;
