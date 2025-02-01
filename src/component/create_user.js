import React, { useState } from 'react';
import Layout from './dashboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password || !role) {
      setError('All fields are required');
      return;
    }

    const userData = { username, password, role };
    try {
      const response = await fetch('http://62.72.29.180/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.status === 200) {
        toast.success('User created successfully!', {
          position: "top-center",
          autoClose: 3000,
        });
      } else if (response.status === 400) {
        toast.error('Bad Request: Please check your input.', {
          position: "top-center",
          autoClose: 3000,
        });
      } else if (response.status === 500) {
        toast.error('Server error, please try again later.', {
          position: "top-center",
          autoClose: 3000,
        });
      }

    } catch (err) {
      toast.error('Network error, please try again later.', {
        position: "top-center",
        autoClose: 3000,
      });
    }

    // Reset form
    setUsername('');
    setPassword('');
    setRole('');
    setError('');
  };

  return (
    <>
      <div className="p-8 max-w-md mx-auto bg-white shadow-md rounded-md">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Create New User</h2>

        {/* Error Message */}
        {error && (
          <div className="text-red-600 mb-4">
            <p>{error}</p>
          </div>
        )}

        {/* User Creation Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-lg font-medium mb-2">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              className="w-full p-3 border border-gray-300 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-lg font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              className="w-full p-3 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="block text-lg font-medium mb-2">Role</label>
            <select
              id="role"
              className="w-full p-3 border border-gray-300 rounded"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select role</option>
              <option value="Admin">Admin</option>
              <option value="Regular">Regular</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-200"
          >
            Create User
          </button>
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </>
  );
};

export default CreateUser;
