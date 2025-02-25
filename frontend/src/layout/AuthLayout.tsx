import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="relative">
      {/* Design */}
      <div>
        <div className="h-[50vh] w-full bg-primary"></div>
      </div>

      {/* Content */}
      <div className="absolute top-[10%] left-[20%] -translate-x-[12%] lg:top-[40%] lg:left-[25%] lg:-translate-x-[15%] xl:top-1/2 xl:left-1/2 transform xl:-translate-x-1/2">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
