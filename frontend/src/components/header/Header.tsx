import { IoNotificationsOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";

function Header() {
  const { pageTitle } = useSelector((store: RootState) => store.auth);
  const { pathname } = useLocation();

  return (
    <>
      <div
        className={`${
          location.pathname.includes("edit") && "lg:hidden"
        } lg:flex justify-between items-center pb-2 border-b border-[#0000002E] hidden`}
      >
        <div>
          <h2 className="capitalize text-2xl font-semibold">
            {" "}
            {pageTitle || pathname.split("/")[1]}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div>
            <IoNotificationsOutline size={24} />
          </div>
          <div className="w-10 h-10 rounded-full bg-color3 text-white flex justify-center items-center font-bold">
            <h2>AB</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
