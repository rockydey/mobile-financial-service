/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import toast from "react-hot-toast";
import useUser from "../../hooks/auth/useUser";
import { useSendMoneyMutation } from "../../redux/slice/transaction/transactionSlice";

interface FormData {
  number: number | undefined;
  amount: number | undefined;
  reference?: string;
}

function UserSendMoney() {
  const [formData, setFormData] = useState<FormData>({
    number: undefined,
    amount: undefined,
    reference: "",
  });
  const user: any = useUser();

  const [sendMoney, { isLoading }] = useSendMoneyMutation();

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

    if (formData.amount && formData.amount < 50) {
      toast.error("Minimum send amount is 50");
      return;
    }

    const payload = {
      userId: user._id,
      receiverNumber: formData.number,
      amount: formData.amount,
      reference: formData.reference,
    };

    sendMoney(payload)
      .unwrap()
      .then(() => {
        toast.success("Money sent successfully");
        setFormData({
          number: undefined,
          amount: undefined,
          reference: "",
        });
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  return (
    <div className="flex items-center justify-center h-[80vh] bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Send Money
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Number Field */}
          <div>
            <label
              htmlFor="number"
              className="block text-sm font-medium text-gray-700"
            >
              Receiver's Number
            </label>
            <input
              type="number"
              id="number"
              value={formData.number ?? ""}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d{0,11}$/.test(val)) handleChange(e);
              }}
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

          {/* Reference Field */}
          <div>
            <label
              htmlFor="reference"
              className="block text-sm font-medium text-gray-700"
            >
              Reference
            </label>
            <input
              type="text"
              id="reference"
              value={formData.reference ?? ""}
              onChange={handleChange}
              placeholder="Enter reference"
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300 cursor-pointer"
          >
            {isLoading ? "Sending..." : "Send Money"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserSendMoney;
