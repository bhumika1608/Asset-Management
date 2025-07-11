import React, { useState } from 'react';
import { useAssets } from '../context/AssetContext';

export default function AssetList() {
  const { assets, updateAsset } = useAssets();
  const [editIndex, setEditIndex] = useState(null);
  const [edited, setEdited] = useState({});

  const handleEdit = (index) => {
    setEditIndex(index);
    setEdited({ ...assets[index] });
  };

  const saveEdit = () => {
    updateAsset(editIndex, edited);
    setEditIndex(null);
  };

  return (
    <div className="relative w-full h-full overflow-hidden flex items-start justify-center px-4 py-6">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 z-0"
        style={{
          backgroundImage:
            "url('https://www.tripsavvy.com/thmb/onmPVNXlK9tjHFDzXoYBmwlBw1o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-149862238-56cdc39f3df78cfb37a33994.jpg')",
          backgroundSize: 'cover',
        }}
      ></div>

      {/* Foreground Table Content */}
      <div className="relative z-10 w-full max-w-6xl bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-6 overflow-auto">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">📋 Asset List</h2>

        <div className="overflow-x-auto rounded-lg">
          <table className="w-full text-sm text-left text-gray-700 border border-gray-300 rounded-lg">
            <thead className="bg-blue-100 text-gray-800">
              <tr>
                <th className="p-3 border">#</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Type</th>
                <th className="p-3 border">Condition</th>
                <th className="p-3 border">Location</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Qty</th>
                <th className="p-3 border">Maintenance</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset, index) => (
                <tr key={index} className="border-t hover:bg-blue-50 transition duration-100">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">
                    {editIndex === index ? (
                      <input
                        value={edited.name}
                        onChange={(e) => setEdited({ ...edited, name: e.target.value })}
                        className="border border-gray-300 rounded p-1 w-full"
                      />
                    ) : (
                      asset.name
                    )}
                  </td>
                  <td className="p-2 border">{asset.type}</td>
                  <td className="p-2 border">{asset.condition}</td>
                  <td className="p-2 border">{asset.location}</td>
                  <td className="p-2 border">{asset.date}</td>
                  <td className="p-2 border">
                    {editIndex === index ? (
                      <input
                        type="number"
                        value={edited.quantity}
                        onChange={(e) => setEdited({ ...edited, quantity: e.target.value })}
                        className="border border-gray-300 rounded p-1 w-20"
                      />
                    ) : (
                      asset.quantity
                    )}
                  </td>
                  <td className="p-2 border text-center">
                    {asset.needsMaintenance ? (
                      <span className="text-red-600 font-semibold">Yes</span>
                    ) : (
                      <span className="text-green-600 font-medium">No</span>
                    )}
                  </td>
                  <td className="p-2 border space-x-2 text-center">
                    {editIndex === index ? (
                      <>
                        <button
                          onClick={saveEdit}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditIndex(null)}
                          className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEdit(index)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
