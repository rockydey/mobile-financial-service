import useToken from "../../hooks/token/useToken";
import { useGetMeQuery } from "../../redux/slice/auth/authSlice";

interface UserTransitionProps {
  _id: string;
  agentNumber: number;
  transactionAmount: number;
  transactionType: string;
  transactionId: string;
}

function UserTransition() {
  const token = useToken();
  const { data, isLoading } = useGetMeQuery(null, { skip: !token });
  const transactions = data?.data?.transactions || [];

  if (isLoading) return;

  return (
    <div>
      <div className="bg-white text-gray-800 rounded-xl mt-10">
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Agent Number
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Amount
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Type
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Transaction ID
                </th>
              </tr>
            </thead>
            {transactions.length > 0 && (
              <tbody>
                {transactions.map((transaction: UserTransitionProps) => (
                  <tr
                    key={transaction?._id}
                    className="odd:bg-gray-50 even:bg-gray-100"
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {transaction?.agentNumber}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      ${transaction?.transactionAmount}
                    </td>
                    <td
                      className={`border border-gray-300 px-4 py-2 font-medium capitalize`}
                    >
                      {transaction?.transactionType || "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {transaction?.transactionId}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserTransition;
