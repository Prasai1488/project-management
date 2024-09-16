import React, { useEffect, useRef, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { successFunction, errorFunction } from "../../../Components/Alert/Alert";
import { createExecutiveMembers, updateExecutiveMembers, getExecutiveMembers } from "../Redux/thunk";
import Loader from "../../../Components/Loader";
import TextField from "../../../Components/TextField/TextField";
import Button from "../../../Components/Buttons/Button";
import CreateAlert from "../../../Components/Alert/CreateAlert";
import Textarea from "../../../Components/CommonTextarea/Textarea";
import SelectField from "../../../Components/CommonSelectField/Select";
import DatePicker from "../../../Components/CommonDatePicker/DatePicker";

const CreateMembers = ({ dispatch, postsPerPage = 10, setShowModal }) => {
  const formRef = useRef();
  const executiveMembers = useSelector((state) => state.executiveMembers.executiveMembers);
  const executiveMember = useSelector((state) => state.executiveMembers.executiveMember);
  const loading = useSelector((state) => state.executiveMembers.loading);
  const loadingUpdated = useSelector((state) => state.executiveMembers.loadingUpdated);
  const edit = useSelector((state) => state.executiveMembers.edit);

  const [lock, setLock] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const sector = [
    { id: 1, name: "Textile", label: "Textile" },
    { id: 2, name: "Weaving", label: "Weaving" },
    { id: 3, name: "Dyeing", label: "Dyeing" },
    { id: 4, name: "Other", label: "Other" },
  ];

  const memberType = [
    { id: 1, name: "NORMAL_MEMBER", label: "Normal Member" },
    { id: 2, name: "OTHER_TYPE", label: "Other Type" },
  ];

  const initialState = useMemo(
    () => ({
      user: {
        username: edit ? executiveMember?.user.username : "",
        name: edit ? executiveMember?.user.name : "",
        email: edit ? executiveMember?.user.email : "",
        phone: edit ? executiveMember?.user.phone : "",
        isActive: edit ? executiveMember?.user.isActive : false,
      },
      password: edit ? executiveMember?.password : "",
      confirmPassword: edit ? executiveMember?.confirmPassword : "",
      executiveMember: {
        organizationName: edit ? executiveMember?.organizationName : "",
        panOrVatNo: edit ? executiveMember?.panOrVatNo : "",
        organizationEmail: edit ? executiveMember?.organizationEmail : "",
        companyAddress: edit ? executiveMember?.companyAddress : "",
        sector: edit ? sector.find((s) => s.id === executiveMember?.sector) : null,
        registrationDate: edit ? new Date(executiveMember?.registrationDate) : new Date(),
        documents: edit
          ? executiveMember?.documents.map((doc) => ({
              documentName: doc.documentName,
              document: doc.document,
            }))
          : [
              {
                documentName: "",
                document: null,
              },
            ],
        memberType: edit ? executiveMember?.type : "",
      },
    }),
    [edit, executiveMember]
  );

  const validationSchema = Yup.object().shape({
    user: Yup.object().shape({
      username: Yup.string().required("Username is required"),
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      isActive: Yup.boolean().required("Active status is required"),
    }),
    password: Yup.string().required("Password is required"),
    // confirm password
  
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    executiveMember: Yup.object().shape({
      organizationName: Yup.string().required("Organization Name is required"),
      panOrVatNo: Yup.string().required("PAN or VAT Number is required"),
      organizationEmail: Yup.string().email("Invalid email").required("Organization Email is required"),
      companyAddress: Yup.string().required("Company Address is required"),
      registrationDate: Yup.date().required("Organization Registration Date is required"),
      sector: Yup.object().nullable().required("Sector is required"),
      documents: Yup.array().of(
        Yup.object().shape({
          documentName: Yup.string().required("Document Name is required"),
          document: Yup.mixed().required("Document is required"),
        })
      ),
      memberType: Yup.object().nullable().required("Type is required"),
    }),
  });

  const onSubmit = (values) => {
    if (!submit) {
      setShowAlert(true);
    } else {
      const createdData = {
        ...values,
        executiveMember: {
          ...values.executiveMember,
          sector: values.executiveMember.sector.id,
          type: values.executiveMember.memberType.name,
        },
      };

      if (!edit) {
        dispatch(createExecutiveMembers(createdData))
          .unwrap()
          .then(() => {
            successFunction("Issue created successfully.");
            dispatch(getExecutiveMembers(postsPerPage));
            setShowModal(false);
          })
          .catch((error) => {
            setSubmit(false);
            setShowAlert(false);
            errorFunction(error);
          });
      } else {
        let updateData = { id: executiveMember?.id, values: { ...values, sector: values.sector.id } };
        dispatch(updateExecutiveMembers(updateData))
          .unwrap()
          .then(() => {
            successFunction("Issue updated successfully.");
            dispatch(getExecutiveMembers(postsPerPage));
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
                      name="executiveMember.organizationName"
                      placeholder="Enter organizationName"
                      label="Organization Name"
                      required
                      formikRequired={
                        formik?.errors?.executiveMember?.organizationName && formik?.touched?.executiveMember?.organizationName
                      }
                      onChange={formik.handleChange}
                      value={formik.values.executiveMember?.organizationName}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      type="text"
                      name="executiveMember.panOrVatNo"
                      placeholder="Enter panOrVatNo"
                      label="PAN or VAT Number"
                      required
                      formikRequired={formik?.errors?.executiveMember?.panOrVatNo && formik?.touched?.executiveMember?.panOrVatNo}
                      onChange={formik.handleChange}
                      value={formik.values.executiveMember?.panOrVatNo}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      type="text"
                      name="executiveMember.organizationEmail"
                      placeholder="Enter organizationEmail"
                      label="Organization Email"
                      required
                      formikRequired={
                        formik?.errors?.executiveMember?.organizationEmail && formik?.touched?.executiveMember?.organizationEmail
                      }
                      onChange={formik.handleChange}
                      value={formik.values.executiveMember?.organizationEmail}
                    />
                  </div>

                  <div className="col-6">
                    <DatePicker
                      name="executiveMember.registrationDate"
                      label="Registration Date"
                      selected={formik.values.executiveMember.registrationDate}
                      required={true}
                      formikRequired={
                        formik?.errors?.executiveMember?.registrationDate &&
                        formik?.touched?.executiveMember?.registrationDate
                      }
                      onChange={(date) => formik.setFieldValue("executiveMember.registrationDate", date)}
                      maxDate={new Date()}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      type="text"
                      name="executiveMember.companyAddress"
                      placeholder="Enter companyAddress"
                      label="Company Address"
                      required
                      formikRequired={formik?.errors?.executiveMember?.companyAddress && formik?.touched?.executiveMember?.companyAddress}
                      onChange={formik.handleChange}
                      value={formik.values.executiveMember?.companyAddress}
                    />
                  </div>
                  <div className="col-6">
                    <SelectField
                      label="Sector"
                      value={formik.values.executiveMember?.sector}
                      name="executiveMember.sector"
                      required
                      options={sector}
                      formikRequired={formik?.errors?.executiveMember?.sector && formik?.touched?.executiveMember?.sector}
                      getOptionLabel={(option) => `${option?.name} `}
                      getOptionValue={(option) => `${option?.value}`}
                      onChange={(selected) => {
                        formik.setFieldValue("executiveMember.sector", selected);
                      }}
                    />
                  </div>
                  <div className="col-12 d-flex align-items-center ">
                    <hr className="flex-grow-1" />
                    <small style={{ padding: "0 10px" }}>Owner Information</small>
                    <hr className="flex-grow-1" />
                  </div>
                  <div className="col-6">
                    <TextField
                      type="text"
                      name="user.name"
                      placeholder="Enter name"
                      label="Name"
                      required
                      formikRequired={formik?.errors?.user?.name && formik?.touched?.user?.name}
                      onChange={formik.handleChange}
                      value={formik.values.user.name}
                    />
                  </div>
                  <div className="col-6">
                    <SelectField
                      label="Type"
                      value={formik.values.executiveMember?.memberType}
                      name="executiveMember.memberType"
                      required
                      options={memberType}
                      formikRequired={formik?.errors?.executiveMember?.memberType && formik?.touched?.executiveMember?.memberType}
                      getOptionLabel={(option) => `${option?.name} `}
                      getOptionValue={(option) => `${option?.name}`}
                      onChange={(selected) => {
                        formik.setFieldValue("executiveMember.memberType", selected);
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      type="text"
                      name="user.email"
                      placeholder="Enter email"
                      label="Email"
                      required
                      formikRequired={formik?.errors?.user?.email && formik?.touched?.user?.email}
                      onChange={formik.handleChange}
                      value={formik.values.user.email}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      type="text"
                      name="user.phone"
                      placeholder="Enter phone"
                      label="Phone"
                      required
                      formikRequired={formik?.errors?.user?.phone && formik?.touched?.user?.phone}
                      onChange={formik.handleChange}
                      value={formik.values.user.phone}
                    />
                  </div>

                  <div className="col-6">
                    <TextField
                      type="text"
                      name="executiveMember.documents[0].documentName"
                      placeholder="Document Name"
                      label="Document Name"
                      required
                      formikRequired={
                        formik?.errors?.executiveMember?.documents?.[0]?.documentName &&
                        formik?.touched?.executiveMember?.documents?.[0]?.documentName
                      }
                      onChange={formik.handleChange}
                      value={formik.values.executiveMember?.documents[0].documentName}
                    />
                  </div>
                  <div className="col-6">
                    <div>
                      <small htmlFor="file" className="m-0 p-0 form-label">
                        File
                      </small>
                      <input
                        type="file"
                        name="executiveMember.documents[0].document"
                        id="file"
                        className="form-control"
                        placeholder="Document"
                        formikRequired={
                          formik?.errors?.executiveMember?.documents?.[0]?.document &&
                          formik?.touched?.executiveMember?.documents?.[0]?.document
                        }
                        onChange={(e) => {
                          formik.setFieldValue("executiveMember.documents[0].document", e.target.files[0]);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-12 d-flex align-items-center ">
                    <hr className="flex-grow-1" />
                    <small style={{ padding: "0 10px" }}>Authentication Information</small>
                    <hr className="flex-grow-1" />
                  </div>
                  <div className="col-6">
                    <TextField
                      type="text"
                      name="user.username"
                      placeholder="Enter username"
                      label="Username"
                      required
                      formikRequired={formik?.errors?.user?.username && formik?.touched?.user?.username}
                      onChange={formik.handleChange}
                      value={formik.values.user.username}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      type="text"
                      name="password"
                      placeholder="Enter password"
                      label="Password"
                      required
                      formikRequired={formik?.errors?.password && formik?.touched?.password}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      type="text"
                      name="confirmPassword"
                      placeholder="Enter confirm password"
                      label="Confirm Password"
                      required
                      formikRequired={formik?.errors?.confirmPassword && formik?.touched?.confirmPassword}
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
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

export default CreateMembers;
