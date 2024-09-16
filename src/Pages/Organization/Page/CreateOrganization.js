import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { successFunction, errorFunction } from "../../../Components/Alert/Alert";
import axiosInstance from "../../../Utils/axios";
import { createOrganization, updateOrganization, getOrganization, deletePhoto } from "../Redux/thunk";
import { fiscalSessionTypes } from "../../../Utils/constants";
import { FILE_SIZE, SUPPORTED_FORMATS, LOGO_SIZE, FAVICON_SIZE } from "../../../Utils/image";
import Thumb from "../../../Components/Thumb";
import Loader from "../../../Components/Loader";
import Dropzone from "../../../Components/CommonDropzone/Dropzone";
import AsyncSelect from "../../../Components/CommonAsyncSelectField/AsyncSelect";
import Select from "../../../Components/CommonSelectField/Select";
import TextField from "../../../Components/TextField/TextField";
import Button from "../../../Components/Buttons/Button";
import Checkbox from "../../../Components/CommonCheckbox/Checkbox";
import { closeModal } from "../../../Redux/Layout/layoutSlice";
import { checkSetup } from "../../../Redux/Auth/thunk";

const CreateOrganization = ({ dispatch, postsPerPage, setShowUserSetupModal }) => {
  const organization = useSelector((state) => state.organization.organization);
  const loading = useSelector((state) => state.organization.loading);
  const loadingUpdated = useSelector((state) => state.organization.loadingUpdated);
  const edit = useSelector((state) => state.organization.edit);
  const [lock, setLock] = useState(false);
  const [favicon, setFavicon] = useState(null);
  const [logo, setLogo] = useState(null);
  const [signature, setSignature] = useState(null);
  const [stamp, setStamp] = useState(null);

  const initialState = {
    name: edit ? organization?.name : "",
    address: edit ? organization?.address : "",
    phoneNo1: edit ? organization?.phoneNo1 : "",
    phoneNo2: edit ? organization?.phoneNo2 : "",
    email: edit ? organization?.email : "",
    panVatNo: edit ? organization?.panVatNo : "",
    websiteUrl: edit ? organization?.websiteUrl : "",

    favicon: "",
    logo: "",
    signature: "",
    stamp: "",
    active: true,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Required.")
      .min(1, "Organization Name should be at least 1 character")
      .max(100, "Organization Name should be 100 characters"),
    address: Yup.string().required("Required.").max(100, "Address should be of 100 characters"),
    phoneNo1: Yup.number().required("Required."),
    phoneNo2: Yup.number().max(15, "Phone number should be not greater than 15 digits."),
    email: Yup.string().email("Please enter valid email address.").max(70, "Email should be of 70 characters"),
    panVatNo: Yup.string()
      .length(9, "PAN should be exactly 9 digits.")
      .matches(/^[0-9]+$/, "PAN must be only digits."),

    logo: Yup.mixed()
      .test("fileSize", "File must be less than 20kb", (file) => !file || (file && file.size <= LOGO_SIZE))
      .test("fileType", "Unsupported File Format.", (file) => !file || (file && SUPPORTED_FORMATS.includes(file.type))),
    signature: Yup.mixed()
      .test("fileSize", "File must be less than 20kb", (file) => !file || (file && file.size <= LOGO_SIZE))
      .test("fileType", "Unsupported File Format.", (file) => !file || (file && SUPPORTED_FORMATS.includes(file.type))),
    stamp: Yup.mixed()
      .test("fileSize", "File must be less than 20kb.", (file) => !file || (file && file.size <= LOGO_SIZE))
      .test("fileType", "Unsupported File Format.", (file) => !file || (file && SUPPORTED_FORMATS.includes(file.type))),
    active: Yup.bool(),
  });

  const onSubmit = (values) => {
    const { favicon, logo, stamp, signature } = values;
    if (!edit) {
      dispatch(
        createOrganization({
          ...values,
        })
      )
        .unwrap()
        .then(() => {
          successFunction("Organization created successfully.");
          dispatch(getOrganization(postsPerPage));
          setShowUserSetupModal(false);
          setFavicon(null);
          setLogo(null);
          setSignature(null);
          setStamp(null);
        })
        .then(() => dispatch(checkSetup()))
        .catch((error) => {
          errorFunction(error);
        });
    } else {
      let updateData = {
        id: organization?.id,
        values: {
          ...values,

          favicon: typeof favicon === "object" ? favicon : undefined,
          logo: typeof logo === "object" ? logo : undefined,
          stamp: typeof stamp === "object" ? stamp : undefined,
          signature: typeof signature === "object" ? signature : undefined,
        },
      };
      dispatch(updateOrganization(updateData))
        .unwrap()
        .then(() => {
          successFunction("Organization updated successfully.");
          dispatch(getOrganization(postsPerPage));
          setShowUserSetupModal(false);
          setFavicon(null);
          setLogo(null);
          setSignature(null);
          setStamp(null);
        })
        .then(() => dispatch(checkSetup()))
        .catch((error) => errorFunction(error));
    }
  };

  return (
    <>
      {(loading || loadingUpdated) && <Loader />}

      <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(formik) => {
          return (
            <Form autoComplete="off">
              <div className="create-organization-wrapper">
                <div className="row">
                  <div className="col-8">
                    <div className="row">
                      <div className="col-6">
                        <div className="my-2">
                          <TextField
                            type="text"
                            name="name"
                            label="Organization Name"
                            required
                            formikRequired={formik?.errors?.name && formik?.touched?.name}
                            placeholder="Name"
                            onChange={(e) => {
                              formik.setFieldValue("name", e.target.value);
                            }}
                            autoFocus={true}
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="my-2">
                          <TextField
                            type="text"
                            name="address"
                            label="Address"
                            placeholder="Address"
                            required={true}
                            formikRequired={formik?.errors?.address && formik?.touched?.address}
                            onChange={(e) => {
                              formik.setFieldValue("address", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="my-2">
                          <TextField
                            type="number"
                            name="phoneNo1"
                            label="Phone Number"
                            required={true}
                            formikRequired={formik?.errors?.phoneNo1 && formik?.touched?.phoneNo1}
                            placeholder="98*********"
                            onChange={(e) => {
                              formik.setFieldValue("phoneNo1", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="my-2">
                          <TextField
                            type="number"
                            name="phoneNo2"
                            label="Secondary Phone Number"
                            required={false}
                            formikRequired={formik?.errors?.phoneNo && formik?.touched?.phoneNo2}
                            placeholder="98*********"
                            onChange={(e) => {
                              formik.setFieldValue("phoneNo2", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="my-2">
                          <TextField
                            type="number"
                            name="panVatNo"
                            label="PAN/VATNO"
                            required={true}
                            formikRequired={formik?.errors?.panVatNo && formik?.touched?.panVatNo}
                            placeholder="PAN/VAT"
                            onChange={(e) => {
                              formik.setFieldValue("panVatNo", e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="my-2">
                          <TextField
                            type="text"
                            name="email"
                            label="Email"
                            required={true}
                            formikRequired={formik?.errors?.email && formik?.touched?.email}
                            placeholder="Enter Email"
                            onChange={(e) => {
                              formik.setFieldValue("email", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="my-2">
                          <TextField
                            type="text"
                            name="websiteUrl"
                            label="Website Url"
                            required={true}
                            formikRequired={formik?.errors?.websiteUrl && formik?.touched?.websiteUrl}
                            placeholder="URL of Your Website"
                            onChange={(e) => {
                              formik.setFieldValue("websiteUrl", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="row">
                      <div className="col-6">
                        <div className="my-2">
                          <Dropzone
                            name="favicon"
                            label="Favion"
                            removePhoto={() => {
                              formik.setFieldValue("favicon", "");
                              setFavicon(null);
                            }}
                            onChange={(event) => {
                              formik.setFieldValue("favicon", event.target.files[0]);
                              let reader = new FileReader();
                              reader.readAsDataURL(event.target.files[0]);
                              reader.onloadend = () => setFavicon([reader.result]);
                            }}
                            displayImage={
                              favicon ? (
                                <Thumb thumb={favicon} />
                              ) : organization && organization.favicon && !favicon ? (
                                <Thumb thumb={organization.favicon} />
                              ) : (
                                ""
                              )
                            }
                            error={formik.errors.favicon}
                            text={"File must be less than 20kb"}
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="my-2">
                          <Dropzone
                            name="logo"
                            label="Logo"
                            removePhoto={() => {
                              formik.setFieldValue("logo", "");
                              setLogo(null);
                            }}
                            onChange={(event) => {
                              formik.setFieldValue("logo", event.target.files[0]);
                              let reader = new FileReader();
                              reader.readAsDataURL(event.target.files[0]);
                              reader.onloadend = () => setLogo([reader.result]);
                            }}
                            displayImage={
                              logo ? (
                                <Thumb thumb={logo} />
                              ) : organization && organization.logo && !logo ? (
                                <Thumb thumb={organization.logo} />
                              ) : (
                                ""
                              )
                            }
                            error={formik.errors.logo}
                            text={"File must be less than 20kb"}
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="my-2">
                          <Dropzone
                            name="stamp"
                            label="Organization Stamp"
                            removePhoto={() => {
                              formik.setFieldValue("stamp", "");
                              setStamp(null);
                            }}
                            onChange={(event) => {
                              formik.setFieldValue("stamp", event.target.files[0]);
                              let reader = new FileReader();
                              reader.readAsDataURL(event.target.files[0]);
                              reader.onloadend = () => setStamp([reader.result]);
                            }}
                            displayImage={
                              stamp ? (
                                <Thumb thumb={stamp} />
                              ) : organization && organization.stamp && !stamp ? (
                                <Thumb thumb={organization.stamp} />
                              ) : (
                                ""
                              )
                            }
                            error={formik.errors.stamp}
                            text={"File must be less than 20kb"}
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="my-2">
                          <Dropzone
                            name="signature"
                            label="Owner Signature"
                            removePhoto={() => {
                              formik.setFieldValue("signature", "");
                              setSignature(null);
                            }}
                            onChange={(event) => {
                              formik.setFieldValue("signature", event.target.files[0]);
                              let reader = new FileReader();
                              reader.readAsDataURL(event.target.files[0]);
                              reader.onloadend = () => setSignature([reader.result]);
                            }}
                            displayImage={
                              signature ? (
                                <Thumb thumb={signature} />
                              ) : organization && organization.signature && !signature ? (
                                <Thumb thumb={organization.signature} />
                              ) : (
                                ""
                              )
                            }
                            error={formik.errors.signature}
                            text={"File must be less than 20kb"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                  <Checkbox name="active" label="Active" />
                </div>
              </div>
              <div className="col-12 p-0 text-right">
                <div className="mt-3  d-flex justify-content-end align-items-center">
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
    </>
  );
};

export default CreateOrganization;
