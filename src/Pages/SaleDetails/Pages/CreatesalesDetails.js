import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import axiosInstance from "../../../Utils/axios";
import TextField from "../../../Components/TextField/TextField";
import Button from "../../../Components/Buttons/Button";
import AsyncSelect from "../../../Components/CommonAsyncSelectField/AsyncSelect";

import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
import { getSpecificSalesDetails, updateSalesDetails } from "../Redux/thunk";
import { getAllSales } from "../../Sales/Redux/thunk";
import { updateSaleDetailItem } from "../Redux/salesDetailsSlice";

const CreatesalesDetails = ({
  dispatch,
  setShowModal,
  initialValues,
  saleDetails,
  sale,
  postsPerPage,
  page,
  startDate,
  endDate,
}) => {
  const validationSchema = Yup.object().shape({
    item: Yup.object().required("Required!"),
    modelNumber: Yup.string().required("Required!"),
    serialNo: Yup.string().required("Required!"),
    supportPeriod: Yup.date().required("Required!"),
    warranty: Yup.date().required("Required!"),
  });

  const onSubmit = (values) => {
    const updatedValues = {
      item: values.item._id,
      modelNumber: values.modelNumber,
      serialNo: values.serialNo,
      supportPeriod: values.supportPeriod,
      warranty: values.warranty,
    };
    dispatch(updateSalesDetails({ id: saleDetails, values: updatedValues }))
      .unwrap()
      .then(async () => {
        successFunction("Sale detail updated");
        await dispatch(updateSaleDetailItem({ id: saleDetails, updatedValues }));
        await dispatch(getAllSales({ postsPerPage, page }));
        await dispatch(getSpecificSalesDetails({ saleId: sale?._id, postsPerPage, page }));

        setShowModal(false);
      })
      .catch(() => {
        errorFunction("Could not update sale detail");
      });
  };

  const loadOptionsItem = async (search, loadOptions, { limit, offset }) => {
    const data = await axiosInstance(`api/v1/item-app/item?offset=${offset}&limit=${limit}&search=${search}`);
    return {
      options: data?.data.items,
      additional: {
        offset: 0,
        limit: 10,
      },
    };
  };

  return (
    <Formik
      initialValues={{
        ...initialValues,
        supportPeriod: initialValues.supportPeriod ? initialValues.supportPeriod.split("T")[0] : "",
        warranty: initialValues.warranty ? initialValues.warranty.split("T")[0] : "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form autoComplete="off">
            <div className="createsalesdetails-wrapper">
              <div className="row">
                <div className="col-6">
                  <AsyncSelect
                    label="Items"
                    name="item"
                    value={formik.values.item}
                    required
                    loadOptions={loadOptionsItem}
                    getOptionLabel={(option) => `${option.name}`}
                    getOptionValue={(option) => `${option._id}`}
                    formikrequired={formik.errors.item && formik.touched.item}
                    onChange={(select) => formik.setFieldValue("item", select)}
                    additional={{
                      offset: 0,
                      limit: 10,
                    }}
                  />
                </div>
                <div className="col-6">
                  <TextField
                    label="Serial No"
                    name="serialNo"
                    value={formik.values.serialNo}
                    required
                    formikrequired={formik.errors.serialNo && formik.touched.serialNo}
                    onChange={(e) => formik.setFieldValue("serialNo", e.target.value)}
                  />
                </div>
                <div className="col-6">
                  <TextField
                    label="Model No"
                    name="modelNumber"
                    value={formik.values.modelNumber}
                    required
                    formikrequired={formik.errors.modelNumber && formik.touched.modelNumber}
                    onChange={(e) => formik.setFieldValue("modelNumber", e.target.value)}
                  />
                </div>

                <div className="col-6">
                  <TextField
                    label="Support Period"
                    name="supportPeriod"
                    value={formik.values.supportPeriod}
                    required
                    formikrequired={formik.errors.supportPeriod && formik.touched.supportPeriod}
                    onChange={(e) => formik.setFieldValue("supportPeriod", e.target.value)}
                    type="date"
                  />
                </div>
                <div className="col-6">
                  <TextField
                    label="Warranty"
                    name="warranty"
                    value={formik.values.warranty}
                    required
                    formikrequired={formik.errors.warranty && formik.touched.warranty}
                    onChange={(e) => formik.setFieldValue("warranty", e.target.value)}
                    type="date"
                  />
                </div>
              </div>
              <div className="col-12 p-0 text-right">
                <div className="mt-3 d-flex justify-content-end align-items-center">
                  <Button
                    btnType="submit"
                    className="btn create-button"
                    createButton={true}
                    title="Update"
                    content="Update"
                  />
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreatesalesDetails;
