import { FaUsers } from "react-icons/fa";
import { VscOrganization } from "react-icons/vsc";
import { IoBookmarksOutline } from "react-icons/io5";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { BsGrid } from "react-icons/bs";
import { TfiUser } from "react-icons/tfi";
export const sidebarData = [
  {
    menu: "Organization",
    icon: <VscOrganization size={20} />,
    key: "organization",
    link: "/organization",
    permissions: [""],
  },
  {
    menu: "User",
    icon: <TfiUser size={20} />,
    key: "user",
    link: "/user",
    permissions: [""],
  },
  {
    menu: "Role",
    icon: <IoBookmarksOutline size={20} />,
    key: "role",
    link: "/roles",
    permissions: [""],
  },
  {
    menu: "Offer",
    icon: <IoBookmarksOutline size={20} />,
    key: "offer",
    link: "/offer",
    permissions: [""],
  },
];
export const products = [
  {
    menu: "Products",
    icon: <BsGrid size={20} />,
    sub_menu: [
      {
        name: "Products",
        link: "/products",
        permissions: ["view_products"],
      },
      {
        name: "Category",
        link: "/category",
        permissions: ["view_category"],
      },
    ],
  },
];
export const orders = [
  {
    menu: "Orders",
    icon: <HiOutlineClipboardDocumentList size={20} />,
    sub_menu: [
      {
        name: "Orders",
        link: "/orders",
        permissions: ["view_orders"],
      },
    ],
  },
];
