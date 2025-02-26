import { FaHome, FaUserCog } from "react-icons/fa";
import {
  URLAgents,
  URLApproveAgent,
  URLCashIn,
  URLCashOut,
  URLHome,
  URLSendMoney,
  URLUsers,
} from "../../utils/urls";
import { UserRole } from "../../enum/enum";
import { FaUserGroup } from "react-icons/fa6";
import { BsCashCoin, BsFillSendCheckFill } from "react-icons/bs";
import { HiCash } from "react-icons/hi";
import { MdVerified } from "react-icons/md";

const SidebarRoutes = [
  {
    title: "Home",
    icon: <FaHome />,
    link: URLHome(),
    permission: [UserRole.ADMIN, UserRole.USER, UserRole.AGENT],
  },
  {
    title: "Approve Agent",
    icon: <MdVerified />,
    link: URLApproveAgent(),
    permission: [UserRole.ADMIN],
  },
  {
    title: "Agents",
    icon: <FaUserCog />,
    link: URLAgents(),
    permission: [UserRole.ADMIN],
  },
  {
    title: "Users",
    icon: <FaUserGroup />,
    link: URLUsers(),
    permission: [UserRole.ADMIN],
  },
  {
    title: "Cash In",
    icon: <BsCashCoin />,
    link: URLCashIn(),
    permission: [UserRole.AGENT],
  },
  {
    title: "Send  Money",
    icon: <BsFillSendCheckFill />,
    link: URLSendMoney(),
    permission: [UserRole.AGENT, UserRole.USER],
  },
  {
    title: "Cash Out",
    icon: <HiCash />,
    link: URLCashOut(),
    permission: [UserRole.USER],
  },
];

export default SidebarRoutes;
