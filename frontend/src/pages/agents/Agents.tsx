/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useBlockUserMutation,
  useDeleteUserMutation,
  useGetAllAgentsQuery,
} from "../../redux/slice/admin/adminSlice";
import Loader from "../../components/loader/Loader";
import { FaTrash, FaLock, FaLockOpen } from "react-icons/fa";
import toast from "react-hot-toast";

function Agents() {
  const { data, isLoading, refetch } = useGetAllAgentsQuery(null);
  const agents = data?.data || [];
  console.log(agents);

  const [blockAgent] = useBlockUserMutation();
  const [deleteAgent] = useDeleteUserMutation();

  const handleBlock = (id: string) => {
    blockAgent(id)
      .unwrap()
      .then(() => {
        toast.success("Agent blocked successfully");
        refetch();
      })
      .catch((error) => toast.error(error?.data?.message));
  };

  const handleDelete = (id: string) => {
    deleteAgent(id)
      .unwrap()
      .then(() => {
        toast.success("Agent deleted successfully");
        refetch();
      })
      .catch((error) => toast.error(error?.data?.message));
  };

  if (isLoading) return <Loader />;

  return (
    <div className="">
      <div className="rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Agents List
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Number</th>
                <th className="p-3 text-left">Balance</th>
                <th className="p-3 text-center">Verified</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {agents.length > 0 ? (
                agents.map((agent: any) => (
                  <tr
                    key={agent._id}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="p-3">{agent?.name}</td>
                    <td className="p-3">{agent?.email}</td>
                    <td className="p-3">{agent?.number}</td>
                    <td className="p-3">${agent?.balance}</td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          agent?.isVerified
                            ? "bg-green-200 text-green-700"
                            : "bg-red-200 text-red-700"
                        }`}
                      >
                        {agent?.isVerified ? "Verified" : "Not Verified"}
                      </span>
                    </td>
                    <td className="p-3 text-center space-x-2">
                      <button
                        className={`cursor-pointer px-3 py-1 text-sm rounded ${
                          !agent?.isBlocked
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-red-500 text-white hover:bg-red-600"
                        }`}
                        onClick={() => handleBlock(agent._id)}
                      >
                        {!agent?.isBlocked ? (
                          <div className="flex items-center gap-1">
                            <FaLockOpen size={16} />
                            <span className="font-semibold">Active</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <FaLock size={16} />
                            <span className="font-semibold">Blocked</span>
                          </div>
                        )}
                      </button>
                      <button
                        className="cursor-pointer px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                        onClick={() => handleDelete(agent._id)}
                      >
                        <FaTrash size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-gray-500">
                    No agents found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Agents;
