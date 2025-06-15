import React, { useState } from 'react';
import Select from 'react-select';
import { ObjectType, OrbitCode, FilterParams } from '../types/satellite';

interface FiltersProps {
  onFilter: (filters: FilterParams) => void;
}

const objectTypesOptions = [
  { value: 'ROCKET BODY', label: 'Rocket Body' },
  { value: 'DEBRIS', label: 'Debris' },
  { value: 'UNKNOWN', label: 'Unknown' },
  { value: 'PAYLOAD', label: 'Payload' },
];

const orbitCodesOptions: { value: OrbitCode; label: OrbitCode }[] = [
  { value: 'LEO', label: 'LEO' },
  { value: 'LEO1', label: 'LEO1' },
  { value: 'LEO2', label: 'LEO2' },
  { value: 'LEO3', label: 'LEO3' },
  { value: 'LEO4', label: 'LEO4' },
  { value: 'MEO', label: 'MEO' },
  { value: 'GEO', label: 'GEO' },
  { value: 'HEO', label: 'HEO' },
  { value: 'IGO', label: 'IGO' },
  { value: 'EGO', label: 'EGO' },
  { value: 'NSO', label: 'NSO' },
  { value: 'GTO', label: 'GTO' },
  { value: 'GHO', label: 'GHO' },
  { value: 'HAO', label: 'HAO' },
  { value: 'MGO', label: 'MGO' },
  { value: 'LMO', label: 'LMO' },
  { value: 'UFO', label: 'UFO' },
  { value: 'ESO', label: 'ESO' },
  { value: 'UNKNOWN', label: 'UNKNOWN' },
];

export const Filters: React.FC<FiltersProps> = ({ onFilter }) => {
  const [selectedObjectTypes, setSelectedObjectTypes] = useState<ObjectType[]>([]);
  const [selectedOrbitCodes, setSelectedOrbitCodes] = useState<OrbitCode[]>([]);

  const handleApply = () => {
    onFilter({
      objectTypes: selectedObjectTypes,
      attributes: ['noradCatId', 'intlDes', 'name', 'launchDate', 'decayDate', 'objectType', 'launchSiteCode', 'countryCode', 'orbitCode'],
    });
  };

  return (
    <div className="w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-4 bg-white shadow rounded-lg flex justify-between items-center flex-wrap">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Object Types</label>
          <Select
            isMulti
            options={objectTypesOptions as { value: ObjectType; label: ObjectType }[]}
            value={selectedObjectTypes.map(type => ({ value: type as ObjectType, label: type as ObjectType }))}
            onChange={(options) => setSelectedObjectTypes(options?.map(o => o.value as ObjectType) || [])}
            placeholder="Select Object Types"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Orbit Codes</label>
          <Select
            isMulti
            options={orbitCodesOptions}
            value={selectedOrbitCodes.map(code => ({ value: code, label: code }))}
            onChange={(options) => setSelectedOrbitCodes(options?.map(o => o.value) || [])}
            placeholder="Select Orbit Codes"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
      </div>
      <div className="text-center sm:text-right">
        <button
          onClick={handleApply}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};
