import React from "react";

export default function Books() {
  const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Available Books</h2>
      <ul className="list-disc pl-6">
        {books.map((b) => (
          <li key={b.id} className="mb-2">
            <span className="font-semibold">{b.title}</span> by {b.author}
          </li>
        ))}
      </ul>
    </div>
  );
}
