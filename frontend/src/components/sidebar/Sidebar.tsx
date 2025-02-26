/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store/store";
import useUser from "../../hooks/auth/useUser";
import SidebarRoutes from "./rouses";
import { logout, updatePageTitle } from "../../redux/slice/auth/auth-slice";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { HiOutlineLogout } from "react-icons/hi";

interface ItemProps {
  title: string;
  icon: React.ReactNode;
  link: string;
}

function Sidebar() {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const user: any = useUser();
  const navigate = useNavigate();

  const permittedMenu = SidebarRoutes.filter((route: any) => {
    return route.permission?.includes(user?.role);
  });

  const handleLogOut = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/", { replace: true });
  };

  // * Update the page title
  useEffect(() => {
    const title = permittedMenu.find(
      (item: ItemProps) => item.link === pathname
    )?.title;

    if (title) {
      dispatch(updatePageTitle(title));
    } else {
      dispatch(updatePageTitle(""));
    }
  }, []);

  return (
    <div className="pt-5 relative w-[80px] overflow-x-hidden xl:w-[230px] lg:flex flex-col h-[95vh] pb-10">
      {/* Logo */}
      <Link to="/home" className="flex items-center mb-5">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Finexa</h1>
        </div>
      </Link>

      {permittedMenu?.map((item: ItemProps, index) => {
        {
          return (
            <Link
              to={item.link}
              key={index}
              onClick={() => {
                dispatch(updatePageTitle(item.title));
              }}
              className={`mb-4 flex items-center gap-2 text-white text-base py-3 px-4 hover:bg-white hover:border-l-[10px] border-primary hover:text-black font-medium,
                ${
                  pathname.includes(item.link) &&
                  "border-l-[10px] !text-black bg-white pl-3 md:pl-5"
                } w-full`}
              style={{ transition: ".3s" }}
            >
              <div className="text-2xl">{item.icon}</div>
              <div className={`${pathname === item.link && "text-black"}`}>
                {item.title}
              </div>
            </Link>
          );
        }
      })}

      <div className="w-full bg-[#0000000F] absolute bottom-10 space-y-4 font-medium">
        <button
          onClick={handleLogOut}
          className="flex items-center gap-3 pl-4 text-white cursor-pointer hover:scale-105 transition-all duration-500"
        >
          <HiOutlineLogout className="text-2xl" />
          <span className="text-base">Log Out</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
