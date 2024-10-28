// import { Form, Formik } from "formik";
// import React, { useRef, useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import * as Yup from "yup";
// import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
// import { renderTextField } from "../../../Utils/customFields";
// import NoData from "../../../Components/NoData/NoData";
// import { getAllOrders, updateOrders } from "../Redux/thunk";
// import CreateAlert from "../../../Components/Alert/CreateAlert";
// import { useInfinteScroll } from "../../../Utils/useInfiniteScroll";
// import Button from "../../../Components/Buttons/Button";

// const OrderDetails = ({ edit, setShowModal, postsPerPage, setPostsPerPage }) => {
//   const formRef = useRef();
//   const listRef = useRef();
//   const dispatch = useDispatch();
//   const [submit, setSubmit] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);
//   const [statusData, setStatusData] = useState(null);
//   const loading = useSelector((state) => state.order.loading);
//   const next = useSelector((state) => state.order.next);
//   const loadingNext = useSelector((state) => state.order.loadingNext);
//   const loadingUpdated = useSelector((state) => state.order.loadingUpdated);
//   const order = useSelector((state) => state?.order?.order?.data || {});
//   const getStatus = useSelector((state) => state?.order?.order?.data);

//   const { handleScroll } = useInfinteScroll({
//     loadingNext,
//     next,
//     setPostsPerPage,
//   });

//   // Fetch order status from API when the component mounts
//   useEffect(() => {
//     const fetchOrderStatus = async () => {
//       try {
//         const response = await getStatus(order?.status);
//         setStatusData(response?.data);
//       } catch (error) {
//         console.error("Error fetching order status:", error);
//       }
//     };

//     if (order?.status) {
//       fetchOrderStatus();
//     }
//   }, [order?.status]);

//   // Define initial form values based on single order
//   const initialState = {
//     customer: order?.shippingAddress?.name || "",
//     orderno: order?.id || "",
//     status: statusData?.name || "",
//   };

//   // Form validation schema
//   const validationSchema = Yup.object().shape({
//     customer: Yup.string().required("Required!"),
//     orderno: Yup.string().required("Required!"),
//     status: Yup.string().required("Required!"),
//   });

//   const [products, setProducts] = useState([]);

//   const onSubmit = (values) => {
//     const updatedValues = {
//       ...values,
//       status: statusData?.id,
//     };

//     if (!submit) {
//       setShowAlert(true);
//     } else {
//       // Update existing order
//       dispatch(updateOrders({ ...updatedValues, id: order.id }))
//         .unwrap()
//         .then(() => {
//           successFunction("Order updated successfully.");
//           dispatch(getAllOrders(postsPerPage));
//           setShowModal(false);
//         })
//         .catch((error) => {
//           setSubmit(false);
//           setShowAlert(false);
//           errorFunction(error);
//         });
//     }
//   };

//   useEffect(() => {
//     if (submit && formRef.current) {
//       formRef.current.submitForm();
//     }
//   }, [submit]);

//   // const renderActionButton = () => {
//   //   switch (statusData?.id) {
//   //     case "pending":
//   //       return <Button btnType="submit" className="btn create-button" title={"Approve"} content={"Approve"} />;
//   //     case "approved":
//   //       return <Button btnType="submit" className="btn create-button" title={"Pack"} content={"Pack"} />;
//   //     case "packed":
//   //       return (
//   //         <>
//   //           <Button btnType="submit" className="btn create-button" title={"Dispatch"} content={"Dispatch"} />
//   //           <Button btnType="submit" className="btn cancel-button" title={"Cancel"} content={"Cancel"} />
//   //         </>
//   //       );
//   //     case "dispatched":
//   //       return <Button btnType="submit" className="btn create-button" title={"Deliver"} content={"Deliver"} />;
//   //     default:
//   //       return null;
//   //   }
//   // };

//   const renderActionButton = () => {
//     switch (statusData?.id) {
//       case "pending":
//         return (
//           <>
//             <Button btnType="submit" className="btn create-button" title="Approve" content="Approve" />
//             <Button btnType="submit" className="btn cancel-button" title="Cancel" content="Cancel" />
//           </>
//         );

//       case "approved":
//         return <Button btnType="submit" className="btn create-button" title="Pack" content="Pack" />;

//       case "packed":
//         return (
//           <>
//             <Button btnType="submit" className="btn create-button" title="Dispatch" content="Dispatch" key="dispatch" />
//             <Button btnType="submit" className="btn cancel-button" title="Cancel" content="Cancel" key="cancel" />
//           </>
//         );

//       case "dispatched":
//         return <Button btnType="submit" className="btn create-button" title="Deliver" content="Deliver" />;

//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//       {(loading || loadingUpdated) && <div>Loading...</div>}
//       <Formik
//         initialValues={initialState}
//         validationSchema={validationSchema}
//         onSubmit={onSubmit}
//         innerRef={formRef}
//         enableReinitialize={true}
//       >
//         {(formik) => {
//           return (
//             <Form autoComplete="off">
//               <div className="create-order-wrapper">
//                 <div className="row">
//                   {renderTextField(formik, "col", "customer", "text", "Customer", true, { readOnly: true })}
//                   {renderTextField(formik, "col", "orderno", "text", "Order No", true, { readOnly: true })}

