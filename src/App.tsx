import { Navigate, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Home from "./pages/Home";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";
import Register from "./pages/Register";

function App() {
  const { verify, isAuthenticated } = useAuthStore();

  useEffect(() => {
    verify();
  }, [verify]);

  return (
    <div className="w-full h-screen bg-gray-200">
      <Routes>
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/forgot-password" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
