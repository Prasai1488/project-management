import { Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
import CreateAlert from "../../../Components/Alert/CreateAlert";
import Button from "../../../Components/Buttons/Button";
import AsyncSelect from "../../../Components/CommonAsyncSelectField/AsyncSelect";
import Textarea from "../../../Components/CommonTextarea/Textarea";
import Loader from "../../../Components/Loader";
import TextField from "../../../Components/TextField/TextField";
import axiosInstance from "../../../Utils/axios";
import { createTicketIssues, getTicketIssues, updateTicketIssues } from "../Redux/thunk";
import SelectField from "../../../Components/CommonSelectField/Select";

const CreateTicketIssue = ({ dispatch, postsPerPage = 10, setShowModal }) => {
  const formRef = useRef();
  const ticketIssues = useSelector((state) => state.ticketIssues.ticketIssues);
  const ticketIssue = useSelector((state) => state.ticketIssues.ticketIssue);
  const loading = useSelector((state) => state.ticketIssues.loading);
  const loadingUpdated = useSelector((state) => state.ticketIssues.loadingUpdated);
  const edit = useSelector((state) => state.ticketIssues.edit);

  const [lock, setLock] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const loadOptionsSector = async (search, loadOptions, { limit, offset }) => {
    const { data } = await axiosInstance(`api/v1/user/sector?offset=0&limit=${postsPerPage}&search=${search}`);
    return {
      options: data.results,
      hasMore: data.next ? true : false,
      additional: {
        offset: data.count > offset ? offset + 10 : offset,
        limit: 10,
      },
    };
  };

  const statusOptions = [
    { id: 1, name: "PENDING" },
    { id: 2, name: "IN_PROGRESS" },
    { id: 3, name: "RESOLVED" },
    { id: 4, name: "CANCELLED" },
  ];

  const initialState = {
    title: edit ? ticketIssue?.title : "",
    sector: edit ? ticketIssue?.sector : null,
    status: edit ? statusOptions.find((status) => status.name === ticketIssue?.status) : null,
    description: edit ? ticketIssue?.description : "",
    documentName: edit ? ticketIssue?.documentName : "",
    document: edit ? ticketIssue?.document : null,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required!"),
    sector: Yup.object().required("Required!"),
    status: Yup.object().nullable(),
    description: Yup.string().required("Required!"),
    documentName: Yup.string().required("Required!"),
    document: Yup.mixed().required("Required!"),
  });

  const onSubmit = (values) => {
    if (!submit) {
      setShowAlert(true);
    } else {
      if (!edit) {
        dispatch(createTicketIssues({ ...values, sector: values.sector.id }))
          .unwrap()
          .then(() => {
            successFunction("Issue created successfully.");
            dispatch(getTicketIssues(postsPerPage));
            setShowModal(false);
          })
          .catch((error) => {
            setSubmit(false);
            setShowAlert(false);
            errorFunction(error);
          });
      } else {
        let updateData = {
          id: ticketIssue?.id,
          values: { ...values, sector: values.sector.id, status: values.status.name },
        };
        dispatch(updateTicketIssues(updateData))
          .unwrap()
          .then(() => {
            successFunction("Issue updated successfully.");
            dispatch(getTicketIssues(postsPerPage));
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
                  <div className={`${edit ? "col-3" : "col-6"}`}>
                    <AsyncSelect
                      label="Sector"
                      value={formik.values.sector}
                      name="sector"
                      required
                      loadOptions={loadOptionsSector}
                      formikRequired={formik?.errors?.sector && formik?.touched?.sector}
                      getOptionLabel={(option) => `${option?.name} `}
                      getOptionValue={(option) => `${option?.id}`}
                      onChange={(selected) => {
                        formik.setFieldValue("sector", selected);
                      }}
                      additional={{
                        offset: 0,
                        limit: 10,
                      }}
                    />
                  </div>
                  {edit && (
                    <div className="col-3">
                      <SelectField
                        label="Status"
                        value={formik.values.status}
                        name="status"
                        required
                        options={statusOptions}
                        formikRequired={formik?.errors?.status && formik?.touched?.status}
                        getOptionLabel={(option) => `${option?.name} `}
                        getOptionValue={(option) => `${option?.id}`}
                        onChange={(selected) => {
                          formik.setFieldValue("status", selected);
                        }}
                        additional={{
                          offset: 0,
                          limit: 10,
                        }}
                      />
                    </div>
                  )}
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
                      {formik.errors.document && <div className="text-danger">{formik.errors.document}</div>}
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
