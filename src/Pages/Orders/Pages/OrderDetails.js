import { Form, Formik } from "formik";
import { v4 as uuidv4 } from "uuid";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
import { renderSelectField, renderTextField } from "../../../Utils/customFields";
import { createOrders, getAllOrders, updateOrders } from "../Redux/thunk";
import Loader from "../../../Components/Loader/Loader";
import Button from "../../../Components/Button/Button";
import DetailActionButton from "../../../Components/ActionButtons/DetailActionButton";
import CreateAlert from "../../../Components/Alert/CreateAlert";

const OrderDetails = () => {
  const formRef = useRef();
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { loading, loadingUpdated, products, edit, orderDetails } = useSelector((state) => state.orders);

  const initialState = {};

  const validationSchema = Yup.object().shape({});

  const onSubmit = (values) => {
    if (!submit) {
      setShowAlert(true);
    } else {
      const updatedValues = { ...values, id: edit ? orderDetails.id : uuidv4() };
      if (!edit) {
        dispatch(createOrders(updatedValues))
          .unwrap()
          .then(() => {
            successFunction("OrderDetails created successfully.");
            dispatch(getAllOrders(postsPerPage));
            setShowModal(false);
          })
          .catch((error) => {
            setSubmit(false);
            setShowAlert(false);
            errorFunction(error);
          });
      } else {
        dispatch(updateOrders(updatedValues))
          .unwrap()
          .then(() => {
            successFunction("OrderDetails updated successfully.");
            dispatch(getAllOrders(postsPerPage));
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
              <div className="create-salesInvoice-wrapper">
                <div className="basic-wrapper my-3">
                  <div className="row">
                    {renderTextField(formik, 3, "customer", "text", "Customer.", true)}
                    {renderTextField(formik, 3, "plSlipNo", "text", "P/L Slip No.", true)}
                    {renderTextField(formik, 3, "date", "date", "Date", true)}
                    {renderTextField(formik, 4, "plSlipNoB", "text", "P/L Slip No. B", true)}
                    {renderSelectField(formik, 4, "partyAc", "Party A/C", true)}
                    {renderSelectField(formik, 4, "salesAc", "Sales A/C", true)}
                  </div>
                </div>

                <div className="basic-wrapper mt-3">
                  <table className="listing-table">
                    <thead>
                      <tr>
                        <th>S.N</th>
                        <td className="column_resizer_body" />
                        <th>PRODUCTS</th>
                        <td className="column_resizer_body" />
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products && products.length > 0 ? (
                        products.map((product, index) => (
                          <tr key={product.unique}>
                            <td>{index + 1}</td>
                            <td className="column_resizer_body" />
                            <td>{product.product?.name || "N/A"}</td>
                            <td className="column_resizer_body" />
                            <td>{product.id || "N/A"}</td>
                            <td className="column_resizer_body" />
                            <td>
                              <DetailActionButton type="delete" onClick={() => handleDeleteDocument(product.unique)} />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7">No data available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row">
                <div className="col-12 p-10 text-right">
                  <div className="mt-3 d-flex justify-content-end align-items-center">
                    <Button
                      btnType="submit"
                      className="btn create-button"
                      createButton={true}
                      title={"Approve"}
                      content={"Approve"}
                    />
                  </div>
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

export default OrderDetails;
