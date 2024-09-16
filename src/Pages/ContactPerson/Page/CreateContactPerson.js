import { Formik } from "formik";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
import FormWrapper from "../../../Components/FormWrapper/FormWrapper";
import Loader from "../../../Components/Loader";
import { renderAsyncSelectField, renderTextField } from "../../../Utils/customFields";
import { createContactPersons, getAllContactPersons, updateContactPersons } from "../Redux/thunk";
import { loadOptionsClient } from "../../../Utils/asyncFunction";
import Checkbox from "../../../Components/CommonCheckbox/Checkbox";

const CreateContactPerson = ({ dispatch, postsPerPage = 10, setShowModal, type }) => {
  const formRef = useRef();
  const contactPerson = useSelector((state) => state.contactPerson.contactPerson);
  const loading = useSelector((state) => state.contactPerson.loading);
  const loadingUpdated = useSelector((state) => state.contactPerson.loadingUpdated);
  const edit = useSelector((state) => state.contactPerson.edit);

  const initialState = {
    name: edit ? contactPerson?.name : "",
    primaryPhoneNo: edit ? contactPerson?.primaryPhoneNo : "",
    client: edit ? contactPerson?.client : null,
    isActive: edit ? contactPerson?.isActive : true,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required!"),
    client: Yup.object().required("Required!"),
    primaryPhoneNo: Yup.number().max(9999999999, "Invalid length!").required("Required!"),
    isActive: Yup.boolean().required("Required!"),
  });

  const onSubmit = (values) => {
    const createValues = {
      ...values,
      client: values.client?._id,
    };
    const action = edit
      ? updateContactPersons({ id: contactPerson?._id, values: createValues })
      : createContactPersons(createValues);
    const successMessage = edit ? `${type} Updated successfully` : `${type} Created successfully`;

    dispatch(action)
      .unwrap()
      .then(() => {
        successFunction(successMessage);
        dispatch(getAllContactPersons(postsPerPage));
        setShowModal(false);
      })
      .catch(errorFunction);
  };

  return (
    <>
      {(loading || loadingUpdated) && <Loader />}
      <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={onSubmit} innerRef={formRef}>
        {(formik) => {
          return (
            <FormWrapper>
              {renderTextField(formik, 12, "name", "text", "Name", true)}
              {renderTextField(formik, 12, "primaryPhoneNo", "number", "Primary Contact No.", true)}
              {renderAsyncSelectField(formik, 12, "client", "Client", loadOptionsClient, true, false)}
              <div className="my-2 col-12 d-flex justify-content-center align-items-center">
                <Checkbox name="isActive" label="Active" edit={edit} />
              </div>
            </FormWrapper>
          );
        }}
      </Formik>
    </>
  );
};

export default CreateContactPerson;
