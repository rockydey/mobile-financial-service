import { Suspense } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loader from "../components/loader/Loader";
import useAuthCheck from "../hooks/auth/useAuthCheck";
import useAuth from "../hooks/auth/useAuth";
import { URLHome } from "../utils/urls";

function PublicGuard() {
  const { isChecked } = useAuthCheck();
  const isLoggedIn = useAuth();
  const location = useLocation();

  // Show loader until auth check is done
  if (isChecked) {
    return <Loader />;
  }

  return !isLoggedIn ? (
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to={URLHome()} state={{ from: location }} replace />
  );
}

export default PublicGuard;
