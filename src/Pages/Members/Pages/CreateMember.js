import React, { useEffect, useRef, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { successFunction, errorFunction } from "../../../Components/Alert/Alert";
import { createMembers, updateMembers, getMembers } from "../Redux/thunk";
import Loader from "../../../Components/Loader";
import TextField from "../../../Components/TextField/TextField";
import Button from "../../../Components/Buttons/Button";
import CreateAlert from "../../../Components/Alert/CreateAlert";
import Textarea from "../../../Components/CommonTextarea/Textarea";
import SelectField from "../../../Components/CommonSelectField/Select";
import DatePicker from "../../../Components/CommonDatePicker/DatePicker";
import AsyncSelect from "../../../Components/CommonAsyncSelectField/AsyncSelect";
import axiosInstance from "../../../Utils/axios";

const CreateMembers = ({ dispatch, postsPerPage = 10, setShowModal }) => {
  const formRef = useRef();
  const members = useSelector((state) => state.members.members);
  const member = useSelector((state) => state.members.member);
  const loading = useSelector((state) => state.members.loading);
  const loadingUpdated = useSelector((state) => state.members.loadingUpdated);
  const edit = useSelector((state) => state.members.edit);

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
  const memberType = [
    { id: 1, name: "NORMAL_MEMBER", label: "Normal Member" },
    { id: 2, name: "OTHER_TYPE", label: "Other Type" },
  ];

  const initialState = useMemo(
    () => ({
      user: {
        username: edit ? member?.user.username : "",
        name: edit ? member?.user.username : "",
        email: edit ? member?.user.email : "",
        phone: edit ? member?.user.phone : "",
        isActive: edit ? member?.user.isActive : false,
      },
      password: edit ? member?.password : "",
      confirmPassword: edit ? member?.confirmPassword : "",
      member: {
        organizationName: edit ? member?.organizationName : "",
        panOrVatNo: edit ? member?.panOrVatNo : "",
        organizationEmail: edit ? member?.organizationEmail : "",
        companyAddress: edit ? member?.companyAddress : "",
        sector: edit ? member?.sector : null,
        registrationDate: edit ? new Date(member?.registrationDate) : new Date(),
        documents: edit
          ? member?.documents.map((doc) => ({
              documentName: doc.documentName,
              document: doc.document,
            }))
          : [
              {
                documentName: "",
                document: null,
              },
            ],
        memberType: edit ? memberType.find((mem) => mem.name === member.type) : { id: "", name: "", label: "" },
      },
    }),
    [edit, member]
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
    member: Yup.object().shape({
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
        member: {
          ...values.member,
          sector: values.member.sector.id,
          type: values.member.memberType.name,
        },
      };

      if (!edit) {
        dispatch(createMembers(createdData))
          .unwrap()
          .then(() => {
            successFunction("Issue created successfully.");
            dispatch(getMembers(postsPerPage));
            setShowModal(false);
          })
          .catch((error) => {
            setSubmit(false);
            setShowAlert(false);
            errorFunction(error);
          });
      } else {
        let updateData = { id: member?.id, values: { ...values, sector: values.sector.id } };
        dispatch(updateMembers(updateData))
          .unwrap()
          .then(() => {
            successFunction("Issue updated successfully.");
            dispatch(getMembers(postsPerPage));
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
                      name="member.organizationName"
                      placeholder="Enter organizationName"
                      label="Organization Name"
                      required
                      formikRequired={
                        formik?.errors?.member?.organizationName && formik?.touched?.member?.organizationName
                      }
                      onChange={formik.handleChange}
                      value={formik.values.member?.organizationName}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      type="text"
                      name="member.panOrVatNo"
                      placeholder="Enter panOrVatNo"
                      label="PAN or VAT Number"
                      required
                      formikRequired={formik?.errors?.member?.panOrVatNo && formik?.touched?.member?.panOrVatNo}
                      onChange={formik.handleChange}
                      value={formik.values.member?.panOrVatNo}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      type="text"
                      name="member.organizationEmail"
                      placeholder="Enter organizationEmail"
                      label="Organization Email"
                      required
                      formikRequired={
                        formik?.errors?.member?.organizationEmail && formik?.touched?.member?.organizationEmail
                      }
                      onChange={formik.handleChange}
                      value={formik.values.member?.organizationEmail}
                    />
                  </div>

                  <div className="col-6">
                    <DatePicker
                      name="member.registrationDate"
                      label="Registration Date"
                      selected={formik.values.member.registrationDate}
                      required={true}
                      formikRequired={
                        formik?.errors?.member?.registrationDate && formik?.touched?.member?.registrationDate
                      }
                      onChange={(date) => formik.setFieldValue("member.registrationDate", date)}
                      maxDate={new Date()}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      type="text"
                      name="member.companyAddress"
                      placeholder="Enter companyAddress"
                      label="Company Address"
                      required
                      formikRequired={formik?.errors?.member?.companyAddress && formik?.touched?.member?.companyAddress}
                      onChange={formik.handleChange}
                      value={formik.values.member?.companyAddress}
                    />
                  </div>
                  <div className="col-6">
                    <AsyncSelect
                      label="Sector"
                      value={formik.values.member.sector}
                      name="member.sector"
                      required
                      loadOptions={loadOptionsSector}
                      formikRequired={formik?.errors?.sector && formik?.touched?.member.sector}
                      getOptionLabel={(option) => `${option?.name} `}
                      getOptionValue={(option) => `${option?.id}`}
                      onChange={(selected) => {
                        formik.setFieldValue("member.sector", selected);
                      }}
                      additional={{
                        offset: 0,
                        limit: 10,
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
                      value={formik.values.member?.memberType}
                      name="member.memberType"
                      required
                      options={memberType}
                      formikRequired={formik?.errors?.member?.memberType && formik?.touched?.member?.memberType}
                      getOptionLabel={(option) => `${option?.name} `}
                      getOptionValue={(option) => `${option?.name}`}
                      onChange={(selected) => {
                        formik.setFieldValue("member.memberType", selected);
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
                      name="member.documents[0].documentName"
                      placeholder="Document Name"
                      label="Document Name"
                      required
                      formikRequired={
                        formik?.errors?.member?.documents?.[0]?.documentName &&
                        formik?.touched?.member?.documents?.[0]?.documentName
                      }
                      onChange={formik.handleChange}
                      value={formik.values.member?.documents[0].documentName}
                    />
                  </div>
                  <div className="col-6">
                    <div>
                      <small htmlFor="file" className="m-0 p-0 form-label">
                        File
                      </small>
                      <input
                        type="file"
                        name="member.documents[0].document"
                        id="file"
                        className="form-control"
                        placeholder="Document"
                        formikRequired={
                          formik?.errors?.member?.documents?.[0]?.document &&
                          formik?.touched?.member?.documents?.[0]?.document
                        }
                        onChange={(e) => {
                          formik.setFieldValue("member.documents[0].document", e.target.files[0]);
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
                  {!edit && (
                    <>
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
                    </>
                  )}
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
