import PrivateGuard from "../guard/PrivateGuard";
import AppLayout from "../layout/AppLayout";
import Agents from "../pages/agents/Agents";
import ApproveAgent from "../pages/approve-agent/ApproveAgent";
import CaseIn from "../pages/case-in/CaseIn";
import CaseOut from "../pages/case-out/CaseOut";
import Home from "../pages/home/Home";
import SendMoney from "../pages/send-money/SendMoney";
import Users from "../pages/users/Users";
import {
  URLAgents,
  URLApproveAgent,
  URLCashIn,
  URLCashOut,
  URLHome,
  URLSendMoney,
  URLUsers,
} from "../utils/urls";

export const AppRoutes = [
  {
    element: <PrivateGuard />,
    errorElement: <div>404 Error</div>,
    children: [
      {
        element: <AppLayout />,
        errorElement: <div>404 Error</div>,
        children: [
          {
            path: URLHome(),
            element: <Home />,
          },
          {
            path: URLCashIn(),
            element: <CaseIn />,
          },
          {
            path: URLSendMoney(),
            element: <SendMoney />,
          },
          {
            path: URLCashOut(),
            element: <CaseOut />,
          },
          {
            path: URLApproveAgent(),
            element: <ApproveAgent />,
          },
          {
            path: URLAgents(),
            element: <Agents />,
          },
          {
            path: URLUsers(),
            element: <Users />,
          },
        ],
      },
    ],
  },
];
