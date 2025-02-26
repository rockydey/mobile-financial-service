interface Transaction {
  id: string;
  myNumber: number;
  agentNumber: number;
  balance: number;
  type: "Case In" | "Case Out";
  transactionId: string;
}

const transactions: Transaction[] = [
  {
    id: "1",
    myNumber: 1812983825,
    agentNumber: 1812983000,
    balance: 50,
    type: "Case In",
    transactionId: "TXN001",
  },
  {
    id: "2",
    myNumber: 1812983825,
    agentNumber: 1812983001,
    balance: 30,
    type: "Case Out",
    transactionId: "TXN002",
  },
  {
    id: "3",
    myNumber: 1812983825,
    agentNumber: 1812983002,
    balance: 70,
    type: "Case In",
    transactionId: "TXN003",
  },
  {
    id: "4",
    myNumber: 1812983825,
    agentNumber: 1812983003,
    balance: 20,
    type: "Case Out",
    transactionId: "TXN004",
  },
];

function UserTransition() {
  return (
    <div>
      <div className="bg-white text-gray-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  My Number
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Agent Number
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Balance
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Type
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Transaction ID
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="odd:bg-gray-50 even:bg-gray-100"
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.myNumber}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.agentNumber}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ${transaction.balance}
                  </td>
                  <td
                    className={`border border-gray-300 px-4 py-2 font-medium ${
                      transaction.type === "Case In"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {transaction.type}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.transactionId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserTransition;
