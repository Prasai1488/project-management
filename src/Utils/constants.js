export const fiscalSessionTypes = [
  { id: 1, name: "AD" },
  { id: 2, name: "BS" },
];

export const genders = [
  { id: "m", name: "Male" },
  { id: "f", name: "Female" },
  { id: "o", name: "Other" },
];

export const statusList = [
  {
    id: 1,
    value: "PENDING",
  },
  { id: 2, value: "CREATED" },
  {
    id: 3,
    value: "CANCELLED",
  },
];

export const purchaseTypes = [
  { name: "Direct", value: "DIRECT" },
  { name: "Protocol", value: "PROTOCOL" },
];

export const paymentMethods = [
  { name: "Cash", value: "CARD" },
  { name: "Bank Transfer", value: "BANK_TRANSFER" },
  { name: "Cash", value: "CASH" },
  { name: "Cheque", value: "CHEQUE" },
  { name: "Other", value: "OTHER" },
];

export const returnReasons = [
  { name: "Damaged", value: "DAMAGED" },
  { name: "Wrong Item", value: "WRONG_ITEM" },
  { name: "Overstock", value: "OVERSTOCK" },
  { name: "Other", value: "OTHER" },
];

export const deliveryStatuses = [
  { name: "Pending", value: "PENDING" },
  { name: "In Transit", value: "IN_TRANSIT" },
  { name: "Delivered", value: "DELIVERED" },
  { name: "Delayed", value: "DELAYED" },
  { name: "Cancelled", value: "CANCELLED" },
];

export const shippingModes = [
  { name: "Air", value: "AIR" },
  { name: "Land", value: "LAND" },
  { name: "Water", value: "WATER" },
];

export const washedTypes = [
  { name: "Washed", value: "WASHED" },
  { name: "Non-Washed", value: "NON_WASHED" },
];
export const excludeCreateBtn = ["inspection"];
export const hideButton = ["organization", "organizationHierarchy"];

// export const itemTypes = [
//   { name: "Synthetic", value: "SYNTHETIC" },
//   { name: "Natural", value: "NATURAL" },
// ];
export const priorityOption = [
  { name: "Urgent", value: "URGENT" },
  { name: "High", value: "HIGH" },
  { name: "Medium", value: "MEDIUM" },
  { name: "Low", value: "LOW" },
];
export const levelOptions = [
  { name: "L1", value: "L1" },
  { name: "L2", value: "L2" },
  { name: "L3", value: "L3" },
];
export const mediumOptions = [
  { id: "PHONE", name: "Phone" },
  { id: "EMAIL", name: "Email" },
  { id: "VISIT", name: "Visit" },
  { id: "PORTAL", name: "Portal" },
];
export const itemTypes = [
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
