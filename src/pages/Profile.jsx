import React from 'react';
import { useUser } from '../context/UserContext';
import { useAssets } from '../context/AssetContext';

export default function Profile() {
  const { user } = useUser();
  const { assets } = useAssets();

  const userAssets = assets.filter(
    (asset) => asset.addedBy === user?.username
  );

  return (
    <div className="relative w-full h-full overflow-hidden flex items-start justify-center px-4 py-6">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 z-0"
        style={{
          backgroundImage:
            "url('https://tse2.mm.bing.net/th/id/OIP.BmXAY5K9al2mfQ0bYN1cYwHaEK?pid=Api&P=0&h=180')",
          backgroundSize: 'cover',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-6 overflow-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">
          User Profile
        </h1>

        {/* Stats section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 shadow-inner p-6 rounded-lg border border-blue-100">
            <h2 className="text-gray-500 text-sm mb-1">Username</h2>
            <p className="text-lg font-semibold text-blue-800">{user?.username}</p>
          </div>

          <div className="bg-green-50 shadow-inner p-6 rounded-lg border border-green-100">
            <h2 className="text-gray-500 text-sm mb-1">Total Assets Added</h2>
            <p className="text-lg font-semibold text-green-700">{userAssets.length}</p>
          </div>

          <div className="bg-yellow-50 shadow-inner p-6 rounded-lg border border-yellow-100">
            <h2 className="text-gray-500 text-sm mb-1">Maintenance Assets</h2>
            <p className="text-lg font-semibold text-yellow-700">
              {userAssets.filter((a) => a.needsMaintenance).length}
            </p>
          </div>
        </div>

        {/* Contributed Assets */}
        <h2 className="text-2xl font-semibold text-blue-900 mb-4">📦 Contributed Assets</h2>

        {userAssets.length === 0 ? (
          <div className="bg-white/70 p-6 rounded-lg text-center text-gray-600">
            You haven't added any assets yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {userAssets.map((asset, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-bold text-blue-800 mb-1">{asset.name}</h3>
                <p className="text-sm"><span className="font-semibold">Type:</span> {asset.type}</p>
                <p className="text-sm"><span className="font-semibold">Condition:</span> {asset.condition}</p>
                <p className="text-sm"><span className="font-semibold">Location:</span> {asset.location}</p>
                <p className="text-sm"><span className="font-semibold">Date:</span> {asset.date}</p>

                {asset.needsMaintenance && (
                  <p className="text-xs text-red-600 font-medium mt-2">⚠️ Needs Maintenance</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
