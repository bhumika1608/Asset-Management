import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import LoanBook from "./pages/LoanBook";
import LoanHistory from "./pages/LoanHistory";
import Navbar from "./components/Navbar";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/books" element={isAuthenticated ? <Books /> : <Navigate to="/login" />} />
        <Route path="/add-book" element={isAuthenticated ? <AddBook /> : <Navigate to="/login" />} />
        <Route path="/loan-book" element={isAuthenticated ? <LoanBook /> : <Navigate to="/login" />} />
        <Route path="/loan-history" element={isAuthenticated ? <LoanHistory /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}
