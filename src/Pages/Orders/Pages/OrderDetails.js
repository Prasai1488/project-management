import { Form, Formik } from "formik";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
import { renderTextField } from "../../../Utils/customFields";
import NoData from "../../../Components/NoData/NoData";
import { getAllOrders, updateOrders, getStatus, updateOrderByStatus } from "../Redux/thunk";
import CreateAlert from "../../../Components/Alert/CreateAlert";
import { useInfinteScroll } from "../../../Utils/useInfiniteScroll";
import Button from "../../../Components/Buttons/Button";

const OrderDetails = ({ edit, setShowModal, postsPerPage, setPostsPerPage, page }) => {
  const formRef = useRef();
  const listRef = useRef();
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const loading = useSelector((state) => state.order.loading);
  const next = useSelector((state) => state.order.next);
  const loadingNext = useSelector((state) => state.order.loadingNext);
  const loadingUpdated = useSelector((state) => state.order.loadingUpdated);
  const order = useSelector((state) => state?.order?.order?.data || {});
  const { status } = order;
  const [orderStatus, setOrderStatus] = useState(status);

  const { handleScroll } = useInfinteScroll({
    loadingNext,
    next,
    setPostsPerPage,
  });

  const initialState = {
    customer: order?.shippingAddress?.name || "",
    orderno: order?.id || "",
    status: order?.status || "",
  };

  // Form validation schema
  const validationSchema = Yup.object().shape({
    customer: Yup.string().required("Required!"),
    orderno: Yup.string().required("Required!"),
    status: Yup.string().required("Required!"),
  });

  const onSubmit = (values) => {
    dispatch(updateOrderByStatus(values))
      .unwrap()
      .then(() => {
        successFunction("Order updated successfully.");
        dispatch(getAllOrders({ postsPerPage, page }));
        setShowModal(false);
      })
      .catch(() => {
        errorFunction("Failed to update order.");
        setShowModal(false);
      });
  };

  return (
    <>
      {(loading || loadingUpdated) && <div>Loading...</div>}
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        innerRef={formRef}
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        {(formik) => {
          console.log(formik.values, "d");
          return (
            <Form autoComplete="off">
              <div className="create-order-wrapper">
                <div className="row">
                  {renderTextField(formik, "col", "customer", "text", "Customer", true, { readOnly: true })}
                  {renderTextField(formik, "col", "orderno", "text", "Order No", true, { readOnly: true })}
                  {renderTextField(formik, "col", "status", "text", "Status", true, { readOnly: true })}
                </div>
              </div>
              <div className="create-order-wrapper mt-2">
                {order.cartItem && order.cartItem.length > 0 ? (
                  <div className="row">
                    <div className="col-12" onScroll={handleScroll} ref={listRef}>
                      <table className="listing-table">
                        <thead>
                          <tr>
                            <th>S.N</th>
                            <th>Product ID</th>
                            <th>Product Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.cartItem.map((item, index) => {
                            const { id, product } = item;
                            return (
                              <tr key={`${id}-${index}`} style={{ cursor: "pointer" }}>
                                <td>{index + 1}</td>
                                <td>{product?.id || "N/A"}</td>
                                <td>{product?.name || "N/A"}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <NoData />
                )}
              </div>

              <div className="row p-0">
                <div className="col-12 text-right">
                  <div className="d-flex justify-content-end align-items-center">
                    {status === "pending" && (
                      <div className="d-flex gap-2 align-items-center">
                        
                        <Button
                          btnType="submit"
                          className="btn create-button"
                          style={{ height: "48px", marginTop: " 10px", marginRight: "15px" }}
                          title="Cancel"
                          content="Cancel"
                          key="cancel"
                          onClick={() => {
                            formik.setFieldValue("status", "cancelled");
                          }}
                        />
                      
                        <Button
                          createButton={true}
                          btnType="submit"
                          className="btn create-button"
                          title="Approve"
                          content="Approve"
                          key="approve"
                          onClick={() => {
                            formik.setFieldValue("status", "approved");
                          }}
                        />
                      </div>
                    )}
                    {status === "approved" && (
                      <div className="d-flex gap-2 align-items-center">
                        <Button
                          btnType="submit"
                          className="btn create-button"
                          style={{ height: "48px", marginTop: " 10px", marginRight: "15px" }}
                          title="Cancel"
                          content="Cancel"
                          key="cancel"
                          onClick={() => {
                            formik.setFieldValue("status", "cancelled");
                          }}
                        />
                        <Button
                          createButton={true}
                          btnType="submit"
                          className="btn create-button"
                          title="Dispatch"
                          content="Dispatch"
                          key="dispatch"
                          onClick={() => {
                            formik.setFieldValue("status", "dispatched");
                          }}
                        />
                      </div>
                    )}
                    {status === "dispatched" && (
                      <div className="d-flex gap-2 align-items-center">
                        <Button
                          btnType="submit"
                          className="btn create-button"
                          style={{ height: "48px", marginTop: " 10px", marginRight: "15px" }}
                          title="Self Pick"
                          content="Self Pick"
                          key="selfPick"
                          onClick={() => {
                            formik.setFieldValue("status", "self_picked");
                          }}
                        />
                        <Button
                          createButton={true}
                          btnType="submit"
                          className="btn create-button"
                          title="Delivered"
                          content="Delivered"
                          key="delivered"
                          onClick={() => {
                            formik.setFieldValue("status", "delivered");
                          }}
                        />
                      </div>
                    )}
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
