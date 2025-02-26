import { useState } from "react";

interface FormData {
  number: number | undefined;
  amount: number | undefined;
}

function UserCaseOut() {
  const [formData, setFormData] = useState<FormData>({
    number: undefined,
    amount: undefined,
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "number" || id === "amount" ? Number(value) : value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center h-[80vh] bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Cash Out
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Number Field */}
          <div>
            <label
              htmlFor="number"
              className="block text-sm font-medium text-gray-700"
            >
              Agent's Number
            </label>
            <input
              type="number"
              id="number"
              value={formData.number ?? ""}
              onChange={handleChange}
              placeholder="Enter recipient's number"
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
              required
            />
          </div>

          {/* Amount Field */}
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={formData.amount ?? ""}
              onChange={handleChange}
              placeholder="Enter amount"
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300 cursor-pointer"
          >
            Cash Out
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserCaseOut;
