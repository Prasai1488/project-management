import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Country } from "country-state-city";
import { successFunction, errorFunction } from "../../../Components/Alert/Alert";
import { createCountry, updateCountry, getCountry, deletePhoto } from "../Redux/thunk";
import { FILE_SIZE, SUPPORTED_FORMATS } from "../../../Utils/image";
import Thumb from "../../../Components/Thumb";
import Loader from "../../../Components/Loader";
import Dropzone from "../../../Components/CommonDropzone/Dropzone";
import Select from "../../../Components/CommonSelectField/Select";
import TextField from "../../../Components/TextField/TextField";
import Button from "../../../Components/Buttons/Button";
import Checkbox from "../../../Components/CommonCheckbox/Checkbox";
import { closeModal } from "../../../Redux/Layout/layoutSlice";

const CreateCountry = ({ dispatch, postsPerPage, setShowModal }) => {
  const country = useSelector((state) => state.country.country);
  const loading = useSelector((state) => state.country.loading);
  const loadingUpdated = useSelector((state) => state.country.loadingUpdated);
  const edit = useSelector((state) => state.country.edit);

  const isName = edit ? country?.name : null;
  const countryDetails = Country?.getAllCountries();
  const countryName = edit ? Country?.getAllCountries()?.find((country) => country?.name === isName) : null;
  const [lock, setLock] = useState(false);
  const [img, setImg] = useState(null);
  const initialState = {
    name: edit ? countryName : "",
    countryCode: edit ? country?.countryCode : "",
    phoneCode: edit ? country?.phoneCode : "",
    flagImage: "",
    active: edit ? country?.active : true,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.object().required("Required!"),
    countryCode: Yup.string(),
    phoneCode: Yup.string(),
    flagImage: Yup.mixed()
      .test(
        "fileSize",
        "File Size is too large, max file size is 500 KB.",
        (file) => !file || (file && file.size <= FILE_SIZE)
      )
      .test("fileType", "Unsupported File Format.", (file) => !file || (file && SUPPORTED_FORMATS.includes(file.type))),
    active: Yup.bool(),
  });

  const onSubmit = (values) => {
    const { name } = values;
    if (!edit) {
      dispatch(createCountry({ ...values, name: name?.name }))
        .unwrap()
        .then(() => {
          successFunction("Country created successfully.");
          dispatch(getCountry(postsPerPage));
          setShowModal(false);
        })
        .catch((error) => {
          errorFunction(error);
        });
    } else {
      let updateData = {
        id: country?.id,
        values: { ...values, name: name?.name },
      };
      dispatch(updateCountry(updateData))
        .unwrap()
        .then(() => {
          successFunction("Country updated successfully.");
          dispatch(getCountry(postsPerPage));
          setShowModal(false);
        })
        .catch((error) => errorFunction(error));
    }
  };

  const handleDelete = () => {
    dispatch(deletePhoto(country.id));
  };

  return (
    <>
      {(loading || loadingUpdated) && <Loader />}

      <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(formik) => {
          return (
            <Form autoComplete="off">
              <div className="create-country-wrapper">
                <div className="row">
                  <div className="col-12 ">
                    <Select
                      value={formik?.values?.name}
                      name="name"
                      placeholder="Name"
                      label="Country Name"
                      required={true}
                      formikRequired={formik?.errors?.name && formik?.touched?.name}
                      options={countryDetails}
                      getOptionLabel={(option) => option?.name}
                      getOptionValue={(option) => option?.id}
                      onChange={(selected) => {
                        if (selected) {
                          formik.setFieldValue("name", selected);
                          formik.setFieldValue("countryCode", selected?.isoCode);
                          formik.setFieldValue("phoneCode", selected?.phonecode);
                        } else {
                          formik.setFieldValue("name", "");
                          formik.setFieldValue("countryCode", "");
                          formik.setFieldValue("phoneCode", "");
                        }
                      }}
                    />
                  </div>
                  <div className="col-12">
                    <TextField
                      type="text"
                      name="countryCode"
                      label="Country Code"
                      placeholder="Enter Country Code"
                      readOnly={true}
                    />
                  </div>
                  <div className="col-12 ">
                    <TextField
                      type="text"
                      name="phoneCode"
                      label="Phone Code"
                      placeholder="Enter Phone Code"
                      readOnly={true}
                    />
                  </div>
                  <div className="col-12">
                    <Dropzone
                      name="flagImage"
                      label="Flag Image"
                      removePhoto={() => {
                        if (edit) {
                          handleDelete();
                        } else {
                          formik.setFieldValue("flagImage", "");
                          setImg(null);
                        }
                      }}
                      onChange={(event) => {
                        formik.setFieldValue("flagImage", event.target.files[0]);
                        let reader = new FileReader();
                        reader.readAsDataURL(event.target.files[0]);
                        reader.onloadend = () => setImg([reader.result]);
                      }}
                      displayImage={
                        img ? (
                          <Thumb thumb={img} />
                        ) : country && country.flagImage && !img ? (
                          <Thumb thumb={country.flagImage} />
                        ) : (
                          ""
                        )
                      }
                      error={formik.errors.flagImage}
                      text={"Max file size is 500 KB."}
                    />
                  </div>
                </div>
                <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                  <Checkbox name="active" label="Active" />
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
    </>
  );
};

export default CreateCountry;
