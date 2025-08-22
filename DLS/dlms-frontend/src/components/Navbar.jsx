import { Link } from "react-router-dom";

export default function Navbar({ setIsAuthenticated }) {
  return (
    <nav className="bg-blue-700 p-4 text-white flex justify-between">
      <div className="flex gap-4">
        <Link to="/home">Home</Link>
        <Link to="/books">All Books</Link>
        <Link to="/add-book">Add Book</Link>
        <Link to="/loan-book">Loan Book</Link>
        <Link to="/loan-history">Loan History</Link>
      </div>
      <button onClick={() => setIsAuthenticated(false)} className="bg-red-500 px-3 py-1 rounded">
        Logout
      </button>
    </nav>
  );
}
