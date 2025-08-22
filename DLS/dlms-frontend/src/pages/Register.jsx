import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // TODO: Django API call
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form onSubmit={handleRegister} className="bg-white shadow-lg rounded-lg p-6 w-80">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input type="text" placeholder="Name" className="w-full p-2 border rounded mb-3" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" className="w-full p-2 border rounded mb-3" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded mb-3" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full bg-green-600 text-white py-2 rounded">Register</button>
      </form>
    </div>
  );
}
