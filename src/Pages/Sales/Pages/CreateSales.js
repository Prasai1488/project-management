// import { Form, Formik, FieldArray } from "formik";
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import * as Yup from "yup";
// import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
// import CreateAlert from "../../../Components/Alert/CreateAlert";
// import Button from "../../../Components/Buttons/Button";
// import Loader from "../../../Components/Loader";
// import AsyncSelect from "../../../Components/CommonAsyncSelectField/AsyncSelect";
// import { createSales, updateSales } from "../Redux/thunk";
// import TextField from "../../../Components/TextField/TextField";
// import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
// import { useInfinteScroll } from "../../../Utils/useInfiniteScroll";
// import { getNext } from "../../SaleDetails/Redux/thunk";
// import { deleteItem, updateSaleDetailItem } from "../../SaleDetails/Redux/salesDetailsSlice";
// import { loadOptionsCustomer, loadOptionsItem } from "../../../Utils/asyncFunction";

// const CreateSales = ({ postsPerPage, page, setShowModal, setPostsPerPage, setPage, startDate, endDate }) => {
//   const formRef = useRef();

//   const dispatch = useDispatch();
//   const sale = useSelector((state) => state.sale.sale);

//   const loading = useSelector((state) => state.sale.loading);
//   const loadingUpdated = useSelector((state) => state.sale.loadingUpdated);
//   const edit = useSelector((state) => state.sale.edit);
//   const itemdetails = useSelector((state) => state.saledetail.itemdetails);
//   const loadingNext = useSelector((state) => state.saledetail?.loadingNext);
//   const next = useSelector((state) => state.saledetail?.next);
//   const [showAlert, setShowAlert] = useState(false);
//   const [submit, setSubmit] = useState(false);
//   const [isUpdate, setIsUpdate] = useState(false);
//   const [getSaleDetailId, setgetSaleDetailId] = useState(null);

//   const validationSchema = Yup.object().shape({
//     customer: Yup.object().required("Required!"),
//     remarks: Yup.string().required("Remarks are required!"),
//     saleDetails: Yup.array().of(
//       Yup.object().shape({
//         item: Yup.object().required("Item is required!"),
//         modelNumber: Yup.string().required("Model Number is required!"),
//         serialNo: Yup.string().required("Serial Number is required!"),
//         supportPeriod: Yup.date().required("Support Period is required!"),
//         warranty: Yup.date().required("Warranty is required!"),
//       })
//     ),
//   });

//   const initialState = {
//     customer: edit ? sale?.customer : null,
//     remarks: edit ? sale?.remarks || "" : "",
//     saleDetails: edit
//       ? sale?.saleDetails
//       : [{ item: null, modelNumber: "", serialNo: "", supportPeriod: "", warranty: "" }],
//   };

//   const onSubmit = (values) => {
//     const salesData = {
//       ...values,
//       customer: values.customer?._id,
//       saleDetails: values.saleDetails.map((detail) => ({ ...detail, item: detail.item._id })),
//     };

//     if (!submit) {
//       setShowAlert(true);
//     } else {
//       if (!edit) {
//         dispatch(createSales(salesData))
//           .unwrap()
//           .then(() => {
//             successFunction("Sales created successfully.");
//             dispatch(getAllSales({ postsPerPage, startDate, endDate, page }));
//             setShowModal(false);
//           })
//           .catch((error) => {
//             errorFunction(error);
//           });
//       } else {
//         let updateData = {
//           id: sale?._id,
//           values: salesData,
//         };
//         dispatch(updateSales(updateData))
//           .unwrap()
//           .then(async () => {
//             successFunction("Sales updated successfully.");
//             await dispatch(getAllSales({ postsPerPage, startDate, endDate, page }));
//             setShowModal(false);
//           })
//           .catch((error) => {
//             setSubmit(false);
//             setShowAlert(false);
//             errorFunction(error);
//           });
//       }
//     }
//   };

//   const handleUpdate = (saleDetails) => {
//     setIsUpdate(true);
//     setgetSaleDetailId(saleDetails._id);
//   };

//   const handleDelete = (index) => {
//     dispatch(deleteItem(index));
//   };

//   const handleItemUpdate = (index, values) => {
//     dispatch(updateSaleDetailItem({ id: getSaleDetailId, updatedValues: values }));
//     setIsUpdate(false);
//     setgetSaleDetailId(null);
//   };

