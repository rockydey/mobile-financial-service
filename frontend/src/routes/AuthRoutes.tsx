import PublicGuard from "../guard/PublicGuard";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import { URLLogin, URLRegister } from "../utils/urls";

export const AuthRoutes = [
  {
    element: <PublicGuard />,
    errorElement: <div>404 Error</div>,
    children: [
      {
        element: <AuthLayout />,
        errorElement: <div>404 Error</div>,
        children: [
          {
            path: URLLogin(),
            element: <Login />,
          },
          {
            path: URLRegister(),
            element: <Register />,
          },
        ],
      },
    ],
  },
];
