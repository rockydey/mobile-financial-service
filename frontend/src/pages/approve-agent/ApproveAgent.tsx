/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import {
  useApproveAgentMutation,
  useGetVerifyAgentQuery,
} from "../../redux/slice/admin/adminSlice";
import { FaCheck, FaTimes } from "react-icons/fa";

function ApproveAgent() {
  const { data, isLoading } = useGetVerifyAgentQuery(null);
  const agents = data?.data || [];

  const [approveAgent, { isLoading: approving }] = useApproveAgentMutation();
  // const [declineAgent] = useDeclineAgentMutation();

  const handleApprove = (id: string) => {
    approveAgent(id)
      .unwrap()
      .then((res) => {
        if (res) toast.success("Agent approved successfully");
      })
      .catch((err) => {
        toast.error(err.data.message || "Something went wrong");
      });
  };

  const handleDecline = async (id: string) => {
    // await declineAgent(id);
    console.log(id);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="rounded-2xl bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left text-gray-600 font-medium">Name</th>
              <th className="p-4 text-left text-gray-600 font-medium">Email</th>
              <th className="p-4 text-left text-gray-600 font-medium">
                Number
              </th>
              <th className="p-4 text-center text-gray-600 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent: any) => (
              <tr
                key={agent.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="p-4 text-gray-700 font-medium">{agent?.name}</td>
                <td className="p-4 text-gray-600">{agent?.email}</td>
                <td className="p-4 text-gray-600">{agent?.number}</td>
                <td className="p-4 text-center">
                  {!agent.isVerified && (
                    <div className="flex justify-center space-x-3">
                      <button
                        className="cursor-pointer bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-lg flex items-center space-x-2"
                        onClick={() => handleApprove(agent._id)}
                      >
                        <FaCheck />
                        <span>{approving ? "Approving..." : "Approve"}</span>
                      </button>
                      <button
                        className="cursor-pointer bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-lg flex items-center space-x-2"
                        onClick={() => handleDecline(agent._id)}
                      >
                        <FaTimes />
                        <span>Decline</span>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ApproveAgent;
