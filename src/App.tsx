import React, { useEffect, useState } from "react";
import { useSatellites } from "./hooks/useSatellites";
import { SearchBar } from "./components/SearchBar";
import { Filters } from "./components/Filters";
import { SatelliteTable } from "./components/SatelliteTable";
import {
  ObjectType,
  OrbitCode,
  FilterParams,
  Satellite,
} from "./types/satellite";

import "./App.css";

function App() {
  let { data, loading, error } = useSatellites({
    attributes: [
      "noradCatId",
      "intlDes",
      "name",
      "launchDate",
      "decayDate",
      "objectType",
      "launchSiteCode",
      "countryCode",
      "orbitCode",
    ],
  });

  const [filteredData, setFilteredData] = useState<Satellite[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [filterParams, setFilterParams] = useState<FilterParams>({});

  useEffect(() => {
    if (!data) {
      setFilteredData([]);
      return;
    }

    const newData = data.filter((obj) => {
      const matchesObjectType =
        !filterParams.objectTypes?.length ||
        filterParams.objectTypes.includes(obj.objectType as ObjectType);

      const matchesOrbitCode =
        !filterParams.orbitCodes?.length ||
        filterParams.orbitCodes.some((item) => obj.orbitCode?.includes(item));

      const matchesSearch =
        !searchText ||
        obj.noradCatId?.toLowerCase().includes(searchText.toLowerCase()) ||
        obj.name?.toLowerCase().includes(searchText.toLowerCase());

      return matchesObjectType && matchesOrbitCode && matchesSearch;
    });

    setFilteredData(newData);
  }, [data, searchText, filterParams]);

  const handleFilter = (filters: FilterParams) => {
    console.log(filters);
    setFilterParams(filters);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Satellite Tracking System</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <Filters onFilter={handleFilter} />

          <SatelliteTable data={filteredData} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
}

export default App;
