import { combineReducers } from "@reduxjs/toolkit";
import notificationReducer from "../Components/CommonPageHeader/redux/notificationSlice.js";
import contactPersonReducer from "../Pages/ContactPerson/Redux/contactPersonSlice";
import countryReducer from "../Pages/Country/Redux/countrySlice";
import fiscalSessionADReducer from "../Pages/FiscalSessionAD/Redux/fiscalSessionADSlice";
import fiscalSessionBSReducer from "../Pages/FiscalSessionBS/Redux/fiscalSessionBSSlice";
import issueReducer from "../Pages/Issue/Redux/issueSlice";
import itemReducer from "../Pages/Item/Redux/itemSlice";
import organizationReducer from "../Pages/Organization/Redux/organizationSlice";
import permissionReducer from "../Pages/Permission/Redux/permissionSlice.js";
import permissionCategoryReducer from "../Pages/PermissionCategory/Redux/permissionCategorySlice.js";
import questionnaireReducer from "../Pages/Questionnaire/Redux/questionnaireSlice";
import roleReducer from "../Pages/Roles/Redux/roleSlice";
import sectorReducer from "../Pages/Sector/Redux/sectorSlice";
// import productReducer from "../Pages/Product/Redux/product";
// import ticketInspectionReducer from "../Pages/TicketInspection/Redux/ticketInspectionSlice.js";
// import ticketReducer from "../Pages/Tickets/Redux/ticketSlice.js";
import userReducer from "../Pages/User/Redux/userSlice";
import alertReducer from "../Redux/Alert/alertSlice";
import authReducer from "../Redux/Auth/authSlice";
import layoutReducer from "../Redux/Layout/layoutSlice";
import systemSelectionReducer from "../Redux/SystemSelection/systemSelectionSlice";
import tabsValueReducer from "../Redux/TabsValue/tabsValueSlice.js";
// import clientReducer from "../Pages/Client/Redux/clientSlice";
// import customerReducer from "../Pages/Customer/Redux/customerSlice";
// import manufacturerReducer from "../Pages/Manufacturer/Redux/manufacturerSlice";
// import unitReducer from "../Pages/Unit/Redux/unitSlice";
// import newTicketInspectionReducer from "../Pages/TicketInspection/Redux/newTicketInspectionSlice";
// import salesReducer from "../Pages/Sales/Redux/salesSlice";
// import saledetailReducer from "../Pages/SaleDetails/Redux/salesDetailsSlice.js";

import categoryReducer from "../Pages/Category/Redux/categorySlice";

import orderReducer from "../Pages/Orders/Redux/ordersSlice.js";
import productReducer from "../Pages/Products/Redux/ProductSlice.js";

//ranjer
import offerReducer from "../Pages/Offer/Redux/offerSlice.js";

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  layout: layoutReducer,
  tabsValue: tabsValueReducer,
  systemSelection: systemSelectionReducer,
  organization: organizationReducer,
  sectors: sectorReducer,
  permission: permissionReducer,
  permissionCategory: permissionCategoryReducer,
  country: countryReducer,
  ad: fiscalSessionADReducer,
  bs: fiscalSessionBSReducer,
  user: userReducer,
  role: roleReducer,
  notification: notificationReducer,

  //reducers
  // ticket: ticketReducer,
  notification: notificationReducer,
  // ticketInspection: ticketInspectionReducer,
  // newTicketInspection: newTicketInspectionReducer,
  item: itemReducer,
  order: orderReducer,
  questionnaire: questionnaireReducer,
  issue: issueReducer,
  contactPerson: contactPersonReducer,
  // client: clientReducer,
  // customer: customerReducer,
  // manufacturer: manufacturerReducer,
  // unit: unitReducer,
  // sale: salesReducer,
  // saledetail: saledetailReducer,
  category: categoryReducer,
  //ranjer
  offer: offerReducer,
});

export default rootReducer;