//   return (
//     <>
//       {(loading || loadingUpdated) && <Loader />}
//       <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={onSubmit}>
//         {(formik) => (
//           <Form autoComplete="off">
//             <AsyncSelect
//               label="Customer"
//               name="customer"
//               value={formik.values.customer}
//               required
//               getOptionLabel={(option) => option.name}
//               getOptionValue={(option) => option._id}
//               formikrequired={formik.errors.customer && formik.touched.customer}
//               onChange={(select) => formik.setFieldValue("customer", select)}
//               loadOptions={loadOptionsCustomer}
//               additional={{ offset: 0, limit: 10 }}
//             />
//             <TextField
//               label="Remarks"
//               name="remarks"
//               value={formik.values.remarks}
//               required
//               formikrequired={formik.errors.remarks && formik.touched.remarks}
//               onChange={(e) => formik.setFieldValue("remarks", e.target.value)}
//             />
//             <FieldArray
//               name="saleDetails"
//               render={({ push, remove }) => (
//                 <>
//                   {formik.values.saleDetails.map((_, index) => (
//                     <div key={index} className="row">
//                       <AsyncSelect
//                         label="Items"
//                         name={`saleDetails.${index}.item`}
//                         value={formik.values.saleDetails[index].item}
//                         required
//                         loadOptions={loadOptionsItem}
//                         getOptionLabel={(option) => option.name}
//                         getOptionValue={(option) => option._id}
//                         formikrequired={
//                           formik.errors.saleDetails?.[index]?.item && formik.touched.saleDetails?.[index]?.item
//                         }
//                         onChange={(select) => formik.setFieldValue(`saleDetails.${index}.item`, select)}
//                         additional={{ offset: 0, limit: 10 }}
//                       />
//                       <TextField
//                         label="Serial No"
//                         name={`saleDetails.${index}.serialNo`}
//                         value={formik.values.saleDetails[index].serialNo}
//                         required
//                         formikrequired={
//                           formik.errors.saleDetails?.[index]?.serialNo && formik.touched.saleDetails?.[index]?.serialNo
//                         }
//                         onChange={(e) => formik.setFieldValue(`saleDetails.${index}.serialNo`, e.target.value)}
//                       />
//                       <TextField
//                         label="Model No"
//                         name={`saleDetails.${index}.modelNumber`}
//                         value={formik.values.saleDetails[index].modelNumber}
//                         required
//                         formikrequired={
//                           formik.errors.saleDetails?.[index]?.modelNumber &&
//                           formik.touched.saleDetails?.[index]?.modelNumber
//                         }
//                         onChange={(e) => formik.setFieldValue(`saleDetails.${index}.modelNumber`, e.target.value)}
//                       />
//                       <TextField
//                         label="Support Period"
//                         name={`saleDetails.${index}.supportPeriod`}
//                         value={formik.values.saleDetails[index].supportPeriod}
//                         required
//                         formikrequired={
//                           formik.errors.saleDetails?.[index]?.supportPeriod &&
//                           formik.touched.saleDetails?.[index]?.supportPeriod
//                         }
//                         onChange={(e) => formik.setFieldValue(`saleDetails.${index}.supportPeriod`, e.target.value)}
//                         type="date"
//                       />
//                       <TextField
//                         label="Warranty"
//                         name={`saleDetails.${index}.warranty`}
//                         value={formik.values.saleDetails[index].warranty}
//                         required
//                         formikrequired={
//                           formik.errors.saleDetails?.[index]?.warranty && formik.touched.saleDetails?.[index]?.warranty
//                         }
//                         onChange={(e) => formik.setFieldValue(`saleDetails.${index}.warranty`, e.target.value)}
//                         type="date"
//                       />
//                       <div className="col-12 text-right">
//                         <Button
//                           btnType="button"
//                           className="btn create-button"
//                           title="Update"
//                           onClick={() => handleItemUpdate(index, formik.values.saleDetails[index])}
//                           disabled={!isUpdate || getSaleDetailId !== itemdetails[index]._id}
//                         />
//                         <Button
//                           btnType="button"
//                           className="btn create-button"
//                           title="Delete"
//                           onClick={() => handleDelete(index)}
//                         />
//                       </div>
//                       <div className="col-5">
//                         <TextField
//                           label="Support Period"
//                           name="supportPeriod"
//                           value={formik.values.supportPeriod}
//                           required
//                           formikrequired={formik.errors.supportPeriod && formik.touched.supportPeriod}
//                           onChange={(e) => formik.setFieldValue("supportPeriod", e.target.value)}
//                           type="date"
//                         />
//                       </div>
//                       <div className="col-5">
//                         <TextField
//                           label="Warranty"
//                           name="warranty"
//                           value={formik.values.warranty}
//                           required
//                           formikrequired={formik.errors.warranty && formik.touched.warranty}
//                           onChange={(e) => formik.setFieldValue("warranty", e.target.value)}
//                           type="date"
//                         />
//                       </div>
//                       {
//                         <div className="col-2 p-0 text-right">
//                           <div className="mt-3 d-flex justify-content-end align-items-center">
//                             <Button
//                               btnType="button"
//                               className="btn create-button w-100"
//                               title="Add Items"
//                               onClick={() => AddItemDetails(formik.values, formik.setFieldValue, formik.setErrors)}
//                             />
//                           </div>
//                         </div>
//                       }
//                     </>
//                   }
//                 </div>

