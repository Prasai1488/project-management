import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ColumnResize from "react-table-column-resizer";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import { useInfinteScroll } from "../../../Utils/useInfiniteScroll";
import { getSpecificSalesDetails } from "../../SaleDetails/Redux/thunk";
import { salesEditSuccess } from "../Redux/salesSlice";
import { getNext } from "../Redux/thunk";

const SaleListing = ({ setShowSaleModal, setPostsPerPage, setPage, postsPerPage, page }) => {
  const dispatch = useDispatch();
  const listRef = useRef(null);
  const next = useSelector((state) => state.sale.next);
  const loadingNext = useSelector((state) => state.sale?.loadingNext);
  const sales = useSelector((state) => state?.sale?.sales);

  const { handleScroll } = useInfinteScroll({
    loadingNext: loadingNext,
    next,
    getNext,
    setPostsPerPage,
    setPage,
  });

  const handleEdit = async (sale) => {
    dispatch(salesEditSuccess(sale));
   dispatch(getSpecificSalesDetails({ saleId: sale._id, postsPerPage: 10, page }));
    setShowSaleModal(true);
  };

  const handleInspection = async (sale) => {
    dispatch(salesEditSuccess(sale));
    await dispatch(getSpecificSalesDetails({ saleId: sale._id, postsPerPage: 10, page }));
    setShowSaleModal(true);
  };
  return (
    <>
      {sales && sales?.length > 0 ? (
        <div className="row">
          <div className="col-12 table-scrollable" onScroll={handleScroll} ref={listRef}>
            <table className="listing-table">
              <thead>
                <tr>
                  <th>SN</th>
                  <ColumnResize id={1} className="columnResizer" />
                  <th>Customer</th>
                  <ColumnResize id={2} className="columnResizer" minWidth={120} />
                  <th>SerialNo</th>
                  <ColumnResize id={3} className="columnResizer" />
                  <th>Sale Date</th>
                  <ColumnResize id={3} className="columnResizer" />
                  <th>Remarks</th>
                  <ColumnResize id={3} className="columnResizer" />
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale, i) => {
                  const { _id, customer, serialNo, remarks, createdDateBs } = sale;
                  return (
                    <tr key={_id} onDoubleClick={() => handleInspection(sale)} style={{ cursor: "pointer" }}>
                      <td>{i + 1}</td>
                      <td className="column_resizer_body" />
                      <td>{customer ? customer.name : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>{serialNo ? serialNo : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>{createdDateBs ? createdDateBs : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>{remarks ? remarks : "N/A"}</td>
                      <td className="column_resizer_body" />
                      <td>
                        <DetailActionButton type={"edit"} onClick={() => handleEdit(sale)} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {loadingNext && (
              <div className="w-100 d-flex justify-content-center align-items-center py-4">
                <div className="spinner-border text-danger" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <NoData />
      )}
    </>
  );
};

export default SaleListing;
