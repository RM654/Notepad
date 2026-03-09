import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const { userInfo, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white px-8 py-5 flex flex-col sm:flex-row justify-between items-center shadow-xl rounded-b-3xl">

      {/* Logo / Heading */}
      <Link
        to="/"
        className="text-5xl font-extrabold tracking-wide hover:text-yellow-300 transition mb-3 sm:mb-0"
      >
        Notes App
      </Link>

      {userInfo ? (
        <div className="flex items-center gap-6 text-xl sm:text-lg">
          <span className="text-gray-200 hidden sm:inline font-semibold">
            Hello, {userInfo.name}
          </span>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-full shadow-lg font-bold transition transform hover:scale-110"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-6 text-lg sm:text-xl">
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-full shadow-lg font-bold transition transform hover:scale-110"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full shadow-lg font-bold transition transform hover:scale-110"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;