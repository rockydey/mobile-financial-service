import { Outlet, useLocation } from "react-router-dom";

function AuthLayout() {
  const { pathname } = useLocation();

  return (
    <div className="">
      {/* Design */}
      <div>
        <div className="h-[50vh] w-full bg-primary"></div>
      </div>

      {/* Content */}
      <div
        className={`pb-10 md:pb-0 px-5 lg:px-0 max-w-4xl mx-auto ${
          pathname === "/register" ? "mt-[-360px]" : "mt-[-240px]"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
