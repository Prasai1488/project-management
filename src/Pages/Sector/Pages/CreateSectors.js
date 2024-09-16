import React, { useEffect, useRef, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { successFunction, errorFunction } from "../../../Components/Alert/Alert";
import { createSectors, updateSectors, getSectors } from "../Redux/thunk";
import Loader from "../../../Components/Loader";
import TextField from "../../../Components/TextField/TextField";
import Button from "../../../Components/Buttons/Button";
import CreateAlert from "../../../Components/Alert/CreateAlert";
import Textarea from "../../../Components/CommonTextarea/Textarea";
import SelectField from "../../../Components/CommonSelectField/Select";
import DatePicker from "../../../Components/CommonDatePicker/DatePicker";

const CreateSectors = ({ dispatch, postsPerPage = 10, setShowModal }) => {
  const formRef = useRef();
  const sectors = useSelector((state) => state.sectors.sectors);
  const sector = useSelector((state) => state.sectors.sector);

  const loading = useSelector((state) => state.sectors.loading);
  const loadingUpdated = useSelector((state) => state.sectors.loadingUpdated);
  const edit = useSelector((state) => state.sectors.edit);

  const [lock, setLock] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const initialState = {
    name: edit ? sector?.name : "",
    description: edit ? sector?.description : "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
  });

  const onSubmit = (values) => {
    if (!submit) {
      setShowAlert(true);
    } else {
      if (!edit) {
        dispatch(createSectors(values))
          .unwrap()
          .then(() => {
            successFunction("Issue created successfully.");
            dispatch(getSectors(postsPerPage));
            setShowModal(false);
          })
          .catch((error) => {
            setSubmit(false);
            setShowAlert(false);
            errorFunction(error);
          });
      } else {
        let updateData = { id: sector?.id, values };
        dispatch(updateSectors(updateData))
          .unwrap()
          .then(() => {
            successFunction("Issue updated successfully.");
            dispatch(getSectors(postsPerPage));
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
                      name="name"
                      placeholder="Enter Sector Name"
                      label="Sector Name"
                      required
                      formikRequired={formik?.errors?.name && formik?.touched?.name}
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      type="text"
                      name="description"
                      placeholder="Enter description"
                      label="Description"
                      required
                      formikRequired={formik?.errors?.description && formik?.touched?.description}
                      onChange={formik.handleChange}
                      value={formik.values.description}
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

export default CreateSectors;
