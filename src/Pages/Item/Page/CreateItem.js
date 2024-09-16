import { Formik } from "formik";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
import FormWrapper from "../../../Components/FormWrapper/FormWrapper";
import Loader from "../../../Components/Loader";
import { renderAsyncSelectField, renderSelectField, renderTextField } from "../../../Utils/customFields";
import { createItems, getAllItems, updateItems } from "../Redux/thunk";
import { loadOptionsManufacturer, loadOptionsUnits } from "./asyncFunction";
import Checkbox from "../../../Components/CommonCheckbox/Checkbox";

const itemTypes = [
  {
    id: 1,
    name: "SOFTWARE",
    value: "SOFTWARE",
  },
  {
    id: 2,
    name: "HARDWARE",
    value: "HARDWARE",
  },
];

const CreateItem = ({ dispatch, postsPerPage = 10, setShowModal, type }) => {
  const formRef = useRef();
  const item = useSelector((state) => state.item.item);
  const loading = useSelector((state) => state.item.loading);
  const loadingUpdated = useSelector((state) => state.item.loadingUpdated);
  const edit = useSelector((state) => state.item.edit);
  const itemtpye = itemTypes?.find((itemType) => itemType.name === item?.itemType);
  const initialState = {
    name: edit ? item?.name : "",
    itemCode: edit ? item?.itemCode : "",
    itemType: edit ? itemtpye : "",
    price: edit ? item?.price : "",
    manufacturer: edit ? item?.manufacturer : null,
    unit: edit ? item?.unit : null,
    serialNo: edit ? item?.serialNo : "",
    warranty: edit ? item?.warranty : "",
    supportPeriod: edit ? item?.supportPeriod : "",
    outOfWarrantyPeriod: edit ? item?.outOfWarrantyPeriod : "",
    amcPeriod: edit ? item?.amcPeriod : "",
    amcRate: edit ? item?.amcRate : "",
    amcAmount: edit ? item?.amcAmount : "",
    isActive: edit ? item?.isActive : false,
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(2).max(100).trim().required("Name is required"),
    itemCode: Yup.string().min(2).max(100).trim().required("Item code is required"),
    itemType: Yup.object().required("Required"),
    price: Yup.number().positive(),
    manufacturer: Yup.object().required("Manufacturer is required"),
    unit: Yup.object().required("Unit is required"),
    serialNo: Yup.string().when("itemType", {
      is: (value) => value && value.name === "HARDWARE",
      then: (schema) => schema.required("Required"),
      otherwise: (schema) => schema,
    }),
    warranty: Yup.string().when("itemType", {
      is: (value) => value && value.name === "HARDWARE",
      then: (schema) => schema.required("Required"),
      otherwise: (schema) => schema,
    }),
    supportPeriod: Yup.string().required("Support period is required"),
    outOfWarrantyPeriod: Yup.string(),
    amcPeriod: Yup.string().when("itemType", {
      is: (value) => value && value.name === "SOFTWARE",
      then: (schema) => schema.required("Required"),
      otherwise: (schema) => schema,
    }),
    amcRate: Yup.string().when("itemType", {
      is: (value) => value && value.name === "SOFTWARE",
      then: (schema) => schema.required("Required"),
      otherwise: (schema) => schema,
    }),
    amcAmount: Yup.string().when("itemType", {
      is: (value) => value && value.name === "SOFTWARE",
      then: (schema) => schema.required("Required"),
      otherwise: (schema) => schema,
    }),
    isActive: Yup.boolean(),
  });

  const onSubmit = (values) => {
    const createValues = {
      ...values,
      itemType: values.itemType?.value,
      manufacturer: values.manufacturer?._id,
      unit: values?.unit?._id,
    };
    const action = edit ? updateItems({ id: item?._id, values: createValues }) : createItems(createValues);
    const successMessage = edit ? `${type} Updated successfully` : `${type} Created successfully`;

    dispatch(action)
      .unwrap()
      .then(() => {
        successFunction(successMessage);
        dispatch(getAllItems(postsPerPage));
        setShowModal(false);
      })
      .catch(errorFunction);
  };

  return (
    <>
      {(loading || loadingUpdated) && <Loader />}
      <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={onSubmit} innerRef={formRef}>
        {(formik) => (
          <FormWrapper>
            {renderTextField(formik, 4, "name", "text", "Name", true)}
            {renderTextField(formik, 4, "itemCode", "text", "Item Code", true)}
            {renderSelectField(formik, 4, "itemType", "Item Type", itemTypes, true, formik?.values?.itemType)}
            {renderTextField(formik, 4, "price", "number", "Price", true)}
            {renderAsyncSelectField(formik, 4, "manufacturer", "Manufacturer", loadOptionsManufacturer, true)}
            {renderAsyncSelectField(formik, 4, "unit", "Unit", loadOptionsUnits, true)}
            {formik.values.itemType?.name === "HARDWARE" && (
              <>
                {renderTextField(formik, 4, "serialNo", "text", "Serial No", true)}
                {renderTextField(formik, 4, "warranty", "number", "Warranty", true)}
              </>
            )}
            {renderTextField(formik, 4, "supportPeriod", "number", "Support Period", true)}
            {renderTextField(formik, 4, "outOfWarrantyPeriod", "number", "Out of Warranty Period", false)}
            {formik.values.itemType?.name === "SOFTWARE" && (
              <>
                {renderTextField(formik, 4, "amcPeriod", "number", "AMC Period", false)}
                {renderTextField(formik, 4, "amcRate", "number", "AMC Rate", true)}
                {renderTextField(formik, 4, "amcAmount", "number", "AMC Amount", true)}
              </>
            )}
            <div className="my-2 col-12 d-flex justify-content-center align-items-center">
              <Checkbox name="isActive" label="Active" edit={edit} />
            </div>
          </FormWrapper>
        )}
      </Formik>
    </>
  );
};

export default CreateItem;
