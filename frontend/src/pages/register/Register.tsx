import { Link } from "react-router-dom";
import registerImg from "../../assets/images/registerImage.jpg";

function Register() {
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

          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-semibold mb-2">
                Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="focus:outline-0 border border-primary/40 px-5 py-2.5 w-full rounded-md bg-secondary"
                placeholder="Enter Name"
                required
              />
            </div>
            <div>
              <label htmlFor="number" className="block font-semibold mb-2">
                Phone Number:
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
              <label htmlFor="password" className="block font-semibold mb-2">
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="focus:outline-0 border border-primary/40 px-5 py-2.5 w-full rounded-md bg-secondary"
                placeholder="Enter Password"
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
