import React, { createContext, useContext, useState } from 'react';

const AssetContext = createContext();

export function useAssets() {
  return useContext(AssetContext);
}

export function AssetProvider({ children }) {
  const [assets, setAssets] = useState([]);

  const addAsset = (newAsset) => {
    setAssets((prevAssets) => [...prevAssets, newAsset]);
  };
const updateAsset = (index, updatedAsset) => {
  setAssets(prev =>
    prev.map((a, i) => (i === index ? updatedAsset : a))
  );
};

  return (
    <AssetContext.Provider value={{ assets, addAsset, updateAsset }}>

      {children}
    </AssetContext.Provider>
  );
}
