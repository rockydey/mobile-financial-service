import { Link } from "react-router-dom";
import loginImg from "../../assets/images/loginImg.jpg";
import { useState } from "react";
import { useLoginMutation } from "../../redux/slice/auth/authSlice";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../redux/store/store";
import { loginState } from "../../redux/slice/auth/auth-slice";

interface FormData {
  loginInput: string;
  pin: number | undefined;
}

function Login() {
  const [formData, setFormData] = useState<FormData>({
    loginInput: "",
    pin: undefined,
  });
  const dispatch = useAppDispatch();

  // api call
  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === "number" ? Number(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email regex
    const numberPattern = /^\d+$/; // Number regex

    if (!formData.pin) {
      alert("Pin is required");
      return;
    }

    let payload;

    if (emailPattern.test(formData.loginInput)) {
      payload = {
        email: formData.loginInput,
        pin: formData.pin.toString(),
      };
    } else if (numberPattern.test(formData.loginInput)) {
      payload = {
        number: Number(formData.loginInput),
        pin: formData.pin.toString(),
      };
    } else {
      alert("Enter a valid email or number");
      return;
    }

    login(payload)
      .unwrap()
      .then((res) => {
        if (res.success) {
          dispatch(
            loginState({
              user: res.data.user,
              token: res.data.token,
            })
          );
          toast.success("Login successful");
        }
      })
      .catch((err) => toast.error(err.data.message));
  };

  return (
    <div
      className="bg-white rounded-2xl md:mb-10 lg:mb-0"
      style={{
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
      }}
    >
      <div className="flex flex-col-reverse lg:flex-row items-center">
        {/* Login Form */}
        <div className="p-5 lg:p-10 w-full lg:w-1/2">
          <h3 className="text-3xl font-bold text-center text-primary/80 mb-5">
            Login
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="loginInput" className="block font-semibold mb-2">
                Email / Phone:
              </label>
              <input
                type="text"
                name="loginInput"
                id="loginInput"
                value={formData.loginInput}
                onChange={handleChange}
                className="focus:outline-0 border border-primary/40 px-5 py-2.5 w-full rounded-md bg-secondary"
                placeholder="Enter Email / Phone"
                required
              />
            </div>
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
                placeholder="Enter Pin Number"
                required
              />
            </div>
            <div>
              <input
                type="submit"
                value={isLoading ? "Loading..." : "Login"}
                className="bg-primary w-full py-2.5 font-semibold text-white rounded-md cursor-pointer"
              />
            </div>
          </form>

          <p className="text-center mt-5 text-sm text-gray-700">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-semibold">
              Register
            </Link>
          </p>
        </div>

        {/* Design */}
        <div className="p-5 lg:p-10 w-full lg:w-1/2">
          <img
            src={loginImg}
            alt="Login Image"
            className="object-cover rounded-2xl border-2 border-primary/50 w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
