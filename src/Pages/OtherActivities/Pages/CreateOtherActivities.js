import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { successFunction, errorFunction } from "../../../Components/Alert/Alert";
import { createOtherActivities, updateOtherActivities, getOtherActivities } from "../Redux/thunk";
import Loader from "../../../Components/Loader";
import TextField from "../../../Components/TextField/TextField";
import Button from "../../../Components/Buttons/Button";
import CreateAlert from "../../../Components/Alert/CreateAlert";
import Textarea from "../../../Components/CommonTextarea/Textarea";
import SelectField from "../../../Components/CommonSelectField/Select";

const CreateTicketIssue = ({ dispatch, postsPerPage = 10, setShowModal }) => {
  const formRef = useRef();
  const otherActivities = useSelector((state) => state.otherActivities.otherActivities);
  const otherActivity = useSelector((state) => state.otherActivities.otherActivity);
  const loading = useSelector((state) => state.otherActivities.loading);
  const loadingUpdated = useSelector((state) => state.otherActivities.loadingUpdated);
  const edit = useSelector((state) => state.otherActivities.edit);

  const [lock, setLock] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const sector = [
    { id: 1, name: "Textile", label: "Textile" },
    { id: 2, name: "Weaving", label: "Weaving" },
    { id: 3, name: "Dyeing", label: "Dyeing" },
    { id: 4, name: "Other", label: "Other" },
  ];

  const initialState = {
    title: edit ? otherActivity?.title : "",
    sector: edit ? sector.find((sector) => sector.id === otherActivity?.sector) : null,
    description: edit ? otherActivity?.description : "",
    documentName: edit ? otherActivity?.documentName : "",
    document: edit ? otherActivity?.document : null,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required!"),
    sector: Yup.object().required("Required!"),
    description: Yup.string().required("Required!"),
    documentName: Yup.string().required("Required!"),
    document: Yup.mixed().required("Required!"),
  });

  const onSubmit = (values) => {
    if (!submit) {
      setShowAlert(true);
    } else {
      if (!edit) {
        dispatch(createOtherActivities({ ...values, sector: values.sector.id }))
          .unwrap()
          .then(() => {
            successFunction("Issue created successfully.");
            dispatch(getOtherActivities(postsPerPage));
            setShowModal(false);
          })
          .catch((error) => {
            setSubmit(false);
            setShowAlert(false);
            errorFunction(error);
          });
      } else {
        let updateData = { id: otherActivity?.id, values: { ...values, sector: values.sector.id } };
        dispatch(updateOtherActivities(updateData))
          .unwrap()
          .then(() => {
            successFunction("Issue updated successfully.");
            dispatch(getOtherActivities(postsPerPage));
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
                  <div className="col-6">
                    <TextField
                      type="text"
                      name="title"
                      placeholder="Enter title"
                      label="Title"
                      required
                      formikRequired={formik?.errors?.title && formik?.touched?.title}
                      onChange={(e) => {
                        formik.setFieldValue("title", e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <SelectField
                      label="Sector"
                      value={formik.values.sector}
                      name="sector"
                      required
                      options={sector}
                      formikRequired={formik?.errors?.sector && formik?.touched?.sector}
                      getOptionLabel={(option) => `${option?.name} `}
                      getOptionValue={(option) => `${option?.value}`}
                      onChange={(selected) => {
                        formik.setFieldValue("sector", selected);
                      }}
                    />
                  </div>
                  <div className="col-12">
                    <Textarea
                      label="Description"
                      name="description"
                      value={formik.values.description}
                      required={true}
                      placeholder={"Enter description"}
                      onChange={(e) => {
                        formik.setFieldValue("description", e.target.value);
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

export default CreateTicketIssue;
