import React, { useState, useEffect } from 'react';
import { useAssets } from '../context/AssetContext';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function AddAsset() {
  const { user } = useUser();
  const { addAsset } = useAssets();
  const navigate = useNavigate();

  const [asset, setAsset] = useState({
    name: '',
    type: '',
    condition: '',
    location: '',
    date: '',
    quantity: '',
    needsMaintenance: false,
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setAsset((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const assetWithUser = { ...asset, addedBy: user.username };
    addAsset(assetWithUser);
    alert('Asset added!');
    setAsset({
      name: '',
      type: '',
      condition: '',
      location: '',
      date: '',
      quantity: '',
      needsMaintenance: false,
    });
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
  {/* Dimmed background image */}
  <div
    className="absolute inset-0 bg-cover bg-center opacity-50 z-0"
    style={{
      backgroundImage:
        "url('https://pbs.twimg.com/media/FxHRQFVaQAE7MZY.jpg')",
      backgroundSize: 'cover',
    }}
  />
    <div
      className="w-full bg-gradient-to-br from-blue-100 to-blue-50 h-full flex items-start justify-center px-4 py-6 overflow-hidden bg-cover bg-center"
       
    >
      <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-2xl px-6 py-5 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
          ✈️ Add New Asset
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <input
            name="name"
            value={asset.name}
            onChange={handleChange}
            placeholder="Asset Name"
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
          <input
            name="type"
            value={asset.type}
            onChange={handleChange}
            placeholder="Asset Type"
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
          <input
            name="condition"
            value={asset.condition}
            onChange={handleChange}
            placeholder="Condition"
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            name="location"
            value={asset.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border border-gray-300 p-2 rounded"
          />
          <div className="flex gap-2">
            <input
              name="date"
              type="date"
              value={asset.date}
              onChange={handleChange}
              className="w-1/2 border border-gray-300 p-2 rounded"
            />
            <input
              name="quantity"
              type="number"
              min="1"
              value={asset.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              className="w-1/2 border border-gray-300 p-2 rounded"
            />
          </div>

          <label className="flex items-center gap-2 text-gray-800">
            <input
              name="needsMaintenance"
              type="checkbox"
              checked={asset.needsMaintenance}
              onChange={handleChange}
              className="accent-blue-700"
            />
            Needs Maintenance
          </label>

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded font-semibold transition duration-200"
          >
            Add Asset
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}
