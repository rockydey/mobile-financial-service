import PrivateGuard from "../guard/PrivateGuard";
import AppLayout from "../layout/AppLayout";
import { URLHome } from "../utils/urls";

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
            element: <div>Home</div>,
          },
        ],
      },
    ],
  },
];
