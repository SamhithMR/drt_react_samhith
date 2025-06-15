import React, { useEffect, useState } from 'react';
import { useSatellites } from './hooks/useSatellites';
import { SearchBar } from './components/SearchBar';
import { Filters } from './components/Filters';
import { SatelliteTable } from './components/SatelliteTable';
import { ObjectType, OrbitCode, FilterParams, Satellite } from './types/satellite';

import './App.css';

function App() {
  let { data, loading, error  } = useSatellites({attributes: ['noradCatId', 'intlDes', 'name', 'launchDate', 'decayDate', 'objectType', 'launchSiteCode', 'countryCode', 'orbitCode']});
  
  const [filteredData, setFilteredData] = useState<Satellite[]>([]);

  useEffect(() => {
    setFilteredData(data || []);
  }, [data]);

  const handleFilter = (filters: FilterParams) => {
    if (!data) return;

    const newData = data.filter((obj) => {
    const matchesObjectType =
      !filters.objectTypes?.length || filters.objectTypes.includes(obj.objectType as ObjectType);
    const matchesOrbitCode =
      !filters.orbitCodes?.length || filters.orbitCodes.includes(obj.orbitCode as OrbitCode);

    return matchesObjectType && matchesOrbitCode;
    });

    setFilteredData(newData);
  };


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Satellite Tracking System</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          {/* <SearchBar onSearch={(text) => updateFilters({ attributes: [text] })} /> */}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <Filters onFilter={handleFilter} />
          
          <SatelliteTable 
            data={filteredData} 
            loading={loading} 
            error={error}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
