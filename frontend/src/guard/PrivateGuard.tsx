import { Suspense } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loader from "../components/loader/Loader";
import useAuthCheck from "../hooks/auth/useAuthCheck";
import useAuth from "../hooks/auth/useAuth";
import { URLLogin } from "../utils/urls";

function PrivateGuard() {
  const { isChecked } = useAuthCheck();
  const isLoggedIn = useAuth();
  const location = useLocation();

  // Show loader until auth check is done
  if (isChecked) {
    return <Loader />;
  }

  return isLoggedIn ? (
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to={URLLogin()} state={{ from: location }} replace />
  );
}

export default PrivateGuard;
