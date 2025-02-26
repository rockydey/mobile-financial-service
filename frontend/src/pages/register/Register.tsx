import { Link, useNavigate } from "react-router-dom";
import registerImg from "../../assets/images/registerImage.jpg";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRegisterMutation } from "../../redux/slice/auth/authSlice";
import { useAppDispatch } from "../../redux/store/store";
import { loginState } from "../../redux/slice/auth/auth-slice";

interface FormData {
  name: string;
  email: string;
  number: number | undefined;
  pin: number | undefined;
  nid: number | undefined;
  role: "user" | "agent";
}

function Register() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    number: undefined,
    pin: undefined,
    nid: undefined,
    role: "user",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Calling API
  const [register, { isLoading }] = useRegisterMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === "number" ? Number(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData?.number && formData?.number.toString().length > 11) {
      toast.error("Phone Number should be 11 digits!");
    }

    const payload = {
      user: {
        name: formData.name,
        email: formData.email,
        number: Number(formData.number?.toString()?.replace(/^0+/, "")),
        pin: formData.pin?.toString(),
        role: formData.role,
        nid: formData.nid,
      },
    };

    register(payload)
      .unwrap()
      .then((res) => {
        if (res.data.success && res.data.user.isVerified) {
          toast.success(res.data.message);
          dispatch(loginState({ user: res.data.user, token: res.data.token }));
        }
        if (!res.data.user.isVerified) {
          toast.success("Please wait for admin approval!");
          navigate("/");
        }
      })
      .catch((err) => toast.error(err.data.message || "Something went wrong!"));
  };

  return (
    <div
      className="bg-white rounded-2xl md:mb-10 lg:mb-0"
      style={{
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
      }}
    >
      <div className="flex flex-col lg:flex-row items-center">
        {/* Design */}
        <div className="p-5 lg:p-10 w-full lg:w-1/2">
          <img
            src={registerImg}
            alt="Login Image"
            className="object-cover rounded-2xl border-2 border-primary/50 w-full"
          />
        </div>

        {/* Login Form */}
        <div className="p-5 lg:p-10 w-full lg:w-1/2">
          <h3 className="text-3xl font-bold text-center text-primary/80 mb-5">
            Register
          </h3>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block font-semibold mb-2">
                Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="focus:outline-0 border border-primary/40 px-5 py-2.5 w-full rounded-md bg-secondary"
                placeholder="Enter Name"
                required
              />
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block font-semibold mb-2">
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="focus:outline-0 border border-primary/40 px-5 py-2.5 w-full rounded-md bg-secondary"
                placeholder="Enter Email"
                required
              />
            </div>
            {/* Phone Number */}
            <div>
              <label htmlFor="number" className="block font-semibold mb-2">
                Phone Number:
              </label>
              <input
                type="number"
                name="number"
                id="number"
                value={formData.number}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d{0,11}$/.test(val)) handleChange(e);
                }}
                className="focus:outline-0 border border-primary/40 px-5 py-2.5 w-full rounded-md bg-secondary"
                placeholder="Enter Phone Number (Max 11 digits)"
                required
              />
            </div>
            {/* Pin */}
            <div>
              <label htmlFor="pin" className="block font-semibold mb-2">
                Pin:
              </label>
              <input
                type="number"
                name="pin"
                id="pin"
                value={formData.pin}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d{0,5}$/.test(val)) handleChange(e);
                }}
                className="focus:outline-0 border border-primary/40 px-5 py-2.5 w-full rounded-md bg-secondary"
                placeholder="Enter Pin Number (Max 5 digits)"
                required
              />
            </div>
            {/* NID */}
            <div>
              <label htmlFor="nid" className="block font-semibold mb-2">
                NID:
              </label>
              <input
                type="number"
                name="nid"
                id="nid"
                value={formData.nid}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d{0,9}$/.test(val)) handleChange(e);
                }}
                className="focus:outline-0 border border-primary/40 px-5 py-2.5 w-full rounded-md bg-secondary"
                placeholder="Enter NID Number (Max 9 digits)"
                required
              />
            </div>
            {/* role */}
            <div>
              <label htmlFor="role" className="block font-semibold mb-2">
                Role:
              </label>
              <select
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
                className="focus:outline-0 border border-primary/40 px-5 py-2.5 w-full rounded-md bg-secondary"
              >
                <option value="user">User</option>
                <option value="agent">Agent</option>
              </select>
            </div>
            <div>
              <input
                type="submit"
                value={isLoading ? "Loading..." : "Register"}
                className="bg-primary w-full py-2.5 font-semibold text-white rounded-md cursor-pointer"
              />
            </div>
          </form>

          <p className="text-center mt-5 text-sm text-gray-700">
            Already have an account?{" "}
            <Link to="/" className="text-primary font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