//                   {/* Display Status */}
//                   <div className="col">
//                     <label htmlFor="status">Status</label>
//                     <input
//                       type="text"
//                       id="status"
//                       name="status"
//                       value={formik.values.status}
//                       readOnly
//                       className="form-control"
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="create-order-wrapper mt-2">
//                 {order.cartItem && order.cartItem.length > 0 ? (
//                   <div className="row">
//                     <div className="col-12" onScroll={handleScroll} ref={listRef}>
//                       <table className="listing-table">
//                         <thead>
//                           <tr>
//                             <th>S.N</th>
//                             <th>Product ID</th>
//                             <th>Product Name</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {order.cartItem.map((item, index) => {
//                             const { id, product } = item;
//                             return (
//                               <tr key={`${id}-${index}`} style={{ cursor: "pointer" }}>
//                                 <td>{index + 1}</td>
//                                 <td>{product?.id || "N/A"}</td>
//                                 <td>{product?.name || "N/A"}</td>
//                               </tr>
//                             );
//                           })}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 ) : (
//                   <NoData />
//                 )}
//               </div>

//               <div className="row p-0">
//                 <div className="col-12 text-right">
//                   <div className="d-flex justify-content-end align-items-center">{renderActionButton()}</div>
//                 </div>
//               </div>
//             </Form>
//           );
//         }}
//       </Formik>
//       {showAlert && <CreateAlert showAlert={showAlert} setShowAlert={setShowAlert} setSubmit={setSubmit} />}
//     </>
//   );
// };

// export default OrderDetails;

import { Form, Formik } from "formik";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
import { renderTextField } from "../../../Utils/customFields";
import NoData from "../../../Components/NoData/NoData";
import { getAllOrders, updateOrders, getStatus } from "../Redux/thunk";
import CreateAlert from "../../../Components/Alert/CreateAlert";
import { useInfinteScroll } from "../../../Utils/useInfiniteScroll";
import Button from "../../../Components/Buttons/Button";

const OrderDetails = ({ edit, setShowModal, postsPerPage, setPostsPerPage }) => {
  const formRef = useRef();
  const listRef = useRef();
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [statusData, setStatusData] = useState(null);
  const loading = useSelector((state) => state.order.loading);
  const next = useSelector((state) => state.order.next);
  const loadingNext = useSelector((state) => state.order.loadingNext);
  const loadingUpdated = useSelector((state) => state.order.loadingUpdated);
  const order = useSelector((state) => state?.order?.order?.data || {});

  const { handleScroll } = useInfinteScroll({
    loadingNext,
    next,
    setPostsPerPage,
  });

  // Fetch order status from API when the component mounts
  useEffect(() => {
    const fetchOrderStatus = async () => {
      if (order?.status) {
        dispatch(getStatus(order?.status))
          .unwrap()
          .then((data) => {
            setStatusData(data);
          })
          .catch((error) => {
            console.error("Error fetching order status:", error);
          });
      }
    };
    fetchOrderStatus();
  }, [order?.status, dispatch]);

  // Define initial form values based on single order
  const initialState = {
    customer: order?.shippingAddress?.name || "",
    orderno: order?.id || "",
    status: statusData?.name || "",
  };

  // Form validation schema
  const validationSchema = Yup.object().shape({
    customer: Yup.string().required("Required!"),
    orderno: Yup.string().required("Required!"),
    status: Yup.string().required("Required!"),
  });

  const onSubmit = (values) => {
    const updatedValues = {
      ...values,
      status: statusData?.id,
    };

    if (!submit) {
      setShowAlert(true);
    } else {
      // Update existing order
      dispatch(updateOrders({ ...updatedValues, id: order.id }))
        .unwrap()
        .then(() => {
          successFunction("Order updated successfully.");
          dispatch(getAllOrders(postsPerPage));
          setShowModal(false);
        })
        .catch((error) => {
          setSubmit(false);
          setShowAlert(false);
          errorFunction(error);
        });
    }
  };

  useEffect(() => {
    if (submit && formRef.current) {
      formRef.current.submitForm();
    }
  }, [submit]);

  const renderActionButton = () => {
    switch (statusData?.id) {
      case "pending":
        return (
          <>
            <Button btnType="submit" className="btn create-button" title="Approve" content="Approve" key="approve" />
            <Button
              btnType="submit"
              className="btn cancel-button"
              title="Cancel"
              content="Cancel"
              key="cancel-pending"
            />
          </>
        );

      case "approved":
        return <Button btnType="submit" className="btn create-button" title="Pack" content="Pack" key="pack" />;

      case "packed":
        return (
          <>
            <Button btnType="submit" className="btn create-button" title="Dispatch" content="Dispatch" key="dispatch" />
            <Button
              btnType="submit"
              className="btn cancel-button"
              title="Cancel"
              content="Cancel"
              key="cancel-packed"
            />
          </>
        );

      case "dispatched":
        return (
          <Button btnType="submit" className="btn create-button" title="Deliver" content="Deliver" key="deliver" />
        );

      default:
        return null;
    }
  };

  return (
    <>
      {(loading || loadingUpdated) && <div>Loading...</div>}
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        innerRef={formRef}
        enableReinitialize={true}
      >
        {(formik) => {
          return (
            <Form autoComplete="off">
              <div className="create-order-wrapper">
                <div className="row">
                  {renderTextField(formik, "col", "customer", "text", "Customer", true, { readOnly: true })}
                  {renderTextField(formik, "col", "orderno", "text", "Order No", true, { readOnly: true })}
                  <div className="col">
                    <label htmlFor="status">Status</label>
                    <input
                      type="text"
                      id="status"
                      name="status"
                      value={formik.values.status}
                      readOnly
                      className="form-control"
                    />
                  </div>
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
                  <div className="d-flex justify-content-end align-items-center">{renderActionButton()}</div>
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