//                 <hr className="w-100" />

//                 {itemdetails && itemdetails.length > 0 && (
//                   <div className="sales-table mt-1">
//                     <div className="col-12 table-scrollable" onScroll={handleScroll} ref={listRef}>
//                       <table className="listing-table">
//                         <thead>
//                           <tr>
//                             <th>S.N</th>
//                             <ColumnResize id="col1" className="columnResizer" />
//                             <th>Item</th>
//                             <ColumnResize id="col2" className="columnResizer" />
//                             <th>Model No</th>
//                             <ColumnResize id="col3" className="columnResizer" />
//                             <th>Serial No</th>
//                             <ColumnResize id="col4" className="columnResizer" />
//                             <th>Support Period</th>
//                             <ColumnResize id="col5" className="columnResizer" />
//                             <th>Warranty</th>
//                             <ColumnResize id="col6" className="columnResizer" />
//                             <th>Action</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {itemdetails?.map((saleDetail, i) => {
//                             console.log(saleDetail);
//                             const { _id, item, modelNumber, serialNo, supportPeriod, warranty } = saleDetail;
//                             return (
//                               <tr key={i + 1}>
//                                 <td>{i + 1}</td>
//                                 <td className="column_resizer_body" key={`${_id}-resizer1`} />
//                                 <td>{item?.name}</td>
//                                 <td className="column_resizer_body" key={`${_id}-resizer2`} />
//                                 <td>{modelNumber}</td>
//                                 <td className="column_resizer_body" key={`${_id}-resizer3`} />
//                                 <td>{serialNo}</td>
//                                 <td className="column_resizer_body" key={`${_id}-resizer4`} />
//                                 <td>{supportPeriod?.slice(0, 10)}</td>
//                                 <td className="column_resizer_body" key={`${_id}-resizer5`} />
//                                 <td>{warranty?.slice(0, 10)}</td>
//                                 <td className="column_resizer_body" key={`${_id}-resizer6`} />
//                                 <td>
//                                   <div className="action-buttons">
//                                     {edit && (
//                                       <DetailActionButton type="edit" onClick={() => handleUpdate(saleDetail)} />
//                                     )}
//                                     <DetailActionButton type="delete" onClick={() => handleDelete(i)} />
//                                   </div>
//                                 </td>
//                               </tr>
//                             );
//                           })}
//                         </tbody>
//                       </table>
//                     </div>
//                   ))}

//                   {formik.values.saleDetails.length < 3 && (
//                     <Button
//                       btnType="button"
//                       className="btn create-button"
//                       title="Add Item"
//                       onClick={() =>
//                         push({ item: null, modelNumber: "", serialNo: "", supportPeriod: "", warranty: "" })
//                       }
//                     />
//                   )}
//                 </>
//               )}
//             />
//             <div className="col-12 p-0 text-right">
//               <Button
//                 btnType="submit"
//                 className="btn create-button"
//                 createButton={true}
//                 title={edit ? "Update " : "Save "}
//                 content={edit ? "Update" : "Save "}
//               />
//             </div>
//           </Form>
//         )}
//       </Formik>
//       {showAlert && <CreateAlert showAlert={showAlert} setShowAlert={setShowAlert} setSubmit={setSubmit} />}

//       {saleDetailsModal && (
//         <Modal
//           showModal={saleDetailsModal}
//           setShowModal={setsaleDetailsModal}
//           header={"Update SaleDetails"}
//           size={"modal-lg"}
//         >
//           <CreatesalesDetails
//             postsPerPage={postsPerPage}
//             page={page}
//             sale={sale}
//             startDate={startDate}
//             endDate={endDate}
//             saleDetails={getSaleDetailId}
//             dispatch={dispatch}
//             setShowModal={setsaleDetailsModal}
//             initialValues={{
//               item: saleDetail.item || "",
//               modelNumber: saleDetail.modelNumber || "",
//               serialNo: saleDetail.serialNo || "",
//               supportPeriod: saleDetail.supportPeriod || "",
//               warranty: saleDetail.warranty || "",
//             }}
//           />
//         </Modal>
//       )}
//     </>
//   );
// };

// export default CreateSales;

import React from "react";

const CreateSales = () => {
  return <div>CreateSales</div>;
};

export default CreateSales;
