import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotePage from "./pages/NotePage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/note/:id" element={<NotePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;