import React from "react";

export default function Members() {
  const members = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com" },
    { id: 2, name: "Bob Smith", email: "bob@example.com" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Library Members</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-blue-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id}>
              <td className="p-2 border">{m.id}</td>
              <td className="p-2 border">{m.name}</td>
              <td className="p-2 border">{m.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
