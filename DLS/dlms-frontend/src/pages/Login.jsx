import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Connect with Django API
    if (email && password) {
      setIsAuthenticated(true);
      navigate("/home");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form onSubmit={handleLogin} className="bg-white shadow-lg rounded-lg p-6 w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
        <p className="text-sm mt-2">
          Don’t have an account? <a href="/register" className="text-blue-600">Register</a>
        </p>
      </form>
    </div>
  );
}
