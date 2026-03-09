import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      setUserInfo(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password }
      );
      setUserInfo(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};