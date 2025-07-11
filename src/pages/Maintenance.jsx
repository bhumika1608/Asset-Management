import React from 'react';
import { useAssets } from '../context/AssetContext';

export default function Maintenance() {
  const { assets, updateAsset } = useAssets();

  const maintenanceAssets = assets.filter(asset => asset.needsMaintenance);

  return (
    <div className="relative w-full h-full overflow-hidden flex items-start justify-center px-4 py-6">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 z-0"
        style={{
          backgroundImage:
            "url('https://sscstudy.com/wp-content/uploads/2023/04/airports-in-india.jpg')",
          backgroundSize: 'cover',
        }}
      ></div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full max-w-6xl bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-6">
        <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          🛠️ Maintenance Schedule
        </h1>

        {maintenanceAssets.length === 0 ? (
          <div className="text-center text-gray-600 text-lg bg-white/70 p-4 rounded-lg shadow-inner">
            No assets require maintenance right now.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full bg-white text-sm border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-blue-800 text-white">
                <tr>
                  <th className="text-left py-3 px-4">Asset Name</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Condition</th>
                  <th className="text-left py-3 px-4">Location</th>
                  <th className="text-left py-3 px-4">Added On</th>
                  <th className="text-left py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {maintenanceAssets.map((asset, index) => {
                  const fullIndex = assets.findIndex(
                    a => a.name === asset.name && a.date === asset.date
                  );

                  return (
                    <tr key={index} className="border-b hover:bg-blue-50 transition duration-100">
                      <td className="py-2 px-4">{asset.name}</td>
                      <td className="py-2 px-4">{asset.type}</td>
                      <td className="py-2 px-4">{asset.condition}</td>
                      <td className="py-2 px-4">{asset.location}</td>
                      <td className="py-2 px-4">{asset.date}</td>
                      <td className="py-2 px-4">
                        <button
                          onClick={() => {
                            const updated = { ...asset, needsMaintenance: false };
                            updateAsset(fullIndex, updated);
                          }}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded shadow"
                        >
                          Mark Done
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
