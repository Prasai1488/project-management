import { BiPurchaseTag } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { FaMoneyBillWave, FaUsersGear } from "react-icons/fa6";
import { RiSettings4Line } from "react-icons/ri";

export const sidebarData = [
  {
    menu: "Products",
    icon: <BiPurchaseTag size={20} />,
    key: "Products",
    link: "/products",
    permissions: ["view_products"],
  },
  {
    menu: "Orders",
    icon: <FaUsers size={20} />,
    key: "orders",
    link: "/orders",
    permissions: [""],
  },

  {
    menu: "Organization",
    icon: <FaUsers size={20} />,
    key: "organization",
    link: "/organization",
    permissions: [""],
  },
  {
    menu: "User",
    icon: <FaUsers size={20} />,
    key: "user",
    link: "/user",
    permissions: [""],
  },
  {
    menu: "Role",
    icon: <FaUsers size={20} />,
    key: "role",
    link: "/roles",
    permissions: [""],
  },
];

export const admin = [
  {
    menu: "Setting",
    icon: <RiSettings4Line size={18} />,
    sub_menu: [
      {
        name: "System Setup",
        link: "/system-setup",
        key: "coreSetup",
        permissions: ["export_report", "view_report"],
        child_menu: [
          // {
          //   name: "Organization",
          //   link: "/organization-setup",
          //   permissions: ["add_system_setup"],
          // },

          {
            name: "Manufacturer",
            link: "/manufacturer",
            permissions: ["export_report", "view_report"],
          },

          {
            name: "Products",
            link: "/products",
            permissions: ["export_report", "view_report"],
          },
          {
            name: "Items",
            link: "/items",
            permissions: [""],
          },
          {
            name: "Unit",
            link: "/unit",
            permissions: [""],
          },
          {
            name: "Questionnaire",
            link: "/questionnaire",
            permissions: [""],
          },
          {
            name: "Issues",
            link: "/issues",
            permissions: [""],
          },
          {
            name: "Contact Persons",
            link: "/contact-persons",
            permissions: [""],
          },
          {
            name: "Client",
            link: "/client",
            permissions: [""],
          },
          {
            name: "Customer",
            link: "/customer",
            permissions: [""],
          },
        ],
      },
      {
        name: "User Setup",
        link: "/user-setup",
        key: "userSetup",
        permissions: ["export_report", "view_report"],
        child_menu: [
          {
            name: "User",
            link: "/user",
            permissions: ["update_user", "change_user_password", "view_staff", "add_user"],
          },
          // {
          //   name: "Roles",
          //   link: "/roles",
          //   permissions: ["add_role", "view_role", "update_role"],
          // },
          {
            name: "Permissions",
            link: "/permissions",
            permissions: ["add_role", "view_role", "update_role"],
          },
          {
            name: "Permission Categories",
            link: "/permission-categories",
            permissions: ["add_role", "view_role", "update_role"],
          },
        ],
      },
    ],
  },
];
