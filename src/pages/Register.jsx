import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext.jsx';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("All fields are required.");
      return;
    }

    // Save user to localStorage (just for frontend demo)
    localStorage.setItem("user", JSON.stringify({ username, password }));

    alert("Registration successful! You are now logged in.");
    login(username);
    navigate('/dashboard');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-100">
      <form onSubmit={handleRegister} className="bg-white shadow-lg p-6 rounded w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border rounded mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white w-full p-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
