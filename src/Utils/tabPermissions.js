export const coreSetupPermission = [
  {
    tabName: "Organization Setup",
    ordering: 0,
    keyWord: "organization",
    permissionList: ["add_department"],
  },
  {
    tabName: "Country",
    ordering: 1,
    keyWord: "country",
    permissionList: ["add_department"],
  },
  {
    tabName: "Fiscal Session AD",
    ordering: 2,
    keyWord: "fiscal-session-ad",
    permissionList: ["add_department"],
  },
  {
    tabName: "Fiscal Session BS",
    ordering: 3,
    keyWord: "fiscal-session-bs",
    permissionList: ["add_department"],
  },
];

export const userPermission = [
  {
    tabName: "User",
    ordering: 0,
    keyWord: "user",
    permissionList: ["add_department", "view_user", "update_user"],
  },
  {
    tabName: "Role",
    ordering: 1,
    keyWord: "user-group",
    permissionList: ["add_department", "view_role", "update_role"],
  },
];
