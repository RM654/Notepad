import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-purple-200 p-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md transition-transform transform hover:scale-105">
        <h2 className="text-5xl font-bold mb-10 text-center text-gray-800">
          Login
        </h2>

        <form
          onSubmit={submitHandler}
          className="flex flex-col items-center"
        >
          {/* Email input */}
          <div className="flex flex-col space-y-2 mb-4">
            <label className="text-lg font-semibold text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="border-2 border-gray-300 p-3 w-80 rounded-xl shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password input */}
          <div className="flex flex-col space-y-2 mb-6">
            <label className="text-lg font-semibold text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="border-2 border-gray-300 p-3 w-80 rounded-xl shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-80 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-lg hover:from-blue-600 hover:to-purple-600 text-lg"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-gray-500 text-lg">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-500 hover:underline font-semibold"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;