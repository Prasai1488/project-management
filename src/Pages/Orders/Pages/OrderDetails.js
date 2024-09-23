import { Form, Formik } from "formik";
import { v4 as uuidv4 } from "uuid";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
import { renderSelectField, renderTextField } from "../../../Utils/customFields";
import { createOrders, getAllOrders, updateOrders } from "../Redux/thunk";

import CreateAlert from "../../../Components/Alert/CreateAlert";
import Button from "../../../Components/Buttons/Button";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";

const OrderDetails = () => {
  const formRef = useRef();
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const loading = useSelector((state) => state.order.loading);
  const loadingUpdated = useSelector((state) => state.order.loadingUpdated);
  const initialState = {
    customer: "",
    orderno: "",
    packedOn: "",
    orderOn: "",
    approvedOn: "",
    dispatchedOn: "",
  };

  const validationSchema = Yup.object().shape({
    customer: Yup.string().required(" Required!"),
    orderno: Yup.string().required(" Required!"),
    packedOn: Yup.string().required("Required!"),
    orderOn: Yup.string().required("Required!"),
    approvedOn: Yup.string().required(" Required!"),
    dispatchedOn: Yup.string().required("Required!"),
  });

  const [products, setProducts] = useState([]);
  const onSubmit = (values) => {
    if (!submit) {
      setShowAlert(true);
    } else {
      const updatedValues = {};
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
      {loading || loadingUpdated}
      <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={onSubmit} innerRef={formRef}>
        {(formik) => {
          return (
            <Form autoComplete="off">
              <div className="create-order-wrapper">
                <div className="row">
                  {renderTextField(formik, "col", "customer", "text", "Customer", true)}
                  {renderTextField(formik, "col", "orderOn", "text", "Order On", true)}
                  {renderTextField(formik, "col", "packedOn", "text", "Packed On", true)}
                  {renderTextField(formik, "col", "approvedOn", "text", "Approved On ", true)}
                  {renderTextField(formik, "col", "dispatchedOn", "text", "Dispatched On", true)}
                </div>
              </div>
              <div className="create-order-wrapper mt-2">
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
                    {Array.isArray(products) && products.length > 0 ? (
                      products.map((product, index) => (
                        <tr key={product?.unique || index}>
                          <td>{index + 1}</td>
                          <td className="column_resizer_body" />
                          <td>{product?.product?.name || "N/A"}</td>
                          <td className="column_resizer_body" />
                          <td>{product?.id || "N/A"}</td>
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
              <div className="row p-0">
                <div className="col-12 text-right">
                  <div className="d-flex justify-content-end align-items-center">
                    <Button btnType="submit" className="btn create-button" title={"Approve"} content={"Approve"} />
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
