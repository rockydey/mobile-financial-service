import { useState } from "react";
import UserTransition from "./UserTransition";
import { useGetMeQuery } from "../../redux/slice/auth/authSlice";
import Loader from "../loader/Loader";

function UserHome() {
  const { data, isLoading, refetch } = useGetMeQuery(null);
  const [isBlurred, setIsBlurred] = useState(true);

  const user = data?.data;

  const toggleBlur = () => {
    refetch();
    setIsBlurred(!isBlurred);
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="p-8 max-w-md mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl text-white space-y-6">
        {/* Profile Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold">{user?.name}</h1>
          <p className="text-sm uppercase tracking-wide">{user?.role}</p>
        </div>

        {/* Balance Section */}
        <div
          className="bg-white text-gray-800 rounded-xl p-6 shadow-lg cursor-pointer select-none"
          onClick={toggleBlur}
        >
          <p className="text-sm font-medium">Your Balance</p>
          <p
            className={`text-4xl font-bold mt-1 transition-all duration-300 ${
              isBlurred ? "blur-md" : "blur-none"
            }`}
          >
            ${user?.balance}
          </p>
        </div>

        {/* User Details */}
        <div className="space-y-4 bg-white text-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium">Email</span>
            <span>{user?.email}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-medium">Phone</span>
            <span>{user?.number}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-medium">NID</span>
            <span>{user?.nid}</span>
          </div>
        </div>
      </div>

      {(user?.role === "user" || user?.role === "agent") && (
        <div>
          <UserTransition />
        </div>
      )}
    </div>
  );
}

export default UserHome;
