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

const orbitCodesOptions = [
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
      attributes: ['name', 'noradCatId', 'orbitCode', 'objectType', 'countryCode', 'launchDate'],
    });
  };

  return (
    <div className="space-y-4">
      {/* <Select
        isMulti
        options={objectTypesOptions}
        value={selectedObjectTypes.map(type => ({ value: type, label: type }))}
        onChange={(options) => setSelectedObjectTypes(options?.map(o => o.value) || [])}
        placeholder="Select Object Types"
        className="w-full"
      />
      <Select
        isMulti
        options={orbitCodesOptions}
        value={selectedOrbitCodes.map(code => ({ value: code, label: code }))}
        onChange={(options) => setSelectedOrbitCodes(options?.map(o => o.value) || [])}
        placeholder="Select Orbit Codes"
        className="w-full"
      />
      <button
        onClick={handleApply}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Apply Filters
      </button> */}
    </div>
  );
};
