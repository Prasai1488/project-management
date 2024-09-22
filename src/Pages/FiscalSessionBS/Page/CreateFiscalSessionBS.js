import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { successFunction, errorFunction } from "../../../Components/Alert/Alert";
import { createFiscalSessionBS, getFiscalSessionBS } from "../Redux/thunk";
import { checkRedundantDataFiscalSessionBS } from "../../../Utils/RedundantData/FiscalSessionBS";
import Loader from "../../../Components/Loader";
import TextField from "../../../Components/TextField/TextField";
import Button from "../../../Components/Buttons/Button";
import Checkbox from "../../../Components/CommonCheckbox/Checkbox";
import { closeModal } from "../../../Redux/Layout/layoutSlice";

const CreateFiscalSessionsBS = ({ dispatch, postsPerPage }) => {
  const loading = useSelector((state) => state.bs.loading);
  const loadingUpdated = useSelector((state) => state.bs.loadingUpdated);

  const [lock, setLock] = useState(false);

  const initialState = {
    sessionFull: "",
    sessionShort: "",
    active: true,
  };

  const validationSchema = Yup.object().shape({
    sessionFull: Yup.string()
      .required("Required!")
      .min(1, "Session full name must be at least 1 characters.")
      .max(50, "Session full name must be at least 50 characters."),
    sessionShort: Yup.string()
      .required("Required!")
      .min(1, "Short name must be at least 1 characters.")
      .max(50, "Short name must be at least 50 characters."),
    active: Yup.bool(),
  });

  const onSubmit = (values) => {
    dispatch(createFiscalSessionBS(values))
      .unwrap()
      .then(() => {
        successFunction("Fiscal Session BS created successfully.");
        dispatch(getFiscalSessionBS(postsPerPage));
        dispatch(closeModal());
      })
      .catch((error) => {
        errorFunction(error);
      });
  };

  const handleCheckFull = async (e) => {
    if (e.target.value.trim() && e.target.value !== "") {
      const result = await checkRedundantDataFiscalSessionBS(e, "full");
      result
        ? errorFunction("Fiscal Session BS with this session full already exists.") || setLock(true)
        : setLock(false);
    }
  };
  const handleCheckShort = async (e) => {
    if (e.target.value.trim() && e.target.value !== "") {
      const result = await checkRedundantDataFiscalSessionBS(e, "short");
      result
        ? errorFunction("Fiscal Session BS with this session short already exists.") || setLock(true)
        : setLock(false);
    }
  };

  return (
    <>
      {(loading || loadingUpdated) && <Loader />}
      <div className="create-fiscal-session-bs-wrapper">
        <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={onSubmit}>
          {(formik) => {
            return (
              <Form autoComplete="off">
                <div className="row">
                  <div className="col-12 ">
                    <TextField
                      type="text"
                      name="sessionFull"
                      label="Session Full Name"
                      required
                      formikRequired={formik?.errors?.sessionFull && formik?.touched?.sessionFull}
                      placeholder="e.g 2020/2021"
                      onChange={(e) => {
                        formik.setFieldValue("sessionFull", e.target.value);
                        handleCheckFull(e);
                      }}
                      autoFocus={true}
                    />
                  </div>
                  <div className="col-12 ">
                    <TextField
                      type="text"
                      name="sessionShort"
                      label="Short Name"
                      required
                      formikRequired={formik?.errors?.sessionShort && formik?.touched?.sessionShort}
                      placeholder="e.g 2020/2021"
                      onChange={(e) => {
                        formik.setFieldValue("sessionShort", e.target.value);
                        handleCheckShort(e);
                      }}
                    />
                  </div>
                </div>
                <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                  <Checkbox name="active" label="Active" />
                </div>
                <div className="col-12 text-right">
                  <div className="my-4 d-flex justify-content-end align-items-center">
                    <Button
                      btnType="submit"
                      className="btn create-button"
                      createButton={true}
                      disabled={lock || loadingUpdated || loading}
                      title={"Save"}
                      content={"Save"}
                    />
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default CreateFiscalSessionsBS;
