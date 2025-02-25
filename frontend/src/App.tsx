import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loader from "./components/loader/Loader";
import useAuthCheck from "./hooks/auth/useAuthCheck";
import { AuthRoutes } from "./routes/AuthRoutes";
import { AppRoutes } from "./routes/AppRoutes";

const router = createBrowserRouter([...AuthRoutes, ...AppRoutes]);

function App() {
  const { isChecked } = useAuthCheck();

  // Prevent redirecting before authentication check is complete
  if (isChecked) {
    return <Loader />;
  }

  return <RouterProvider router={router} />;
}

export default App;
