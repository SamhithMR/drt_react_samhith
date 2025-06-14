import React, { useEffect } from 'react';
import { useSatellites } from './hooks/useSatellites';
import { SearchBar } from './components/SearchBar';
import { Filters } from './components/Filters';
import { SatelliteTable } from './components/SatelliteTable';
import './App.css';

function App() {
  const { data, loading, error, updateFilters } = useSatellites({attributes: ['noradCatId', 'intlDes', 'name', 'launchDate', 'decayDate', 'objectType', 'launchSiteCode', 'countryCode',
'orbitCode']});
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Satellite Tracking System</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <SearchBar onSearch={(text) => updateFilters({ attributes: [text] })} />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Filters</h2>
            <Filters onFilter={updateFilters} />
          </div>
          
          <SatelliteTable 
            data={data} 
            loading={loading} 
            error={error}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
