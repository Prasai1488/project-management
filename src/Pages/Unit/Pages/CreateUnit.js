import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { successFunction, errorFunction } from "../../../Components/Alert/Alert";
import { createUnit, updateUnit, getUnit } from "../Redux/thunk";
import { checkRedundantDataUnit } from "../../../Utils/RedundantData/Item";
import Loader from "../../../Components/Loader";
import TextField from "../../../Components/TextField/TextField";
import Button from "../../../Components/Buttons/Button";
import CreateAlert from "../../../Components/Alert/CreateAlert";

const CreateUnit = ({ dispatch, postsPerPage = 10, setShowModal }) => {
  const formRef = useRef();
  const unit = useSelector((state) => state.unit.unit);
  const loading = useSelector((state) => state.unit.loading);
  const loadingUpdated = useSelector((state) => state.unit.loadingUpdated);
  const edit = useSelector((state) => state.unit.edit);

  const [lock, setLock] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const initialState = {
    name: edit ? unit?.name : "",
    description: edit ? unit?.description : "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required!"),
    description: Yup.string(),
  });

  const onSubmit = (values) => {
    if (!submit) {
      setShowAlert(true);
    } else {
      if (!edit) {
        dispatch(createUnit(values))
          .unwrap()
          .then(() => {
            successFunction("Unit created successfully.");
            dispatch(getUnit(postsPerPage));
            setShowModal(false);
          })
          .catch((error) => {
            setSubmit(false);
            setShowAlert(false);
            errorFunction(error);
          });
      } else {
        let updateData = { id: unit?.id, values };
        dispatch(updateUnit(updateData))
          .unwrap()
          .then(() => {
            successFunction("Unit updated successfully.");
            dispatch(getUnit(postsPerPage));
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

  const handleCheckName = async (e) => {
    if (edit && e.target.value !== unit?.name) {
      if (e.target.value.trim() && e.target.value !== "") {
        const result = await checkRedundantDataUnit(e);
        result ? errorFunction("Unit with this name already exists.") || setLock(true) : setLock(false);
      }
    }
    if (!edit && e.target.value.trim() && e.target.value !== "") {
      const result = await checkRedundantDataUnit(e);
      result ? errorFunction("Unit with this name already exists.") || setLock(true) : setLock(false);
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
              <div className="create-unit-wrapper">
                <div className="row">
                  <div className="col-12 ">
                    <TextField
                      type="text"
                      name="name"
                      placeholder="Name"
                      label="Name"
                      required
                      formikRequired={formik?.errors?.name && formik?.touched?.name}
                      onChange={(e) => {
                        formik.setFieldValue("name", e.target.value);
                        handleCheckName(e);
                      }}
                    />
                  </div>
                  <div className="col-12">
                    <TextField
                      type="text"
                      name="description"
                      placeholder="Description"
                      label="Description"
                      onChange={(e) => {
                        formik.setFieldValue("description", e.target.value);
                      }}
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

export default CreateUnit;
