import { FaUsers } from "react-icons/fa";
import { VscOrganization } from "react-icons/vsc";
import { IoBookmarksOutline } from "react-icons/io5";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { BsGrid } from "react-icons/bs";
import { TfiUser } from "react-icons/tfi";
export const sidebarData = [
  // 
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
 
];


