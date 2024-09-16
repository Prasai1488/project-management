import { Formik } from "formik";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
import FormWrapper from "../../../Components/FormWrapper/FormWrapper";
import Loader from "../../../Components/Loader";
import { renderAsyncSelectField, renderTextField } from "../../../Utils/customFields";
import { createClients, getAllClients, updateClients } from "../Redux/thunk";
import Checkbox from "../../../Components/CommonCheckbox/Checkbox";
import { loadOptionsContactPerson } from "../../../Utils/asyncFunction";

const CreateClient = ({ dispatch, postsPerPage = 10, setShowModal, type }) => {
  const formRef = useRef();
  const client = useSelector((state) => state.client.client);
  const loading = useSelector((state) => state.client.loading);
  const loadingUpdated = useSelector((state) => state.client.loadingUpdated);
  const edit = useSelector((state) => state.client.edit);

  const initialState = {
    name: edit ? client?.name : "",
    email: edit ? client?.email : "",
    phoneNo: edit ? client?.phoneNo : "",
    address: edit ? client?.address : "",
    pan: edit ? client?.pan : "",
    contactPerson: edit ? client?.contactPerson : "",
    contactPersonPhoneNo: edit ? client?.contactPersonPhoneNo : "",
    registrationNo: edit ? client?.registrationNo : "",
    registrationDate: edit ? new Date(client.registrationDate) : "",
    isActive: edit ? client?.isActive : true,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required!"),
    email: Yup.string().email("Invalid email!").required("Required!"),
    phoneNo: Yup.number().max(9999999999, "Invalid length!").required("Required!"),
    address: Yup.string().required("Required!"),
    pan: Yup.string().required("Required!"),
    contactPerson: Yup.object().required("Required!"),
    contactPersonPhoneNo: Yup.number().max(9999999999, "Invalid length!").required("Required!"),
    isActive: Yup.boolean().required("Required!"),
  });

  const onSubmit = (values) => {
    const createValues = {
      ...values,
      contactPerson: values.contactPerson?._id,
    };
    const action = edit ? updateClients({ id: client?._id, values: createValues }) : createClients(createValues);
    const successMessage = edit ? `${type} Updated successfully` : `${type} Created successfully`;

    dispatch(action)
      .unwrap()
      .then(() => {
        successFunction(successMessage);
        dispatch(getAllClients(postsPerPage));
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
              {renderTextField(formik, 6, "name", "text", "Name", true)}
              {renderTextField(formik, 6, "email", "email", "Email", true)}
              {renderTextField(formik, 6, "pan", "text", "Pan", true)}
              {renderAsyncSelectField(formik, 6, "contactPerson", "Client", loadOptionsContactPerson, true, false)}

              {renderTextField(formik, 6, "contactPersonPhoneNo", "number", "Contact Person Phone No", true)}
              {renderTextField(formik, 6, "address", "text", "Address", true)}
              {renderTextField(formik, 6, "phoneNo", "number", "Phone", true)}
              {renderTextField(formik, 6, "registrationNo", "text", "Registration No.", false)}
              {renderTextField(formik, 6, "registrationDate", "date", "Registration Date", false)}
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

export default CreateClient;
