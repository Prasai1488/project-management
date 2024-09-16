import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  successFunction,
  errorFunction,
} from "../../../Components/Alert/Alert";
import { createFiscalSessionAD, getFiscalSessionAD } from "../Redux/thunk";
import { checkRedundantDataFiscalSessionAD } from "../../../Utils/RedundantData/FiscalSessionAD";
import Loader from "../../../Components/Loader";
import TextField from "../../../Components/TextField/TextField";
import Button from "../../../Components/Buttons/Button";
import Checkbox from "../../../Components/CommonCheckbox/Checkbox";
import { closeModal } from "../../../Redux/Layout/layoutSlice";

const CreateFiscalSessionAD = ({ dispatch, postsPerPage }) => {
  const loading = useSelector((state) => state.ad.loading);
  const loadingUpdated = useSelector((state) => state.ad.loadingUpdated);

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
    dispatch(createFiscalSessionAD(values))
      .unwrap()
      .then(() => {
        successFunction("Fiscal Session AD created successfully.");
        dispatch(getFiscalSessionAD(postsPerPage));
        dispatch(closeModal());
      })
      .catch((error) => {
        errorFunction(error);
      });
  };

  const handleCheckFull = async (e) => {
    if (e.target.value.trim() && e.target.value !== "") {
      const result = await checkRedundantDataFiscalSessionAD(e, "full");
      result
        ? errorFunction(
            "Fiscal Session AD with this session full already exists."
          ) || setLock(true)
        : setLock(false);
    }
  };
  const handleCheckShort = async (e) => {
    if (e.target.value.trim() && e.target.value !== "") {
      const result = await checkRedundantDataFiscalSessionAD(e, "short");
      result
        ? errorFunction(
            "Fiscal Session AD with this session short already exists."
          ) || setLock(true)
        : setLock(false);
    }
  };

  return (
    <>
      {(loading || loadingUpdated) && <Loader />}
      <div className="create-fiscal-session-bs-wrapper">
        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
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
                      formikRequired={
                        formik?.errors?.sessionFull &&
                        formik?.touched?.sessionFull
                      }
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
                      formikRequired={
                        formik?.errors?.sessionShort &&
                        formik?.touched?.sessionShort
                      }
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

export default CreateFiscalSessionAD;
