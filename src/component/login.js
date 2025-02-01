import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Login = () => {
  const { setRole } = useContext(UserContext);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("http://62.72.29.180/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem("userId", data.userId);
        sessionStorage.setItem("role", data.role);
        setRole(data.role); // Update global role

        navigate(data.role === "Admin" ? "/create-user" : "/entry"); // Redirect based on role
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 shadow-lg bg-white rounded-2xl">
      <div className="flex justify-center mb-4">
          <img src="http://62.72.29.180/itdwc/images/favicon.png" alt="Company Logo" className="w-20 h-20" />
        </div>
        <p className="text-center m-2">Indian Truck Drivers Welfare Consortium</p>
        <div className="space-y-4">
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block font-medium text-left">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 mt-1.5"
              />
            </div>
            <div>
              <label htmlFor="password" className="block font-medium text-left">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 mt-1.5"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 flex justify-center items-center"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <p className="text-center"><a target="_blank" href="https://bluontech.com/" className="hover:text-blue-2500">
            Powered and Developed by Bluon Tech
          </a></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
