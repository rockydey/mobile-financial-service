import { Link } from "react-router-dom";
import loginImg from "../../assets/images/loginImg.jpg";

function Login() {
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

          <form className="space-y-4">
            <div>
              <label htmlFor="number" className="block font-semibold mb-2">
                Phone:
              </label>
              <input
                type="number"
                name="number"
                id="number"
                className="focus:outline-0 border border-primary/40 px-5 py-2.5 w-full rounded-md bg-secondary"
                placeholder="Enter Phone Number"
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
                className="focus:outline-0 border border-primary/40 px-5 py-2.5 w-full rounded-md bg-secondary"
                placeholder="Enter Pin Number"
                required
              />
            </div>
            <div>
              <input
                type="submit"
                value="Login"
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
