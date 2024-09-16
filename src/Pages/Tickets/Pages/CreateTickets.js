import { Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
import CreateAlert from "../../../Components/Alert/CreateAlert";
import Button from "../../../Components/Buttons/Button";
import AsyncSelect from "../../../Components/CommonAsyncSelectField/AsyncSelect";
import SelectField from "../../../Components/CommonSelectField/Select";
import Loader from "../../../Components/Loader";
import TextField from "../../../Components/TextField/TextField";
import { loadOptionsCustomer, loadOptionsItem, loadOptionsUser } from "../../../Utils/asyncFunction";
import { createTickets, getAllTickets, updateTickets } from "../Redux/thunk";

const CreateTickets = ({ dispatch, postsPerPage = 10, setShowModal }) => {
  const formRef = useRef();
  const ticket = useSelector((state) => state.ticket.ticket);
  console.log("ticket", ticket);

  const loading = useSelector((state) => state.ticket.loading);
  const loadingUpdated = useSelector((state) => state.ticket.loadingUpdated);
  const edit = useSelector((state) => state.ticket.edit);
  const items = useSelector((state) => state.item.items);

  const [submit, setSubmit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const priorityOptions = [
    { id: "URGENT", name: "Urgent" },
    { id: "HIGH", name: "High" },
    { id: "MEDIUM", name: "Medium" },
    { id: "LOW", name: "Low" },
  ];

  const levelOptions = [
    { id: "L1", name: "L1" },
    { id: "L2", name: "L2" },
    { id: "L3", name: "L3" },
  ];

  const mediumOptions = [
    { id: "PHONE", name: "Phone" },
    { id: "EMAIL", name: "Email" },
    { id: "VISIT", name: "Visit" },
    { id: "PORTAL", name: "Portal" },
  ];

  const statusOptions = [
    { id: "PENDING", name: "Pending" },
    { id: "RESOLVED", name: "Resolved" },
    { id: "CREATED", name: "Created" },
  ];

  const initialState = {
    customer: edit ? ticket?.customer : null,
    reportedBy: edit ? ticket?.reportedBy : "",
    description: edit ? ticket?.description || "" : "",
    priority: edit ? priorityOptions.find((option) => option.id === ticket?.priority) : null,
    item: edit ? ticket?.item : null,
    level: edit ? levelOptions.find((option) => option.id === ticket?.level) : null,
    medium: edit ? mediumOptions.find((option) => option.id === ticket?.medium) : null,
    status: edit ? statusOptions.find((option) => option.id === ticket?.status) : null,
    assignedTo: edit ? ticket?.assignedTo : null,
  };

  const validationSchema = Yup.object().shape({
    customer: Yup.object().required("Required!"),
    reportedBy: Yup.string().required("Required!"),
    description: Yup.string().required("Required!"),
    priority: Yup.object().required("Required!"),
    item: Yup.object().required("Required!"),
    level: Yup.object().required("Required!"),
    medium: Yup.object().required("Required!"),
    assignedTo: Yup.object().required("Required!"),
    status: edit ? Yup.object().required("Required!") : Yup.object().nullable(),
  });

  const onSubmit = (values) => {
    const { priority, medium, level } = values;
    if (!submit) {
      setShowAlert(true);
    } else {
      if (!edit) {
        const updatedValues = {
          ...values,
          medium: medium?.id,
          level: level?.id,
          item: values.item?._id,
          priority: priority?.id,
          customer: values.customer?._id,
          assignedTo: values.assignedTo?._id,
          status: values?.status?.id,
        };
        dispatch(createTickets(updatedValues))
          .unwrap()
          .then(() => {
            successFunction("Ticket created successfully.");
            dispatch(getAllTickets(postsPerPage));
            setShowModal(false);
          })
          .catch((error) => {
            setSubmit(false);
            setShowAlert(false);
            errorFunction(error);
          });
      } else {
        let updateData = {
          id: ticket?._id,
          values: {
            ...values,
            medium: medium?.id,
            level: level?.id,
            priority: priority?.id,
            customer: values.customer?._id,
            assignedTo: values.assignedTo?._id,
            item: values.item?._id,
            status: values?.status?.id,
          },
        };
        dispatch(updateTickets(updateData))
          .unwrap()
          .then(() => {
            successFunction("Ticket updated successfully.");
            dispatch(getAllTickets(postsPerPage));
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
              <div className="create-ticket-wrapper">
                <div className="row">
                  <div className="col-6">
                    <AsyncSelect
                      label="Customer"
                      name="customer"
                      value={formik.values?.customer}
                      required
                      getOptionLabel={(option) => `${option?.name} `}
                      getOptionValue={(option) => `${option?._id}`}
                      formikrequired={formik?.errors?.customer && formik?.touched?.customer}
                      onChange={(select) => {
                        formik.setFieldValue("customer", select);
                      }}
                      loadOptions={loadOptionsCustomer}
                      additional={{
                        offset: 0,
                        limit: 10,
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      label="Reported By"
                      name="reportedBy"
                      value={formik.values.reportedBy}
                      required
                      formikrequired={formik?.errors?.reportedBy && formik?.touched?.reportedBy}
                      onChange={(e) => formik.setFieldValue("reportedBy", e.target.value)}
                    />
                  </div>

                  <div className="col-6">
                    <SelectField
                      label="Priority"
                      name="priority"
                      value={formik.values.priority}
                      required
                      formikrequired={formik?.errors?.priority && formik?.touched?.priority}
                      getOptionLabel={(option) => `${option?.name}`}
                      getOptionValue={(option) => `${option?.id}`}
                      onChange={(selected) => {
                        formik.setFieldValue("priority", selected);
                      }}
                      options={priorityOptions}
                    />
                  </div>
                  <div className="col-6">
                    <AsyncSelect
                      label="Item"
                      name="item"
                      value={formik.values.item}
                      required
                      loadOptions={loadOptionsItem}
                      getOptionLabel={(option) => `${option?.name} `}
                      getOptionValue={(option) => `${option?._id}`}
                      formikrequired={formik?.errors?.item && formik?.touched?.item}
                      onChange={(select) => formik.setFieldValue("item", select)}
                      additional={{
                        offset: 0,
                        limit: 10,
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <SelectField
                      label="Level"
                      name="level"
                      value={formik.values.level}
                      required
                      formikrequired={formik?.errors?.level && formik?.touched?.level}
                      getOptionLabel={(option) => `${option?.name}`}
                      getOptionValue={(option) => `${option?.id}`}
                      onChange={(selected) => {
                        formik.setFieldValue("level", selected);
                      }}
                      options={levelOptions}
                    />
                  </div>
                  <div className="col-6">
                    <SelectField
                      label="Medium"
                      name="medium"
                      value={formik.values.medium}
                      required
                      options={mediumOptions}
                      formikrequired={formik?.errors?.medium && formik?.touched?.medium}
                      getOptionLabel={(option) => `${option?.name}`}
                      getOptionValue={(option) => `${option?.id}`}
                      onChange={(selected) => {
                        formik.setFieldValue("medium", selected);
                      }}
                    />
                  </div>
                  {edit && (
                    <div className="col-6">
                      <SelectField
                        label="Status"
                        name="status"
                        value={formik.values.status}
                        required
                        options={statusOptions}
                        formikrequired={formik?.errors?.status && formik?.touched?.status}
                        getOptionLabel={(option) => `${option?.name}`}
                        getOptionValue={(option) => `${option?.id}`}
                        onChange={(selected) => {
                          formik.setFieldValue("status", selected);
                        }}
                      />
                    </div>
                  )}
                  <div className="col-6">
                    <AsyncSelect
                      label="Assigned To"
                      name="assignedTo"
                      value={formik.values.assignedTo}
                      required
                      loadOptions={loadOptionsUser}
                      getOptionLabel={(option) => `${option?.username} `}
                      getOptionValue={(option) => `${option?._id}`}
                      formikrequired={formik?.errors?.assignedTo && formik?.touched?.assignedTo}
                      onChange={(select) => formik.setFieldValue("assignedTo", select)}
                      additional={{
                        offset: 0,
                        limit: 10,
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      label="Description"
                      name="description"
                      value={formik.values.description}
                      required
                      formikrequired={formik?.errors?.description && formik?.touched?.description}
                      onChange={(e) => formik.setFieldValue("description", e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 p-0 text-right">
                <div className="mt-3 d-flex justify-content-end align-items-center">
                  <Button
                    btnType="submit"
                    className="btn create-button"
                    createButton={true}
                    disabled={false}
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

export default CreateTickets;
