import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { successFunction, errorFunction } from "../../../Components/Alert/Alert";
import { createUserGroup, updateUserGroup, getUserGroup } from "../Redux/thunk";
import { checkRedundantData } from "../../../Utils/RedundantData/UserGroup";
import Loader from "../../../Components/Loader";
import TextField from "../../../Components/TextField/TextField";
import Button from "../../../Components/Buttons/Button";
import Checkbox from "../../../Components/CommonCheckbox/Checkbox";
import Textarea from "../../../Components/CommonTextarea/Textarea";
import Permission from "./Permission";
import CreateAlert from "../../../Components/Alert/CreateAlert";
import { closeModal } from "../../../Redux/Layout/layoutSlice";

const CreateUserGroup = ({ dispatch, setShowModal, postsPerPage }) => {
  const formRef = useRef();
  const userGroup = useSelector((state) => state.userGroup.userGroup);
  const loading = useSelector((state) => state.userGroup.loading);
  const loadingUpdated = useSelector((state) => state.userGroup.loadingUpdated);
  const edit = useSelector((state) => state.userGroup.edit);

  const [lock, setLock] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  // permission
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [holdPermissions, setHoldPermissions] = useState([]);

  const initialState = {
    name: edit ? userGroup?.name : "",
    permissions: edit ? (userGroup ? userGroup?.permissions : []) : [],
    isActive: edit ? userGroup.isActive : true,
    remarks: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Required.")
      .min(1, "Group must be at least 1 characters.")
      .max(50, "Group must be 50 characters."),
    isActive: Yup.bool(),
    remarks: edit && Yup.string().required("Required.").min(1, "Remarks Name must be at least 1 characters."),
  });

  const onSubmit = (values) => {
    if (!submit) {
      setShowAlert(true);
    } else {
      const updatedPermissions = selectedPermissions.map((permissions) => permissions.id);
      if (edit) {
        const id = userGroup?.id;
        let data = {
          id,
          values: { ...values, permissions: updatedPermissions },
        };
        dispatch(updateUserGroup(data))
          .unwrap()
          .then(() => {
            successFunction("User Group updated successfully.");
            dispatch(getUserGroup(postsPerPage));
            setShowModal(false);
          })
          .catch((error) => {
            setSubmit(false);
            setShowAlert(false);
            errorFunction(error);
          });
      } else {
        let data = {
          ...values,
          permissions: updatedPermissions,
        };
        dispatch(createUserGroup(data))
          .unwrap()
          .then(() => {
            successFunction("User Group created successfully.");
            dispatch(getUserGroup(postsPerPage));
            dispatch(closeModal());
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
  // function which checks whether the bank is added already or not
  const handleChangeName = async (e) => {
    if (edit && e.target.value !== userGroup?.name) {
      if (e.target.value.trim() && e.target.value !== "") {
        const result = await checkRedundantData(e);
        result ? errorFunction("User Group has already been added ") || setLock(true) : setLock(false);
      }
    }
    if (!edit && e.target.value.trim() && e.target.value !== "") {
      const result = await checkRedundantData(e);
      result ? errorFunction("User Group  with this name is already added. ") || setLock(true) : setLock(false);
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
      <div className="create-userGroup-wrapper">
        <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={onSubmit} innerRef={formRef}>
          {(formik) => {
            return (
              <Form autoComplete="off">
                <div className="row">
                  <div className="col-12 ">
                    <TextField
                      type="text"
                      name="name"
                      placeholder="Name"
                      label="Group Name"
                      required
                      formikRequired={formik?.errors?.name && formik?.touched?.name}
                      onChange={(e) => {
                        formik.setFieldValue("name", e.target.value);
                        handleChangeName(e);
                      }}
                      autoFocus={true}
                    />
                  </div>
                  <div className="col-12">
                    <Permission
                      selectedPermissions={selectedPermissions}
                      setSelectedPermissions={setSelectedPermissions}
                      holdPermissions={holdPermissions}
                      setHoldPermissions={setHoldPermissions}
                    />
                  </div>
                </div>
                {edit && (
                  <div className="my-2">
                    <Textarea
                      name="remarks"
                      label="Remarks"
                      required
                      onChange={(e) => {
                        formik.setFieldValue("remarks", e.target.value.trim());
                      }}
                    />
                  </div>
                )}
                <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                  <Checkbox name="isActive" label="Active" />
                </div>
                <div className="col-12 text-right">
                  <div className="my-4 d-flex justify-content-end align-items-center">
                    <Button
                      btnType="submit"
                      className="btn create-button"
                      createButton={true}
                      disabled={edit ? lock || loadingUpdated : loading || lock}
                      title={edit ? "Update" : "Save"}
                      content={edit ? "Update" : "Save"}
                    />
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      {showAlert && <CreateAlert showAlert={showAlert} setShowAlert={setShowAlert} setSubmit={setSubmit} />}
    </>
  );
};

export default CreateUserGroup;
