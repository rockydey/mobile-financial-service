import { Outlet } from "react-router-dom";
// import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";
// import MobileSidebar from "../components/sidebar/MobileSidebar";

function AppLayout() {
  return (
    <div className="grid grid-cols-12 h-[100vh-80px]">
      <div className="col-span-3 bg-color3 m-5 rounded-2xl px-10">
        <Sidebar />
      </div>

      <div className="col-span-9 p-5 m-5 border border-primary rounded-2xl space-y-10">
        <div>
          <Header />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
